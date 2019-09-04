import initialObject from './object'
import initialRender from './render'
import initialVirtualbox from './virtualbox'
import { initialContainer } from '../shared/core'
import intialState from '../state'

export default () => {
  initialContainer()
  intialState()
  initialObject()
  initialRender()
  initialVirtualbox()
}
