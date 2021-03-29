import Vue, { ComponentOptions } from 'vue'
import { isVue2 } from 'vue-demi'
import { observer as observerV2, VueClass, } from './observerInVue2'
import { observer as observerV3 } from './observerInVue3'
import collectData from './collectData'

 function observer<VC extends VueClass<Vue>>(Component: VC | ComponentOptions<Vue>): VC;
 function observer <VC extends VueClass<Vue>> (Component: VC | ComponentOptions<Vue>) {
  if (isVue2) {
    return observerV2(Component)
  } else {
    return observerV3(Component)
  }
}

export { observer, collectData }
