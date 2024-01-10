// https://github.com/vueComponent/ant-design-vue/blob/next/components/space/index.tsx

import { h } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { stylePrefix } from '../__builtins__/configs'

import type { VNode } from 'vue'
import { useFormLayout } from '../form-layout'

export type SpaceProps = {
  size: 'small' | 'middle' | 'large' | number
  direction: 'horizontal' | 'vertical'
  align: 'start' | 'end' | 'center' | 'baseline'
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

export const Space = defineComponent<SpaceProps>({
  name: 'FSpace',
  props: ['size', 'direction', 'align'],
  setup(props, { attrs, slots }) {
    const layout = useFormLayout()

    return () => {
      const {
        align,
        size = layout.value?.spaceGap ?? 'small',
        direction = 'horizontal',
      } = props

      const prefixCls = `${stylePrefix}-space`
      const children = slots.default?.()
      let items: VNode[] = []
      if (Array.isArray(children)) {
        if (children.length === 1) {
          if ((children[0]['tag'] as string)?.endsWith('Fragment')) {
            // Fragment hack
            items = (children[0]['componentOptions'] as { children: VNode[] })
              ?.children
          } else {
            items = children
          }
        } else {
          items = children
        }
      }
      const len = items.length

      if (len === 0) {
        return null
      }

      const mergedAlign =
        align === undefined && direction === 'horizontal' ? 'center' : align

      const someSpaceClass = {
        [prefixCls]: true,
        [`${prefixCls}-${direction}`]: true,
        [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
      }

      const itemClassName = `${prefixCls}-item`
      const marginDirection = 'marginRight' // directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

      const renderItems = items.map((child, i) =>
        h(
          'div',
          {
            class: itemClassName,
            key: `${itemClassName}-${i}`,
          },
          { default: () => [child] }
        )
      )

      return h(
        'div',
        {
          ...attrs,
          class: { ...(attrs as any).class, ...someSpaceClass },
          style: {
            ...(attrs as any).style,
            gap:
              typeof size === 'string' ? `${spaceSize[size]}px` : `${size}px`,
          },
        },
        { default: () => renderItems }
      )
    }
  },
})

export default Space
