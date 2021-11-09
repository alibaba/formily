import React, { useLayoutEffect, useRef, useMemo } from 'react'
import { observer } from '@formily/react'
import { Grid, IGridOptions } from '@formily/grid'
import { usePrefixCls, pickDataProps } from '../__builtins__'
import { useFormLayout } from '../form-layout'
import cls from 'classnames'

const FormGridContext = React.createContext<Grid<HTMLElement>>(null)

export interface IFormGridProps extends IGridOptions {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
}

export interface IGridColumnProps {
  gridSpan?: number
  style?: React.CSSProperties
  className?: string
}

type ComposedFormGrid = React.FC<IFormGridProps> & {
  GridColumn: React.FC<IGridColumnProps>
  /**
   * @deprecated
   */
  useGridSpan: (gridSpan: number) => number
  /**
   * @deprecated
   */
  useGridColumn: (gridSpan: number) => string
}

const useFormGrid = (props: IFormGridProps) => {
  const layout = useFormLayout()
  const options = {
    columnGap: layout?.gridColumnGap ?? 8,
    rowGap: layout?.gridRowGap ?? 4,
    ...props,
  }
  return useMemo(() => new Grid(options), [Grid.id(options)])
}

/**
 * @deprecated
 */
export const useGridSpan = (gridSpan = 1) => {
  return gridSpan
}

/**
 * @deprecated
 */
export const useGridColumn = (gridSpan = 1) => {
  return gridSpan
}

export const FormGrid: ComposedFormGrid = observer(
  ({
    children,
    className,
    style,
    ...props
  }: React.PropsWithChildren<IFormGridProps>) => {
    const grid = useFormGrid(props)
    const ref = useRef<HTMLDivElement>()
    const prefixCls = usePrefixCls('formily-grid', props)
    const dataProps = pickDataProps(props)
    useLayoutEffect(() => {
      return grid.connect(ref.current)
    }, [grid])
    return (
      <FormGridContext.Provider value={grid}>
        <div
          {...dataProps}
          className={cls(`${prefixCls}-layout`, className)}
          style={{
            ...style,
            gridTemplateColumns: grid.templateColumns,
            gap: grid.gap,
          }}
          ref={ref}
        >
          {children}
        </div>
      </FormGridContext.Provider>
    )
  },
  {
    forwardRef: true,
  }
) as any

export const GridColumn: React.FC<IGridColumnProps> = observer(
  ({ gridSpan, children, ...props }) => {
    return (
      <div {...props} style={props.style} data-grid-span={gridSpan}>
        {children}
      </div>
    )
  }
)

GridColumn.defaultProps = {
  gridSpan: 1,
}

FormGrid.useGridSpan = useGridSpan
FormGrid.GridColumn = GridColumn

export default FormGrid
