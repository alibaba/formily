import { ISchema } from '@formily/react'
export interface IDesignableFieldProps {
  name?: string
  components?: Record<string, React.JSXElementConstructor<unknown>>
  componentsPropsSchema?: Record<string, ISchema>
  notDraggableComponents?: string[]
  notDroppableComponents?: string[]
  dropFormItemComponents?: string[]
  dropReactionComponents?: string[]
  selfRenderChildrenComponents?: string[]
  inlineChildrenLayoutComponents?: string[]
  inlineLayoutComponents?: string[]
  restrictChildrenComponents?: Record<string, string[]>
  restrictParentComponents?: Record<string, string[]>
}
