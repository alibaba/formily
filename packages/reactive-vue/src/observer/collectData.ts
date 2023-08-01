// https://github.com/mobxjs/mobx-vue/blob/master/src/collectData.ts

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2018-06-08 10:16
 */

import { isObservable } from '@formily/reactive'

export default function collectData(vm: any, data?: any) {
  const dataDefinition =
    typeof data === 'function' ? data.call(vm, vm) : data || {}
  const filteredData = Object.keys(dataDefinition).reduce(
    (result: any, field) => {
      const value = dataDefinition[field]

      if (isObservable(value)) {
        Object.defineProperty(vm, field, {
          configurable: true,
          get() {
            return value
          },
        })
      } else {
        result[field] = value
      }

      return result
    },
    {}
  )

  return filteredData
}
