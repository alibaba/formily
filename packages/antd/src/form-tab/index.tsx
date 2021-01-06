import React, { Fragment, useMemo } from 'react'
import { Tabs, Badge } from 'antd'
import { makeAutoObservable } from 'mobx'
import { TabPaneProps, TabsProps } from 'antd/lib/tabs'
import { useField, observer } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
interface IFormTab {
  activeKey: string
  setActiveKey(key: string): void
}

interface IFormTabProps extends TabsProps {
  formTab?: IFormTab
}

interface IFormTabPaneProps extends TabPaneProps {
  key: string | number
}

type ComposedFormTab = React.FC<IFormTabProps> & {
  TabPane?: React.FC<IFormTabPaneProps>
  useFormTab?: (defaultActiveKey?: string, deps?: any[]) => IFormTab
  createFormTab?: (defaultActiveKey?: string) => IFormTab
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
        <Badge size="small" className="errors-badge" count={errors.length}>
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
    >
      {tabs.map(({ props, schema, name }) => (
        <Tabs.TabPane {...props} tab={badgedTab(name, props)} forceRender>
          <RecursionField schema={schema} name={name} />
        </Tabs.TabPane>
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
