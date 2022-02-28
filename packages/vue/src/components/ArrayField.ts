import { isVue2, h as _h } from 'vue-demi'
import ReactiveField from './ReactiveField'
import { getRawComponent } from '../utils/getRawComponent'

import type { IArrayFieldProps, DefineComponent } from '../types'
import { getFieldProps } from '../utils/getFieldProps'

let ArrayField: DefineComponent<IArrayFieldProps>

/* istanbul ignore else */
if (isVue2) {
  ArrayField = {
    functional: true,
    name: 'ArrayField',
    props: getFieldProps(),
    render(h, context) {
      const props = context.props as IArrayFieldProps
      const attrs = context.data.attrs
      const componentData = {
        ...context.data,
        props: {
          fieldType: 'ArrayField',
          fieldProps: {
            ...attrs,
            ...props,
            ...getRawComponent(props),
          },
        },
      }
      return _h(ReactiveField, componentData, context.children)
    },
  } as unknown as DefineComponent<IArrayFieldProps>
} else {
  ArrayField = {
    name: 'ArrayField',
    props: getFieldProps(),
    setup(props: IArrayFieldProps, context) {
      return () => {
        const componentData = {
          fieldType: 'ArrayField',
          fieldProps: {
            ...props,
            ...getRawComponent(props),
          },
        } as Record<string, unknown>
        return _h(ReactiveField, componentData, context.slots)
      }
    },
  } as unknown as DefineComponent<IArrayFieldProps>
}

export default ArrayField
