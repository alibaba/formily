import {
  ISchema,
  SchemaEnum,
  SchemaProperties,
  SchemaExtendLinkage,
  SchemaExtendReaction
} from './types'
import { map, each } from '@formily/shared'
export class Schema<
  Decorator,
  Component,
  DecoratorProps,
  ComponentProps,
  Pattern,
  Display,
  Validator,
  Message = string
> implements ISchema {
  title?: Message
  description?: Message
  default?: any
  readOnly?: boolean
  writeOnly?: boolean
  type?: 'string' | 'object' | 'array' | 'number' | 'boolean' | string
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

  ['x-linkages']?: SchemaExtendLinkage[];

  ['x-reactions']?: SchemaExtendReaction[]

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
    >
  ) {
    this.fromJSON(json)
  }

  addProperty = (
    key: string,
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
  }

  removeProperty = (key: string) => {
    delete this.properties[key]
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
  }

  addPatternProperty = (
    key: string,
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
  }

  removePatternProperty = (key: string) => {
    delete this.patternProperties[key]
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
    if (!properties) return
    for (const key in properties) {
      this.addPatternProperty(key, properties[key])
    }
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
      this.items = schema.map(item => new Schema(item))
    } else {
      this.items = new Schema(schema)
    }
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
      key: string
    ) => T
  ): T[] => {
    return Schema.getOrderProperties(this).map(({ schema, key }) => {
      return callback(schema, key)
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
      key: string
    ) => T
  ): T[] => {
    return Schema.getOrderProperties(this, 'patternProperties').map(
      ({ schema, key }) => {
        return callback(schema, key)
      }
    )
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
    if (!json) return
    each(json, (value, key) => {
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
        results[key] = map(value, item => item?.toJSON())
      } else if (key === 'additionalProperties' || key === 'additionalItems') {
        results[key] = value?.toJSON()
      } else if (key === 'items') {
        if (Array.isArray(value)) {
          results[key] = value.map(item => item?.toJSON())
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
    const newSchema = new Schema(schema)
    const orderProperties = []
    const unorderProperties = []
    for (const key in newSchema[propertiesName]) {
      const item = newSchema[propertiesName][key]
      const index = item['x-index']
      if (!isNaN(index)) {
        orderProperties[index] = { schema: item, key }
      } else {
        unorderProperties.push({ schema: item, key })
      }
    }
    return orderProperties.concat(unorderProperties).filter(item => !!item)
  }
}
