import * as React from 'react'
import { isFn, isArr } from '@formily/shared'

type IFilterOption = boolean | ((option: any, keyword: string) => boolean)

function includes(test: React.ReactNode, search: string) {
  return toArray(test).join('').toUpperCase().includes(search)
}

function toArray<T>(value: T | T[]): T[] {
  if (isArr(value)) {
    return value
  }
  return value !== undefined ? [value] : []
}

const useFilterOptions = (
  options: any[],
  searchKey?: string,
  searchValue?: string,
  filterOption?: IFilterOption
) =>
  React.useMemo(() => {
    if (!searchValue || filterOption === false) {
      return options
    }
    const upperSearch = searchValue.toUpperCase()
    const filterFunc = isFn(filterOption)
      ? filterOption
      : (_: string, option: any) => includes(option[searchKey], upperSearch)

    const doFilter = (arr: any[]) => {
      const filterArr: any[] = []
      arr.forEach((item) => {
        if (item?.children?.length) {
          const filterChildren = doFilter(item.children)
          if (filterChildren.length) {
            filterArr.push({ ...item, children: filterChildren })
          } else if (filterFunc(searchValue, item)) {
            filterArr.push({ ...item, children: [] })
          }
        } else if (filterFunc(searchValue, item)) {
          filterArr.push(item)
        }
      })
      return filterArr
    }

    return doFilter(options)
  }, [options, searchKey, searchValue, filterOption])

export { useFilterOptions }
