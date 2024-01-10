import React, { useState, useMemo } from 'react'
import {
  observer,
  useFieldSchema,
  useField,
  Schema,
  RecursionField,
} from '@formily/react'
import cls from 'classnames'
import { GeneralField, FieldDisplayTypes } from '@formily/core'
import { isArr, isBool, isFn } from '@formily/shared'
import { Input, Table } from 'antd'
import { TableProps, ColumnProps } from 'antd/lib/table'
import { SearchProps } from 'antd/lib/input'
import { useFilterOptions } from './useFilterOptions'
import { useFlatOptions } from './useFlatOptions'
import { useSize } from './useSize'
import { useTitleAddon } from './useTitleAddon'
import { useCheckSlackly, getIndeterminate } from './useCheckSlackly'
import { getUISelected, getOutputData } from './utils'
import { usePrefixCls } from '../__builtins__'

const { Search } = Input

interface ObservableColumnSource {
  field: GeneralField
  columnProps: ColumnProps<any>
  schema: Schema
  display: FieldDisplayTypes
  name: string
}

type IFilterOption = boolean | ((option: any, keyword: string) => boolean)

type IFilterSort = (optionA: any, optionB: any) => number

export interface ISelectTableColumnProps extends ColumnProps<any> {
  key: React.ReactText
}

export interface ISelectTableProps extends TableProps<any> {
  mode?: 'multiple' | 'single'
  dataSource?: any[]
  optionAsValue?: boolean
  valueType?: 'all' | 'parent' | 'child' | 'path'
  showSearch?: boolean
  searchProps?: SearchProps
  primaryKey?: string | ((record: any) => string)
  filterOption?: IFilterOption
  filterSort?: IFilterSort
  onSearch?: (keyword: string) => void
  onChange?: (value: any, options: any) => void
  value?: any
}

type ComposedSelectTable = React.FC<
  React.PropsWithChildren<ISelectTableProps>
> & {
  Column?: React.FC<React.PropsWithChildren<ISelectTableColumnProps>>
}

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1
}

