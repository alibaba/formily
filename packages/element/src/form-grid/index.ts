import { Grid, IGridOptions } from '@formily/grid'
import { markRaw } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { h } from '@formily/vue'
import {
  computed,
  defineComponent,
  inject,
  InjectionKey,
  onMounted,
  PropType,
  provide,
  ref,
  Ref,
  watchEffect,
} from 'vue-demi'
import { useFormLayout } from '../form-layout'
import { stylePrefix } from '../__builtins__/configs'
import { composeExport } from '../__builtins__/shared'

export interface IFormGridProps extends IGridOptions {
  grid?: Grid<HTMLElement>
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
}

const FormGridSymbol: InjectionKey<Ref<Grid<HTMLElement>>> =
  Symbol('FormGridContext')

interface GridColumnProps {
  gridSpan: number
}

export const createFormGrid = (props: IFormGridProps): Grid<HTMLElement> => {
  return markRaw(new Grid(props))
}

export const useFormGrid = (): Ref<Grid<HTMLElement>> => inject(FormGridSymbol)

/**
 * @deprecated
 */
const useGridSpan = (gridSpan: number) => {
  return gridSpan
}

/**
 * @deprecated
 */
export const useGridColumn = (gridSpan = 1) => {
  return gridSpan
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
      strictAutoFit: {
        type: Boolean,
        default: false,
      },
      shouldVisible: {
        type: Function as PropType<IGridOptions['shouldVisible']>,
        default() {
          return () => true
        },
      },
      grid: {
        type: Object as PropType<Grid<HTMLElement>>,
      },
    },
    setup(props: IFormGridProps) {
      const layout = useFormLayout()

      const gridInstance = computed(() => {
        const newProps: IFormGridProps = {}
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
        return markRaw(options?.grid ? options.grid : new Grid(options))
      })
      const prefixCls = `${stylePrefix}-form-grid`
      const root = ref(null)

      provide(FormGridSymbol, gridInstance)

      onMounted(() => {
        watchEffect((onInvalidate) => {
          const dispose = gridInstance.value.connect(root.value)
          onInvalidate(() => {
            dispose()
          })
        })
      })

      return {
        prefixCls,
        root,
        gridInstance,
      }
    },
    render() {
      const { prefixCls, gridInstance } = this
      return h(
        'div',
        {
          attrs: {
            class: `${prefixCls}`,
          },
          style: {
            gridTemplateColumns: gridInstance.templateColumns,
            gap: gridInstance.gap,
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
            attrs: {
              'data-grid-span': props.gridSpan,
            },
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
  useFormGrid,
  createFormGrid,
})

export default FormGrid
