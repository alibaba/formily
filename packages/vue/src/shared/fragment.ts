import frag from 'vue-frag';
import { Component, ComponentOptions } from 'vue';
import { isVue2, Vue, defineComponent } from 'vue-demi';

export const Fragment = '#fragment'

let FragmentComponent: ComponentOptions<Vue> | Component

if (isVue2) {
  FragmentComponent = {
    name: 'Fragment',
    directives: {
      frag
    },
    render (h) {
      return h('div', {
        directives: [{
          name: 'frag'
        }],
      }, this?.$slots?.default)
    }
  } as ComponentOptions<Vue>
} else {
  FragmentComponent = defineComponent({
    name: 'Fragment',
    setup (props: Record<string, any>, { slots, attrs }) {
      return () => slots?.default(attrs)
    }
  })
}

export { FragmentComponent }

