import { combineReducers } from 'redux'

import preview from './preview'
import codemode from './codemode'
import componentId from './componentId'
import layoutId from './layoutId'
import componentProps from './componentProps'
import gbConfig from './gbConfig'
import initSchemaData from './initSchemaData'

export default combineReducers({
  componentId,
  preview,
  codemode,
  componentProps,
  gbConfig,
  initSchemaData,
  layoutId
})
