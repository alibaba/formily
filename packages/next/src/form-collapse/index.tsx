import React, { Fragment, useMemo } from 'react'
import { Collapse, Badge } from '@alifd/next'
import { makeAutoObservable } from 'mobx'
import { CollapseProps, PanelProps as CollapsePanelProps } from '@alifd/next/lib/collapse'
import { useField, observer } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
interface IFormCollapse {
  expandedKeys: CollapseProps['expandedKeys']
  setExpandedKeys(key: CollapseProps['expandedKeys']): void
}

interface IFormCollapseProps extends CollapseProps {
  formCollapse?: IFormCollapse
}

type ComposedFormCollapse = React.FC<IFormCollapseProps> & {
  CollapsePanel?: React.FC<CollapsePanelProps>
  useFormCollapse?: (
    defaultExpandedKeys?: CollapseProps['expandedKeys'],
    deps?: any[]
  ) => IFormCollapse
  createFormCollapse?: (
    defaultActiveKeys?: CollapseProps['expandedKeys']
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
  defaultExpandedKeys?: CollapseProps['expandedKeys']
) => {
  const formCollapse = makeAutoObservable({
    expandedKeys: defaultExpandedKeys,
    setExpandedKeys(keys: CollapseProps['expandedKeys']) {
      formCollapse.expandedKeys = keys
    },
  })
  return formCollapse
}

export const useFormCollapse = (
  defaultActiveKey?: CollapseProps['expandedKeys'],
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
  const expandedKeys = props.expandedKeys || formCollapse?.expandedKeys

  const badgedHeader = (key: SchemaKey, props: any) => {
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `${field.address.concat(key)}.*`,
    })
    if (errors.length) {
      return (
        <Badge className="errors-badge" count={errors.length}>
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
      expandedKeys={expandedKeys}
      onExpand={(keys) => {
        props?.onExpand?.(keys)
        formCollapse?.setExpandedKeys?.(keys)
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
