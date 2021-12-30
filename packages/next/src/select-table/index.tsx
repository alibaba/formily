import React, { useEffect, useState, useMemo } from 'react'
import { observer, useFieldSchema, useField, Schema } from '@formily/react'
import cls from 'classnames'
import { isArr, isBool, isFn } from '@formily/shared'
import { Search, Table } from '@alifd/next'
import { TableProps, ColumnProps } from '@alifd/next/types/table'
import { SearchProps } from '@alifd/next/types/search'
import { useFilterOptions } from './useFilterOptions'
import { useTitleAddon } from './useTitleAddon'
import { usePrefixCls } from '../__builtins__'

type IFilterOption = boolean | ((option: any, keyword: string) => boolean)

type IFilterSort = (optionA: any, optionB: any) => number

export interface ISelectTableColumnProps extends ColumnProps {
  key: React.ReactText
}

// @ts-ignore
export interface ISelectTableProps extends TableProps {
  mode?: 'multiple' | 'single'
  dataSource?: any[]
  optionAsValue?: boolean
  showSearch?: boolean
  searchProps?: SearchProps
  optionFilterProp?: string
  primaryKey?: string | ((record: any) => string)
  filterOption?: IFilterOption
  filterSort?: IFilterSort
  onSearch?: (keyword: string) => void
  onChange?: (value: any) => void
  value?: any
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
  dataSource.map((item) => ({
    ...item,
    [primaryKey]: rowKey(item),
  }))

export const SelectTable: ComposedSelectTable = observer((props) => {
  const {
    mode,
    dataSource: propsDataSource,
    optionAsValue,
    showSearch,
    filterOption,
    optionFilterProp,
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
  const readPretty = field.readPretty
  const primaryKey = isFn(rowKey) ? '__formily_key__' : rowKey
  let dataSource = isArr(propsDataSource) ? propsDataSource : field.dataSource
  dataSource = isFn(rowKey)
    ? addPrimaryKey(dataSource, rowKey, primaryKey)
    : dataSource
  const columns = useColumns()

  // Fusion Table Checkbox
  const titleAddon = useTitleAddon(
    selected,
    dataSource,
    primaryKey,
    mode,
    disabled,
    onChange
  )

  // Filter dataSource By Search
  const filteredDataSource = useFilterOptions(
    dataSource,
    optionFilterProp || primaryKey,
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
    let outputValue = optionAsValue
      ? records.map(({ __formily_key__, ...validItem }) => validItem)
      : selectedRowKeys
    outputValue = mode === 'single' ? outputValue[0] : outputValue
    onChange?.(outputValue)
  }

  useEffect(() => {
    let inputValue = mode === 'single' ? [value] : isArr(value) ? value : []
    inputValue = optionAsValue
      ? inputValue.map((v: any) => v?.[primaryKey])
      : inputValue
    setSelected(inputValue)
  }, [value, mode, primaryKey])

  return (
    <div className={prefixCls}>
      {showSearch && !readPretty ? (
        <Search
          {...searchProps}
          className={cls(`${prefixCls}-search`, searchProps?.className)}
          onSearch={onInnerSearch}
          disabled={disabled}
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
                  ...(rowSelection?.getProps(record, index) as any),
                  disabled,
                }), // fusion
                selectedRowKeys: selected,
                onChange: onInnerChange,
                mode,
                ...titleAddon,
              }
        }
        columns={props.columns || columns}
        primaryKey={primaryKey}
        loading={loading}
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
