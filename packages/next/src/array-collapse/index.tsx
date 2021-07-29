import React, { Fragment, useState, useEffect } from 'react'
import { Badge, Card, Collapse } from '@alifd/next'
import { ArrayField } from '@formily/core'
import {
  RecursionField,
  useField,
  useFieldSchema,
  observer,
  ISchema,
} from '@formily/react'
import { toArr } from '@formily/shared'
import cls from 'classnames'
import ArrayBase, { ArrayBaseMixins } from '../array-base'
import { usePrefixCls, Empty } from '../__builtins__'
import { CollapseProps, PanelProps } from '@alifd/next/lib/collapse'

export interface IArrayCollapseProps extends CollapseProps {
  defaultOpenPanelCount?: number
}
type ComposedArrayCollapse = React.FC<IArrayCollapseProps> &
  ArrayBaseMixins & {
    CollapsePanel?: React.FC<PanelProps>
  }

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

const range = (count: number) => Array.from({ length: count }).map((_, i) => i)

const takeDefaultExpandedKeys = (
  dataSourceLength: number,
  defaultOpenPanelCount: number
) => {
  if (dataSourceLength < defaultOpenPanelCount) return range(dataSourceLength)
  return range(defaultOpenPanelCount)
}

const insertExpandedKeys = (expandedKeys: number[], index: number) => {
  if (expandedKeys.length <= index) return expandedKeys.concat(index)
  return expandedKeys.reduce((buf, key) => {
    if (key < index) return buf.concat(key)
    if (key === index) return buf.concat([key, key + 1])
    return buf.concat(key + 1)
  }, [])
}

export const ArrayCollapse: ComposedArrayCollapse = observer(
  ({ defaultOpenPanelCount, ...props }: IArrayCollapseProps) => {
    const field = useField<ArrayField>()
    const dataSource = Array.isArray(field.value) ? field.value : []

    const [expandKeys, setExpandKeys] = useState<number[]>(
      takeDefaultExpandedKeys(dataSource.length, defaultOpenPanelCount)
    )
    const schema = useFieldSchema()
    const prefixCls = usePrefixCls('formily-array-collapse', props)
    useEffect(() => {
      if (!field.modified && dataSource.length) {
        setExpandKeys(
          takeDefaultExpandedKeys(dataSource.length, defaultOpenPanelCount)
        )
      }
    }, [dataSource.length, field])
    if (!schema) throw new Error('can not found schema object')

    const renderAddition = () => {
      return schema.reduceProperties((addition, schema, key) => {
        if (isAdditionComponent(schema)) {
          return <RecursionField schema={schema} name={key} />
        }
        return addition
      }, null)
    }
    const renderEmpty = () => {
      if (dataSource.length) return
      return (
        <Card className={cls(`${prefixCls}-item`, props.className)}>
          <Empty />
        </Card>
      )
    }

    const renderItems = () => {
      return (
        <Collapse
          {...props}
          expandedKeys={expandKeys.map(String)}
          onExpand={(keys: string[]) => setExpandKeys(toArr(keys).map(Number))}
          className={cls(`${prefixCls}-item`, props.className)}
        >
          {dataSource.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items
            const panelProps = field
              .query(`${field.address}.${index}`)
              .get('componentProps')
            const props: PanelProps = items['x-component-props']
            const title = () => {
              const title = `${
                panelProps?.title || props?.title || field.title
              }`
              const path = field.address.concat(index)
              const errors = field.form.queryFeedbacks({
                type: 'error',
                address: `*(${path},${path}.*)`,
              })
              return (
                <ArrayBase.Item index={index}>
                  <div
                    className={cls(`${prefixCls}-item-title`, props.className)}
                  >
                    <div>
                      <RecursionField
                        schema={items}
                        name={index}
                        filterProperties={(schema) => {
                          if (!isIndexComponent(schema)) return false
                          return true
                        }}
                        onlyRenderProperties
                      />
                      {errors.length ? (
                        <Badge className="errors-badge" count={errors.length}>
                          {title}
                        </Badge>
                      ) : (
                        title
                      )}
                    </div>
                    <div>
                      <RecursionField
                        schema={items}
                        name={index}
                        filterProperties={(schema) => {
                          if (!isOperationComponent(schema)) return false
                          return true
                        }}
                        onlyRenderProperties
                      />
                    </div>
                  </div>
                </ArrayBase.Item>
              )
            }

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
              <Collapse.Panel
                {...props}
                {...panelProps}
                key={index}
                title={title()}
              >
                <ArrayBase.Item index={index} key={index}>
                  {content}
                </ArrayBase.Item>
              </Collapse.Panel>
            )
          })}
        </Collapse>
      )
    }
    return (
      <ArrayBase
        onAdd={(index) => {
          setExpandKeys(insertExpandedKeys(expandKeys, index))
        }}
      >
        {renderEmpty()}
        {renderItems()}
        {renderAddition()}
      </ArrayBase>
    )
  }
)

const CollapsePanel: React.FC<PanelProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

CollapsePanel.displayName = 'CollapsePanel'

ArrayCollapse.defaultProps = {
  defaultOpenPanelCount: 5,
}
ArrayCollapse.displayName = 'ArrayCollapse'
ArrayCollapse.CollapsePanel = CollapsePanel

ArrayBase.mixin(ArrayCollapse)

export default ArrayCollapse
