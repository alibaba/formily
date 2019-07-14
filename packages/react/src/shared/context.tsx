import React from 'react'
import { Form } from '@uform/core'
import { ISchema, IFormActions } from '@uform/types'
import { IBroadcast } from '@uform/utils'

export interface IStateContext {
  getSchema: (path: string) => ISchema
  form: Form
  actions: IFormActions
  locale: { [key: string]: any }
  broadcast: IBroadcast
}

export const MarkupContext = React.createContext<Partial<ISchema>>(null)
export const StateContext = React.createContext<Partial<IStateContext>>(null)
export const BroadcastContext = React.createContext<Partial<IBroadcast>>(null)
