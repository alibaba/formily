import { ISchema } from '@formily/react'
import { ComponentNameMatcher } from '../../shared'
export interface IDesignableFieldProps {
  name?: string
  components?: Record<string, React.JSXElementConstructor<unknown>>
  componentsPropsSchema?: Record<string, ISchema>
  dropFormItemComponents?: ComponentNameMatcher[]
  dropReactionComponents?: ComponentNameMatcher[]
  selfRenderChildrenComponents?: ComponentNameMatcher[]
  inlineChildrenLayoutComponents?: ComponentNameMatcher[]
  inlineLayoutComponents?: ComponentNameMatcher[]
  restrictChildrenComponents?: Record<string, ComponentNameMatcher[]>
}
