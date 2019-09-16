import {
  ValidatePatternRules,
  ValidateDescription,
  CustomValidator,
  getMessage
} from '@uform/validator'
import {
  JSONSchema7,
  JSONSchema7Version,
  JSONSchema7Type,
  JSONSchema7Definition
} from 'json-schema'
import {
  lowercase,
  map,
  each,
  isEmpty,
  isArr,
  isBool,
  isValid,
  FormPathPattern,
  FormPath
} from '@uform/shared'
import {
  ISchemaFieldComponentProps,
  ISchemaVirtualFieldComponentProps
} from '../types'

const numberRE = /^\d+$/

interface IExtendsSchema {
  editable?: boolean
  ['x-props']?: { [name: string]: any }
  ['x-index']?: number
  ['x-rules']?: ValidatePatternRules
  ['x-component']?: string
  ['x-render']?: (
    props: ISchemaFieldComponentProps & {
      renderComponent: () => React.ReactElement
    }
  ) => { [key: string]: any }
  ['x-effect']?: (
    dispatch: (type: string, payload: any) => void,
    option?: object
  ) => { [key: string]: any }
}

type SchemaPattern =
  | JSONSchema7 & IExtendsSchema
  | JSONSchema7Definition
  | Schema & IExtendsSchema

//todo:想了一下，感觉不应该依赖JSONSchema7，因为在react这层，很多属性都会接受ReactElement形式的属性

