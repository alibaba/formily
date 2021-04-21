import { isVue2, defineComponent } from 'vue-demi'
import { observer as observerV2 } from './observerInVue2'
import { observer as observerV3 } from './observerInVue3'
import collectData from './collectData'
import { IObserverOptions } from '../types'

// There's no type that is compatible with vue2 & vue3 currently.
export function observer<P extends object = {}>(baseComponent: any,
  options?: IObserverOptions & { forwardRef: true }
) {
  if (isVue2) {
    return defineComponent<P>(observerV2(baseComponent, options))
  } else {
    return defineComponent<P>(observerV3(baseComponent, options))
  }
}

export { collectData }
