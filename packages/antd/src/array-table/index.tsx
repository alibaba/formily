import React, { createContext, Fragment, useContext } from 'react'
import { Table, Button, Form } from 'antd'
import {
  MinusCircleOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
  PlusOutlined,
  MenuOutlined
} from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { ButtonProps } from 'antd/lib/button'
import { TableProps, ColumnProps } from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
import cls from 'classnames'
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'
import { useForm, useField } from '@formily/react'
import {
  useSchema,
  RecursionField,
  transformSchemaToFieldProps
} from '@formily/react-schema-field'
import { isArr, isBool } from '@formily/shared'
import { Schema } from '@formily/json-schema'
import './style.less'

type ObservableColumnSource = {
  field: Formily.Core.Models.VoidField
  fieldProps: Formily.Core.Types.IVoidFieldFactoryProps<any, any>
  columnProps: ColumnProps<any>
  schema: Schema
  display: Formily.Core.Types.FieldDisplayTypes
  name: string
}

interface IArrayTableAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
}

type ComposedArrayTable = React.FC<TableProps<any>> & {
  SortHandle?: React.FC<AntdIconProps>
  Addition?: React.FC<IArrayTableAdditionProps>
  Column?: React.FC<ColumnProps<any>>
  Operations?: React.FC<ColumnProps<any>>
  Remove?: React.FC<AntdIconProps>
  MoveUp?: React.FC<AntdIconProps>
  MoveDown?: React.FC<AntdIconProps>
  DragHandle?: React.FC
  useArrayTable?: () => Formily.Core.Models.ArrayField
  useArrayTableIndex?: () => number
}

const ArrayTableContext = createContext<Formily.Core.Models.ArrayField>(null)

const ArrayTableIndexContext = createContext<number>(null)

const SortableRow = SortableElement((props: any) => <tr {...props} />)
const SortableBody = SortableContainer((props: any) => <tbody {...props} />)

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1
}

const isOperationsComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Operations') > -1
}

const isAdditionComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const useArrayTableSources = () => {
  const arrayField = useField()
  const form = useForm()
  const schema = useSchema()
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (
      isColumnComponent(schema) ||
      isOperationsComponent(schema) ||
      isAdditionComponent(schema)
    ) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name'])
        return []
      const name = schema['x-component-props']?.['dataIndex'] || schema['name']
      const path = arrayField.address.concat(name)
      const field = form.fields[
        path.toString()
      ] as Formily.Core.Models.VoidField
      const fieldProps =
        field?.props || transformSchemaToFieldProps(name, schema, {})
      const columnProps =
        field?.component?.[1] || schema['x-component-props'] || {}
      const display = field?.display || schema['x-display']
      return [
        {
          name,
          display,
          field,
          fieldProps,
          schema,
          columnProps
        }
      ]
    } else if (schema.properties) {
      return schema.reduceProperties((buf, schema) => {
        return buf.concat(parseSources(schema))
      }, [])
    }
  }

  const parseArrayItems = (schema: Schema['items']) => {
    const sources: ObservableColumnSource[] = []
    const items = isArr(schema) ? schema : [schema]
    return items.reduce((columns, schema) => {
      const item = parseSources(schema)
      if (item) {
        return columns.concat(item)
      }
      return columns
    }, sources)
  }

  return parseArrayItems(schema.items)
}

const useArrayTableColumns = (
  dataSource: any[],
  sources: ObservableColumnSource[]
): TableProps<any>['columns'] => {
  return sources.reduce((buf, { name, columnProps, schema, display }, key) => {
    if (display === 'none' || display === 'hidden') return buf
    return buf.concat({
      ...columnProps,
      key,
      dataIndex: name,
      render: (value: any, record: any) => {
        const index = dataSource.indexOf(record)
        const children = (
          <ArrayTableIndexContext.Provider key={index} value={index}>
            <RecursionField
              schema={schema}
              name={`${index}`}
              onlyRenderProperties
            />
          </ArrayTableIndexContext.Provider>
        )
        if (isOperationsComponent(schema)) {
          return <Form.Item>{children}</Form.Item>
        }
        return children
      }
    })
  }, [])
}

