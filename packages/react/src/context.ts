import { createContext } from 'react'
import { Broadcast } from './shared'
import { IForm } from '@uform/core'
import { IField, IVirtualField } from '@uform/core'

export const BroadcastContext = createContext<Broadcast>(null)

export const FieldContext = createContext<IField | IVirtualField>(null)

export default createContext<IForm>(null)
