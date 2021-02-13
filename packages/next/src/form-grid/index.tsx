import React, { useLayoutEffect, useRef, useState } from 'react'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'
import { isValid, isNum, isBool } from '@formily/shared'
import ResizeObserver from 'resize-observer-polyfill'
// import './style.less';
interface ILayout {
  ref: React.MutableRefObject<HTMLDivElement>
  formGridPrefixCls: string
  responsiveColumns: number
  layoutParams: {
    minWidth?: number
    columns?: number
    colWrap?: boolean
  }
}

interface ILayoutProps {
  minWidth: number | number[]
  maxWidth: number | number[]
  minColumns: number | number[]
  maxColumns: number | number[]
  intervals: Array<number[]>
  colWrap: boolean[]
  columnGap: number
}

interface IFormGridProps {
  minWidth?: number | number[]
  maxWidth?: number | number[]
  minColumns?: number | number[]
  maxColumns?: number | number[]
  colWrap?: boolean | boolean[]
  breakpoints: number[]
  columnGap: number
  rowGap: number
}

interface IStyle {
  [key: string]: string
}

interface IStyleProps extends IFormGridProps {
  responsiveColumns?: number
  layoutParams?: {
    minWidth?: number
    columns?: number
    colWrap?: boolean
  }
}

// const MAX_COLUMN_WIDTH = 300;
// const MIN_COLUMN_WIDTH = 100;
// const DEFAULT_COLUMNS = 4;
const S = 720
const MD = 1280
const LG = 1920

const useLayout = (props: ILayoutProps): ILayout => {
  const {
    intervals,
    minColumns,
    maxColumns,
    minWidth,
    // maxWidth,
    colWrap,
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const formGridPrefixCls = usePrefixCls('formily-grid')
  const observer = useRef(null)
  const [responsiveColumns] = useState(undefined)
  const [layoutParams, setLayout] = useState({})

  const calculateSmartColumns = (target: HTMLElement) => {
    const { clientWidth } = target
    const index = intervals.findIndex((interval) => {
      const [min, max] = interval
      if (clientWidth >= min && max > clientWidth) {
        return true
      }
    })

    if (!isValid(maxColumns) && !isValid(maxColumns)) {
      const minWidthUnderMinColumns = clientWidth / minColumns[index]
      // console.log('@@:', minColumns[index], minWidthUnderMinColumns, minWidth)
      // console.log({
      //   minWidth: minWidthUnderMinColumns > minWidth[index] ? minWidth[index] : minWidthUnderMinColumns,
      //   columns: target.childNodes.length,
      //   colWrap: colWrap[index]
      // })
      return {
        minWidth: isValid(minWidth)
          ? minWidthUnderMinColumns > minWidth[index]
            ? minWidth[index]
            : minWidthUnderMinColumns
          : isValid(minColumns[index])
          ? Math.floor(
              (clientWidth - (minColumns[index] - 1) * props.columnGap) /
                minColumns[index]
            )
          : //
            0,
        columns: target.childNodes.length,
        colWrap: colWrap[index],
      }
    } else {
      // const currentMinColumn = minColumns[index];
      // const currentMaxColumn = maxColumns[index];
      // const currentMinWidth = minWidth[index];
      // const currentMaxWidth = maxWidth[index];
      // const minColumnsUnderMinWidth = Math.ceil(clientWidth / currentMinWidth);
      // const maxColumnsUnderMaxWidth = Math.floor(clientWidth / currentMaxWidth);
      // const minColumn = minColumnsUnderMinWidth > currentMinColumn ? minColumnsUnderMinWidth : currentMinColumn
    }
  }

  useLayoutEffect(() => {
    if (ref.current) {
      observer.current = new ResizeObserver((entries) => {
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement
            const params = calculateSmartColumns(target)
            // setColumns(columns)
            setLayout(params)
          })
        })
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
    responsiveColumns,
    layoutParams,
  }
}

const useStyle = (props: IStyleProps): IStyle => {
  const { responsiveColumns, columnGap, rowGap, layoutParams } = props

  const style = isNum(responsiveColumns)
    ? {
        gridTemplateColumns: `repeat(${responsiveColumns},1fr)`,
        gridGap: `${rowGap}px ${columnGap}px`,
      }
    : {
        // 自动换行必须指定最小宽度
        // 比自动换行
        gridTemplateColumns: layoutParams.colWrap
          ? `repeat(auto-fill, minmax(${layoutParams.minWidth}px,1fr))`
          : `repeat(${layoutParams.columns}, minmax(${layoutParams.minWidth}px,1fr))`,
        gridGap: `${rowGap}px ${columnGap}px`,
      }

  return style
}

export const FormGrid: React.FC<IFormGridProps> = (props) => {
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
  const { children, columnGap, rowGap, breakpoints } = props
  const normalizedProps = normalizeProps(props)
  const { ref, formGridPrefixCls, responsiveColumns, layoutParams } = useLayout(
    normalizedProps
  )

  const styles = useStyle({
    columnGap,
    rowGap,
    breakpoints,
    responsiveColumns,
    layoutParams,
  })

  return (
    <div
      className={cls(`${formGridPrefixCls}-layout`, {
        flex: !isNum(responsiveColumns),
      })}
      style={styles}
      ref={ref}
    >
      {children}
    </div>
  )
}

FormGrid.defaultProps = {
  columnGap: 10,
  rowGap: 5,
  // minWidth: 0,
  // maxWidth: Infinity,
  minColumns: 0,
  // maxColumns: 5,
  breakpoints: [S, MD, LG],
  colWrap: false,
}

export default FormGrid
