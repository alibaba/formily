import React from 'react'

interface IFormGridContext {
  colWrap?: boolean
  columns?: number
  clientWidth?: number
  maxWidth?: number
  minWidth?: number
  maxColumns?: number
  [key: string]: any
}

export const FormGridContext = React.createContext<IFormGridContext>({})
