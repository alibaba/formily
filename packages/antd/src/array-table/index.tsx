import React, { createContext, Fragment, useContext, useState } from 'react'
import { Table, Button, Pagination, Space, Select, Badge } from 'antd'
import {
  MinusCircleOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
  PlusOutlined,
  MenuOutlined
} from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { ButtonProps } from 'antd/lib/button'
import { PaginationProps } from 'antd/lib/pagination'
import { TableProps, ColumnProps } from 'antd/lib/table'
import { SelectProps } from 'antd/lib/select'
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
import { FormPath, isArr, isBool } from '@formily/shared'
import { Schema } from '@formily/json-schema'
import './style.less'

interface ObservableColumnSource {
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

interface IArrayTablePaginationProps extends PaginationProps {
  dataSource?: any[]
  children?: (
    dataSource: any[],
    pagination: React.ReactNode
  ) => React.ReactElement
}

interface IStatusSelectProps extends SelectProps<any> {
  pageSize?: number
}

type ComposedArrayTable = React.FC<TableProps<any>> & {
  SortHandle?: React.FC<AntdIconProps>
  Addition?: React.FC<IArrayTableAdditionProps>
  Index?: React.FC
  Column?: React.FC<ColumnProps<any>>
  Remove?: React.FC<AntdIconProps>
  MoveUp?: React.FC<AntdIconProps>
  MoveDown?: React.FC<AntdIconProps>
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
    if (!isColumnComponent(schema)) return buf
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
        return children
      }
    })
  }, [])
}

const StatusSelect: React.FC<IStatusSelectProps> = observer(props => {
  const form = useForm()
  const field = useField<Formily.Core.Models.ArrayField>()
  const errors = form.queryFeedbacks({
    type: 'error',
    address: `${field.address}.*`
  })
  const createIndexPattern = (page: number) => {
    const pattern = `${field.address}.*[${(page - 1) * props.pageSize}:${page *
      props.pageSize}].*`
    return FormPath.parse(pattern)
  }
  const options = props.options?.map(({ label, value }) => {
    const hasError = errors.some(({ address }) => {
      return createIndexPattern(value).match(address)
    })
    return {
      label: hasError ? <Badge dot>{label}</Badge> : label,
      value
    }
  })

  const width = String(options?.length).length * 15

  return (
    <Select
      value={props.value}
      onChange={props.onChange}
      options={options}
      virtual
      style={{
        width: width < 60 ? 60 : width
      }}
      className={cls('ant-array-table-status-select', {
        'has-error': errors?.length
      })}
    />
  )
})

const ArrayTablePagination: React.FC<IArrayTablePaginationProps> = props => {
  const [current, setCurrent] = useState(1)
  const pageSize = props.pageSize || 10
  const size = props.size || 'default'
  const dataSource = props.dataSource || []
  const startIndex = (current - 1) * pageSize
  const endIndex = startIndex + pageSize - 1
  const total = dataSource?.length || 0
  const totalPage = Math.ceil(total / pageSize)
  const pages = Array.from(new Array(totalPage)).map((_, index) => {
    const page = index + 1
    return {
      label: page,
      value: page
    }
  })
  const handleChange = (current: number) => {
    setCurrent(current)
  }

  const renderPagination = () => {
    if (totalPage <= 1) return
    return (
      <div className="ant-array-table-pagination">
        <Space>
          <StatusSelect
            value={current}
            pageSize={pageSize}
            onChange={handleChange}
            options={pages}
            notFoundContent={false}
          />
          <Pagination
            {...props}
            pageSize={pageSize}
            current={current}
            total={dataSource.length}
            size={size}
            showSizeChanger={false}
            onChange={handleChange}
          />
        </Space>
      </div>
    )
  }

  return (
    <Fragment>
      {props.children?.(
        dataSource?.slice(startIndex, endIndex + 1),
        renderPagination()
      )}
    </Fragment>
  )
}

export const ArrayTable: ComposedArrayTable = observer(
  (props: TableProps<any>) => {
    const field = useField<Formily.Core.Models.ArrayField>()
    const dataSource = Array.isArray(field.value) ? [...field.value] : []
    const sources = useArrayTableSources()
    const columns = useArrayTableColumns(dataSource, sources)
    const pagination = isBool(props.pagination) ? {} : props.pagination
    const defaultRowKey = (record: any) => {
      return dataSource.indexOf(record)
    }
    return (
      <ArrayTablePagination {...pagination} dataSource={dataSource}>
        {(dataSource, pager) => (
          <ArrayTableContext.Provider value={field}>
            <Table
              size="small"
              rowKey={defaultRowKey}
              {...props}
              bordered
              pagination={false}
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
                      <SortableRow
                        index={props['data-row-key'] || 0}
                        {...props}
                      />
                    )
                  }
                }
              }}
            />
            <div style={{ marginTop: 5, marginBottom: 5 }}>{pager}</div>
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
        )}
      </ArrayTablePagination>
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

ArrayTable.Index = props => {
  const index = ArrayTable.useArrayTableIndex()
  return <span>{index + 1}</span>
}

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
