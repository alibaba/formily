import React, { useLayoutEffect, useRef, useState } from 'react'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'
import { isValid, isNum, isBool } from '@formily/shared'
import ResizeObserver from 'resize-observer-polyfill'

interface ILayout {
  ref: React.MutableRefObject<HTMLDivElement>
  formGridPrefixCls: string
  layoutParams: {
    minWidth?: number
    columns?: number
    colWrap?: boolean
    maxWidth?: number
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
  layoutParams?: {
    minWidth?: number
    columns?: number
    colWrap?: boolean
    maxWidth?: number
  }
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
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const formGridPrefixCls = usePrefixCls('formily-grid')
  const observer = useRef(null)
  const [layoutParams, setLayout] = useState({})

  const calculateSmartColumns = (target: HTMLElement) => {
    const { clientWidth } = target
    const index = intervals.findIndex((interval) => {
      const [min, max] = interval
      if (clientWidth >= min && max > clientWidth) {
        return true
      }
    })

    if (!isValid(maxWidth) && !isValid(maxColumns)) {
      const minWidthUnderMinColumns = ((clientWidth - (minColumns[index] -1)) * props.columnGap) / minColumns[index]
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
      // maxWidth 优先级 高于maxColumns
      const minWidthUnderMinColumns = ((clientWidth - (minColumns[index] -1)) * props.columnGap) / minColumns[index]
      return {
        maxWidth: isValid(maxWidth) ? maxWidth[index] : Math.floor((clientWidth - (maxColumns[index] - 1) * props.columnGap) / maxColumns[index]),
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
        colWrap: colWrap[index]
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
            // setColumns(columns)
            setLayout(params)
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
  }
}

const useStyle = (props: IStyleProps): IStyle => {
  const { columnGap, rowGap, layoutParams } = props
  const max = layoutParams.maxWidth ? `${layoutParams.maxWidth}px` : '1fr';

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
  const style = {
        // 如果 colWarp true minWidth生效优先级高于minColumn 并且必须给minWidth | minColumn
        // 如果 colWarap false minWidth生效优先级高于minColumn
        // maxWidth 优先级高于 maxColumn
        gridTemplateColumns: layoutParams.colWrap
          ? `repeat(auto-fill, minmax(${layoutParams.minWidth}px,${max}))`
          // : `repeat(${layoutParams.columns},${layoutParams.minWidth === Infinity ? '1fr' : `minmax(${layoutParams.minWidth}px,${max})`})`,
          : `repeat(${layoutParams.columns}, ${getMinMax(layoutParams.minWidth, layoutParams.maxWidth)})`,
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
  const { ref, formGridPrefixCls, layoutParams } = useLayout(
    normalizedProps
  )

  const styles = useStyle({
    columnGap,
    rowGap,
    breakpoints,
    layoutParams,
  })

  return (
    <div
      className={cls(`${formGridPrefixCls}-layout`)}
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
  minColumns: 0,
  breakpoints: [S, MD, LG],
  colWrap: false,
}

export default FormGrid
