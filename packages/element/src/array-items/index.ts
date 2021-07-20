import { defineComponent } from '@vue/composition-api'
import { ArrayField } from '@formily/core'
import { useField, useFieldSchema, RecursionField, h } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { ISchema } from '@formily/json-schema'
import { stylePrefix } from '../__builtins__/configs'
import { ArrayBase, ArrayBaseItem, useKey } from '../array-base'
import { SlickList, SlickItem } from 'vue-slicksort'

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

export interface IArrayItemsItemProps {
  type?: 'card' | 'divide'
}

export const ArrayItems = observer(
  defineComponent({
    name: 'ArrayItems',
    setup(props, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()

      const prefixCls = `${stylePrefix}-array-items`
      const getKey = useKey()

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []

        const renderItems = () => {
          const items = dataSource?.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items
            const key = getKey(item)
            return h(
              ArrayBaseItem,
              {
                key,
                props: {
                  index,
                },
              },
              {
                default: () =>
                  h(
                    SlickItem,
                    {
                      class: [`${prefixCls}-item-inner`],
                      props: {
                        index,
                      },
                      key,
                    },
                    {
                      default: () =>
                        h(
                          RecursionField,
                          {
                            props: {
                              schema: items,
                              name: index,
                            },
                          },
                          {}
                        ),
                    }
                  ),
              }
            )
          })

          return h(
            SlickList,
            {
              class: [`${prefixCls}-list`],
              props: {
                useDragHandle: true,
                lockAxis: 'y',
                helperClass: `${prefixCls}-sort-helper`,
                onSortEnd: ({ oldIndex, newIndex }) => {
                  field.move(oldIndex, newIndex)
                },
                value: [],
              },
            },
            { default: () => items }
          )
        }
        const renderAddition = () => {
          return schema.reduceProperties((addition, schema) => {
            if (isAdditionComponent(schema)) {
              return h(
                RecursionField,
                {
                  props: {
                    schema,
                    name: 'addition',
                  },
                },
                {}
              )
            }
            return addition
          }, null)
        }

        return h(
          ArrayBase,
          {},
          {
            default: () =>
              h(
                'div',
                {
                  class: [prefixCls],
                  attrs,
                  on: {
                    change: () => {},
                  },
                },
                {
                  default: () => [renderItems(), renderAddition()],
                }
              ),
          }
        )
      }
    },
  })
)

export const ArrayItemsItem = defineComponent<IArrayItemsItemProps>({
  name: 'ArrayItemsItem',
  props: ['type'],
  setup(props, { attrs, slots }) {
    const prefixCls = `${stylePrefix}-array-items`

    return () =>
      h(
        'div',
        {
          class: [`${prefixCls}-${props.type || 'card'}`],
          attrs,
          on: {
            change: () => {},
          },
        },
        slots
      )
  },
})

export {
  ArrayBaseSortHandle as ArrayItemsSortHandle,
  ArrayBaseRemove as ArrayItemsRemove,
  ArrayBaseMoveDown as ArrayItemsMoveDown,
  ArrayBaseMoveUp as ArrayItemsMoveUp,
  ArrayBaseAddition as ArrayItemsAddition,
  ArrayBaseIndex as ArrayItemsIndex,
  useIndex as useArrayItemsIndex,
} from '../array-base'
