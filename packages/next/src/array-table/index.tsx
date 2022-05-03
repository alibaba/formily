import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Table, Pagination, Select, Badge } from '@alifd/next'
import { PaginationProps } from '@alifd/next/lib/pagination'
import { TableProps, ColumnProps } from '@alifd/next/lib/table'
import { SelectProps } from '@alifd/next/lib/select'
import cls from 'classnames'
import { GeneralField, FieldDisplayTypes, ArrayField } from '@formily/core'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { isArr, isBool } from '@formily/shared'
import { Schema } from '@formily/json-schema'
import { usePrefixCls } from '../__builtins__'
import { ArrayBase, ArrayBaseMixins } from '../array-base'

interface ObservableColumnSource {
  field: GeneralField
  columnProps: ColumnProps
  schema: Schema
  display: FieldDisplayTypes
  name: string
}

interface IArrayTablePaginationProps extends PaginationProps {
  dataSource?: any[]
  children?: (
    dataSource: any[],
    pagination: React.ReactNode
  ) => React.ReactElement
}

interface IStatusSelectProps extends SelectProps {
  pageSize?: number
}

export interface ExtendTableProps extends TableProps {
  pagination?: PaginationProps
}

type ComposedArrayTable = React.FC<React.PropsWithChildren<ExtendTableProps>> &
  ArrayBaseMixins & {
    Column?: React.FC<React.PropsWithChildren<ColumnProps>>
  }

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
  const schema = useFieldSchema()
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (
      isColumnComponent(schema) ||
      isOperationsComponent(schema) ||
      isAdditionComponent(schema)
    ) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name'])
        return []
      const name = schema['x-component-props']?.['dataIndex'] || schema['name']
      const field = arrayField.query(arrayField.address.concat(name)).take()
      const columnProps =
        field?.component?.[1] || schema['x-component-props'] || {}
      const display = field?.display || schema['x-display']
      return [
        {
          name,
          display,
          field,
          schema,
          columnProps,
        },
      ]
    } else if (schema.properties) {
      return schema.reduceProperties((buf, schema) => {
        return buf.concat(parseSources(schema))
      }, [])
    }
  }

  const parseArrayItems = (schema: Schema['items']) => {
    if (!schema) return []
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
): TableProps['columns'] => {
  return sources.reduce((buf, { name, columnProps, schema, display }, key) => {
    if (display !== 'visible') return buf
    if (!isColumnComponent(schema)) return buf
    return buf.concat({
      ...columnProps,
      key,
      dataIndex: name,
      cell: (value: any, _: number, record: any) => {
        const index = dataSource.indexOf(record)
        const children = (
          <ArrayBase.Item key={index} index={index} record={record}>
            <RecursionField schema={schema} name={index} onlyRenderProperties />
          </ArrayBase.Item>
        )
        return children
      },
    })
  }, [])
}

const useAddition = () => {
  const schema = useFieldSchema()
  return schema.reduceProperties((addition, schema, key) => {
    if (isAdditionComponent(schema)) {
      return <RecursionField schema={schema} name={key} />
    }
    return addition
  }, null)
}

const schedulerRequest = {
  request: null,
}

const StatusSelect: React.FC<React.PropsWithChildren<IStatusSelectProps>> =
  observer(
    ({ pageSize, ...props }) => {
      const field = useField<ArrayField>()
      const prefixCls = usePrefixCls('formily-array-table')
      const errors = field.errors
      const parseIndex = (address: string) => {
        return Number(
          address
            .slice(address.indexOf(field.address.toString()) + 1)
            .match(/(\d+)/)?.[1]
        )
      }
      const options = props.dataSource?.map(({ label, value }) => {
        const hasError = errors.some(({ address }) => {
          const currentIndex = parseIndex(address)
          const startIndex = (value - 1) * pageSize
          const endIndex = value * pageSize
          return currentIndex >= startIndex && currentIndex <= endIndex
        })
        return {
          label: hasError ? <Badge dot>{label}</Badge> : label,
          value,
        }
      })

      return (
        <Select
          {...props}
          value={props.value}
          onChange={props.onChange}
          dataSource={options}
          useVirtual
          className={cls(`${prefixCls}-status-select`, {
            'has-error': errors?.length,
          })}
        />
      )
    },
    {
      scheduler: (update) => {
        clearTimeout(schedulerRequest.request)
        schedulerRequest.request = setTimeout(() => {
          update()
        }, 100)
      },
    }
  )

const ArrayTablePagination: React.FC<
  React.PropsWithChildren<IArrayTablePaginationProps>
> = ({ dataSource, ...props }) => {
  const [current, setCurrent] = useState(1)
  const prefixCls = usePrefixCls('formily-array-table')
  const pageSize = props.pageSize || 10
  const size = props.size || 'medium'
  const sources = dataSource || []
  const startIndex = (current - 1) * pageSize
  const endIndex = startIndex + pageSize - 1
  const total = sources?.length || 0
  const totalPage = Math.ceil(total / pageSize)
  const pages = Array.from(new Array(totalPage)).map((_, index) => {
    const page = index + 1
    return {
      label: page,
      value: page,
    }
  })
  const handleChange = (current: number) => {
    setCurrent(current)
  }

  useEffect(() => {
    if (totalPage > 0 && totalPage < current) {
      handleChange(totalPage)
    }
  }, [totalPage, current])

  const renderPagination = () => {
    if (totalPage <= 1) return
    return (
      <div className={`${prefixCls}-pagination`}>
        <StatusSelect
          value={current}
          pageSize={pageSize}
          onChange={handleChange}
          dataSource={pages}
          notFoundContent={false}
        />
        <Pagination
          {...props}
          pageSize={pageSize}
          current={current}
          total={dataSource.length}
          size={size}
          pageSizeSelector={false}
          onChange={handleChange}
        />
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

const omit = (props: any, keys?: string[]) => {
  return Object.keys(props)
    .filter((key) => !keys?.includes(key))
    .reduce((buf, key) => {
      buf[key] = props[key]
      return buf
    }, {})
}

export const ArrayTable: ComposedArrayTable = observer(
  (props: ExtendTableProps) => {
    const ref = useRef<HTMLDivElement>()
    const field = useField<ArrayField>()
    const prefixCls = usePrefixCls('formily-array-table')
    const dataSource = Array.isArray(field.value) ? field.value.slice() : []
    const sources = useArrayTableSources()
    const columns = useArrayTableColumns(dataSource, sources)
    const pagination = isBool(props.pagination) ? {} : props.pagination
    const addition = useAddition()

    return (
      <ArrayTablePagination {...pagination} dataSource={dataSource}>
        {(dataSource, pager) => (
          <div ref={ref} className={prefixCls}>
            <ArrayBase>
              <Table
                size="small"
                {...omit(props, ['value', 'onChange', 'pagination'])}
                columns={columns}
                dataSource={dataSource}
              />
              <div style={{ marginTop: 5, marginBottom: 5 }}>{pager}</div>
              {sources.map((column, key) => {
                //专门用来承接对Column的状态管理
                if (!isColumnComponent(column.schema)) return
                return React.createElement(RecursionField, {
                  name: column.name,
                  schema: column.schema,
                  onlyRenderSelf: true,
                  key,
                })
              })}
              {addition}
            </ArrayBase>
          </div>
        )}
      </ArrayTablePagination>
    )
  }
)

ArrayTable.displayName = 'ArrayTable'

ArrayTable.Column = () => {
  return <Fragment />
}

ArrayBase.mixin(ArrayTable)

export default ArrayTable
