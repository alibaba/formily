import React from 'react'

export const SchemaRenderContext =
  React.createContext<{
    components?: {
      [key: string]: React.JSXElementConstructor<unknown>
    }
  }>(null)
