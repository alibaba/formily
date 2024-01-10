import React, { Fragment, useMemo } from 'react'
import { Tabs, Badge } from 'antd'
import { model, markRaw } from '@formily/reactive'
import { TabPaneProps, TabsProps } from 'antd/lib/tabs'
import {
  useField,
  ReactFC,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
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

interface IFeedbackBadgeProps {
  name: SchemaKey
  tab: React.ReactNode
}

type ComposedFormTab = React.FC<React.PropsWithChildren<IFormTabProps>> & {
  TabPane: React.FC<React.PropsWithChildren<IFormTabPaneProps>>
  createFormTab: (defaultActiveKey?: string) => IFormTab
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

const FeedbackBadge: ReactFC<IFeedbackBadgeProps> = observer((props) => {
  const field = useField()
  const errors = field.form.queryFeedbacks({
    type: 'error',
    address: `${field.address.concat(props.name)}.*`,
  })
  if (errors.length) {
    return (
      <Badge size="small" className="errors-badge" count={errors.length}>
        {props.tab}
      </Badge>
    )
  }
  return <Fragment>{props.tab}</Fragment>
})

const createFormTab = (defaultActiveKey?: string) => {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    },
  })
  return markRaw(formTab)
}

export const FormTab: ComposedFormTab = observer(
  ({ formTab, ...props }: IFormTabProps) => {
    const tabs = useTabs()
    const _formTab = useMemo(() => {
      return formTab ? formTab : createFormTab()
    }, [])
    const prefixCls = usePrefixCls('formily-tab', props)
    const activeKey = props.activeKey || _formTab?.activeKey

    return (
      <Tabs
        {...props}
        className={cls(prefixCls, props.className)}
        activeKey={activeKey}
        onChange={(key) => {
          props.onChange?.(key)
          _formTab?.setActiveKey?.(key)
        }}
      >
        {tabs.map(({ props, schema, name }, key) => (
          <Tabs.TabPane
            key={key}
            {...props}
            tab={<FeedbackBadge name={name} tab={props.tab} />}
            forceRender
          >
            <RecursionField schema={schema} name={name} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    )
  }
) as unknown as ComposedFormTab

const TabPane: React.FC<React.PropsWithChildren<IFormTabPaneProps>> = ({
  children,
}) => {
  return <Fragment>{children}</Fragment>
}

FormTab.TabPane = TabPane
FormTab.createFormTab = createFormTab

export default FormTab
