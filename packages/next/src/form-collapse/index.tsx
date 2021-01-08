import React, { Fragment, useMemo } from 'react'
import { Collapse, Badge } from '@alifd/next'
import { makeAutoObservable } from 'mobx'
import {
  CollapseProps,
  PanelProps as CollapsePanelProps,
} from '@alifd/next/lib/collapse'
import { useField, observer } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Schema, SchemaKey } from '@formily/json-schema'
import { toArr } from '@formily/shared'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'

type ActiveKeys = string | number | Array<string | number>

type ActiveKey = string | number

interface IFormCollapse {
  activeKeys: ActiveKeys
  hasActiveKey(key: ActiveKey): boolean
  setActiveKeys(key: ActiveKeys): void
  addActiveKey(key: ActiveKey): void
  removeActiveKey(key: ActiveKey): void
  toggleActiveKey(key: ActiveKey): void
}

interface IFormCollapseProps extends CollapseProps {
  formCollapse?: IFormCollapse
}

type ComposedFormCollapse = React.FC<IFormCollapseProps> & {
  CollapsePanel?: React.FC<CollapsePanelProps>
  useFormCollapse?: (
    defaultActiveKeys?: CollapseProps['expandedKeys'],
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
        props: {
          ...schema?.['x-component-props'],
          title: schema?.['x-component-props']?.title || schema?.title,
          key: schema?.['x-component-props']?.key || name,
        },
        schema,
      })
    }
  })
  return panels
}

export const createFormCollapse = (defaultActiveKeys?: ActiveKeys) => {
  const formCollapse = makeAutoObservable({
    activeKeys: defaultActiveKeys || [],
    setActiveKeys(keys: ActiveKeys) {
      formCollapse.activeKeys = keys
    },
    hasActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        if (formCollapse.activeKeys.includes(key)) {
          return true
        }
      } else if (formCollapse.activeKeys == key) {
        return true
      }
      return false
    },
    addActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) return
      formCollapse.activeKeys = toArr(formCollapse.activeKeys).concat(key)
    },
    removeActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        formCollapse.activeKeys = formCollapse.activeKeys.filter(
          (item) => item != key
        )
      } else {
        formCollapse.activeKeys = []
      }
    },
    toggleActiveKey(key: ActiveKey) {
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
  defaultActiveKey?: CollapseProps['expandedKeys'],
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
    const expandedKeys = props.expandedKeys || _formCollapse?.activeKeys

    const badgedHeader = (key: SchemaKey, props: any) => {
      const errors = field.form.queryFeedbacks({
        type: 'error',
        address: `${field.address.concat(key)}.*`,
      })
      if (errors.length) {
        return (
          <Badge className="errors-badge" count={errors.length}>
            {props.title}
          </Badge>
        )
      }
      return props.title
    }
    return (
      <Collapse
        {...props}
        className={cls(prefixCls, props.className)}
        expandedKeys={expandedKeys as any}
        onExpand={(keys) => {
          props?.onExpand?.(keys)
          formCollapse?.setActiveKeys?.(keys)
        }}
      >
        {panels.map(({ props, schema, name }) => (
          <Collapse.Panel {...props} title={badgedHeader(name, props)}>
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
