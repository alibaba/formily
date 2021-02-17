import { isFn, instOf } from '@formily/shared'
import {
  Form,
  Field,
  ArrayField,
  ObjectField,
  VoidField,
  Query,
} from '../models'
import {
  IFormState,
  IFieldState,
  IVoidFieldState,
  GeneralField,
  IGeneralFieldState,
} from '../types'

export const isForm = (node: any): node is Form => {
  return instOf(node, Form)
}

export const isField = (node: any): node is Field => {
  return instOf(node, Field)
}

export const isGeneralField = (node: any): node is GeneralField => {
  return instOf(node, Field) || instOf(node, VoidField)
}

export const isArrayField = (node: any): node is ArrayField => {
  return instOf(node, ArrayField)
}

export const isObjectField = (node: any): node is ObjectField => {
  return instOf(node, ObjectField)
}

export const isVoidField = (node: any): node is VoidField => {
  return instOf(node, VoidField)
}

export const isFormState = (state: any): state is IFormState => {
  if (isFn(state?.initialize)) return false
  return state?.displayName === 'Form'
}

export const isFieldState = (state: any): state is IFieldState => {
  if (isFn(state?.initialize)) return false
  return state?.displayName === 'Field'
}

export const isGeneralFieldState = (node: any): node is IGeneralFieldState => {
  if (isFn(node?.initialize)) return false
  return node?.displayName?.indexOf('Field') > -1
}

export const isArrayFieldState = (state: any): state is IFieldState => {
  if (isFn(state?.initialize)) return false
  return state?.displayName === 'ArrayField'
}

export const isDataField = (node: any) => {
  return isField(node) || isArrayField(node) || isObjectField(node)
}

export const isDataFieldState = (node: any) => {
  return (
    isFieldState(node) || isObjectFieldState(node) || isArrayFieldState(node)
  )
}

export const isObjectFieldState = (state: any): state is IFieldState => {
  if (isFn(state?.initialize)) return false
  return state?.displayName === 'ObjectField'
}

export const isVoidFieldState = (state: any): state is IVoidFieldState => {
  if (isFn(state?.initialize)) return false
  return state?.displayName === 'VoidField'
}

export const isQuery = (query: any): query is Query => {
  return query && query instanceof Query
}
