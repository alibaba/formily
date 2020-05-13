import { ComponentTypes } from '../utils/types'
import nextComponents from '../utils/nextCompProps'
import antdComponents from '../utils/antdCompProps'

export const getDefaultComponentType = ({
  showAntdComponents,
  showFusionComponents
}) => {
  let defaultComponentType
  if (!showAntdComponents && !showFusionComponents) {
    defaultComponentType = ComponentTypes.CUSTOM
  } else if (showAntdComponents && showFusionComponents) {
    defaultComponentType = ComponentTypes.ANTD
  } else if (!showAntdComponents) {
    defaultComponentType = ComponentTypes.FUSION
  } else if (!showFusionComponents) {
    defaultComponentType = ComponentTypes.ANTD
  }
  return defaultComponentType
}

export const getComponentsByComponentType = ({
  componentType,
  customComponents
}) => {
  switch (componentType) {
    case ComponentTypes.ANTD:
      return antdComponents
    case ComponentTypes.FUSION:
      return nextComponents
    case ComponentTypes.CUSTOM:
      return customComponents
  }
}
