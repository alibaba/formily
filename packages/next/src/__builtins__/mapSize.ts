import { useFormLayout } from '../form-layout'

export const mapSize = (props: any) => {
  const layout = useFormLayout()
  const takeSize = () => {
    return layout.size === 'default' ? 'medium' : layout.size
  }
  return {
    ...props,
    size: props.size || takeSize(),
  }
}