export const ArrayTable: ComposedArrayTable = observer(
  (props: TableProps<any>) => {
    const field = useField<Formily.Core.Models.ArrayField>()
    const dataSource = Array.isArray(field.value) ? [...field.value] : []
    const sources = useArrayTableSources()
    const columns = useArrayTableColumns(dataSource, sources)
    return (
      <ArrayTableContext.Provider value={field}>
        <Table
          size="small"
          rowKey={record => {
            return dataSource.indexOf(record)
          }}
          {...props}
          pagination={
            isBool(props.pagination)
              ? props.pagination
              : {
                  position: ['bottomCenter'],
                  ...props.pagination,
                  pageSize: 10,
                  size: 'default',
                  hideOnSinglePage: true,
                  showSizeChanger: false,
                  itemRender: (page, type, element) => {
                    if (type === 'page') {
                      return <div style={{ color: 'red' }}>{element}</div>
                    } else {
                      return element
                    }
                  }
                }
          }
          columns={columns}
          onChange={() => {}}
          dataSource={dataSource}
          components={{
            body: {
              wrapper: (props: any) => (
                <SortableBody
                  useDragHandle
                  helperClass="row-dragging"
                  onSortEnd={({ oldIndex, newIndex }) => {
                    field.move(oldIndex, newIndex)
                  }}
                  {...props}
                />
              ),
              row: (props: any) => {
                return (
                  <SortableRow index={props['data-row-key'] || 0} {...props} />
                )
              }
            }
          }}
        />
        {sources.map((column, key) => {
          //专门用来承接对Column的状态管理
          return React.createElement(RecursionField, {
            name: column.name,
            schema: column.schema,
            onlyRenderSelf: true,
            key
          })
        })}
      </ArrayTableContext.Provider>
    )
  }
)

ArrayTable.displayName = 'ArrayTable'

ArrayTable.useArrayTable = () => useContext(ArrayTableContext)

ArrayTable.useArrayTableIndex = () => useContext(ArrayTableIndexContext)

ArrayTable.SortHandle = SortableHandle((props: any) => {
  return (
    <MenuOutlined
      {...props}
      className={cls(
        'ant-array-table-sort-handler drag-visible',
        props.className
      )}
      style={{ ...props.style }}
    />
  )
}) as any

ArrayTable.Addition = props => {
  const field = ArrayTable.useArrayTable()
  return (
    <Button
      type="dashed"
      className={cls('ant-array-table-addition', props.className)}
      {...props}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        if (props.method === 'unshift') {
          field.unshift({})
        } else {
          field.push({})
        }
      }}
      block
      icon={<PlusOutlined />}
    >
      {field.title || props.title}
    </Button>
  )
}

ArrayTable.Operations = () => {
  return <Fragment />
}

ArrayTable.Remove = React.forwardRef((props, ref) => {
  const index = ArrayTable.useArrayTableIndex()
  const field = ArrayTable.useArrayTable()
  return (
    <MinusCircleOutlined
      {...props}
      className={cls('ant-array-table-remove', props.className)}
      ref={ref}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        field.remove(index)
      }}
    />
  )
})

ArrayTable.MoveDown = React.forwardRef((props, ref) => {
  const index = ArrayTable.useArrayTableIndex()
  const field = ArrayTable.useArrayTable()
  return (
    <DownCircleOutlined
      {...props}
      className={cls('ant-array-table-move-down', props.className)}
      ref={ref}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        field.moveDown(index)
      }}
    />
  )
})

ArrayTable.MoveUp = React.forwardRef((props, ref) => {
  const index = ArrayTable.useArrayTableIndex()
  const field = ArrayTable.useArrayTable()
  return (
    <UpCircleOutlined
      {...props}
      className={cls('ant-array-table-move-up', props.className)}
      ref={ref}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        field.moveUp(index)
      }}
    />
  )
})

ArrayTable.Column = () => {
  return <Fragment />
}

export default ArrayTable
