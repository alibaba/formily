import { InjectionKey, Ref } from 'vue-demi'
import { Schema } from '@formily/json-schema'
import { ISchemaFieldFactoryOptions } from '../types'
export const FormSymbol: InjectionKey<Ref<Formily.Core.Models.Form>> = Symbol('form')
export const FieldSymbol: InjectionKey<Ref<Formily.Core.Types.GeneralField>> = Symbol('field')
export const SchemaMarkupSymbol: InjectionKey<Ref<Schema>> = Symbol('schemaMarkup')
export const SchemaSymbol: InjectionKey<Ref<Schema>> = Symbol('schema')
export const SchemaExpressionScopeSymbol: InjectionKey<any> = Symbol('schemaExpression')
export const SchemaOptionsSymbol: InjectionKey<ISchemaFieldFactoryOptions> = Symbol('schemaOptions')
