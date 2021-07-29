import frag from 'vue-frag'
import { VueComponent } from '../types'
import { isVue2, defineComponent } from 'vue-demi'

export const Fragment = '#fragment'

let FragmentComponent: VueComponent

if (isVue2) {
  FragmentComponent = {
    name: 'Fragment',
    directives: {
      frag,
    },
    render(h) {
      const vm = this as any
      return h(
        'div',
        {
          directives: [
            {
              name: 'frag',
            },
          ],
        },
        vm?.$slots?.default
      )
    },
  }
} else {
  /* istanbul ignore next */
  FragmentComponent = defineComponent({
    name: 'Fragment',
    setup(props: Record<string, any>, { slots, attrs }) {
      return () => slots?.default?.(attrs)
    },
  })
}

export { FragmentComponent }
