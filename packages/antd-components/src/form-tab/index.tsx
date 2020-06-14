import React, { Fragment, useEffect } from 'react'
import {
  createControllerBox,
  ISchemaVirtualFieldComponentProps,
  createEffectHook,
  useFormEffects,
  useFieldState,
  FormEffectHooks,
  SchemaField,
  FormPath,
  IVirtualBoxProps
} from '@formily/react-schema-renderer'
import { Tabs, Badge } from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'
import { IFormTab } from '../types'
import { createMatchUpdate } from '../shared'

enum StateMap {
  ON_FORM_TAB_ACTIVE_KEY_CHANGE = 'onFormTabActiveKeyChange'
}

const { onFormChange$ } = FormEffectHooks

const EffectHooks = {
  onTabActiveKeyChange$: createEffectHook<{
    name?: string
    path?: string
    value?: any
  }>(StateMap.ON_FORM_TAB_ACTIVE_KEY_CHANGE)
}

const parseTabItems = (items: any, hiddenKeys?: string[]) => {
  return items.reduce((buf: any, { schema, key }) => {
    if (Array.isArray(hiddenKeys)) {
      if (hiddenKeys.includes(key)) {
        return buf
      }
    }
    if (schema.getExtendsComponent() === 'tabpane') {
      return buf.concat({
        props: schema.getExtendsComponentProps(),
        schema,
        key
      })
    }
    return buf
  }, [])
}

const parseDefaultActiveKey = (props: any, items: any) => {
  const { defaultActiveKey } = props
  return defaultActiveKey ? defaultActiveKey : items[0] && items[0].key
}

const parseChildrenErrors = (errors: any, target: string) => {
  return errors.filter(({ path }) => {
    return FormPath.parse(path).includes(target)
  })
}

const addErrorBadge = (
  tab: React.ReactNode,
  currentPath: FormPath,
  childrenErrors: any[]
) => {
  const currentErrors = childrenErrors.filter(({ path }) => {
    return FormPath.parse(path).includes(currentPath)
  })
  if (currentErrors.length > 0) {
    return (
      <Badge offset={[12, 0]} count={currentErrors.length}>
        {tab}
      </Badge>
    )
  }
  return tab
}

type ExtendsProps = StateMap &
  typeof EffectHooks & {
    TabPane: React.FC<IVirtualBoxProps<TabPaneProps>>
  }

type ExtendsState = {
  activeKey?: string
  childrenErrors?: any
}

export const FormTab: React.FC<IVirtualBoxProps<IFormTab>> &
  ExtendsProps = createControllerBox<IFormTab>(
  'tab',
  ({ form, schema, name, path }: ISchemaVirtualFieldComponentProps) => {
    const orderProperties = schema.getOrderProperties()
    let { hiddenKeys, ...componentProps } = schema.getExtendsComponentProps()
    hiddenKeys = hiddenKeys || []
    const [{ activeKey, childrenErrors }, setFieldState] = useFieldState<
      ExtendsState
    >({
      activeKey: parseDefaultActiveKey(schema, orderProperties),
      childrenErrors: []
    })
    const items = parseTabItems(orderProperties, hiddenKeys)
    const update = (cur: string) => {
      form.notify(StateMap.ON_FORM_TAB_ACTIVE_KEY_CHANGE, {
        name,
        path,
        value: cur
      })
    }
    const matchUpdate = createMatchUpdate(name, path)
    useEffect(() => {
      if (Array.isArray(hiddenKeys)) {
        setFieldState({
          activeKey: hiddenKeys.includes(activeKey)
            ? items[0] && items[0].key
            : activeKey
        })
      }
    }, [hiddenKeys.length])
    useFormEffects(({ hasChanged }) => {
      onFormChange$().subscribe(formState => {
        const errorsChanged = hasChanged(formState, 'errors')
        if (errorsChanged) {
          setFieldState({
            childrenErrors: parseChildrenErrors(formState.errors, path)
          })
        }
      })
      EffectHooks.onTabActiveKeyChange$().subscribe(
        ({ value, name, path }: any = {}) => {
          matchUpdate(name, path, () => {
            setFieldState({
              activeKey: value
            })
          })
        }
      )
    })
    return (
      <Tabs {...componentProps} activeKey={activeKey} onChange={update}>
        {items.map(({ props, schema, key }) => {
          const currentPath = FormPath.parse(path).concat(key)
          return (
            <Tabs.TabPane
              {...props}
              tab={
                activeKey === key
                  ? props.tab
                  : addErrorBadge(props.tab, currentPath, childrenErrors)
              }
              key={key}
              forceRender
            >
              <SchemaField
                path={currentPath}
                schema={schema}
                onlyRenderProperties
              />
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    )
  }
) as any

FormTab.TabPane = createControllerBox<TabPaneProps>(
  'tabpane',
  ({ children }) => {
    return <Fragment>{children}</Fragment>
  }
)

Object.assign(FormTab, StateMap, EffectHooks)

export default FormTab
