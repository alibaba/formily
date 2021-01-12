import React, { createContext, useContext } from 'react'
import { Button } from '@alifd/next'
import {
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
  PlusOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { ButtonProps } from '@alifd/next/lib/button'
import { useField } from '@formily/react'
import { useSchema } from '@formily/react-schema-field'
import { Schema } from 'packages/json-schema'
import { SortableHandle } from 'react-sortable-hoc'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'

interface IAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
}

interface IContext {
  field: Formily.Core.Models.ArrayField
  schema: Schema
}

interface IItemProps {
  index: number
}

export type ArrayBaseMixins = {
  Addition?: React.FC<IAdditionProps>
  Remove?: React.FC<AntdIconProps>
  MoveUp?: React.FC<AntdIconProps>
  MoveDown?: React.FC<AntdIconProps>
  SortHandle?: React.FC<AntdIconProps>
  Index?: React.FC
  useArray?: () => IContext
  useIndex?: () => number
}

type ComposedArrayBase = React.FC &
  ArrayBaseMixins & {
    Item?: React.FC<IItemProps>
    mixin?: <T extends Formily.React.Types.JSXComponent>(
      target: T
    ) => T & ArrayBaseMixins
  }

const ArrayBaseContext = createContext<IContext>(null)

const ItemContext = createContext<IItemProps>(null)

const useArray = () => {
  return useContext(ArrayBaseContext)
}

const useIndex = () => {
  return useContext(ItemContext)?.index
}

export const ArrayBase: ComposedArrayBase = (props) => {
  const field = useField<Formily.Core.Models.ArrayField>()
  const schema = useSchema()
  return (
    <ArrayBaseContext.Provider value={{ field, schema }}>
      {props.children}
    </ArrayBaseContext.Provider>
  )
}

ArrayBase.Item = ({ children, ...props }) => {
  return <ItemContext.Provider value={props}>{children}</ItemContext.Provider>
}

ArrayBase.SortHandle = SortableHandle((props: any) => {
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <MenuOutlined
      {...props}
      className={cls(`${prefixCls}-handle`, props.className)}
      style={{ ...props.style }}
    />
  )
}) as any

ArrayBase.Index = () => {
  const index = useIndex()
  return <span>#{index + 1}.</span>
}

ArrayBase.Addition = (props) => {
  const self = useField()
  const array = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <Button
      {...props}
      className={cls(`${prefixCls}-addition`, props.className)}
      style={{ display: 'block', width: '100%', ...props.style }}
      onClick={() => {
        if (props.method === 'unshift') {
          array?.field?.unshift(null)
        } else {
          array?.field?.push(null)
        }
      }}
    >
      <PlusOutlined />
      {self.title || props.title}
    </Button>
  )
}

ArrayBase.Remove = React.forwardRef((props, ref) => {
  const index = useIndex()
  const base = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <DeleteOutlined
      {...props}
      className={cls(`${prefixCls}-remove`, props.className)}
      ref={ref}
      onClick={(e) => {
        base?.field.remove(index)
      }}
    />
  )
})

ArrayBase.MoveDown = React.forwardRef((props, ref) => {
  const index = useIndex()
  const base = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <DownOutlined
      {...props}
      className={cls(`${prefixCls}-move-down`, props.className)}
      ref={ref}
      onClick={(e) => {
        base?.field.moveDown(index)
      }}
    />
  )
})

ArrayBase.MoveUp = React.forwardRef((props, ref) => {
  const index = useIndex()
  const base = useArray()
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <UpOutlined
      {...props}
      className={cls(`${prefixCls}-move-up`, props.className)}
      ref={ref}
      onClick={(e) => {
        base?.field?.moveUp(index)
      }}
    />
  )
})

ArrayBase.useArray = useArray
ArrayBase.useIndex = useIndex
ArrayBase.mixin = (target: any) => {
  target.Index = ArrayBase.Index
  target.SortHandle = ArrayBase.SortHandle
  target.Addition = ArrayBase.Addition
  target.Remove = ArrayBase.Remove
  target.MoveDown = ArrayBase.MoveDown
  target.MoveUp = ArrayBase.MoveUp
  target.useArray = ArrayBase.useArray
  target.useIndex = ArrayBase.useIndex
  return target
}

export default ArrayBase
