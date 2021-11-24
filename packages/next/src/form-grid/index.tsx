import React, { useLayoutEffect, useRef, useMemo, useContext } from 'react'
import { markRaw } from '@formily/reactive'
import { observer } from '@formily/react'
import { Grid, IGridOptions } from '@formily/grid'
import { usePrefixCls, pickDataProps } from '../__builtins__'
import { useFormLayout } from '../form-layout'
import cls from 'classnames'

const FormGridContext = React.createContext<Grid<HTMLElement>>(null)

export interface IFormGridProps extends IGridOptions {
  grid?: Grid<HTMLElement>
  prefix?: string
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
  useFormGrid: () => Grid<HTMLElement>
  createFormGrid: (props: IFormGridProps) => Grid<HTMLElement>
  /**
   * @deprecated
   */
  useGridSpan: (gridSpan: number) => number
  /**
   * @deprecated
   */
  useGridColumn: (gridSpan: number) => number
}

export const createFormGrid = (props: IFormGridProps) => {
  return markRaw(new Grid(props))
}

export const useFormGrid = () => useContext(FormGridContext)

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
    const layout = useFormLayout()
    const options = {
      columnGap: layout?.gridColumnGap ?? 8,
      rowGap: layout?.gridRowGap ?? 4,
      ...props,
    }
    const grid = useMemo(
      () => markRaw(options?.grid ? options.grid : new Grid(options)),
      [Grid.id(options)]
    )
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
      <div {...props} data-grid-span={gridSpan}>
        {children}
      </div>
    )
  }
)

GridColumn.defaultProps = {
  gridSpan: 1,
}

FormGrid.createFormGrid = createFormGrid
FormGrid.useFormGrid = useFormGrid
FormGrid.useGridSpan = useGridSpan
FormGrid.useGridColumn = useGridColumn
FormGrid.GridColumn = GridColumn

export default FormGrid
