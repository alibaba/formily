import { isVue2, h as _h } from 'vue-demi'
import ReactiveField from './ReactiveField'
import { getRawComponent } from '../utils/getRawComponent'

import type { IVoidFieldProps, DefineComponent } from '../types'
import { getVoidFieldProps } from '../utils/getFieldProps'

let VoidField: DefineComponent<IVoidFieldProps>

/* istanbul ignore else */
if (isVue2) {
  VoidField = {
    functional: true,
    name: 'VoidField',
    props: getVoidFieldProps(),
    render(h, context) {
      const props = context.props as IVoidFieldProps
      const attrs = context.data.attrs
      const componentData = {
        ...context.data,
        props: {
          fieldType: 'VoidField',
          fieldProps: {
            ...attrs,
            ...props,
            ...getRawComponent(props),
          },
        },
      }
      return _h(ReactiveField, componentData, context.children)
    },
  } as unknown as DefineComponent<IVoidFieldProps>
} else {
  VoidField = {
    name: 'VoidField',
    props: getVoidFieldProps(),
    setup(props: IVoidFieldProps, context) {
      return () => {
        const componentData = {
          fieldType: 'VoidField',
          fieldProps: {
            ...props,
            ...getRawComponent(props),
          },
        } as Record<string, unknown>
        return _h(ReactiveField, componentData, context.slots)
      }
    },
  } as unknown as DefineComponent<IVoidFieldProps>
}

export default VoidField
