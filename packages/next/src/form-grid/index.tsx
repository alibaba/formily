import React, {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'
import { isValid, isNum, isBool, isEqual } from '@formily/shared'
import { ResizeObserver } from '@juggle/resize-observer'
import { FormGridContext } from './context'

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
  columnGap?: number
  rowGap?: number
}

export interface IFormGridProps {
  minWidth?: number | number[]
  maxWidth?: number | number[]
  minColumns?: number | number[]
  maxColumns?: number | number[]
  colWrap?: boolean | boolean[]
  breakpoints?: number[]
  columnGap?: number
  rowGap?: number
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

export interface IGridColumnProps {
  gridSpan?: number
}

type ComposedFormGrid = React.FC<IFormGridProps> & {
  GridColumn: React.FC<IGridColumnProps>
  useGridSpan: (gridSpan: number) => number
}

const S = 720
const MD = 1280
const LG = 1920

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

  const normalize = (prop: any) => {
    if (isNum(prop) || isBool(prop)) {
      return intervals.map(() => prop)
    } else if (Array.isArray(prop)) {
      let lastVal: number
      return intervals.map((it, idx) => {
        const res = (isValid(prop[idx]) ? prop[idx] : lastVal) || 0
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

const useGridLayout = (outerProps: IFormGridProps): ILayout => {
  const ref = useRef<HTMLDivElement>(null)
  const props = useRef<ILayoutProps>()
  const formGridPrefixCls = usePrefixCls('formily-grid')
  const [layoutParams, setLayout] = useState({})
  const [styles, setStyles] = useState({})
  const normalizedProps = normalizeProps(outerProps)
  const calculateSmartColumns = (target: HTMLElement) => {
    const { clientWidth } = target
    const index = props.current.intervals.findIndex((interval) => {
      const [min, max] = interval
      if (clientWidth >= min && max > clientWidth) {
        return true
      }
    })

    const takeMaxColumns = () => {
      return props.current.maxColumns?.[index] || props.current.maxColumns
    }

    const takeMinColumns = () => {
      return props.current.minColumns?.[index] || props.current.minColumns || 1
    }

    const takeColwrap = (): boolean => {
      return (
        props.current.colWrap?.[index] || (props.current.colWrap as any) || true
      )
    }

    const takeMinWidth = () => {
      const rMaxColumns = takeMaxColumns()
      if (isValid(props.current.minWidth)) {
        return props.current.minWidth[index] || 0
      } else {
        if (isValid(rMaxColumns)) {
          return Math.floor(
            (clientWidth - (rMaxColumns - 1) * props.current.columnGap) /
              rMaxColumns
          )
        } else {
          return 0
        }
      }
    }

    const takeMaxWidth = () => {
      if (isValid(props.current.maxWidth)) {
        return props.current.maxWidth[index] || 0
      } else {
        if (isValid(props.current.minColumns?.[index])) {
          const calculated = Math.floor(
            (clientWidth -
              (props.current.minColumns[index] - 1) * props.current.columnGap) /
              props.current.minColumns[index]
          )
          if (Infinity === calculated) {
            return clientWidth
          }
          return calculated
        } else {
          return Infinity
        }
      }
    }

    return {
      minWidth: takeMinWidth(),
      maxWidth: takeMaxWidth(),
      columns: target?.childNodes?.length,
      colWrap: takeColwrap(),
      minColumns: takeMinColumns(),
      maxColumns: takeMaxColumns(),
      clientWidth,
    }
  }

  const updateUI = () => {
    const params = calculateSmartColumns(ref.current)
    setLayout(params)
    const style = getStyle({
      columnGap: props.current.columnGap,
      rowGap: props.current.rowGap,
      layoutParams: params,
      ref,
    })
    if (!isEqual(style, styles)) {
      setStyles(style)
    }
  }

  props.current = normalizedProps

  useEffect(() => {
    updateUI()
  }, [
    outerProps.minWidth,
    outerProps.maxWidth,
    outerProps.minColumns,
    outerProps.maxColumns,
    outerProps.columnGap,
    outerProps.rowGap,
  ])

  useLayoutEffect(() => {
    const observer = () => {
      updateUI()
    }
    const resizeObserver = new ResizeObserver(observer)
    const mutationObserver = new MutationObserver(observer)
    if (ref.current) {
      resizeObserver.observe(ref.current)
      mutationObserver.observe(ref.current, {
        childList: true,
      })
    }
    return () => {
      resizeObserver.unobserve(ref.current)
      mutationObserver.disconnect()
    }
  }, [])
  return {
    ref,
    formGridPrefixCls,
    layoutParams,
    styles,
  }
}

const getStyle = (props: IStyleProps): IStyle => {
  const { columnGap, rowGap, layoutParams, ref } = props
  // const max = layoutParams.maxWidth ? `${layoutParams.maxWidth}px` : '1fr';
  const { clientWidth, minWidth, maxColumns, minColumns } = layoutParams
  const getMinMax = (minWidth: number, maxWidth: number) => {
    let minmax: string
    if (minWidth === Infinity) {
      if (!isValid(maxWidth)) {
        minmax = '1fr'
      } else {
        minmax = `minmax(0px,${maxWidth}px)`
      }
    } else {
      minmax = `minmax(${minWidth}px,${
        isValid(maxWidth) ? `${maxWidth}px` : '1fr'
      })`
    }
    return minmax
  }

  const spans = Array.from(ref.current?.childNodes || []).reduce(
    (buf, cur: HTMLElement) => {
      const span = isValid(maxColumns)
        ? Math.min(
            (Number(cur.getAttribute('data-span')) || 1) as number,
            maxColumns
          )
        : Number(cur.getAttribute('data-span')) || 1
      return buf + Number(span)
    },
    0
  )

  const calc = Math.floor((clientWidth + columnGap) / (minWidth + columnGap))
  let finalColumns: number
  finalColumns = Math.min(spans, calc)
  if (isValid(maxColumns)) {
    finalColumns = Math.min(spans, calc, maxColumns)
  } else {
    finalColumns = Math.min(spans, calc)
  }

  if (isValid(minColumns)) {
    if (finalColumns < minColumns) {
      finalColumns = minColumns
    }
  }

  const style = {
    gridTemplateColumns: `repeat(${finalColumns}, ${getMinMax(
      layoutParams.minWidth,
      layoutParams.maxWidth
    )})`,
    gridGap: `${rowGap}px ${columnGap}px`,
  }
  return style
}

export const useGridSpan = (gridSpan = 1) => {
  const params = useContext(FormGridContext)
  if (!isValid(params)) {
    return gridSpan
  }
  const { colWrap, columns, clientWidth, minWidth, columnGap, maxColumns } =
    params
  const calc = Math.floor((clientWidth + columnGap) / (minWidth + columnGap)) // 算出实际一行最多能塞进的格子数
  if (colWrap === true) {
    if (Math.min(calc, columns) >= gridSpan) {
      if (isValid(maxColumns)) {
        return Math.min(gridSpan, maxColumns)
      }
      return gridSpan
    } else {
      if (isValid(maxColumns)) {
        return Math.min(calc, gridSpan, maxColumns)
      }
      return Math.min(calc, gridSpan)
    }
  } else {
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
  }
}

export const FormGrid: ComposedFormGrid = (props) => {
  const { ref, formGridPrefixCls, layoutParams, styles } = useGridLayout(props)
  return (
    <FormGridContext.Provider
      value={{ columnGap: props.columnGap, ...layoutParams }}
    >
      <div
        className={cls(`${formGridPrefixCls}-layout`)}
        style={styles}
        ref={ref}
      >
        {props.children}
      </div>
    </FormGridContext.Provider>
  )
}

export const GridColumn: React.FC<IGridColumnProps> = ({
  gridSpan,
  children,
}) => {
  const span = FormGrid.useGridSpan(gridSpan)
  return (
    <div style={{ gridColumnStart: `span ${span}` }} data-span={span || 1}>
      {children}
    </div>
  )
}

GridColumn.defaultProps = {
  gridSpan: 1,
}

FormGrid.useGridSpan = useGridSpan
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
