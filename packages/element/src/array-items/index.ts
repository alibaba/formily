import { defineComponent } from '@vue/composition-api'
import { ArrayField } from '@formily/core'
import { useField, useFieldSchema, RecursionField, h } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { ISchema } from '@formily/json-schema'
import { stylePrefix } from '../__builtins__/configs'
import { ArrayBase } from '../array-base'
import { SlickList, SlickItem } from 'vue-slicksort'
import { composeExport } from '../__builtins__/shared'

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

export interface IArrayItemsItemProps {
  type?: 'card' | 'divide'
}

const ArrayItemsInner = observer(
  defineComponent({
    name: 'FArrayItems',
    setup(props, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()

      const prefixCls = `${stylePrefix}-array-items`
      const getKey = ArrayBase.useKey()

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
              ArrayBase.Item,
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

const ArrayItemsItem = defineComponent<IArrayItemsItemProps>({
  name: 'FArrayItemsItem',
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

export const ArrayItems = composeExport(ArrayItemsInner, {
  Item: ArrayItemsItem,
  Index: ArrayBase.Index,
  SortHandle: ArrayBase.SortHandle,
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
  MoveDown: ArrayBase.MoveDown,
  MoveUp: ArrayBase.MoveUp,
  useArray: ArrayBase.useArray,
  useIndex: ArrayBase.useIndex,
})

export default ArrayItems
