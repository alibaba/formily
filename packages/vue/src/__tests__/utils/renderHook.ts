// https://github.com/xiaoping027/vue-renderhook/blob/master/src/index.ts
import { mount, createLocalVue } from '@vue/test-utils'
import VueCompositionAPI, { defineComponent } from '@vue/composition-api'

const localVue = createLocalVue()

localVue.use(VueCompositionAPI)

export default function renderHook<V>(setup: () => V) {
  const App = defineComponent({
    setup,
    template: '<div></div>'
  })
  return mount<Vue & V>(App, {
    localVue
  })
}
