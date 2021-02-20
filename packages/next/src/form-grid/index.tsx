import React, { useLayoutEffect, useRef, useState, useContext } from 'react'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'
import { isValid, isNum, isBool } from '@formily/shared'
import ResizeObserver from 'resize-observer-polyfill'
import { FormGridContext } from './context';

interface ILayout {
  ref: React.MutableRefObject<HTMLDivElement>
  formGridPrefixCls: string
  layoutParams: {
    minWidth?: number
    columns?: number
    colWrap?: boolean
    maxWidth?: number
    minColumns?: number
    maxColumns?: number
  }
  styles: React.CSSProperties
}

interface ILayoutProps {
  minWidth: number | number[]
  maxWidth: number | number[]
  minColumns: number | number[]
  maxColumns: number | number[]
  intervals: Array<number[]>
  colWrap: boolean[]
  columnGap: number
  rowGap: number
}

interface IFormGridProps {
  minWidth?: number | number[]
  maxWidth?: number | number[]
  minColumns?: number | number[]
  maxColumns?: number | number[]
  colWrap?: boolean | boolean[]
  breakpoints?: number[]
  columnGap: number
  rowGap: number
}

interface IStyle {
  [key: string]: string
}

interface IStyleProps extends IFormGridProps {
  layoutParams?: {
    minWidth?: number
    columns?: number
    colWrap?: boolean
    maxWidth?: number
    clientWidth?: number
    maxColumns?: number
    minColumns: number
  }
  ref: React.MutableRefObject<HTMLDivElement>
}

interface IGridColumnProps {
  gridSpan: number
}

type ComposedFormGrid = React.FC<IFormGridProps> & {
  GridColumn: React.FC<IGridColumnProps>
  useGridSpan: (gridSpan: number) => number
}


const S = 720
const MD = 1280
const LG = 1920

const useLayout = (props: ILayoutProps): ILayout => {
  const {
    intervals,
    minColumns,
    maxColumns,
    minWidth,
    maxWidth,
    colWrap,
    columnGap,
    rowGap,
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const formGridPrefixCls = usePrefixCls('formily-grid')
  const observer = useRef(null)
  const [layoutParams, setLayout] = useState({})
  const [styles, setStyles] = useState({})

  const calculateSmartColumns = (target: HTMLElement) => {
    const { clientWidth } = target
    const index = intervals.findIndex((interval) => {
      const [min, max] = interval
      if (clientWidth >= min && max > clientWidth) {
        return true
      }
    })
    if (!isValid(maxWidth) && !isValid(maxColumns)) {
      return {
        minWidth: isValid(minWidth)
          ? minWidth[index]
          : isValid(maxColumns[index])
          ? maxColumns ? Math.floor((clientWidth - (maxColumns[index] - 1) * props.columnGap) / maxColumns[index]) : minWidth
          : 0,
        maxWidth: isValid(maxWidth) 
          ? maxWidth[index] 
          : Infinity === Math.floor((clientWidth - (minColumns[index] - 1) * props.columnGap) / minColumns[index])
          ? clientWidth
          : Math.floor((clientWidth - (minColumns[index] - 1) * props.columnGap) / minColumns[index]),
        columns: target.childNodes.length,
        colWrap: colWrap[index],
        minColumns: minColumns ? minColumns[index] : 1,
        maxColumns: maxColumns ? maxColumns[index] : undefined,
        clientWidth,
      }
    } else {
      // maxWidth 优先级 高于maxColumns
      // const minWidthUnderMinColumns = (clientWidth - (maxColumns[index] - 1) * props.columnGap) / maxColumns[index]
      return {
        maxWidth: isValid(maxWidth) 
          ? maxWidth[index] 
          : Infinity === Math.floor((clientWidth - (minColumns[index] - 1) * props.columnGap) / minColumns[index])
            ? clientWidth
            : Math.floor((clientWidth - (minColumns[index] - 1) * props.columnGap) / minColumns[index]),
        minWidth: isValid(minWidth)
          ? minWidth[index]
          : isValid(maxColumns[index])
          ? Math.floor((clientWidth - (maxColumns[index] - 1) * props.columnGap) / maxColumns[index]): 0,
        minColumns: minColumns ? minColumns[index] : 1,
        maxColumns: maxColumns ? maxColumns[index] : undefined,
        columns: target.childNodes.length,
        colWrap: colWrap[index],
        clientWidth,
      }
    }
  }

  useLayoutEffect(() => {
    if (ref.current) {
      observer.current = new ResizeObserver((entries) => {
        // requestAnimationFrame(() => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement
            const params = calculateSmartColumns(target)
            setLayout(params)
            const style = getStyle({ columnGap, rowGap, layoutParams: params, ref })
            setStyles(style)
          })
        // })
      }) as any
      observer.current.observe(ref.current)
    }
    return () => {
      observer.current?.unobserve(ref.current)
    }
  }, [])
  return {
    ref,
    formGridPrefixCls,
    layoutParams,
    styles
  }
}

