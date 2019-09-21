import { createContext, JSXElementConstructor } from 'react'
import { Schema } from './shared/schema'

export const FormItemContext = createContext<JSXElementConstructor<any>>(null)

export default createContext<Schema>(null)
