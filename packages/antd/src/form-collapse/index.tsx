import React, { Fragment, useMemo } from 'react'
import { Collapse, Badge } from 'antd'
import { makeAutoObservable } from 'mobx'
import { CollapseProps, CollapsePanelProps } from 'antd/lib/collapse'
import { useField, observer } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
import { toArr } from '@formily/shared'
interface IFormCollapse {
  activeKey: CollapseProps['activeKey']
  hasActiveKey(key: CollapseProps['activeKey']): boolean
  setActiveKey(key: CollapseProps['activeKey']): void
  addActiveKey(key: CollapseProps['activeKey']): void
  removeActiveKey(key: CollapseProps['activeKey']): void
  toggleActiveKey(key: CollapseProps['activeKey']): void
}

interface IFormCollapseProps extends CollapseProps {
  formCollapse?: IFormCollapse
}

type ComposedFormCollapse = React.FC<IFormCollapseProps> & {
  CollapsePanel?: React.FC<CollapsePanelProps>
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
        props: {
          key: schema?.['x-component-props']?.key || name,
          ...schema?.['x-component-props'],
        },
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
    activeKey: defaultActiveKey || [],
    setActiveKey(keys: CollapseProps['activeKey']) {
      formCollapse.activeKey = keys
    },
    hasActiveKey(key: string | number) {
      if (Array.isArray(formCollapse.activeKey)) {
        if (formCollapse.activeKey.includes(key)) {
          return true
        }
      } else if (formCollapse.activeKey == key) {
        return true
      }
      return false
    },
    addActiveKey(key: string | number) {
      if (formCollapse.hasActiveKey(key)) return
      formCollapse.activeKey = toArr(formCollapse.activeKey).concat(key)
    },
    removeActiveKey(key: string | number) {
      if (Array.isArray(formCollapse.activeKey)) {
        formCollapse.activeKey = formCollapse.activeKey.filter(
          (item) => item != key
        )
      } else {
        formCollapse.activeKey = ''
      }
    },
    toggleActiveKey(key: string | number) {
      if (formCollapse.hasActiveKey(key)) {
        formCollapse.removeActiveKey(key)
      } else {
        formCollapse.addActiveKey(key)
      }
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

export const FormCollapse: ComposedFormCollapse = observer(
  ({ formCollapse, ...props }) => {
    const field = useField()
    const panels = usePanels()
    const prefixCls = usePrefixCls('formily-collapse', props)
    const _formCollapse = useMemo(() => {
      return formCollapse ? formCollapse : createFormCollapse()
    }, [])
    const activeKey = props.activeKey || _formCollapse?.activeKey

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
  }
)

export const CollapsePanel: React.FC<CollapsePanelProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

FormCollapse.CollapsePanel = CollapsePanel
FormCollapse.useFormCollapse = useFormCollapse
FormCollapse.createFormCollapse = createFormCollapse

export default FormCollapse
