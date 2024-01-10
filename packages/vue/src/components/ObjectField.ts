import { isVue2, h as _h } from 'vue-demi'
import ReactiveField from './ReactiveField'
import { getRawComponent } from '../utils/getRawComponent'

import type { IObjectFieldProps, DefineComponent } from '../types'
import { getFieldProps } from '../utils/getFieldProps'

let ObjectField: DefineComponent<IObjectFieldProps>

/* istanbul ignore else */
if (isVue2) {
  ObjectField = {
    functional: true,
    name: 'ObjectField',
    props: getFieldProps(),
    render(h, context) {
      const props = context.props as IObjectFieldProps
      const attrs = context.data.attrs
      const componentData = {
        ...context.data,
        props: {
          fieldType: 'ObjectField',
          fieldProps: {
            ...attrs,
            ...props,
            ...getRawComponent(props),
          },
        },
      }
      return _h(ReactiveField, componentData, context.children)
    },
  } as unknown as DefineComponent<IObjectFieldProps>
} else {
  ObjectField = {
    name: 'ObjectField',
    props: getFieldProps(),
    setup(props: IObjectFieldProps, context) {
      return () => {
        const componentData = {
          fieldType: 'ObjectField',
          fieldProps: {
            ...props,
            ...getRawComponent(props),
          },
        } as Record<string, unknown>
        return _h(ReactiveField, componentData, context.slots)
      }
    },
  } as unknown as DefineComponent<IObjectFieldProps>
}

export default ObjectField
