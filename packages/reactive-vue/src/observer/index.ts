import { isVue2 } from 'vue-demi'
import { observer as observerV2 } from './observerInVue2'
import { observer as observerV3 } from './observerInVue3'
import collectData from './collectData'
import { IObserverOptions } from '../types'

export function observer<C>(baseComponent: C, options?: IObserverOptions): C {
  /* istanbul ignore else */
  if (isVue2) {
    return observerV2(baseComponent, options)
  } else {
    return observerV3(baseComponent, options)
  }
}

export { collectData }
