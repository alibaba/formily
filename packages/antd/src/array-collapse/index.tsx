import {
  Badge,
  Card,
  Collapse,
  CollapsePanelProps,
  CollapseProps,
  Empty,
} from 'antd'
import {
  RecursionField,
  useField,
  useFieldSchema,
  observer,
  ISchema,
} from '@formily/react'
import React, { Fragment, useState } from 'react'
import ArrayBase, { ArrayBaseMixins } from '../array-base'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'

export interface IArrayCollapseProps extends CollapseProps {
  defaultOpenPanelCount?: Array<string | number>
}
type ComposedArrayCollapse = React.FC<IArrayCollapseProps> &
  ArrayBaseMixins & {
    CollapsePanel?: React.FC<CollapsePanelProps>
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
export const ArrayCollapse: ComposedArrayCollapse = observer(
  (props: IArrayCollapseProps) => {
    const field = useField<Formily.Core.Models.ArrayField>()

    const schema = useFieldSchema()
    const dataSource = Array.isArray(field.value) ? field.value : []
    const prefixCls = usePrefixCls('formily-array-collapse', props)

    if (!schema) throw new Error('can not found schema object')

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
        <Card className={cls(`${prefixCls}-item`, props.className)}>
          <Empty />
        </Card>
      )
    }

    const [key, setKey] = useState<Array<string | number>>(
      new Array(props?.defaultOpenPanelCount || 1).fill(1).map((_, i) => i)
    )

    const renderItems = () => {
      return (
        <Collapse
          {...props}
          activeKey={key}
          onChange={(key: string[]) => setKey(key)}
          className={cls(`${prefixCls}-item`, props.className)}
        >
          {dataSource?.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items

            const props: CollapsePanelProps = items['x-component-props']

            const header = () => {
              const header = `${props?.header || field.title}`
              const path = field.address.concat(index)
              const errors = field.form.queryFeedbacks({
                type: 'error',
                address: `*(${path},${path}.*)`,
              })
              return (
                <ArrayBase.Item index={index}>
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
                    <Badge
                      size="small"
                      className="errors-badge"
                      count={errors.length}
                    >
                      {header}
                    </Badge>
                  ) : (
                    header
                  )}
                </ArrayBase.Item>
              )
            }

            const extra = (
              <ArrayBase.Item index={index}>
                <RecursionField
                  schema={items}
                  name={index}
                  filterProperties={(schema) => {
                    if (!isOperationComponent(schema)) return false
                    return true
                  }}
                  onlyRenderProperties
                />
                {props?.extra}
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
              <Collapse.Panel
                {...props}
                forceRender
                key={index}
                header={header()}
                extra={extra}
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
      <ArrayBase onAdd={(index) => setKey([...key, index - 1])}>
        {renderEmpty()}
        {renderItems()}
        {renderAddition()}
      </ArrayBase>
    )
  }
)

const CollapsePanel: React.FC<CollapsePanelProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

ArrayCollapse.displayName = 'ArrayCollapse'
ArrayCollapse.CollapsePanel = CollapsePanel

ArrayBase.mixin(ArrayCollapse)
export default ArrayCollapse
