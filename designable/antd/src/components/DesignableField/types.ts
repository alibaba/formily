import React from 'react'
import { ISchema } from '@formily/react'
import { ComponentNameMatcher } from '../../shared'
export interface IDesignableFieldFactoryProps {
  registryName: string
  components?: Record<string, React.JSXElementConstructor<unknown>>
  componentsIcon?: Record<string, React.ReactNode>
  componentsSourceIcon?: Record<string, React.ReactNode>
  componentsPropsSchema?: Record<string, ISchema>
  dropFormItemComponents?: ComponentNameMatcher[]
  dropReactionComponents?: ComponentNameMatcher[]
  selfRenderChildrenComponents?: ComponentNameMatcher[]
  inlineChildrenLayoutComponents?: ComponentNameMatcher[]
  inlineLayoutComponents?: ComponentNameMatcher[]
  restrictChildrenComponents?: Record<string, ComponentNameMatcher[]>
  restrictSiblingComponents?: Record<string, ComponentNameMatcher[]>
}
