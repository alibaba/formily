import { observable } from './observable'
import { box } from './box'
import { ref } from './ref'
import { shallow } from './shallow'

export const annotations = {
  observable,
  deep: observable,
  shallow: shallow,
  box,
  ref,
}
