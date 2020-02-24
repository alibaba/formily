import { createContext } from 'react'
import { Broadcast } from './shared'
import { IForm } from '@formily/core'
import { IField, IVirtualField } from '@formily/core'

export const BroadcastContext = createContext<Broadcast>(null)

export const FieldContext = createContext<IField | IVirtualField>(null)

export default createContext<IForm>(null)
