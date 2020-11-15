import Vue, { Component } from 'vue'
import { mount } from '@vue/test-utils'
import VueCompositionAPI, { defineComponent } from '@vue/composition-api'

Vue.use(VueCompositionAPI)

export default function renderHook(
  setup: () => any,
  options: {
    template?: string
    components?: { [key: string]: Component }
    wrapper?: Component
  } = {}
) {
  const { template = '<div></div>', components = {}, wrapper } = options
  const App = defineComponent({
    components: components,
    setup,
    template: template
  })
  return mount(App, {
    parentComponent: wrapper
  })
}
