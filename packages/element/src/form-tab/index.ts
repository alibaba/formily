import { defineComponent, reactive, computed } from '@vue/composition-api'
import { observer } from '@formily/reactive-vue'
import { model } from '@formily/reactive'
import {
  h,
  useField,
  useFieldSchema,
  RecursionField,
  Fragment,
} from '@formily/vue'
import { Schema, SchemaKey } from '@formily/json-schema'
import { Tabs, TabPane, Badge } from 'element-ui'
import { stylePrefix } from '../__builtins__/configs'

import type { TabPane as TabPaneProps, Tabs as TabsProps } from 'element-ui'

export interface IFormTab {
  activeKey: string
  setActiveKey(key: string): void
}

export interface IFormTabProps extends TabsProps {
  formTab?: IFormTab
}

export interface IFormTabPaneProps extends TabPaneProps {
  key: string | number
}

export const useTabs = () => {
  const tabsField = useField().value
  const schema = useFieldSchema().value
  const tabs: { name: SchemaKey; props: any; schema: Schema }[] = reactive([])
  schema.mapProperties((schema, name) => {
    const field = tabsField.query(tabsField.address.concat(name)).take()
    if (field?.display === 'none' || field?.display === 'hidden') return
    if (schema['x-component']?.indexOf('TabPane') > -1) {
      tabs.push({
        name,
        props: {
          name: schema?.['x-component-props']?.name || name,
          ...schema?.['x-component-props'],
        },
        schema,
      })
    }
  })
  return tabs
}

export const createFormTab = (defaultActiveKey?: string) => {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    },
  })
  return formTab
}

export const FormTab = observer(
  defineComponent<IFormTabProps>({
    name: 'FormTab',
    props: ['formTab'],
    setup(props, { attrs, listeners }) {
      const field = useField().value
      const formTabRef = computed(() => props.formTab ?? createFormTab())

      const prefixCls = `${stylePrefix}-form-tab`

      return () => {
        const formTab = formTabRef.value
        const tabs = useTabs()
        const activeKey = props.value || formTab?.activeKey || tabs?.[0]?.name
        const badgedTab = (key: SchemaKey, props: any) => {
          const errors = field.form.queryFeedbacks({
            type: 'error',
            address: `${field.address.concat(key)}.*`,
          })
          if (errors.length) {
            return () =>
              h(
                Badge,
                {
                  class: [`${prefixCls}-errors-badge`],
                  props: {
                    value: errors.length,
                  },
                },
                { default: () => props.label }
              )
          }
          return () => props.label
        }

        const getTabs = (tabs) => {
          return tabs.map(({ props, schema, name }, key) => {
            return h(
              TabPane,
              {
                key,
                props,
              },
              {
                default: () => [
                  h(
                    RecursionField,
                    {
                      props: {
                        schema,
                        name,
                      },
                    },
                    {}
                  ),
                  h(
                    'div',
                    { slot: 'label' },
                    { default: badgedTab(name, props) }
                  ),
                ],
              }
            )
          })
        }

        return h(
          Tabs,
          {
            class: [prefixCls],
            style: attrs.style,
            props: {
              ...attrs,
              value: activeKey,
            },
            on: {
              ...listeners,
              input: (key) => {
                listeners.input?.(key)
                formTab.setActiveKey?.(key)
              },
            },
          },
          {
            default: () => getTabs(tabs),
          }
        )
      }
    },
  })
)

export const FormTabPane = defineComponent<IFormTabPaneProps>({
  name: 'FormTabPane',
  setup(_props, { slots }) {
    return () => h(Fragment, {}, slots)
  },
})
