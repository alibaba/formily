import React, { Fragment, useMemo } from 'react'
import { Tabs, Badge } from 'antd'
import { makeAutoObservable } from 'mobx'
import { TabPaneProps, TabsProps } from 'antd/lib/tabs'
import { useField } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Schema } from '@formily/json-schema'

interface IFormTab {
  activeKey: string
  setActiveKey(key: string): void
}

interface IFormTabProps extends TabsProps {
  formTab?: IFormTab
}

type ComposedFormTab = React.FC<IFormTabProps> & {
  TabPane?: React.FC<TabPaneProps>
  useFormTab?: (defaultActiveKey?: string, deps?: any[]) => IFormTab
  createFormTab?: (defaultActiveKey?: string) => IFormTab
}

export const parseTabs = (schema: Schema) => {
  const tabs: { name: string; props: any; schema: Schema }[] = []
  schema.mapProperties((schema, name) => {
    if (schema['x-component']?.indexOf('TabPane') > -1) {
      tabs.push({
        name,
        props: schema['x-component-props'],
        schema
      })
    }
  })
  return tabs
}

export const createFormTab = (defaultActiveKey?: string) => {
  const formTab = makeAutoObservable({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    }
  })
  return formTab
}

export const useFormTab = (defaultActiveKey?: string, deps = []) => {
  return useMemo(() => {
    return createFormTab(defaultActiveKey)
  }, deps)
}

export const FormTab: ComposedFormTab = ({ formTab, ...props }) => {
  const schema = useSchema()
  const field = useField()
  const tabs = parseTabs(schema)
  const activeKey = props.activeKey || formTab?.activeKey

  const badgedTab = (key: string, props: any) => {
    if (activeKey === props?.key) return props.tab
    const errors = field.form.feedback.queryMessages({
      path: `${field.path.concat(key)}.*`
    })
    if (errors.length) {
      return (
        <Badge offset={[12, 0]} count={errors.length}>
          {props.tab}
        </Badge>
      )
    }
    return props.tab
  }

  return (
    <Tabs
      {...props}
      activeKey={activeKey}
      onChange={key => {
        props.onChange?.(key)
        formTab?.setActiveKey?.(key)
      }}
    >
      {tabs.map(({ props, schema, name }, key) => (
        <Tabs.TabPane
          {...props}
          key={key}
          tab={badgedTab(name, props)}
          forceRender
        >
          <RecursionField schema={schema} name={name} />
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export const TabPane: React.FC<TabPaneProps> = () => {
  return <Fragment />
}

FormTab.TabPane = TabPane
FormTab.useFormTab = useFormTab
FormTab.createFormTab = createFormTab

export default FormTab
