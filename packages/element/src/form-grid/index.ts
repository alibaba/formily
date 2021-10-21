import {
  defineComponent,
  provide,
  ref,
  onMounted,
  InjectionKey,
  Ref,
  inject,
  computed,
  watchEffect,
} from '@vue/composition-api'
import { isValid, isNum, isBool, isEqual } from '@formily/shared'
import { h } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { Grid, IGridOptions } from '@formily/grid'
import ResizeObserver from 'resize-observer-polyfill'
import { stylePrefix } from '../__builtins__/configs'
import { composeExport } from '../__builtins__/shared'
import { useFormLayout } from '../form-layout'

export interface IFormGridProps extends IGridOptions {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
}

const FormGridSymbol: InjectionKey<Ref<Grid<HTMLElement>>> =
  Symbol('FormGridContext')

interface Style {
  [key: string]: string
}

interface GridColumnProps {
  gridSpan: number
}

const useFormGrid = (props: IFormGridProps) => {
  const layout = useFormLayout()

  return computed(() => {
    const newProps = {}
    Object.keys(props).forEach((key) => {
      if (typeof props[key] !== 'undefined') {
        newProps[key] = props[key]
      }
    })
    const options = {
      columnGap: layout.value?.gridColumnGap ?? 8,
      rowGap: layout.value?.gridRowGap ?? 4,
      ...newProps,
    }
    return new Grid(options)
  })
}

const useGridSpan = (gridSpan: number) => {
  const grid = inject(FormGridSymbol, ref(null))

  return grid.value?.calcGridSpan(gridSpan) ?? gridSpan
}

export const useGridColumn = (gridSpan = 1) => {
  const span = useGridSpan(gridSpan)
  return gridSpan === -1 ? `span ${span} / -1` : `span ${span} / auto`
}

const FormGridInner = observer(
  defineComponent({
    name: 'FFormGrid',
    props: {
      columnGap: {
        type: Number,
      },
      rowGap: {
        type: Number,
      },
      minColumns: {
        type: [Number, Array],
      },
      minWidth: {
        type: [Number, Array],
      },
      maxColumns: {
        type: [Number, Array],
      },
      maxWidth: {
        type: [Number, Array],
      },
      breakpoints: {
        type: Array,
      },
      colWrap: {
        type: Boolean,
        default: true,
      },
    },
    setup(props: IFormGridProps) {
      const grid = useFormGrid(props)
      const prefixCls = `${stylePrefix}-form-grid`
      const root = ref(null)

      provide(FormGridSymbol, grid)

      onMounted(() => {
        watchEffect((onInvalidate) => {
          const dispose = grid.value.connect(root.value)
          onInvalidate(() => {
            dispose()
          })
        })
      })

      return {
        prefixCls,
        root,
        grid,
      }
    },
    render() {
      const { prefixCls, grid } = this
      return h(
        'div',
        {
          attrs: {
            class: `${prefixCls}`,
          },
          style: {
            gridTemplateColumns: grid.templateColumns,
            gap: grid.gap,
          },
          ref: 'root',
        },
        {
          default: () => this.$slots.default,
        }
      )
    },
  })
) as any

const FormGridColumn = observer(
  defineComponent({
    name: 'FFormGridColumn',
    props: {
      gridSpan: {
        type: Number,
        default: 1,
      },
    },
    setup(props: GridColumnProps, { slots }) {
      return () => {
        return h(
          'div',
          {
            style: { gridColumn: useGridColumn(props.gridSpan) },
          },
          slots
        )
      }
    },
  })
)

export const FormGrid = composeExport(FormGridInner, {
  GridColumn: FormGridColumn,
  useGridSpan,
})

export default FormGrid
