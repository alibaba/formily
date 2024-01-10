import {
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  MenuOutlined,
  PlusOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { ArrayField } from '@formily/core'
import { JSXComponent, Schema, useField, useFieldSchema } from '@formily/react'
import { clone, isUndef, isValid } from '@formily/shared'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import cls from 'classnames'
import React, { createContext, useContext } from 'react'
import { SortableHandle, usePrefixCls } from '../__builtins__'

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
}
export interface IArrayBaseOperationProps extends ButtonProps {
  title?: string
  index?: number
  ref?: React.Ref<HTMLElement>
}

export interface IArrayBaseContext {
  props: IArrayBaseProps
  field: ArrayField
  schema: Schema
}

export interface IArrayBaseItemProps {
  index: number
  record: ((index: number) => Record<string, any>) | Record<string, any>
}

export type ArrayBaseMixins = {
  Addition?: React.FC<React.PropsWithChildren<IArrayBaseAdditionProps>>
  Copy?: React.FC<
    React.PropsWithChildren<IArrayBaseOperationProps & { index?: number }>
  >
  Remove?: React.FC<
    React.PropsWithChildren<IArrayBaseOperationProps & { index?: number }>
  >
  MoveUp?: React.FC<
    React.PropsWithChildren<IArrayBaseOperationProps & { index?: number }>
  >
  MoveDown?: React.FC<
    React.PropsWithChildren<IArrayBaseOperationProps & { index?: number }>
  >
  SortHandle?: React.FC<
    React.PropsWithChildren<IArrayBaseOperationProps & { index?: number }>
  >
  Index?: React.FC
  useArray?: () => IArrayBaseContext
  useIndex?: (index?: number) => number
  useRecord?: (record?: number) => any
}

export interface IArrayBaseProps {
  disabled?: boolean
  onAdd?: (index: number) => void
  onCopy?: (index: number) => void
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

const takeRecord = (val: any, index?: number) =>
  typeof val === 'function' ? val(index) : val

const useArray = () => {
  return useContext(ArrayBaseContext)
}

const useIndex = (index?: number) => {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.index : index
}

const useRecord = (record?: number) => {
  const ctx = useContext(ItemContext)
  return takeRecord(ctx ? ctx.record : record, ctx?.index)
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
    return getSchemaDefaultValue(schema?.items[0])
  return getSchemaDefaultValue(schema?.items)
}

export const ArrayBase: ComposedArrayBase = (props) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  return (
    <ArrayBaseContext.Provider value={{ field, schema, props }}>
      {props.children}
    </ArrayBaseContext.Provider>
  )
}

ArrayBase.Item = ({ children, ...props }) => {
  return <ItemContext.Provider value={props}>{children}</ItemContext.Provider>
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
        if (props.onClick) {
          props.onClick(e)
          if (e.defaultPrevented) return
        }
        const defaultValue = getDefaultValue(props.defaultValue, array.schema)
        if (props.method === 'unshift') {
          array.field?.unshift?.(defaultValue)
          array.props?.onAdd?.(0)
        } else {
          array.field?.push?.(defaultValue)
          array.props?.onAdd?.(array?.field?.value?.length - 1)
        }
      }}
      icon={isUndef(props.icon) ? <PlusOutlined /> : props.icon}
    >
      {props.title || self.title}
    </Button>
  )
}

ArrayBase.Copy = React.forwardRef((props, ref) => {
  const self = useField()
  const array = useArray()
  const index = useIndex(props.index)
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <Button
      type="text"
      {...props}
      disabled={self?.disabled}
      className={cls(
        `${prefixCls}-copy`,
        self?.disabled ? `${prefixCls}-copy-disabled` : '',
        props.className
      )}
      ref={ref}
      onClick={(e) => {
        if (self?.disabled) return
        e.stopPropagation()
        if (array.props?.disabled) return
        if (props.onClick) {
          props.onClick(e)
          if (e.defaultPrevented) return
        }
        const value = clone(array?.field?.value[index])
        const distIndex = index + 1
        array.field?.insert?.(distIndex, value)
        array.props?.onCopy?.(distIndex)
      }}
      icon={isUndef(props.icon) ? <CopyOutlined /> : props.icon}
    >
      {props.title || self.title}
    </Button>
  )
})

ArrayBase.Remove = React.forwardRef((props, ref) => {
  const index = useIndex(props.index)
  const self = useField()
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <Button
      type="text"
      {...props}
      disabled={self?.disabled}
      className={cls(
        `${prefixCls}-remove`,
        self?.disabled ? `${prefixCls}-remove-disabled` : '',
        props.className
      )}
      ref={ref}
      onClick={(e) => {
        if (self?.disabled) return
        e.stopPropagation()
        if (props.onClick) {
          props.onClick(e)
          if (e.defaultPrevented) return
        }
        array.field?.remove?.(index)
        array.props?.onRemove?.(index)
      }}
      icon={isUndef(props.icon) ? <DeleteOutlined /> : props.icon}
    >
      {props.title || self.title}
    </Button>
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
    <Button
      type="text"
      {...props}
      disabled={self?.disabled}
      className={cls(
        `${prefixCls}-move-down`,
        self?.disabled ? `${prefixCls}-move-down-disabled` : '',
        props.className
      )}
      ref={ref}
      onClick={(e) => {
        if (self?.disabled) return
        e.stopPropagation()
        if (props.onClick) {
          props.onClick(e)
          if (e.defaultPrevented) return
        }
        array.field?.moveDown?.(index)
        array.props?.onMoveDown?.(index)
      }}
      icon={isUndef(props.icon) ? <DownOutlined /> : props.icon}
    >
      {props.title || self.title}
    </Button>
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
    <Button
      type="text"
      {...props}
      disabled={self?.disabled}
      className={cls(
        `${prefixCls}-move-up`,
        self?.disabled ? `${prefixCls}-move-up-disabled` : '',
        props.className
      )}
      ref={ref}
      onClick={(e) => {
        if (self?.disabled) return
        e.stopPropagation()
        if (props.onClick) {
          props.onClick(e)
          if (e.defaultPrevented) return
        }
        array?.field?.moveUp(index)
        array?.props?.onMoveUp?.(index)
      }}
      icon={isUndef(props.icon) ? <UpOutlined /> : props.icon}
    >
      {props.title || self.title}
    </Button>
  )
})

ArrayBase.useArray = useArray
ArrayBase.useIndex = useIndex
ArrayBase.useRecord = useRecord
ArrayBase.mixin = (target: any) => {
  target.Index = ArrayBase.Index
  target.SortHandle = ArrayBase.SortHandle
  target.Addition = ArrayBase.Addition
  target.Copy = ArrayBase.Copy
  target.Remove = ArrayBase.Remove
  target.MoveDown = ArrayBase.MoveDown
  target.MoveUp = ArrayBase.MoveUp
  target.useArray = ArrayBase.useArray
  target.useIndex = ArrayBase.useIndex
  target.useRecord = ArrayBase.useRecord
  return target
}

export default ArrayBase
