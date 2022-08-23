import { Fragment, h } from '@formily/vue'
import { defineComponent, onBeforeUnmount } from 'vue-demi'
export interface IPortalProps {
  id?: string | symbol
}

const PortalMap = new Map<string | symbol, any>()

export const createPortalProvider = (id: string | symbol) => {
  const Portal = defineComponent({
    name: 'ProtalProvider',
    props: {
      id: {
        type: [String, Symbol],
        default: id,
      },
    },

    setup(props) {
      onBeforeUnmount(() => {
        const { id } = props
        if (id && PortalMap.has(id)) {
          PortalMap.delete(id)
        }
      })
    },

    render() {
      const { id } = this
      if (id && !PortalMap.has(id)) {
        PortalMap.set(id, this)
      }

      return h(Fragment, {}, this.$scopedSlots)
    },
  })

  return Portal
}

export function getProtalContext(id: string | symbol) {
  return PortalMap.get(id)
}
