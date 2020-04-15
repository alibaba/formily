import { createContext } from 'react'
import { Broadcast } from './shared'
import { IForm } from '@formily/core'
import { IField, IVirtualField } from '@formily/core'
import { ILayoutProps } from './types'


export const BroadcastContext = createContext<Broadcast>(null)
export const FieldContext = createContext<IField | IVirtualField>(null)
export const LayoutContext = createContext<Omit<ILayoutProps, "children">>({})


export default createContext<IForm>(null)
