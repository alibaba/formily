import React, { useEffect, useState, useMemo } from 'react'
import { observer, useFieldSchema } from '@formily/react'
import { Schema, SchemaKey } from '@formily/json-schema'
import cls from 'classnames'
import { isArr } from '@formily/shared'
import { Search, Table } from '@alifd/next'
import { TableProps, ColumnProps } from '@alifd/next/types/table'
import { useFilterOptions } from './useFilterOptions'
import { useTitleAddon } from './useTitleAddon'
import { usePrefixCls } from '../__builtins__'

import './main.scss' // todo temp

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
  optionFilterProp?: string
  filterOption?: IFilterOption
  filterSort?: IFilterSort
  onSearch?: (keyword: string) => void
  onChange?: (value: any) => void
  value?: any
}

type ComposedSelectTable = React.FC<ISelectTableProps> & {
  TableColumn?: React.FC<ISelectTableColumnProps>
}

const useColumns = () => {
  const schema = useFieldSchema()
  const columns: { name: SchemaKey; props: any; schema: Schema }[] = []

  schema.mapProperties((schema, name) => {
    if (schema['x-component']?.indexOf('Column') > -1) {
      const props = schema?.['x-component-props']
      columns.push({
        ...props,
        title: props?.title || schema?.title,
        dataIndex: props?.dataIndex || name,
      })
      // columns.push({
      //   name,
      //   props: {
      //     ...props,
      //     title: props?.title || schema?.title,
      //     dataIndex: props?.dataIndex || name,
      //   },
      //   schema,
      // })
    }
  })
  return columns
}

const SelectTable: ComposedSelectTable = observer((props) => {
  const {
    mode,
    dataSource,
    optionAsValue,
    showSearch,
    filterOption,
    optionFilterProp,
    filterSort,
    onSearch,
    className,
    value,
    onChange,
    rowSelection,
    ...otherTableProps
  } = props
  const prefixCls = usePrefixCls('formily-select-table', props)
  const [selected, setSelected] = useState<any[]>()
  const [searchValue, setSearchValue] = useState<string>()
  const columns = useColumns()

  // Filter dataSource By Search
  const filteredDataSource = useFilterOptions(
    dataSource,
    optionFilterProp || props.primaryKey,
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

  // Fusion侧多选模式，需要自定义表格头部Checkbox
  const titleAddon = useTitleAddon(
    selected,
    dataSource,
    props.primaryKey,
    mode,
    onChange
  )

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
    const primaryKey = props.primaryKey as string
    let inputValue = mode === 'single' ? [value] : isArr(value) ? value : []
    inputValue = optionAsValue
      ? inputValue.map((v: any) => v?.[primaryKey])
      : inputValue
    setSelected(inputValue)
  }, [value, mode])

  return (
    <div className={cls(prefixCls, className)}>
      {showSearch ? (
        <Search className={`${prefixCls}-search`} onSearch={onInnerSearch} />
      ) : null}
      <Table
        className={`${prefixCls}-table`}
        dataSource={orderedFilteredDataSource}
        rowSelection={{
          ...rowSelection,
          mode,
          selectedRowKeys: selected,
          onChange: onInnerChange,
          ...titleAddon,
        }}
        columns={columns}
        {...otherTableProps}
      >
        {/* {columns.map(({ props }, key) => (
          <Table.Column key={key} {...props} />
        ))} */}
      </Table>
    </div>
  )
})

const TableColumn: React.FC<ISelectTableColumnProps> = ({ children }) => {
  return <>{children}</>
}

SelectTable.TableColumn = TableColumn

SelectTable.defaultProps = {
  showSearch: false,
  primaryKey: 'key',
}

export default SelectTable
