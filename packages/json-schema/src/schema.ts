import {
  ISchema,
  SchemaEnum,
  SchemaProperties,
  SchemaExtendReaction,
  SchemaTypes,
  SchemaKey,
} from './types'
import { map, each, isFn, instOf } from '@formily/shared'
import { complie, shallowComplie } from './complier'
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
> implements ISchema {
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

  ['x-reactions']?: SchemaExtendReaction<ReactionField>[];

  ['x-content']?: any;

  ['x-visible']?: boolean;

  ['x-hidden']?: boolean;

  ['x-disabled']?: boolean;

  ['x-editable']?: boolean;

  ['x-read-only']?: boolean;

  ['x-read-pretty']?: boolean

  _isJSONSchemaObject = true

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
    scope?: any
  ) {
    return this.fromJSON(json, scope)
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
    this.properties[key] = new Schema(schema)
    this.properties[key].name = key
    return this.properties[key]
  }

  removeProperty = (key: SchemaKey) => {
    delete this.properties[key]
    return this
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
    this.patternProperties[key] = new Schema(schema)
    return this.patternProperties[key]
  }

  removePatternProperty = (key: SchemaKey) => {
    delete this.patternProperties[key]
    return this
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
      this.items = schema.map((item) => new Schema(item))
    } else {
      this.items = new Schema(schema)
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
    this.additionalItems = new Schema(items)
    return this.additionalItems
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

  complie = (scope: any) => {
    const shallows = [
      'properties',
      'patternProperties',
      'additionalProperties',
      'items',
      'additionalItems',
      'x-linkages',
      'x-reactions',
    ]
    each(this, (value, key) => {
      if (isFn(value)) return
      if (!shallows.includes(key)) {
        this[key] = value ? complie(value, scope) : value
      } else {
        this[key] = value ? shallowComplie(value, scope) : value
      }
    })
    return this
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
    >,
    scope?: any
  ) => {
    if (!json) return this
    if (isSchemaObject(json)) return json
    each(json, (value, key) => {
      if (isFn(value)) return
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
      } else {
        this[key] = value
      }
    })
    return this
  }

  toJSON = (): ISchema<
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
      if (key === 'properties' || key === 'patternProperties') {
        results[key] = map(value, (item) => item?.toJSON())
      } else if (key === 'additionalProperties' || key === 'additionalItems') {
        results[key] = value?.toJSON()
      } else if (key === 'items') {
        if (Array.isArray(value)) {
          results[key] = value.map((item) => item?.toJSON())
        } else {
          results[key] = value?.toJSON()
        }
      } else {
        results[key] = value
      }
    })
    return results
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

  static complie = (data: any, scope: any) => {
    return complie(data, scope)
  }

  static shallowComplie = (data: any, scope: any) => {
    return shallowComplie(data, scope)
  }
}

export const isSchemaObject = (value: any): value is Schema => {
  return instOf(value, Schema)
}
