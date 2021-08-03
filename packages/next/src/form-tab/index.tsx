import React, { Fragment, useMemo } from 'react'
import { Tab as Tabs, Badge } from '@alifd/next'
import { model } from '@formily/reactive'
import { isValid } from '@formily/shared'
import {
  ItemProps as TabPaneProps,
  TabProps as TabsProps,
} from '@alifd/next/lib/tab'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
export interface IFormTab {
  activeKey: React.ReactText
  setActiveKey(key: React.ReactText): void
}

export interface IFormTabProps extends TabsProps {
  formTab?: IFormTab
}

export interface IFormTabPaneProps extends TabPaneProps {
  key: React.ReactText
}

type ComposedFormTab = React.FC<IFormTabProps> & {
  TabPane?: React.FC<IFormTabPaneProps>
  createFormTab?: (defaultActiveKey?: React.ReactText) => IFormTab
}

const useTabs = () => {
  const tabsField = useField()
  const schema = useFieldSchema()
  const tabs: { name: SchemaKey; props: any; schema: Schema }[] = []
  schema.mapProperties((schema, name) => {
    const field = tabsField.query(tabsField.address.concat(name)).take()
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

const createFormTab = (defaultActiveKey?: string) => {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    },
  })
  return formTab
}

export const FormTab: ComposedFormTab = observer(({ formTab, ...props }) => {
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
      {...(isValid(activeKey) && { activeKey })}
      className={cls(prefixCls, props.className)}
      onChange={(key) => {
        props.onChange?.(key)
        formTab?.setActiveKey?.(key)
      }}
      lazyLoad={false}
    >
      {tabs.map(({ props, schema, name }, key) => (
        <Tabs.Item key={key} {...props} tab={badgedTab(name, props)}>
          <RecursionField schema={schema} name={name} />
        </Tabs.Item>
      ))}
    </Tabs>
  )
})

const TabPane: React.FC<IFormTabPaneProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

FormTab.TabPane = TabPane
FormTab.createFormTab = createFormTab

export default FormTab
