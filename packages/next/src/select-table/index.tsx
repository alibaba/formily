import React, { useEffect, useState, useMemo } from 'react'
import { observer, useFieldSchema, useField, Schema } from '@formily/react'
import cls from 'classnames'
import { isArr, isBool, isFn } from '@formily/shared'
import { Search, Table } from '@alifd/next'
import { TableProps, ColumnProps } from '@alifd/next/types/table'
import { SearchProps } from '@alifd/next/types/search'
import { useFilterOptions } from './useFilterOptions'
import { useFlatOptions } from './useFlatOptions'
import { useTitleAddon } from './useTitleAddon'
import { useSize } from './useSize'
import { useCheckSlackly, getCheckedProps } from './useCheckSlackly'
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
    schema.type === 'array' && schema?.items ? schema.items : schema
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
  const [selected, setSelected] = useState<any[]>()
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
  let dataSource = isArr(propsDataSource) ? propsDataSource : field.dataSource
  dataSource = isFn(rowKey)
    ? addPrimaryKey(dataSource, rowKey, primaryKey)
    : dataSource
  const flatDataSource = useFlatOptions(dataSource)
  const columns = useColumns()

  // Filter dataSource By Search
  const filteredDataSource = useFilterOptions(
    dataSource,
    searchValue,
    filterOption
  )

  // Order dataSource By filterSort
  const orderedFilteredDataSource = useMemo(() => {
    if (!filterSort) {
      return filteredDataSource
    }
    return [...filteredDataSource].sort((a, b) => filterSort(a, b))
  }, [filteredDataSource, filterSort])

  // readPretty Value
  const readPrettyDataSource = useMemo(
    () =>
      orderedFilteredDataSource.filter((item) =>
        selected?.includes(item?.[primaryKey])
      ),
    [orderedFilteredDataSource, selected, primaryKey]
  )

  const onInnerSearch = (searchText) => {
    const formatted = (searchText || '').trim()
    setSearchValue(searchText)
    onSearch?.(formatted)
  }

  const onInnerChange = (selectedRowKeys: any[], records: any[]) => {
    if (readOnly) {
      return
    }
    let outputOptions = records.map((item) => {
      const validItem = { ...item }
      delete validItem['__formily_key__']
      return validItem
    })
    let outputValue = optionAsValue ? outputOptions : selectedRowKeys
    if (mode === 'single') {
      outputValue = outputValue[0]
      outputOptions = outputOptions[0]
    }
    onChange?.(outputValue, outputOptions)
  }

  const onRowClick = (record) => {
    if (disabled || readOnly) {
      return
    }
    const selectedRowKey = record?.[primaryKey]
    const isSelected = selected?.includes(selectedRowKey)
    let selectedRowKeys = []
    let records = []
    if (mode === 'single') {
      selectedRowKeys = [selectedRowKey]
      records = [record]
    } else {
      if (isSelected) {
        selectedRowKeys = selected.filter((item) => item !== selectedRowKey)
      } else {
        selectedRowKeys = [...selected, selectedRowKey]
      }
      records = flatDataSource.filter((item) =>
        selectedRowKeys.includes(item?.[primaryKey])
      )
    }
    if (rowSelection?.checkStrictly !== false) {
      onInnerChange(selectedRowKeys, records)
    } else {
      onSlacklyChange(selectedRowKeys)
    }
  }

  // Fusion TreeData SlacklyChange
  const onSlacklyChange = (prevSelectedRowKeys: any[]) => {
    const { selectedRowKeys, records } = useCheckSlackly(
      prevSelectedRowKeys,
      selected,
      primaryKey,
      flatDataSource
    )

    onInnerChange(selectedRowKeys, records)
  }

  // Fusion Table Checkbox
  const titleAddon = useTitleAddon(
    selected,
    flatDataSource,
    primaryKey,
    mode,
    disabled,
    readOnly,
    onInnerChange
  )

  useEffect(() => {
    let inputValue = mode === 'single' ? [value] : isArr(value) ? value : []
    inputValue = optionAsValue
      ? inputValue.map((record: any) =>
          isFn(rowKey) ? rowKey(record) : record?.[primaryKey]
        )
      : inputValue
    setSelected(inputValue)
  }, [value, mode, primaryKey, rowKey])

  return (
    <div className={prefixCls}>
      {showSearch && !readPretty ? (
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
                getProps: (record, index) => ({
                  ...(rowSelection?.getProps?.(record, index) as any),
                  ...(rowSelection?.checkStrictly !== false
                    ? {}
                    : getCheckedProps(record, primaryKey, selected)), // 父子关联模式indeterminate值
                  disabled,
                }), // fusion
                selectedRowKeys: selected,
                onChange:
                  rowSelection?.checkStrictly !== false
                    ? onInnerChange
                    : onSlacklyChange,
                mode,
                ...titleAddon,
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
  primaryKey: 'key',
  mode: 'multiple',
}

export default SelectTable
