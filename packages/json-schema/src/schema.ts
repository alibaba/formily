import {
  ISchema,
  SchemaEnum,
  SchemaProperties,
  SchemaReaction,
  SchemaTypes,
  SchemaKey,
  ISchemaTransformerOptions,
} from './types'
import { IFieldFactoryProps } from '@formily/core'
import { map, each, isFn, instOf, FormPath, isStr } from '@formily/shared'
import { compile, silent, shallowCompile, registerCompiler } from './compiler'
import { transformFieldProps } from './transformer'
import {
  reducePatches,
  registerPatches,
  registerPolyfills,
  enablePolyfills,
} from './patches'
import {
  registerVoidComponents,
  registerTypeDefaultComponents,
} from './polyfills'
import { SchemaNestedMap } from './shared'

export class Schema<
  Decorator = any,
  Component = any,
  DecoratorProps = any,
  ComponentProps = any,
  Pattern = any,
  Display = any,
  Validator = any,
  Message = any,
  ReactionField = any
> implements ISchema
{
  parent?: Schema
  root?: Schema
  name?: SchemaKey
  title?: Message
  description?: Message
  default?: any
  readOnly?: boolean
  writeOnly?: boolean
  type?: SchemaTypes
  enum?: SchemaEnum<Message>
  const?: any
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  maxLength?: number
  minLength?: number
  pattern?: string | RegExp
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  required?: string[] | boolean | string
  format?: string
  /** nested json schema spec **/
  definitions?: Record<
    string,
    Schema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  >
  properties?: Record<
    string,
    Schema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  >
  items?:
    | Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >
    | Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >[]
  additionalItems?: Schema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >
  patternProperties?: Record<
    string,
    Schema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  >
  additionalProperties?: Schema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;

  //顺序描述
  ['x-index']?: number;
  //交互模式
  ['x-pattern']?: Pattern;
  //展示状态
  ['x-display']?: Display;
  //校验器
  ['x-validator']?: Validator;
  //装饰器
  ['x-decorator']?: Decorator;
  //装饰器属性
  ['x-decorator-props']?: DecoratorProps;
  //组件
  ['x-component']?: Component;
  //组件属性
  ['x-component-props']?: ComponentProps;

  ['x-reactions']?: SchemaReaction<ReactionField>[];

  ['x-content']?: any;

  ['x-data']?: any;

  ['x-visible']?: boolean;

  ['x-hidden']?: boolean;

  ['x-disabled']?: boolean;

  ['x-editable']?: boolean;

  ['x-read-only']?: boolean;

  ['x-read-pretty']?: boolean;

  [key: `x-${string | number}` | symbol]: any

  _isJSONSchemaObject = true

  version = '2.0'

  constructor(
    json: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >,
    parent?: Schema
  ) {
    if (parent) {
      this.parent = parent
      this.root = parent.root
    } else {
      this.root = this
    }
    return this.fromJSON(json)
  }

  addProperty = (
    key: SchemaKey,
    schema: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  ) => {
    this.properties = this.properties || {}
    this.properties[key] = new Schema(schema, this)
    this.properties[key].name = key
    return this.properties[key]
  }

  removeProperty = (key: SchemaKey) => {
    const schema = this.properties[key]
    delete this.properties[key]
    return schema
  }

  setProperties = (
    properties: SchemaProperties<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  ) => {
    for (const key in properties) {
      this.addProperty(key, properties[key])
    }
    return this
  }

  addPatternProperty = (
    key: SchemaKey,
    schema: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  ) => {
    if (!schema) return
    this.patternProperties = this.patternProperties || {}
    this.patternProperties[key] = new Schema(schema, this)
    this.patternProperties[key].name = key
    return this.patternProperties[key]
  }

  removePatternProperty = (key: SchemaKey) => {
    const schema = this.patternProperties[key]
    delete this.patternProperties[key]
    return schema
  }

  setPatternProperties = (
    properties: SchemaProperties<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  ) => {
    if (!properties) return this
    for (const key in properties) {
      this.addPatternProperty(key, properties[key])
    }
    return this
  }

  setAdditionalProperties = (
    properties: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  ) => {
    if (!properties) return
    this.additionalProperties = new Schema(properties)
    return this.additionalProperties
  }

  setItems = (
    schema:
      | ISchema<
          Decorator,
          Component,
          DecoratorProps,
          ComponentProps,
          Pattern,
          Display,
          Validator,
          Message
        >
      | ISchema<
          Decorator,
          Component,
          DecoratorProps,
          ComponentProps,
          Pattern,
          Display,
          Validator,
          Message
        >[]
  ) => {
    if (!schema) return
    if (Array.isArray(schema)) {
      this.items = schema.map((item) => new Schema(item, this))
    } else {
      this.items = new Schema(schema, this)
    }
    return this.items
  }

  setAdditionalItems = (
    items: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  ) => {
    if (!items) return
    this.additionalItems = new Schema(items, this)
    return this.additionalItems
  }

  findDefinitions = (ref: string) => {
    if (!ref || !this.root || !isStr(ref)) return
    if (ref.indexOf('#/') !== 0) return
    return FormPath.getIn(this.root, ref.substring(2).split('/'))
  }

  mapProperties = <T>(
    callback?: (
      schema: Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >,
      key: SchemaKey,
      index: number
    ) => T
  ): T[] => {
    return Schema.getOrderProperties(this).map(({ schema, key }, index) => {
      return callback(schema, key, index)
    })
  }

  mapPatternProperties = <T>(
    callback?: (
      schema: Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >,
      key: SchemaKey,
      index: number
    ) => T
  ): T[] => {
    return Schema.getOrderProperties(this, 'patternProperties').map(
      ({ schema, key }, index) => {
        return callback(schema, key, index)
      }
    )
  }

  reduceProperties = <P, R>(
    callback?: (
      buffer: P,
      schema: Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >,
      key: SchemaKey,
      index: number
    ) => R,
    predicate?: P
  ): R => {
    let results: any = predicate
    Schema.getOrderProperties(this, 'properties').forEach(
      ({ schema, key }, index) => {
        results = callback(results, schema, key, index)
      }
    )
    return results
  }

  reducePatternProperties = <P, R>(
    callback?: (
      buffer: P,
      schema: Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >,
      key: SchemaKey,
      index: number
    ) => R,
    predicate?: P
  ): R => {
    let results: any = predicate
    Schema.getOrderProperties(this, 'patternProperties').forEach(
      ({ schema, key }, index) => {
        results = callback(results, schema, key, index)
      }
    )
    return results
  }

  compile = (scope?: any) => {
    const schema = new Schema({}, this.parent)
    each(this, (value, key) => {
      if (isFn(value) && !key.includes('x-')) return
      if (key === 'parent' || key === 'root') return
      if (!SchemaNestedMap[key]) {
        schema[key] = value ? compile(value, scope) : value
      } else {
        schema[key] = value ? shallowCompile(value, scope) : value
      }
    })
    return schema
  }

  fromJSON = (
    json: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  ) => {
    if (!json) return this
    if (Schema.isSchemaInstance(json)) return json
    each(reducePatches(json), (value, key) => {
      if (isFn(value) && !key.includes('x-')) return
      if (key === 'properties') {
        this.setProperties(value)
      } else if (key === 'patternProperties') {
        this.setPatternProperties(value)
      } else if (key === 'additionalProperties') {
        this.setAdditionalProperties(value)
      } else if (key === 'items') {
        this.setItems(value)
      } else if (key === 'additionalItems') {
        this.setAdditionalItems(value)
      } else if (key === '$ref') {
        this.fromJSON(this.findDefinitions(value))
      } else {
        this[key] = value
      }
    })
    return this
  }

  toJSON = (
    recursion = true
  ): ISchema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  > => {
    const results = {}
    each(this, (value: any, key) => {
      if (
        (isFn(value) && !key.includes('x-')) ||
        key === 'parent' ||
        key === 'root'
      )
        return
      if (key === 'properties' || key === 'patternProperties') {
        if (!recursion) return
        results[key] = map(value, (item) => item?.toJSON?.())
      } else if (key === 'additionalProperties' || key === 'additionalItems') {
        if (!recursion) return
        results[key] = value?.toJSON?.()
      } else if (key === 'items') {
        if (!recursion) return
        if (Array.isArray(value)) {
          results[key] = value.map((item) => item?.toJSON?.())
        } else {
          results[key] = value?.toJSON?.()
        }
      } else {
        results[key] = value
      }
    })
    return results
  }

  toFieldProps = (
    options?: ISchemaTransformerOptions
  ): IFieldFactoryProps<any, any> => {
    return transformFieldProps(this, options)
  }

  static getOrderProperties = (
    schema: ISchema = {},
    propertiesName: keyof ISchema = 'properties'
  ) => {
    const orderProperties = []
    const unorderProperties = []
    for (const key in schema[propertiesName]) {
      const item = schema[propertiesName][key]
      const index = item['x-index']
      if (!isNaN(index)) {
        orderProperties[index] = { schema: item, key }
      } else {
        unorderProperties.push({ schema: item, key })
      }
    }
    return orderProperties.concat(unorderProperties).filter((item) => !!item)
  }

  static compile = (expression: any, scope?: any) => {
    return compile(expression, scope)
  }

  static shallowCompile = (expression: any, scope?: any) => {
    return shallowCompile(expression, scope)
  }

  static isSchemaInstance = (value: any): value is Schema => {
    return instOf(value, Schema)
  }

  static registerCompiler = registerCompiler

  static registerPatches = registerPatches

  static registerVoidComponents = registerVoidComponents

  static registerTypeDefaultComponents = registerTypeDefaultComponents

  static registerPolyfills = registerPolyfills

  static enablePolyfills = enablePolyfills

  static silent = silent
}
