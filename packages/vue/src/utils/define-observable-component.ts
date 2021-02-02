// some from mobx-vue: https://github.com/mobxjs/mobx-vue

import { isVue2 } from 'vue-demi'
import { defineObservableComponent as defineObservableComponentV2 } from './observer-in-vue2'
import { defineObservableComponent as defineObservableComponentV3 } from './observer-in-vue3'
import { ObservableComponentOptions } from '../types'

const defineObservableComponent = (originalOptions: ObservableComponentOptions) => {
  if (isVue2) {
    return defineObservableComponentV2(originalOptions)
  } else {
    return defineObservableComponentV3(originalOptions)
  }
}

export { defineObservableComponent }
