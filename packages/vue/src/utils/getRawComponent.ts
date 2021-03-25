import { IFieldProps, VueComponent } from '../types'
import { toRaw } from 'vue-demi'

export const getRawComponent = (props: IFieldProps<VueComponent, VueComponent>) => {
  const { component, decorator } = props
  let newComponent: typeof props.component
  let newDecorator: typeof props.component
  if (Array.isArray(component)) {
    newComponent = [toRaw(component[0]), component[1]]
  }
  if (Array.isArray(decorator)) {
    newDecorator = [toRaw(decorator[0]), decorator[1]]
  }
  return { component: newComponent, decorator: newDecorator }
}
