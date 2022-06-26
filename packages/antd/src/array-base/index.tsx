import React, { createContext, useContext } from 'react'
import { Button } from 'antd'
import {
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
  PlusOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { ButtonProps } from 'antd/lib/button'
import { ArrayField } from '@formily/core'
import {
  useField,
  useFieldSchema,
  Schema,
  JSXComponent,
  RecordScope,
  RecordsScope,
} from '@formily/react'
import { isValid, clone } from '@formily/shared'
import { SortableHandle } from 'react-sortable-hoc'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
}

export interface IArrayBaseContext {
  props: IArrayBaseProps
  field: ArrayField
  schema: Schema
}

export interface IArrayBaseItemProps {
  index: number
  record: any
}

export type ArrayBaseMixins = {
  Addition?: React.FC<React.PropsWithChildren<IArrayBaseAdditionProps>>
  Remove?: React.FC<React.PropsWithChildren<AntdIconProps & { index?: number }>>
  MoveUp?: React.FC<React.PropsWithChildren<AntdIconProps & { index?: number }>>
  MoveDown?: React.FC<
    React.PropsWithChildren<AntdIconProps & { index?: number }>
  >
  SortHandle?: React.FC<
    React.PropsWithChildren<AntdIconProps & { index?: number }>
  >
  Index?: React.FC
  useArray?: () => IArrayBaseContext
  useIndex?: (index?: number) => number
  useRecord?: (record?: number) => any
}

export interface IArrayBaseProps {
  disabled?: boolean
  onAdd?: (index: number) => void
  onRemove?: (index: number) => void
  onMoveDown?: (index: number) => void
  onMoveUp?: (index: number) => void
}

type ComposedArrayBase = React.FC<React.PropsWithChildren<IArrayBaseProps>> &
  ArrayBaseMixins & {
    Item?: React.FC<React.PropsWithChildren<IArrayBaseItemProps>>
    mixin?: <T extends JSXComponent>(target: T) => T & ArrayBaseMixins
  }

const ArrayBaseContext = createContext<IArrayBaseContext>(null)

const ItemContext = createContext<IArrayBaseItemProps>(null)

const takeRecord = (val: any) => (typeof val === 'function' ? val() : val)

const useArray = () => {
  return useContext(ArrayBaseContext)
}

const useIndex = (index?: number) => {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.index : index
}

const useRecord = (record?: number) => {
  const ctx = useContext(ItemContext)
  return takeRecord(ctx ? ctx.record : record)
}

const getSchemaDefaultValue = (schema: Schema) => {
  if (schema?.type === 'array') return []
  if (schema?.type === 'object') return {}
  if (schema?.type === 'void') {
    for (let key in schema.properties) {
      const value = getSchemaDefaultValue(schema.properties[key])
      if (isValid(value)) return value
    }
  }
}

const getDefaultValue = (defaultValue: any, schema: Schema) => {
  if (isValid(defaultValue)) return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getSchemaDefaultValue(schema.items[0])
  return getSchemaDefaultValue(schema.items)
}

export const ArrayBase: ComposedArrayBase = (props) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  return (
    <RecordsScope getRecords={() => field.value}>
      <ArrayBaseContext.Provider value={{ field, schema, props }}>
        {props.children}
      </ArrayBaseContext.Provider>
    </RecordsScope>
  )
}

ArrayBase.Item = ({ children, ...props }) => {
  return (
    <ItemContext.Provider value={props}>
      <RecordScope
        getIndex={() => props.index}
        getRecord={() => takeRecord(props.record)}
      >
        {children}
      </RecordScope>
    </ItemContext.Provider>
  )
}

const SortHandle = SortableHandle((props: any) => {
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <MenuOutlined
      {...props}
      className={cls(`${prefixCls}-sort-handle`, props.className)}
      style={{ ...props.style }}
    />
  )
}) as any

ArrayBase.SortHandle = (props) => {
  const array = useArray()
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return <SortHandle {...props} />
}

ArrayBase.Index = (props) => {
  const index = useIndex()
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <span {...props} className={`${prefixCls}-index`}>
      #{index + 1}.
    </span>
  )
}

ArrayBase.Addition = (props) => {
  const self = useField()
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (
    array.field?.pattern !== 'editable' &&
    array.field?.pattern !== 'disabled'
  )
    return null
  return (
    <Button
      type="dashed"
      block
      {...props}
      disabled={self?.disabled}
      className={cls(`${prefixCls}-addition`, props.className)}
      onClick={(e) => {
        if (array.props?.disabled) return
        const defaultValue = getDefaultValue(props.defaultValue, array.schema)
        if (props.method === 'unshift') {
          array.field?.unshift?.(defaultValue)
          array.props?.onAdd?.(0)
        } else {
          array.field?.push?.(defaultValue)
          array.props?.onAdd?.(array?.field?.value?.length - 1)
        }
        if (props.onClick) {
          props.onClick(e)
        }
      }}
      icon={<PlusOutlined />}
    >
      {props.title || self.title}
    </Button>
  )
}

ArrayBase.Remove = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const self = useField()
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <DeleteOutlined
      {...props}
      className={cls(
        `${prefixCls}-remove`,
        self?.disabled ? `${prefixCls}-remove-disabled` : '',
        props.className
      )}
      ref={ref}
      onClick={(e) => {
        if (self?.disabled) return
        e.stopPropagation()
        array.field?.remove?.(index)
        array.props?.onRemove?.(index)
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    />
  )
})

ArrayBase.MoveDown = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const self = useField()
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <DownOutlined
      {...props}
      className={cls(
        `${prefixCls}-move-down`,
        self?.disabled ? `${prefixCls}-move-down-disabled` : '',
        props.className
      )}
      ref={ref}
      onClick={(e) => {
        if (self?.disabled) return
        e.stopPropagation()
        array.field?.moveDown?.(index)
        array.props?.onMoveDown?.(index)
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    />
  )
})

ArrayBase.MoveUp = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const self = useField()
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <UpOutlined
      {...props}
      className={cls(
        `${prefixCls}-move-up`,
        self?.disabled ? `${prefixCls}-move-up-disabled` : '',
        props.className
      )}
      ref={ref}
      onClick={(e) => {
        if (self?.disabled) return
        e.stopPropagation()
        array?.field?.moveUp(index)
        array?.props?.onMoveUp?.(index)
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    />
  )
})

ArrayBase.useArray = useArray
ArrayBase.useIndex = useIndex
ArrayBase.useRecord = useRecord
ArrayBase.mixin = (target: any) => {
  target.Index = ArrayBase.Index
  target.SortHandle = ArrayBase.SortHandle
  target.Addition = ArrayBase.Addition
  target.Remove = ArrayBase.Remove
  target.MoveDown = ArrayBase.MoveDown
  target.MoveUp = ArrayBase.MoveUp
  target.useArray = ArrayBase.useArray
  target.useIndex = ArrayBase.useIndex
  target.useRecord = ArrayBase.useRecord
  return target
}

export default ArrayBase
