import { observable } from './observable'
import { box } from './box'
import { ref } from './ref'
import { shallow } from './shallow'
import { action } from './action'

export const annotations = {
  action,
  observable,
  deep: observable,
  shallow: shallow,
  box,
  ref,
}
