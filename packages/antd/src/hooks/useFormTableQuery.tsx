import { useState, useRef } from 'react'
import {
  useFormQuery,
  IEffectMiddleware,
  ISchemaFormActions
} from '@formily/react-schema-renderer'

type IQueryParams = {
  pagination: {
    total: number
    pageSize: number
    current: number
  }
  sorter?: {
    order: string
    field: string
    columnKey: string
    column: any
  }
  filters?: {
    [dataIndex: string]: any
  }
  values: any
}

type IQueryResponse = {
  dataSource: any[]
  total: number
  pageSize: number
  current: number
}

export const useFormTableQuery = (
  service: (payload: IQueryParams) => IQueryResponse | Promise<IQueryResponse>,
  middlewares?: IEffectMiddleware<ISchemaFormActions>[]
) => {
  const ref = useRef<any>({})
  const [pagination, setPagination] = useState<any>({
    current: 1,
    total: 0,
    pageSize: 20
  })
  const [sorter, setSorter] = useState<any>()
  const [filters, setFilters] = useState<any>()
  const { effects, trigger, loading, response } = useFormQuery(async values => {
    return service({
      values,
      pagination: ref.current.pagination,
      sorter: ref.current.sorter,
      filters: ref.current.filters
    })
  }, middlewares)
  ref.current.pagination = pagination
  ref.current.sorter = sorter
  ref.current.filters = filters
  return {
    trigger,
    form: {
      effects
    },
    table: {
      loading,
      dataSource: response.dataSource || [],
      pagination: {
        ...pagination,
        current: response.current,
        pageSize: response.pageSize,
        total: response.total
      },
      onChange: (pagination: any, filters: any, sorter: any) => {
        if (pagination) setPagination(pagination)
        if (filters) setFilters(filters)
        if (sorter) setSorter(sorter)
        trigger()
      }
    }
  }
}
