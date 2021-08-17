import { defineComponent } from '@vue/composition-api'
import { Card, Empty, Row } from 'element-ui'
import type { Card as CardProps } from 'element-ui'
import { ArrayField } from '@formily/core'
import { useField, useFieldSchema, RecursionField, h } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { ISchema } from '@formily/json-schema'
import { stylePrefix } from '../__builtins__/configs'
import { ArrayBase } from '../array-base'
import { composeExport } from '../__builtins__/shared'

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const isIndexComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Index') > -1
}

const isRemoveComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Remove') > -1
}

const isMoveUpComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveUp') > -1
}

const isMoveDownComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveDown') > -1
}

const isOperationComponent = (schema: ISchema) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isMoveDownComponent(schema) ||
    isMoveUpComponent(schema)
  )
}
const ArrayCardsInner = observer(
  defineComponent<CardProps>({
    name: 'FArrayCards',
    props: [],
    setup(props, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()
      const prefixCls = `${stylePrefix}-array-cards`
      const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const dataSource = Array.isArray(field.value) ? field.value : []
        if (!schema) throw new Error('can not found schema object')

        const renderItems = () => {
          return dataSource?.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items

            const title = h(
              'span',
              {},
              {
                default: () => [
                  h(
                    RecursionField,
                    {
                      props: {
                        schema: items,
                        name: index,
                        filterProperties: (schema) => {
                          if (!isIndexComponent(schema)) return false
                          return true
                        },
                        onlyRenderProperties: true,
                      },
                    },
                    {}
                  ),
                  attrs.title || field.title,
                ],
              }
            )
            const extra = h(
              'span',
              {},
              {
                default: () => [
                  h(
                    RecursionField,
                    {
                      props: {
                        schema: items,
                        name: index,
                        filterProperties: (schema) => {
                          if (!isOperationComponent(schema)) return false
                          return true
                        },
                        onlyRenderProperties: true,
                      },
                    },
                    {}
                  ),
                  attrs.extra,
                ],
              }
            )
            const content = h(
              RecursionField,
              {
                props: {
                  schema: items,
                  name: index,
                  filterProperties: (schema) => {
                    if (isIndexComponent(schema)) return false
                    if (isOperationComponent(schema)) return false
                    return true
                  },
                },
              },
              {}
            )

            return h(
              ArrayBase.Item,
              {
                key: getKey(item, index),
                props: {
                  index,
                },
              },
              {
                default: () =>
                  h(
                    Card,
                    {
                      class: [`${prefixCls}-item`],
                      attrs: {
                        shadow: 'never',
                        ...attrs,
                      },
                    },
                    {
                      default: () => [
                        content,
                        h(
                          Row,
                          {
                            props: {
                              type: 'flex',
                              justify: 'space-between',
                            },
                            slot: 'header',
                          },
                          {
                            default: () => [title, extra],
                          }
                        ),
                      ],
                    }
                  ),
              }
            )
          })
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
        const renderEmpty = () => {
          if (dataSource?.length) return
          return h(
            Card,
            {
              class: [`${prefixCls}-item`],
              attrs: {
                shadow: 'never',
                ...attrs,
                header: attrs.title || field.title,
              },
            },
            {
              default: () =>
                h(
                  Empty,
                  { props: { description: 'No Data', imageSize: 100 } },
                  {}
                ),
            }
          )
        }

        return h(
          'div',
          {
            class: [prefixCls],
          },
          {
            default: () =>
              h(
                ArrayBase,
                {
                  props: {
                    keyMap,
                  },
                },
                {
                  default: () => [
                    renderEmpty(),
                    renderItems(),
                    renderAddition(),
                  ],
                }
              ),
          }
        )
      }
    },
  })
)

export const ArrayCards = composeExport(ArrayCardsInner, {
  Index: ArrayBase.Index,
  SortHandle: ArrayBase.SortHandle,
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
  MoveDown: ArrayBase.MoveDown,
  MoveUp: ArrayBase.MoveUp,
  useArray: ArrayBase.useArray,
  useIndex: ArrayBase.useIndex,
})

export default ArrayCards