export class Schema {
  $id?: string
  $ref?: string
  $schema?: JSONSchema7Version
  $comment?: string

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
   */
  type?: string
  enum?: JSONSchema7Type[]
  const?: JSONSchema7Type

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2
   */
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3
   */
  maxLength?: number
  minLength?: number
  pattern?: string

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
   */
  items?: Schema | Schema[]
  additionalItems?: Schema
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  contains?: Schema

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
   */
  maxProperties?: number
  minProperties?: number
  required?: string[] | boolean
  properties?: {
    [key: string]: Schema
  }
  patternProperties?: {
    [key: string]: Schema
  }
  additionalProperties?: Schema
  dependencies?: {
    [key: string]: Schema | string[]
  }
  propertyNames?: Schema

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
   */
  if?: Schema
  then?: Schema
  else?: Schema

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
   */
  allOf?: Schema[]
  anyOf?: Schema[]
  oneOf?: Schema[]
  not?: Schema

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
   */
  format?: string

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
   */
  contentMediaType?: string
  contentEncoding?: string

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-9
   */
  definitions?: {
    [key: string]: Schema
  }

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10
   */
  title?: string
  description?: string
  default?: JSONSchema7Type
  readOnly?: boolean
  writeOnly?: boolean
  examples?: JSONSchema7Type
  editable?: boolean;
  ['x-props']?: { [name: string]: any };
  ['x-index']?: number;
  ['x-rules']?: ValidatePatternRules;
  ['x-component']?: string;
  ['x-render']?: (
    props: (ISchemaFieldComponentProps | ISchemaVirtualFieldComponentProps) & {
      renderComponent: () => React.ReactElement
    }
  ) => React.ReactElement;
  ['x-effect']?: (
    dispatch: (type: string, payload: any) => void,
    option?: object
  ) => { [key: string]: any }
  parent: Schema
  constructor(json: SchemaPattern, parent?: Schema) {
    if (parent) {
      this.parent = parent
    }
    return this.fromJSON(json) as any
  }
  /**
   * getters
   */
  get(path?: FormPathPattern) {
    if (!path) {
      return this
    }
    let res: Schema = this
    let suc = 0
    path = FormPath.parse(path)
    path.forEach(key => {
      if (res && !isEmpty(res.properties)) {
        res = res.properties[key]
        suc++
      } else if (res && !isEmpty(res.items) && numberRE.test(key as string)) {
        res = isArr(res.items) ? res.items[key] : res.items
        suc++
      }
    })
    return suc === path.length ? res : undefined
  }
  getSelfProps() {
    const {
      properties,
      additionalProperties,
      additionalItems,
      items,
      ...props
    } = this
    return props
  }
  getExtendsRules() {
    let rules: Array<string | ValidateDescription | CustomValidator> = []
    if (this.format) {
      rules.push({ format: this.format })
    }
    if (isValid(this.maxItems)) {
      rules.push({ max: this.maxItems })
    }
    if (isValid(this.maxLength)) {
      rules.push({ max: this.maxLength })
    }
    if (isValid(this.maximum)) {
      rules.push({ maximum: this.maximum })
    }
    if (isValid(this.minimum)) {
      rules.push({ minimum: this.minimum })
    }
    if (isValid(this.exclusiveMaximum)) {
      rules.push({ exclusiveMaximum: this.exclusiveMaximum })
    }
    if (isValid(this.exclusiveMinimum)) {
      rules.push({ exclusiveMinimum: this.exclusiveMinimum })
    }
    if (isValid(this.const)) {
      rules.push({
        validator: value => {
          return value === this.const ? '' : getMessage('schema.const')
        }
      })
    }
    if (isValid(this.multipleOf)) {
      rules.push({
        validator: value => {
          return value % this.multipleOf === 0
            ? ''
            : getMessage('schema.multipleOf')
        }
      })
    }
    /**剩余校验的都是关联型复杂校验，不抹平，让用户自己处理 */
    if (isValid(this['x-rules'])) {
      rules = rules.concat(this['x-rules'])
    }

    return rules
  }
  getExtendsRequired() {
    if (isBool(this.required)) {
      return this.required
    }
  }
  getExtendsEditable() {
    if (isValid(this.editable)) {
      return this.editable
    } else if (isValid(this['x-props'] && this['x-props'].editable)) {
      return this['x-props'].editable
    } else if (isValid(this.readOnly)) {
      return !this.readOnly
    }
  }
  getExtendsComponent() {
    return this['x-component']
  }
  getExtendsRenderer() {
    return this['x-render']
  }
  getExtendsEffect() {
    return this['x-effect']
  }
  /**
   * getters
   */
  setProperties() {}
  setArrayItems() {}
  toJSON() {}
  fromJSON(json: SchemaPattern = {}) {
    if (typeof json === 'boolean') return json
    if (json instanceof Schema) return json
    Object.assign(this, json)
    this.type = lowercase(String(json.type))
    this['x-component'] = lowercase(json['x-component'])
    if (!isEmpty(json.properties)) {
      this.properties = map(json.properties, item => {
        return new Schema(item, this)
      })
      if (isValid(json.additionalProperties)) {
        this.additionalProperties = new Schema(json.additionalProperties, this)
      }
      if (isValid(json.patternProperties)) {
        this.patternProperties = map(json.patternProperties, item => {
          return new Schema(item, this)
        })
      }
      if (isValid(json.dependencies)) {
        this.dependencies = map(json.dependencies, item => {
          return isArr(item) ? item : new Schema(item, this)
        })
      }
      if (isValid(json.propertyNames)) {
        this.propertyNames = new Schema(json.propertyNames, this)
      }
    } else if (!isEmpty(json.items)) {
      this.items = isArr(json.items)
        ? map(json.items, item => new Schema(item, this))
        : new Schema(json.items)
      if (isValid(json.additionalItems)) {
        this.additionalItems = new Schema(json.additionalItems, this)
      }
      if (isValid(json.contains)) {
        this.additionalItems = new Schema(json.contains, this)
      }
    }

    if (isValid(json.if)) {
      this.if = new Schema(json.if, this)
    }
    if (isValid(json.then)) {
      this.then = new Schema(json.then, this)
    }
    if (isValid(json.else)) {
      this.else = new Schema(json.else, this)
    }
    if (isValid(json.allOf)) {
      this.allOf = map(json.allOf, item => {
        return new Schema(item, this)
      })
    }
    if (isValid(json.anyOf)) {
      this.anyOf = map(json.anyOf, item => {
        return new Schema(item, this)
      })
    }
    if (isValid(json.oneOf)) {
      this.oneOf = map(json.oneOf, item => {
        return new Schema(item, this)
      })
    }
    if (isValid(json.not)) {
      this.not = new Schema(json.not, this)
    }
    return this
  }
  /**
   * tools
   */
  isObject() {
    return this.type === 'object'
  }
  isArray() {
    return this.type === 'array'
  }

  mapProperties(callback?: (schema: Schema, key: string) => any) {
    return Schema.getOrderProperties(this).map(({ schema, key }) => {
      return callback(schema, key)
    })
  }

  mapPatternProperties(callback?: (schema: Schema, key: string) => any) {
    return Schema.getOrderProperties(this, 'patternProperties').map(
      ({ schema, key }) => {
        return callback(schema, key)
      }
    )
  }

  static getOrderProperties = (
    schema: SchemaPattern = {},
    propertiesName: string = 'properties'
  ) => {
    const newSchema = new Schema(schema)
    const properties = []
    each(newSchema[propertiesName], (item, key) => {
      const index = item['x-index']
      if (typeof index === 'number') {
        properties[index] = {
          schema: item,
          key
        }
      } else {
        properties.push({ schema: item, key })
      }
    })
    return properties
  }
}