const getStyle = (props: IStyleProps): IStyle => {
  const { columnGap, rowGap, layoutParams, ref } = props
  // const max = layoutParams.maxWidth ? `${layoutParams.maxWidth}px` : '1fr';
  const { clientWidth, minWidth, maxColumns, minColumns } = layoutParams
  const getMinMax = (minWidth: number, maxWidth: number) => {
    let minmax 
    if (minWidth === Infinity) {
      if (!isValid(maxWidth)) {
        minmax = '1fr'
      } else {
        minmax = `minmax(0px,${maxWidth}px)`
      }
    } else {
      minmax = `minmax(${minWidth}px,${isValid(maxWidth) ? `${maxWidth}px` : '1fr'})`
    }
    return minmax
  }
  
  const spans = Array.from(ref.current?.childNodes || []).reduce((buf, cur: HTMLElement) => {
    const span = isValid(maxColumns) ? Math.min((Number(cur.getAttribute('data-span')) || 1) as number, maxColumns) : (Number(cur.getAttribute('data-span')) || 1)
    return buf + Number(span)
  }, 0)

  const calc = Math.floor((clientWidth + columnGap) / (minWidth + columnGap))
  let finalColumns
  finalColumns = Math.min(spans, calc)
  if (isValid(maxColumns)) {
    finalColumns = Math.min(spans, calc, maxColumns)
  } else {

    finalColumns = Math.min(spans, calc)
  }

  if (isValid(minColumns)) {
    if(finalColumns < minColumns) {
      finalColumns = minColumns
    }
  }

  const style = {
        gridTemplateColumns: 
          `repeat(${finalColumns}, ${getMinMax(layoutParams.minWidth, layoutParams.maxWidth)})`,
        gridGap: `${rowGap}px ${columnGap}px`,
      }
  return style
}

export const FormGrid: ComposedFormGrid = (props) => {
  const normalizeProps = (props: IFormGridProps): ILayoutProps => {
    const { breakpoints } = props

    const intervals = breakpoints.reduce((buf, cur, index, array) => {
      if (index === array.length - 1) {
        return [...buf, [array[index], Infinity]]
      }
      if (index === 0) {
        return [...buf, [0, cur], [cur, array[index + 1]]]
      }
      return [...buf, [cur, array[index + 1]]]
    }, [])

    const normalize = (prop) => {
      if (isNum(prop) || isBool(prop)) {
        return intervals.map(() => prop)
      } else if (Array.isArray(prop)) {
        let lastVal
        return intervals.map((it, idx) => {
          const res = isValid(prop[idx]) ? prop[idx] : lastVal
          lastVal = isValid(prop[idx]) ? prop[idx] : lastVal
          return res
        })
      } else {
        return undefined
      }
    }

    return {
      ...props,
      intervals,
      colWrap: normalize(props.colWrap),
      minWidth: normalize(props.minWidth),
      maxWidth: normalize(props.maxWidth),
      minColumns: normalize(props.minColumns),
      maxColumns: normalize(props.maxColumns),
    }
  }
  const { children } = props
  const normalizedProps = normalizeProps(props)
  const { ref, formGridPrefixCls, layoutParams, styles } = useLayout(
    normalizedProps
  )
  return (
    <FormGridContext.Provider
      value={{columnGap: props.columnGap, ...layoutParams}}
    >
      <div
        className={cls(`${formGridPrefixCls}-layout`)}
        style={styles}
        ref={ref}
      >
        {children}
      </div>
    </FormGridContext.Provider>
  )
}

const GridColumn: React.FC<IGridColumnProps> = ({ gridSpan, children }) => {
 
  const span = FormGrid.useGridSpan(gridSpan)
  return (
    <div style={{ gridColumnStart: `span ${span}` }} data-span={span || 1}>{children}</div>
  )
}


GridColumn.defaultProps = {
  gridSpan: 1
}

FormGrid.useGridSpan = (gridSpan: number) => {
  const params = useContext(FormGridContext);
  if (!isValid(params)) {
    return gridSpan
  }
  const { colWrap, columns, clientWidth, minWidth, columnGap, maxColumns } = params
  const calc = Math.floor((clientWidth + columnGap) / (minWidth + columnGap)) // 算出实际一行最多能塞进的格子数
  if (colWrap === true) {
    if (Math.min(calc, columns) >= gridSpan) {
      if (isValid(maxColumns)) {
        return Math.min(gridSpan, maxColumns)
      }
     return gridSpan
    } else {
      if (isValid(maxColumns)) {
        return Math.min(calc, columns, maxColumns)
      }
      return Math.min(calc, columns)
    }
  } else {
    if (Math.min(calc, columns) >= gridSpan) {
      if (isValid(maxColumns)) {
        return Math.min(gridSpan, maxColumns)
      }
      return gridSpan
    } else {
      if (isValid(maxColumns)) {
        return Math.min(calc,columns, maxColumns)
      }
      return Math.min(calc,columns)
    } 
  }
}
FormGrid.GridColumn = GridColumn

FormGrid.defaultProps = {
  columnGap: 10,
  rowGap: 5,
  minColumns: 0,
  minWidth: 100,
  breakpoints: [S, MD, LG],
  colWrap: true,
}

export default FormGrid
