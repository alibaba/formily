import React, { useState, useMemo } from 'react'
import { observer, useFieldSchema, useField, Schema } from '@formily/react'
import cls from 'classnames'
import { isArr, isBool, isFn } from '@formily/shared'
import { Search, Table } from '@alifd/next'
import { TableProps, ColumnProps } from '@alifd/next/types/table'
import { SearchProps } from '@alifd/next/types/search'
import { useFilterOptions } from './useFilterOptions'
import { useFlatOptions } from './useFlatOptions'
import { useSize } from './useSize'
import { useTitleAddon } from './useTitleAddon'
import { useCheckSlackly, getIndeterminate } from './useCheckSlackly'
import { getUISelected, getOutputData } from './utils'
import { usePrefixCls } from '../__builtins__'

type IFilterOption = boolean | ((option: any, keyword: string) => boolean)

type IFilterSort = (optionA: any, optionB: any) => number

export interface ISelectTableColumnProps extends ColumnProps {
  key: React.ReactText
}

export interface ISelectTableProps
  extends Omit<TableProps, 'primaryKey' | 'onChange'> {
  mode?: 'multiple' | 'single'
  dataSource?: any[]
  optionAsValue?: boolean
  valueType: 'all' | 'parent' | 'child' | 'path'
  showSearch?: boolean
  searchProps?: SearchProps
  primaryKey?: string | ((record: any) => string)
  filterOption?: IFilterOption
  filterSort?: IFilterSort
  onSearch?: (keyword: string) => void
  onChange?: (value: any, options: any) => void
  value?: any
  rowSelection?: TableProps['rowSelection'] & {
    checkStrictly?: boolean
  }
}

type ComposedSelectTable = React.FC<ISelectTableProps> & {
  Column?: React.FC<ISelectTableColumnProps>
}

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1
}

const useColumns = () => {
  const schema = useFieldSchema()
  const columns: ISelectTableColumnProps[] = []
  const validSchema = (
    schema?.type === 'array' && schema?.items ? schema.items : schema
  ) as Schema

  validSchema?.mapProperties((schema, name) => {
    if (isColumnComponent(schema)) {
      const props = schema?.['x-component-props']
      columns.push({
        ...props,
        title: props?.title || schema?.title,
        dataIndex: props?.dataIndex || name,
      })
    }
  })
  return columns
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
  const columns = useColumns()

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
    const wholeRecords = flatDataSource.filter((item) =>
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

  return (
    <div className={prefixCls}>
      {showSearch ? (
        <Search
          {...searchProps}
          className={cls(`${prefixCls}-search`, searchProps?.className)}
          style={{ width: '100%', ...searchProps?.style }}
          onSearch={onInnerSearch}
          onChange={onInnerSearch}
          disabled={disabled}
          readOnly={readOnly}
          size={searchSize}
          buttonProps={{ ...searchProps?.buttonProps, loading }} // fusion
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
            : {
                ...rowSelection,
                ...titleAddon,
                getProps: (record, index) => ({
                  ...(rowSelection?.getProps?.(record, index) as any),
                  ...(rowSelection?.checkStrictly !== false
                    ? {}
                    : {
                        indeterminate: getIndeterminate(
                          record,
                          flatDataSource,
                          selected,
                          primaryKey
                        ),
                      }), // 父子关联模式indeterminate值
                  disabled: disabled || record?.disabled,
                }), // fusion
                selectedRowKeys: selected,
                onChange:
                  rowSelection?.checkStrictly !== false
                    ? onInnerChange
                    : onSlacklyChange,
                mode,
              }
        }
        columns={props.columns || columns}
        primaryKey={primaryKey}
        loading={loading}
        size={tableSize}
        onRowClick={(record, index, e) => {
          // fusion
          onRowClick(record)
          props.onRowClick?.(record, index, e)
        }}
      >
        {''}
      </Table>
    </div>
  )
})

const TableColumn: React.FC<ISelectTableColumnProps> = () => <></>

SelectTable.Column = TableColumn

SelectTable.defaultProps = {
  showSearch: false,
  valueType: 'all',
  primaryKey: 'key',
  mode: 'multiple',
}

export default SelectTable
