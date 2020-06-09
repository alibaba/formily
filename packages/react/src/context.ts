import { createContext } from 'react'
import { Broadcast } from './shared'
import { ILayoutProps } from './types'
import { IForm, IField, IVirtualField } from '@formily/core'

export const BroadcastContext = createContext<Broadcast>(null)
export const FieldContext = createContext<IField | IVirtualField>(null)
export const LayoutContext = createContext<Omit<ILayoutProps, 'children'>>({})

export default createContext<IForm>(null)
