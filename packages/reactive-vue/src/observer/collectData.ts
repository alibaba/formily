// https://github.com/mobxjs/mobx-vue/blob/master/src/collectData.ts

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2018-06-08 10:16
 */

import { isObservable } from '@formily/reactive';
import Vue from 'vue';
import { DefaultData } from 'vue/types/options';

/**
* collect the data which defined for vue
* and filter the observable data to avoid duplicated watching by vue
* @param {Vue} vm
* @param {DefaultData<Vue>} data
* @returns {any} filtered data for vue definition
*/
export default function collectData(vm: Vue, data?: DefaultData<Vue>) {

  const dataDefinition = typeof data === 'function' ? data.call(vm, vm) : (data || {});
  const filteredData = Object.keys(dataDefinition).reduce((result: any, field) => {
    
    const value = dataDefinition[field];

    if (isObservable(value)) {
      Object.defineProperty(vm, field, {
        configurable: true,
        get() {
          return value;
        },
        set() {}
      });
    } else {
      result[field] = value;
    }

    return result;

  }, {});

  return filteredData;
}
