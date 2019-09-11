import { createContext } from 'react'
import { Broadcast } from '@uform/shared'
import { IForm } from '@uform/core'

export const BroadcastContext = createContext<Broadcast>(null)

export default createContext<IForm>(null)
