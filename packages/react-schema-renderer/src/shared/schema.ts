import React from 'react'
import {
  ValidatePatternRules,
  ValidateDescription,
  CustomValidator,
  getMessage
} from '@uform/validator'
import {
  lowercase,
  map,
  each,
  isEmpty,
  isEqual,
  isArr,
  toArr,
  isBool,
  isValid,
  FormPathPattern,
  FormPath
} from '@uform/shared'
import { ISchemaFieldComponentProps, SchemaMessage, ISchema } from '../types'

const numberRE = /^\d+$/

type SchemaProperties<T = Schema> = {
  [key: string]: Schema
}

export class Schema implements ISchema {
  /** base json schema spec**/
  public title?: SchemaMessage
  public description?: SchemaMessage
  public default?: any
  public readOnly?: boolean
  public writeOnly?: boolean
  public type?: 'string' | 'object' | 'array' | 'number' | string
  public enum?: Array<string | number | { label: SchemaMessage; value: any }>
  public const?: any
  public multipleOf?: number
  public maximum?: number
  public exclusiveMaximum?: number
  public minimum?: number
  public exclusiveMinimum?: number
  public maxLength?: number
  public minLength?: number
  public pattern?: string | RegExp
  public maxItems?: number
  public minItems?: number
  public uniqueItems?: boolean
  public maxProperties?: number
  public minProperties?: number
  public required?: string[] | boolean
  public format?: string
  /** nested json schema spec **/
  public properties?: SchemaProperties
  public items?: Schema | Schema[]
  public additionalItems?: Schema
  public patternProperties?: {
    [key: string]: Schema
  }
  public additionalProperties?: Schema
  /** extend json schema specs */
  public editable?: boolean
  public ['x-props']?: { [name: string]: any }
  public ['x-index']?: number
  public ['x-rules']?: ValidatePatternRules
  public ['x-component']?: string | React.JSXElementConstructor<any>
  public ['x-component-props']?: { [name: string]: any }
  public ['x-render']?: <T = ISchemaFieldComponentProps>(
    props: T & {
      renderComponent: () => React.ReactElement
    }
  ) => React.ReactElement
  public ['x-effect']?: (
    dispatch: (type: string, payload: any) => void,
    option?: object
  ) => { [key: string]: any }
  /** schema class self specs**/

  public parent?: Schema

  public _isJSONSchemaObject = true

  constructor(json: ISchema, parent?: Schema) {
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

  merge(props: {}) {
    Object.assign(this, props)
    return this
  }

  getEmptyValue() {
    if (this.type === 'string') {
      return ''
    }
    if (this.type === 'array') {
      return []
    }
    if (this.type === 'object') {
      return {}
    }
    if (this.type === 'number') {
      return 0
    }
  }

  getSelfProps() {
    const {
      _isJSONSchemaObject,
      properties,
      additionalProperties,
      additionalItems,
      patternProperties,
      items,
      parent,
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
    if (isValid(this.pattern)) {
      rules.push({ pattern: this.pattern })
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
    if (isValid(this.maxProperties)) {
      rules.push({
        validator: value => {
          return Object.keys(value || {}).length <= this.maxProperties
            ? ''
            : getMessage('schema.maxProperties')
        }
      })
    }
    if (isValid(this.minProperties)) {
      rules.push({
        validator: value => {
          return Object.keys(value || {}).length >= this.minProperties
            ? ''
            : getMessage('schema.minProperties')
        }
      })
    }
    if (isValid(this.uniqueItems) && this.uniqueItems) {
      rules.push({
        validator: value => {
          value = toArr(value)
          return value.some((item: any, index: number) => {
            for (let start = index; start < value.length; start++) {
              if (isEqual(value[start], item)) {
                return false
              }
            }
          })
            ? getMessage('schema.uniqueItems')
            : ''
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
  getExtendsTriggerType() {
    const itemProps = this.getExtendsItemProps()
    const props = this.getExtendsProps()
    const componentProps = this.getExtendsComponentProps()
    if (itemProps.triggerType) {
      return itemProps.triggerType
    } else if (props.triggerType) {
      return props.triggerType
    } else if (componentProps.triggerType) {
      return componentProps.triggerType
    }
  }
  getExtendsItemProps() {
    return this['x-item-props'] || {}
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
  getExtendsProps() {
    return this['x-props'] || {}
  }
  getExtendsComponentProps() {
    return { ...this['x-props'], ...this['x-component-props'] }
  }
  /**
   * getters
   */
  setProperty(key: string, schema: ISchema) {
    this.properties = this.properties || {}
    this.properties[key] = new Schema(schema, this)
    return this.properties[key]
  }
  setProperties(properties: SchemaProperties<ISchema>) {
    each<SchemaProperties<ISchema>, ISchema>(properties, (schema, key) => {
      this.setProperty(key, schema)
    })
    return this.properties
  }
  setArrayItems(schema: ISchema) {
    this.items = new Schema(schema, this)
    return this.items
  }
  toJSON() {
    const result: ISchema = this.getSelfProps()
    if (isValid(this.properties)) {
      result.properties = map(this.properties, schema => {
        return schema.toJSON()
      })
    }
    if (isValid(this.items)) {
      result.items = isArr(this.items)
        ? this.items.map(schema => schema.toJSON())
        : this.items.toJSON()
    }
    if (isValid(this.additionalItems)) {
      result.additionalItems = this.additionalItems.toJSON()
    }
    if (isValid(this.additionalProperties)) {
      result.additionalProperties = this.additionalProperties.toJSON()
    }
    if (isValid(this.patternProperties)) {
      result.patternProperties = map(this.patternProperties, schema => {
        return schema.toJSON()
      })
    }
    return result
  }

  fromJSON(json: ISchema = {}) {
    if (typeof json === 'boolean') return json
    if (json instanceof Schema) return json
    Object.assign(this, json)
    if (isValid(json.type)) {
      this.type = lowercase(String(json.type))
    }
    if (isValid(json['x-component'])) {
      this['x-component'] = lowercase(json['x-component'])
    }
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
    } else if (!isEmpty(json.items)) {
      this.items = isArr(json.items)
        ? map(json.items, item => new Schema(item, this))
        : new Schema(json.items)
      if (isValid(json.additionalItems)) {
        this.additionalItems = new Schema(json.additionalItems, this)
      }
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
    return this.getOrderProperties().map(({ schema, key }) => {
      return callback(schema, key)
    })
  }

  getOrderProperties() {
    return Schema.getOrderProperties(this)
  }

  getOrderPatternProperties() {
    return Schema.getOrderProperties(this, 'patternProperties')
  }

  mapPatternProperties(callback?: (schema: Schema, key: string) => any) {
    return this.getOrderPatternProperties().map(({ schema, key }) => {
      return callback(schema, key)
    })
  }

  static getOrderProperties = (
    schema: ISchema = {},
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
