import React, { Fragment, useMemo } from 'react'
import { Collapse, Badge } from 'antd'
import { makeAutoObservable } from 'mobx'
import { CollapseProps, CollapsePanelProps } from 'antd/lib/collapse'
import { useField, observer } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Schema } from '@formily/json-schema'
import { isArr } from '@formily/shared/lib'
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

export const parsePanels = (schema: Schema) => {
  const panels: { name: string; props: any; schema: Schema }[] = []
  schema.mapProperties((schema, name) => {
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
  const schema = useSchema()
  const field = useField()
  const panels = parsePanels(schema)
  const formCollapse = useMemo(() => {
    return props.formCollapse ? props.formCollapse : createFormCollapse()
  }, [])
  const activeKey = props.activeKey || formCollapse?.activeKey

  const badgedTab = (key: string, props: any) => {
    if (!activeKey) return props.header
    if (isArr(activeKey) && activeKey.includes(props?.key)) {
      return props.header
    } else if (activeKey === props?.key) return props.header
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
      activeKey={activeKey}
      onChange={(key) => {
        props?.onChange?.(key)
        formCollapse?.setActiveKey?.(key)
      }}
    >
      {panels.map(({ props, schema, name }) => (
        <Collapse.Panel {...props} header={badgedTab(name, props)} forceRender>
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
