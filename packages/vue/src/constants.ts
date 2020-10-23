import { InjectionKey } from '@vue/composition-api'
import { Broadcast } from './shared'
import { ILayoutProps } from './types'
import { IForm, IField, IVirtualField } from '@formily/core'

export const BroadcastSymbol: InjectionKey<Broadcast> = Symbol('broadcast')
export const FieldSymbol: InjectionKey<IField | IVirtualField> = Symbol('field')
export const LayoutSymbol: InjectionKey<Omit<
  ILayoutProps,
  'children'
>> = Symbol('layout')
export const FormSymbol: InjectionKey<IForm> = Symbol('form')
