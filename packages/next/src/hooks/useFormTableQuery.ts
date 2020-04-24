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
    columnKey?: string
    column?: any
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

type IQueryContext = Partial<{
  pagination: IQueryParams['pagination']
  sorter: IQueryParams['sorter']
  filters: IQueryParams['filters']
  setPagination: (pagination: IQueryParams['pagination']) => void
  setFilters: (filters: IQueryParams['filters']) => void
  setSorter: (sorter: IQueryParams['sorter']) => void
}>

export const useFormTableQuery = (
  service: (payload: IQueryParams) => IQueryResponse | Promise<IQueryResponse>,
  middlewares?: IEffectMiddleware<ISchemaFormActions>[]
) => {
  const ref = useRef<IQueryContext>({})
  const [pagination, setPagination] = useState<IQueryParams['pagination']>({
    current: 1,
    total: 0,
    pageSize: 20
  })
  const [sorter, setSorter] = useState<IQueryParams['sorter']>()
  const [filters, setFilters] = useState<IQueryParams['filters']>()
  const { effects, trigger, loading, response } = useFormQuery<
    IQueryParams,
    IQueryResponse,
    IQueryContext
  >(
    async values => {
      return service({
        values,
        pagination: ref.current.pagination,
        sorter: ref.current.sorter,
        filters: ref.current.filters
      })
    },
    middlewares,
    ref.current
  )
  ref.current.pagination = pagination
  ref.current.sorter = sorter
  ref.current.filters = filters
  ref.current.setPagination = setPagination
  ref.current.setSorter = setSorter
  ref.current.setFilters = setFilters
  return {
    setPagination,
    setSorter,
    setFilters,
    trigger,
    form: {
      effects
    },
    table: {
      loading,
      dataSource: response.dataSource,
      onSort: (field: string, order: string) => {
        setSorter({
          field,
          order
        })
        trigger('onSortQuery')
      },
      onFilter: (filters: any) => {
        setFilters(filters)
        trigger('onFilterQuery')
      }
    },
    pagination: {
      current: response.current || 1,
      pageSize: response.pageSize || 20,
      total: response.total || 0,
      onPageSizeChange(pageSize: number) {
        setPagination({
          ...pagination,
          pageSize
        })
        trigger('onPageQuery')
      },
      onChange(current: number) {
        setPagination({
          ...pagination,
          current
        })
        trigger('onPageQuery')
      }
    }
  }
}
