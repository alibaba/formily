import React, { Fragment, useMemo } from 'react'
import { Collapse, Badge } from 'antd'
import { makeAutoObservable } from 'mobx'
import { CollapseProps, CollapsePanelProps } from 'antd/lib/collapse'
import { useField, observer } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
interface IFormCollapse {
  activeKey: CollapseProps['activeKey']
  setActiveKey(key: CollapseProps['activeKey']): void
}

interface IFormCollapseProps extends CollapseProps {
  formCollapse?: IFormCollapse
}

type ComposedFormCollapse = React.FC<IFormCollapseProps> & {
  CollapsePanel?: React.FC<IFormCollapseProps>
  useFormCollapse?: (
    defaultActiveKeys?: CollapseProps['activeKey'],
    deps?: any[]
  ) => IFormCollapse
  createFormCollapse?: (
    defaultActiveKeys?: CollapseProps['activeKey']
  ) => IFormCollapse
}

export const usePanels = () => {
  const collapseField = useField()
  const schema = useSchema()
  const panels: { name: SchemaKey; props: any; schema: Schema }[] = []
  schema.mapProperties((schema, name) => {
    const field = collapseField
      .query(collapseField.address.concat(name))
      .void.get()
    if (field?.display === 'none' || field?.display === 'hidden') return
    if (schema['x-component']?.indexOf('CollapsePanel') > -1) {
      panels.push({
        name,
        props: schema['x-component-props'],
        schema,
      })
    }
  })
  return panels
}

export const createFormCollapse = (
  defaultActiveKey?: CollapseProps['activeKey']
) => {
  const formCollapse = makeAutoObservable({
    activeKey: defaultActiveKey,
    setActiveKey(keys: CollapseProps['activeKey']) {
      formCollapse.activeKey = keys
    },
  })
  return formCollapse
}

export const useFormCollapse = (
  defaultActiveKey?: CollapseProps['activeKey'],
  deps = []
) => {
  return useMemo(() => {
    return createFormCollapse(defaultActiveKey)
  }, deps)
}

export const FormCollapse: ComposedFormCollapse = observer((props) => {
  const field = useField()
  const panels = usePanels()
  const prefixCls = usePrefixCls('formily-collapse', props)
  const formCollapse = useMemo(() => {
    return props.formCollapse ? props.formCollapse : createFormCollapse()
  }, [])
  const activeKey = props.activeKey || formCollapse?.activeKey

  const badgedHeader = (key: SchemaKey, props: any) => {
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `${field.address.concat(key)}.*`,
    })
    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {props.header}
        </Badge>
      )
    }
    return props.header
  }
  return (
    <Collapse
      {...props}
      className={cls(prefixCls, props.className)}
      activeKey={activeKey}
      onChange={(key) => {
        props?.onChange?.(key)
        formCollapse?.setActiveKey?.(key)
      }}
    >
      {panels.map(({ props, schema, name }) => (
        <Collapse.Panel
          {...props}
          header={badgedHeader(name, props)}
          forceRender
        >
          <RecursionField schema={schema} name={name} />
        </Collapse.Panel>
      ))}
    </Collapse>
  )
})

export const CollapsePanel: React.FC<CollapsePanelProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

FormCollapse.CollapsePanel = CollapsePanel
FormCollapse.useFormCollapse = useFormCollapse
FormCollapse.createFormCollapse = createFormCollapse

export default FormCollapse
