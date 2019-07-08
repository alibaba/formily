import { initialContainer } from '../shared/core'
import intialState from '../state'
import initialObject from './object'
import initialRender from './render'
import initialVirtualbox from './virtualbox'

export default () => {
  initialContainer()
  intialState()
  initialObject()
  initialRender()
  initialVirtualbox()
}
