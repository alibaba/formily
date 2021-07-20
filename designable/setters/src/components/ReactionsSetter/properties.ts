import {
  BooleanHelper,
  PatternHelper,
  StringHelper,
  AnyHelper,
  DataSourceHelper,
  DecoratorPropsHelper,
  DisplayHelper,
  ComponentPropsHelper,
} from './helpers'

export const FieldProperties = [
  {
    key: 'visible',
    type: 'boolean',
    helpCode: BooleanHelper,
  },
  { key: 'hidden', type: 'boolean', helpCode: BooleanHelper },
  {
    key: 'display',
    type: '"visible" | "hidden" | "none"',
    helpCode: DisplayHelper,
  },
  {
    key: 'pattern',
    type: '"editable" | "disabled" | "readOnly" | "readPretty"',
    helpCode: PatternHelper,
  },
  { key: 'title', type: 'string', helpCode: StringHelper },
  { key: 'description', type: 'string', helpCode: StringHelper },
  { key: 'value', type: 'any', helpCode: AnyHelper },
  { key: 'initialValue', type: 'any', helpCode: AnyHelper },
  { key: 'required', type: 'boolean', helpCode: BooleanHelper },
  {
    key: 'dataSource',
    type: 'Array<{label?:string,value?:any}>',
    helpCode: DataSourceHelper,
  },
  {
    key: 'component[1]',
    token: 'componentProps',
    type: 'object',
    helpCode: ComponentPropsHelper,
  },
  {
    key: 'decorator[1]',
    token: 'decoratorProps',
    type: 'object',
    helpCode: DecoratorPropsHelper,
  },
]
