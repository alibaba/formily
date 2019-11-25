import { createContext } from 'react'
import { Broadcast } from './shared'
import { IForm } from '@uform/core'

export const BroadcastContext = createContext<Broadcast>(null)

export default createContext<IForm>(null)
