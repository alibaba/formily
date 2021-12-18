import frag from 'vue-frag'
import { DefineComponent } from '../types'
import { isVue2, defineComponent } from 'vue-demi'

export const Fragment = '#fragment'

let FragmentComponent: DefineComponent<{}>

if (isVue2) {
  FragmentComponent = defineComponent({
    name: 'Fragment',
    directives: {
      frag: frag as any,
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
        vm?.$scopedSlots?.default?.(vm.$attrs)
      )
    },
  })
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
