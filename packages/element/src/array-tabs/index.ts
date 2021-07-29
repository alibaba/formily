import { defineComponent, ref } from '@vue/composition-api'
import { observer } from '@formily/reactive-vue'
import { ArrayField } from '@formily/core'
import { h, useField, useFieldSchema, RecursionField } from '@formily/vue'
import { Tabs, TabPane, Badge, Button } from 'element-ui'
import { stylePrefix } from '../__builtins__/configs'

import type { Tabs as TabsProps } from 'element-ui'

export const ArrayTabs = observer(
  defineComponent<TabsProps>({
    name: 'ArrayTabs',
    props: [],
    setup(props, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()

      const prefixCls = `${stylePrefix}-array-tabs`
      const activeKey = ref('tab-0')

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const value = Array.isArray(field.value) ? field.value : []
        const dataSource = value?.length ? value : [{}]

        const onEdit = (targetKey: any, type: 'add' | 'remove') => {
          if (type == 'add') {
            const id = dataSource.length
            if (field?.value?.length) {
              field.push(null)
            } else {
              field.push(null, null)
            }
            activeKey.value = `tab-${id}`
          } else if (type == 'remove') {
            const index = targetKey.match(/-(\d+)/)?.[1]
            field.remove(Number(index))
            if (activeKey.value === targetKey) {
              activeKey.value = `tab-${index - 1}`
            }
          }
        }

        const addButton = h(
          Button,
          {
            class: [`${prefixCls}-addition`],
            attrs: {
              size: 'large',
              icon: 'el-icon-plus',
            },
            on: {
              click: (e: MouseEvent) => {
                e.stopPropagation()
                e.preventDefault()
                onEdit(null, 'add')
              },
            },
          },
          {}
        )

        const badgedTab = (index: number) => {
          const tab = `${field.title || 'Untitled'} ${index + 1}`
          const path = field.address.concat(index)
          const errors = field.form.queryFeedbacks({
            type: 'error',
            address: `*(${path},${path}.*)`,
          })
          if (errors.length) {
            return h(
              'span',
              { slot: 'label' },
              {
                default: () => [
                  h(
                    Badge,
                    {
                      class: [`${prefixCls}-errors-badge`],
                      props: {
                        value: errors.length,
                      },
                    },
                    {
                      default: () => [tab],
                    }
                  ),
                  index === dataSource.length - 1 ? addButton : null,
                ],
              }
            )
          }
          return h(
            'span',
            { slot: 'label' },
            {
              default: () => [
                tab,
                index === dataSource.length - 1 ? addButton : null,
              ],
            }
          )
        }

        const renderItems = () =>
          dataSource?.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index]
              : schema.items
            const key = `tab-${index}`

            return h(
              TabPane,
              {
                key,
                attrs: {
                  closable: index !== 0,
                  name: key,
                },
              },
              {
                default: () => [
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
                  badgedTab(index),
                ],
              }
            )
          })
        return h(
          Tabs,
          {
            class: [prefixCls],
            attrs: {
              ...attrs,
              type: 'card',
              value: activeKey.value,
              addable: true,
            },
            on: {
              input: (key) => {
                activeKey.value = key
              },
              'tab-remove': (target) => onEdit(target, 'remove'),
            },
          },
          {
            default: () => [renderItems()],
          }
        )
      }
    },
  })
)

export default ArrayTabs
