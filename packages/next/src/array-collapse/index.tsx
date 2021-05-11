import React from 'react'
import { ArrayBase, ArrayBaseMixins } from '../array-base'
import { ISchema } from '@formily/json-schema'
import { observer } from '@formily/reactive-react'
import { Card, Collapse } from '@alifd/next'
import { RecursionField, useField, useFieldSchema } from '@formily/react'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'
import { PanelProps } from '@alifd/next/types/collapse'
import Empty from '../__builtins__/empty'

type ComposedArrayCollapse = React.FC<PanelProps> & ArrayBaseMixins

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const isIndexComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Index') > -1
}

const isRemoveComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Remove') > -1
}

const isMoveUpComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveUp') > -1
}

const isMoveDownComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveDown') > -1
}

const isOperationComponent = (schema: ISchema) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isMoveDownComponent(schema) ||
    isMoveUpComponent(schema)
  )
}

export const ArrayCollapse: ComposedArrayCollapse = observer((props) => {
  const field = useField<Formily.Core.Models.ArrayField>()
  const schema = useFieldSchema()
  const dataSource = Array.isArray(field.value) ? field.value : []
  const prefixCls = usePrefixCls('formily-array-collapse', props)

  if (!schema) throw new Error('can not found schema object')

  const renderItems = () => {
    return (
      <Collapse>
        {dataSource?.map((item, index) => {
          const items = Array.isArray(schema.items)
            ? schema.items[index] || schema.items[0]
            : schema.items

          const extra = (
            <ArrayBase.Item index={index}>
              <span
                className={cls(`${prefixCls}-title`)}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {props.title || field.title}
                <span>
                  <RecursionField
                    schema={items}
                    name={index}
                    filterProperties={(schema) => {
                      if (!isOperationComponent(schema)) return false
                      return true
                    }}
                    onlyRenderProperties
                  />
                </span>
              </span>
            </ArrayBase.Item>
          )
          const content = (
            <RecursionField
              schema={items}
              name={index}
              filterProperties={(schema) => {
                if (isIndexComponent(schema)) return false
                if (isOperationComponent(schema)) return false
                return true
              }}
            />
          )
          return (
            <Collapse.Panel key={index} title={extra}>
              <ArrayBase.Item index={index}>{content}</ArrayBase.Item>
            </Collapse.Panel>
          )
        })}
      </Collapse>
    )
  }
  const renderAddition = () => {
    return schema.reduceProperties((addition, schema) => {
      if (isAdditionComponent(schema)) {
        return <RecursionField schema={schema} name="addition" />
      }
      return addition
    }, null)
  }
  const renderEmpty = () => {
    if (dataSource?.length) return
    return (
      <Card
        {...props}
        contentHeight={155}
        onChange={() => {}}
        className={cls(`${prefixCls}-item`, props.className)}
        title={props.title || field.title}
      >
        <Empty />
      </Card>
    )
  }
  return (
    <ArrayBase>
      {renderEmpty()}
      {renderItems()}
      {renderAddition()}
    </ArrayBase>
  )
})

ArrayCollapse.displayName = 'ArrayCollapse'

ArrayBase.mixin(ArrayCollapse)

export default ArrayCollapse