const useSources = () => {
  const arrayField = useField()
  const schema = useFieldSchema()
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (isColumnComponent(schema)) {
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
          columnProps: {
            title: field?.title || columnProps.title,
            ...columnProps,
          },
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

  const validSchema = (
    schema?.type === 'array' && schema?.items ? schema.items : schema
  ) as Schema

  return parseArrayItems(validSchema)
}

const useColumns = (
  sources: ObservableColumnSource[]
): TableProps<any>['columns'] => {
  return sources.reduce((buf, { name, columnProps, schema, display }, key) => {
    if (display !== 'visible') return buf
    if (!isColumnComponent(schema)) return buf
    return buf.concat({
      ...columnProps,
      key,
      dataIndex: name,
    })
  }, [])
}

const addPrimaryKey = (dataSource, rowKey, primaryKey) =>
  dataSource.map((item) => {
    const children = isArr(item.children)
      ? addPrimaryKey(item.children, rowKey, primaryKey)
      : {}
    return {
      ...item,
      ...children,
      [primaryKey]: rowKey(item),
    }
  })

export const SelectTable: ComposedSelectTable = observer((props) => {
  const {
    mode,
    dataSource: propsDataSource,
    optionAsValue,
    valueType,
    showSearch,
    filterOption,
    filterSort,
    onSearch,
    searchProps,
    className,
    value,
    onChange,
    rowSelection,
    primaryKey: rowKey,
    ...otherTableProps
  } = props
  const prefixCls = usePrefixCls('formily-select-table', props)
  const [searchValue, setSearchValue] = useState<string>()
  const field = useField() as any
  const loading = isBool(props.loading) ? props.loading : field.loading
  const disabled = field.disabled
  const readOnly = field.readOnly
  const readPretty = field.readPretty
  const { searchSize, tableSize } = useSize(
    field.decoratorProps?.size,
    searchProps?.size,
    props?.size
  )
  const primaryKey = isFn(rowKey) ? '__formily_key__' : rowKey
  const sources = useSources()
  const columns = useColumns(sources)

  // dataSource
  let dataSource = isArr(propsDataSource) ? propsDataSource : field.dataSource
  dataSource = isFn(rowKey)
    ? addPrimaryKey(dataSource, rowKey, primaryKey)
    : dataSource

  // Filter dataSource By Search
  const filteredDataSource = useFilterOptions(
    dataSource,
    searchValue,
    filterOption,
    rowSelection?.checkStrictly
  )

  // Order dataSource By filterSort
  const orderedFilteredDataSource = useMemo(() => {
    if (!filterSort) {
      return filteredDataSource
    }
    return [...filteredDataSource].sort((a, b) => filterSort(a, b))
  }, [filteredDataSource, filterSort])

  const flatDataSource = useFlatOptions(dataSource)
  const flatFilteredDataSource = useFlatOptions(filteredDataSource)

  // 分页或异步查询时，dataSource会丢失已选数据，配置optionAsValue则无法获取已选数据，需要进行合并
  const getWholeDataSource = () => {
    if (optionAsValue && mode === 'multiple' && value?.length) {
      const map = new Map()
      const arr = [...flatDataSource, ...value]
      arr.forEach((item) => {
        if (!map.has(item[primaryKey])) {
          map.set(item[primaryKey], item)
        }
      })
      return [...map.values()]
    }
    return flatDataSource
  }

  // selected keys for Table UI
  const selected = getUISelected(
    value,
    flatDataSource,
    primaryKey,
    valueType,
    optionAsValue,
    mode,
    rowSelection?.checkStrictly,
    rowKey
  )

  // readPretty Value
  const readPrettyDataSource = useFilterOptions(
    orderedFilteredDataSource,
    selected,
    (value, item) => value.includes(item[primaryKey])
  )

  const onInnerSearch = (searchText) => {
    const formatted = (searchText || '').trim()
    setSearchValue(searchText)
    onSearch?.(formatted)
  }

  const onInnerChange = (selectedRowKeys: any[]) => {
    if (readOnly) {
      return
    }
    // 筛选后onChange默认的records数据不完整，此处需使用完整数据过滤
    const wholeRecords = getWholeDataSource().filter((item) =>
      selectedRowKeys.includes(item?.[primaryKey])
    )
    const { outputValue, outputOptions } = getOutputData(
      selectedRowKeys,
      wholeRecords,
      dataSource,
      primaryKey,
      valueType,
      optionAsValue,
      mode,
      rowSelection?.checkStrictly
    )

    onChange?.(outputValue, outputOptions)
  }

  const onRowClick = (record) => {
    if (readPretty || disabled || readOnly || record?.disabled) {
      return
    }
    const selectedRowKey = record?.[primaryKey]
    const isSelected = selected?.includes(selectedRowKey)
    let selectedRowKeys = []
    if (mode === 'single') {
      selectedRowKeys = [selectedRowKey]
    } else {
      if (isSelected) {
        selectedRowKeys = selected.filter((item) => item !== selectedRowKey)
      } else {
        selectedRowKeys = [...selected, selectedRowKey]
      }
    }
    if (rowSelection?.checkStrictly !== false) {
      onInnerChange(selectedRowKeys)
    } else {
      onSlacklyChange(selectedRowKeys)
    }
  }

  // TreeData SlacklyChange
  const onSlacklyChange = (currentSelected: any[]) => {
    let { selectedRowKeys } = useCheckSlackly(
      currentSelected,
      selected,
      flatDataSource,
      flatFilteredDataSource,
      primaryKey,
      rowSelection?.checkStrictly
    )
    onInnerChange(selectedRowKeys)
  }

  // Table All Checkbox
  const titleAddon = useTitleAddon(
    selected,
    flatDataSource,
    flatFilteredDataSource,
    primaryKey,
    mode,
    disabled,
    readOnly,
    rowSelection?.checkStrictly,
    onInnerChange
  )

  // Antd rowSelection type
  const modeAsType: any = { multiple: 'checkbox', single: 'radio' }?.[mode]

  return (
    <div className={prefixCls}>
      {showSearch ? (
        <Search
          {...searchProps}
          className={cls(`${prefixCls}-search`, searchProps?.className)}
          style={{ width: '100%', ...searchProps?.style }}
          onSearch={onInnerSearch}
          onChange={(e) => onInnerSearch(e.target.value)}
          disabled={disabled}
          readOnly={readOnly}
          size={searchSize}
          loading={loading} // antd
        />
      ) : null}
      <Table
        {...otherTableProps}
        className={cls(`${prefixCls}-table`, className)}
        dataSource={
          readPretty ? readPrettyDataSource : orderedFilteredDataSource
        }
        rowSelection={
          readPretty
            ? undefined
            : ({
                ...rowSelection,
                ...titleAddon,
                getCheckboxProps: (record) => ({
                  ...(rowSelection?.getCheckboxProps?.(record) as any),
                  disabled: disabled || record?.disabled,
                }), // antd
                ...(rowSelection?.checkStrictly !== false
                  ? {}
                  : {
                      renderCell: (checked, record, index, originNode) => {
                        return React.cloneElement(
                          originNode as React.ReactElement,
                          {
                            indeterminate: getIndeterminate(
                              record,
                              flatDataSource,
                              selected,
                              primaryKey
                            ),
                          }
                        )
                      },
                    }),
                selectedRowKeys: selected,
                onChange:
                  rowSelection?.checkStrictly !== false
                    ? onInnerChange
                    : onSlacklyChange,
                type: modeAsType,
                preserveSelectedRowKeys: true,
                checkStrictly: true,
              } as any)
        }
        columns={props.columns || columns}
        rowKey={primaryKey}
        loading={loading}
        size={tableSize}
        onRow={(record) => {
          // antd
          const onRowResult = otherTableProps.onRow?.(record)
          return {
            ...onRowResult,
            onClick: (e) => {
              onRowResult?.onClick?.(e)
              onRowClick(record)
            },
          }
        }}
      >
        {''}
      </Table>
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
    </div>
  )
})

const TableColumn: React.FC<
  React.PropsWithChildren<ISelectTableColumnProps>
> = () => <></>

SelectTable.Column = TableColumn

SelectTable.defaultProps = {
  showSearch: false,
  valueType: 'all',
  primaryKey: 'key',
  mode: 'multiple',
}

export default SelectTable
