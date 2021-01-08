import React, { Fragment, useMemo } from 'react'
import { Tab as Tabs, Badge } from '@alifd/next'
import { makeAutoObservable } from 'mobx'
import {
  ItemProps as TabPaneProps,
  TabProps as TabsProps,
} from '@alifd/next/lib/tab'
import { useField, observer } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
interface IFormTab {
  activeKey: React.ReactText
  setActiveKey(key: React.ReactText): void
}

interface IFormTabProps extends TabsProps {
  formTab?: IFormTab
}

interface IFormTabPaneProps extends TabPaneProps {
  key: React.ReactText
}

type ComposedFormTab = React.FC<IFormTabProps> & {
  TabPane?: React.FC<IFormTabPaneProps>
  useFormTab?: (defaultActiveKey?: React.ReactText, deps?: any[]) => IFormTab
  createFormTab?: (defaultActiveKey?: React.ReactText) => IFormTab
}

export const useTabs = () => {
  const tabsField = useField()
  const schema = useSchema()
  const tabs: { name: SchemaKey; props: any; schema: Schema }[] = []
  schema.mapProperties((schema, name) => {
    const field = tabsField.query(tabsField.address.concat(name)).void.get()
    if (field?.display === 'none' || field?.display === 'hidden') return
    if (schema['x-component']?.indexOf('TabPane') > -1) {
      tabs.push({
        name,
        props: {
          key: schema?.['x-component-props']?.key || name,
          ...schema?.['x-component-props'],
        },
        schema,
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
    },
  })
  return formTab
}

export const useFormTab = (defaultActiveKey?: string, deps = []) => {
  return useMemo(() => {
    return createFormTab(defaultActiveKey)
  }, deps)
}

export const FormTab: ComposedFormTab = observer(({formTab,...props}) => {
  const field = useField()
  const tabs = useTabs()
  const _formTab = useMemo(() => {
    return formTab ? formTab : createFormTab()
  }, [])
  const prefixCls = usePrefixCls('formily-tab', props)
  const activeKey = props.activeKey || _formTab?.activeKey

  const badgedTab = (key: SchemaKey, props: any) => {
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `${field.address.concat(key)}.*`,
    })
    if (errors.length) {
      return (
        <Badge className="errors-badge" count={errors.length}>
          {props.tab}
        </Badge>
      )
    }
    return props.tab
  }

  return (
    <Tabs
      {...props}
      className={cls(prefixCls, props.className)}
      activeKey={activeKey}
      onChange={(key) => {
        props.onChange?.(key)
        formTab?.setActiveKey?.(key)
      }}
      lazyLoad={false}
    >
      {tabs.map(({ props, schema, name }) => (
        <Tabs.Item {...props} tab={badgedTab(name, props)}>
          <RecursionField schema={schema} name={name} />
        </Tabs.Item>
      ))}
    </Tabs>
  )
})

export const TabPane: React.FC<IFormTabPaneProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

FormTab.TabPane = TabPane
FormTab.useFormTab = useFormTab
FormTab.createFormTab = createFormTab

export default FormTab
