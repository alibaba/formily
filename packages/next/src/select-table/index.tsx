import React, { useEffect, useState, useMemo } from 'react'
import { observer, useFieldSchema, useField } from '@formily/react'
import cls from 'classnames'
import { isArr } from '@formily/shared'
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

export interface ISelectTableProps extends TableProps {
  mode?: 'multiple' | 'single'
  dataSource?: any[]
  optionAsValue?: boolean
  showSearch?: boolean
  searchProps?: SearchProps
  optionFilterProp?: string
  primaryKey?: string
  filterOption?: IFilterOption
  filterSort?: IFilterSort
  onSearch?: (keyword: string) => void
  onChange?: (value: any) => void
  value?: any
}

type ComposedSelectTable = React.FC<ISelectTableProps> & {
  Column?: React.FC<ISelectTableColumnProps>
}

const useColumns = () => {
  const schema = useFieldSchema()
  const columns: ISelectTableColumnProps[] = []

  schema.mapProperties((schema, name) => {
    if (schema['x-component']?.indexOf('Column') > -1) {
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
    primaryKey,
    ...otherTableProps
  } = props
  const prefixCls = usePrefixCls('formily-select-table', props)
  const [selected, setSelected] = useState<any[]>()
  const [searchValue, setSearchValue] = useState<string>()
  const field = useField() as any
  const dataSource = isArr(propsDataSource) ? propsDataSource : field.dataSource
  const columns = useColumns()

  // Fusion Table Checkbox
  const titleAddon = useTitleAddon(
    selected,
    dataSource,
    primaryKey,
    mode,
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

  const onInnerSearch = (searchText) => {
    const formatted = (searchText || '').trim()
    setSearchValue(searchText)
    onSearch?.(formatted)
  }

  const onInnerChange = (selectedRowKeys: any[], records: any[]) => {
    let outputValue = optionAsValue ? records : selectedRowKeys
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
      {showSearch ? (
        <Search
          {...searchProps}
          className={cls(`${prefixCls}-search`, searchProps?.className)}
          onSearch={onInnerSearch}
        />
      ) : null}
      <Table
        {...otherTableProps}
        className={cls(`${prefixCls}-table`, className)}
        dataSource={orderedFilteredDataSource}
        rowSelection={{
          ...rowSelection,
          selectedRowKeys: selected,
          onChange: onInnerChange,
          mode,
          ...titleAddon,
        }}
        columns={props.columns || columns}
        primaryKey={primaryKey}
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
