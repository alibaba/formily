import { createFormActions, createAsyncFormActions } from '@formily/react'
import { mergeActions, createActions, createAsyncActions } from 'react-eva'
import { ISchemaFormActions, ISchemaFormAsyncActions } from '../types'

export const createSchemaFormActions = (): ISchemaFormActions =>
  mergeActions(
    createFormActions(),
    createActions('getSchema', 'getFormSchema')
  ) as ISchemaFormActions

export const createAsyncSchemaFormActions = (): ISchemaFormAsyncActions =>
  mergeActions(
    createAsyncFormActions(),
    createAsyncActions('getSchema', 'getFormSchema')
  ) as ISchemaFormAsyncActions
