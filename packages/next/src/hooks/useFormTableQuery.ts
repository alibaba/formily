import { useState, useRef } from 'react'
import {
  useFormQuery,
  IEffectMiddleware,
  ISchemaFormActions
} from '@formily/react-schema-renderer'
import { defaults } from '@formily/shared'

interface IQueryParams {
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

interface IQueryResponse {
  dataSource: any[]
  total: number
  pageSize: number
  current: number
}

interface IQueryContext {
  pagination?: IQueryParams['pagination']
  sorter?: IQueryParams['sorter']
  filters?: IQueryParams['filters']
  trigger?: (type: string) => void
  setPagination?: (pagination: IQueryParams['pagination']) => void
  setFilters?: (filters: IQueryParams['filters']) => void
  setSorter?: (sorter: IQueryParams['sorter']) => void
}

interface IQueryProps {
  pagination?: IQueryParams['pagination']
  sorter?: IQueryParams['sorter']
  filters?: IQueryParams['filters']
}

export const useFormTableQuery = (
  service: (payload: IQueryParams) => IQueryResponse | Promise<IQueryResponse>,
  middlewares?: IEffectMiddleware<ISchemaFormActions>[],
  defaultProps: IQueryProps = {}
) => {
  const ref = useRef<IQueryContext>({})
  const [pagination, setPagination] = useState<IQueryParams['pagination']>(
    defaults(
      {
        current: 1,
        total: 0,
        pageSize: 20
      },
      defaultProps.pagination
    )
  )
  const [sorter, setSorter] = useState<IQueryParams['sorter']>(
    defaultProps.sorter
  )
  const [filters, setFilters] = useState<IQueryParams['filters']>(
    defaultProps.filters
  )
  const { effects, trigger, onSubmit, loading, response } = useFormQuery<
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
  ref.current.trigger = trigger
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
      effects,
      onSubmit
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
