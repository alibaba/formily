# Schema

## Description

The core part of the @formily/react protocol driver. Schema is a general class in which users can use it by themselves. At the same time, both SchemaField and RecursionField rely on it. It has several core capabilities:

- Ability to parse json-schema
- The ability to convert json-schema to Field Model
- The ability to compile json-schema expressions

You can export the Schema Class from @formily/react, but if you don’t want to use @formily/react, you can rely on the @formily/json-schema package alone

## Constructor

```ts
class Schema {
  constructor(json: ISchema, parent?: ISchema)
}
```

Create a Schema Tree based on a piece of json schema data to ensure that each schema node contains the corresponding method

## Attributes

| Property             | Description                                                                     | Type                                                                               | Field Model Mapping                                                      |
| -------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| type                 | Type                                                                            | [SchemaTypes](#schematypes)                                                        | [GeneralField](https://core.formilyjs.org/api/models/field#generalfield) |
| title                | Title                                                                           | React.ReactNode                                                                    | `title`                                                                  |
| description          | Description                                                                     | React.ReactNode                                                                    | `description`                                                            |
| default              | Default value                                                                   | Any                                                                                | `initialValue`                                                           |
| readOnly             | Is it read-only                                                                 | Boolean                                                                            | `readOnly`                                                               |
| writeOnly            | Whether to write only                                                           | Boolean                                                                            | `editable`                                                               |
| enum                 | Enumeration                                                                     | [SchemaEnum](#schemaenum)                                                          | `dataSource`                                                             |
| const                | Check whether the field value is equal to the value of const                    | Any                                                                                | `validator`                                                              |
| multipleOf           | Check whether the field value is divisible by the value of multipleOf           | Number                                                                             | `validator`                                                              |
| maximum              | Check the maximum value (greater than)                                          | Number                                                                             | `validator`                                                              |
| exclusiveMaximum     | Check the maximum value (greater than or equal to                               | Number                                                                             | `validator`                                                              |
| minimum              | Validation minimum value (less than)                                            | Number                                                                             | `validator`                                                              |
| exclusiveMinimum     | Minimum value (less than or equal to)                                           | Number                                                                             | `validator`                                                              |
| maxLength            | Maximum length of verification                                                  | Number                                                                             | `validator`                                                              |
| minLength            | Check minimum length                                                            | Number                                                                             | `validator`                                                              |
| pattern              | Regular verification rules                                                      | RegExpString                                                                       | `validator`                                                              |
| maxItems             | Maximum number of items                                                         | Number                                                                             | `validator`                                                              |
| minItems             | Minimum number of items                                                         | Number                                                                             | `validator`                                                              |
| uniqueItems          | Whether to verify duplicates                                                    | Boolean                                                                            | `validator`                                                              |
| maxProperties        | Maximum number of properties                                                    | Number                                                                             | `validator`                                                              |
| minProperties        | Minimum number of properties                                                    | Number                                                                             | `validator`                                                              |
| required             | required                                                                        | Boolean                                                                            | `validator`                                                              |
| format               | Regular verification format                                                     | [ValidatorFormats](https://core.formilyjs.org/api/models/field#fieldvalidator)     | `validator`                                                              |
| properties           | Property description                                                            | [SchemaProperties](#schemaproperties)                                              | -                                                                        |
| items                | Array description                                                               | [SchemaItems](#schemaitems)                                                        | -                                                                        |
| additionalItems      | Additional array element description                                            | Schema                                                                             | -                                                                        |
| patternProperties    | Schema of a certain property of the dynamic matching object                     | [SchemaProperties](#schemaproperties)                                              | -                                                                        |
| additionalProperties | Schema of matching object additional properties                                 | Schema                                                                             | -                                                                        |
| x-index              | UI display order                                                                | Number                                                                             | -                                                                        |
| x-pattern            | UI interaction mode                                                             | [FieldPatternTypes](https://core.formilyjs.org/api/models/field#fieldpatterntypes) | `pattern`                                                                |
| x-display            | UI display                                                                      | [FieldDisplayTypes](https://core.formilyjs.org/api/models/field#fielddisplaytypes) | `display`                                                                |
| x-validator          | Field Validator                                                                 | [FieldValidator](https://core.formilyjs.org/api/models/field#fieldvalidator)       | `validator`                                                              |
| x-decorator          | Field UI wrapper component                                                      | `String \| React.FC`                                                               | `decorator`                                                              |
| x-decorator-props    | Field UI wrapper component properties                                           | Any                                                                                | `decorator`                                                              |
| x-component          | Field UI component                                                              | `String \| React.FC`                                                               | `component`                                                              |
| x-component-props    | Field UI component properties                                                   | Any                                                                                | `component`                                                              |
| x-reactions          | Field linkage agreement                                                         | [SchemaReactions](#schemareactions)                                                | `reactions`                                                              |
| x-content            | Field content, used to pass in the child nodes of a component                   | React.ReactNode                                                                    | ReactChildren                                                            |
| x-visible            | Field display hidden                                                            | Boolean                                                                            | `visible`                                                                |
| x-hidden             | Field UI hidden (data retention)                                                | Boolean                                                                            | `hidden`                                                                 |
| x-disabled           | Field disabled                                                                  | Boolean                                                                            | `disabled`                                                               |
| x-editable           | Editable field                                                                  | Boolean                                                                            | `editable`                                                               |
| x-read-only          | Field read-only                                                                 | Boolean                                                                            | `readOnly`                                                               |
| x-read-pretty        | Field Reading State                                                             | Boolean                                                                            | `readPretty`                                                             |
| definitions          | Schema predefined                                                               | [SchemaProperties](#schemaproperties)                                              | -                                                                        |
| $ref                 | Read the Schema from the Schema predefined and merge it into the current Schema | String                                                                             | -                                                                        |

#### Detailed description

- The component ID of x-component matches the key of the component collection passed in [createSchemaField](/api/components/schema-field#signature)
- The component ID of x-decorator matches the key of the component collection passed in [createSchemaField](/api/components/schema-field#signature)
- Every attribute of Schema can use string expression `{{expression}}`, expression variables can be passed in from createSchemaField or from SchemaField component
- The predefined format of $ref specified Schema must be `#/definitions/address` this format, loading remote JSON Schema is not supported

## Method

### addProperty

#### Description

Add attribute description

#### Signature

```ts
interface addProperty {
  (key: string | number, schema: ISchema): Schema //Return the added Schema object
}
```

### removeProperty

#### Description

Remove attribute description

#### Signature

```ts
interface removeProperty {
  (key: string | number): Schema //Return the removed Schema object
}
```

### setProperties

#### Description

Overwrite update attribute description

#### Signature

```ts
interface setProperties {
  (properties: SchemaProperties): Schema //Return the current Schema object
}
```

SchemaProperties Reference [SchemaProperties](#schemaproperties)

### addPatternProperty

#### Description

Add regular attribute description

#### Signature

```ts
interface addPatternProperty {
  (regexp: string, schema: ISchema): Schema //Return the added Schema object
}
```

### removePatternProperty

#### Description

Remove regular attribute description

#### Signature

```ts
interface removePatternProperty {
  (regexp: string): Schema //Return the removed Schema object
}
```

### setPatternProperties

#### Description

Override update regular attribute description

#### Signature

```ts
interface setPatternProperties {
  (properties: SchemaProperties): Schema //Return the current Schema object
}
```

SchemaProperties Reference [SchemaProperties](#schemaproperties)

### setAdditionalProperties

#### Description

Overwrite update extended attribute description

#### Signature

```ts
interface setAdditionalProperties {
  (properties: ISchema): Schema //Returns the extended properties Schema object
}
```

### setItems

#### Description

Override to update the array item description

#### Signature

```ts
interface setItems {
  (items: SchemaItems): SchemaItems //Return the updated SchemaItems object
}
```

SchemaItems Reference [SchemaItems](#schemaitems)

### setAdditionalItems

#### Description

Override to update the array extension item description

#### Signature

```ts
interface setAdditionalItems {
  (items: ISchema): Schema //Return the updated Schema object
}
```

SchemaItems Reference [SchemaItems](#schemaitems)

### mapProperties

#### Description

Traverse and map the properties of the current Schema, and traverse based on the x-index order

#### Signature

```ts
interface mapProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

### mapPatternProperties

#### Description

Traverse and map the patternProperties attribute of the current Schema, and traverse based on the x-index order

#### Signature

```ts
interface mapPatternProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

### reduceProperties

#### Description

reduce the properties of the current Schema, and it will be traversed based on the x-index order

#### Signature

```ts
interface reduceProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

### reducePatternProperties

#### Description

reduce the patternProperties attribute of the current Schema, and it will be traversed based on the x-index order

#### Signature

```ts
interface reducePatternProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

### compile

#### Description

Deeply recurse the expression fragments in the current Schema object, compile the expression, and return the Schema. We can pass in the scope object, and then consume the scope variable in the expression

Expression fragment convention: a string ending with `{{`beginning with `}}` represents an expression fragment

#### Signature

```ts
interface compile {
  (scope: any): Schema
}
```

### fromJSON

#### Description

Convert ordinary json data into Schema objects

#### Signature

```ts
interface fromJSON {
  (json: ISchema): Schema
}
```

### toJSON

#### Description

Convert the current Schema object into ordinary json data

#### Signature

```ts
interface toJSON {
  (): ISchema
}
```

### toFieldProps

#### Description

Convert the current Schema object into a Formily field model attribute, refer to the mapping relationship [attribute](#attribute)

#### Signature

```ts
import { IFieldFactoryProps } from '@formily/core'

interface toFieldProps {
  (): IFieldFactoryProps
}
```

IFieldFactoryProps reference [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

## Static method

### getOrderProperties

#### Description

Get the sorted properties from the Schema

#### Signature

```ts
interface getOrderProperties {
  (schema: ISchema = {}, propertiesName: keyof ISchema = 'properties'): ISchema
}
```

### compile

#### Description

In-depth traversal of expression fragments in any object, expression fragment convention: a string ending with `{{`beginning`}}` represents an expression fragment

#### Signature

```ts
interface compile {
  (target: any, scope: any): any
}
```

### shallowCompile

#### Description

Shallow traversal of expression fragments in any object, expression fragment convention: a string ending with `{{`beginning with `}}` represents an expression fragment

#### Signature

```ts
interface shallowCompile {
  (target: any, scope: any): any
}
```

### silent

#### Description

Whether to compile silently, if it is, there will be no reminder if the expression error is reported

#### Signature

```ts
interface silent {
  (value?: boolean): void
}
```

### isSchemaInstance

#### Description

Determine whether an object is an instance of Schema Class

#### Signature

```ts
interface isSchemaInstance {
  (target: any): target is Schema
}
```

### registerCompiler

#### Description

Register the expression compiler

#### Signature

```ts
interface registerCompiler {
  (compiler: (expression: string, scope: any) => any): void
}
```

### registerPatches

#### Description

Register Schema patch to facilitate compatibility of different versions of Schema protocol

#### Signature

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPatches {
  (...args: SchemaPatch[]): void
}
```

### registerVoidComponents

#### Description

Mark the field component to indicate that the component is a virtual component and is compatible with formily1.x

#### Signature

```ts
interface registerVoidComponents {
  (components: string[]): void
}
```

#### Example

```ts
import { Schema } from '@formily/react'

Schema.registerVoidComponents(['card', 'tab', 'step'])
```

<Alert type="warning">
  Note that this api needs to be used with <code>enablePolyfills(['1.0'])</code>
</Alert>

### registerTypeDefaultComponents

#### Description

Identify the default component type for the Schema type

#### Signature

```ts
interface registerTypeDefaultComponents {
  (maps: Record<string, string>): void
}
```

#### Example

```ts
import { Schema } from '@formily/react'

Schema.registerTypeDefaultComponents({
  string: 'Input',
  number: 'NumberPicker',
  array: 'ArrayTable',
})
```

<Alert type="warning">
  Note that this api needs to be used with <code>enablePolyfills(['1.0'])</code>
</Alert>

### registerPolyfills

#### Description

Registration agreement compatible gasket

#### Signature

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPolyfills {
  (version: string, patch: SchemaPatch): void
}
```

#### Example

```ts
import { Schema } from '@formily/react'

Schema.registerPolyfills('1.0', (schema) => {
  schema['x-decorator'] = 'FormItem'
  return schema
})
```

### enablePolyfills

#### Description

Turn on the protocol gasket, the 1.0 version protocol compatible gasket is built in by default, and the main compatibility features are:

- x-decorator does not declare, it is automatically used as FormItem
- x-linkages converted to x-reactions
- x-props is automatically converted to x-decorator-props
- x-rules converted to x-validator
- convert editable to x-editable
- Convert visible to x-visible
- x-component is automatically converted to VoidField for card/block/grid-row/grid-col/grid/layout/step/tab/text-box,

#### Signature

```ts
interface enablePolyfills {
  (versions: string[]): void
}
```

#### Example

```ts
import { Schema } from '@formily/react'

Schema.enablePolyfills(['1.0'])
```

## Types of

### ISchema

#### Description

ISchema is a normal JSON data, and at the same time it is JSON data following the Schema [Attribute](#Attribute) specification

### SchemaTypes

#### Description

Schema description type

#### Signature

```ts
type SchemaTypes =
  | 'string'
  | 'object'
  | 'array'
  | 'number'
  | 'boolean'
  | 'void'
  | 'date'
  | 'datetime'
  | (string & {})
```

### SchemaProperties

#### Description

Schema attribute description

#### Signature

```ts
type SchemaProperties = Record<string, ISchema>
```

### SchemaItems

#### Description

Schema array item description

#### Signature

```ts
type SchemaItems = ISchema | ISchema[]
```

### SchemaEnum

#### Description

Schema enum

#### Signature

```ts
type SchemaEnum<Message> = Array<
  | string
  | number
  | { label: Message; value: any; [key: string]: any }
  | { key: any; title: Message; [key: string]: any }
>
```

### SchemaReactions

#### Description

Schema linkage protocol, if the reaction object contains target, it represents active linkage mode, otherwise it represents passive linkage mode
If you want to achieve more complex linkage, you can pass in the reaction responder function through the scope for processing

#### Signature

```ts
import { IGeneralFieldState } from '@formily/core'

type SchemaReactionEffect =
  | 'onFieldInit'
  | 'onFieldMount'
  | 'onFieldUnmount'
  | 'onFieldValueChange'
  | 'onFieldInputValueChange'
  | 'onFieldInitialValueChange'
  | 'onFieldValidateStart'
  | 'onFieldValidateEnd'
  | 'onFieldValidateFailed'
  | 'onFieldValidateSuccess'

type SchemaReaction<Field = any> =
  | {
      dependencies?: string[] | Record<string, string> //The list of dependent field paths can only describe dependencies in dot paths, and supports relative paths. If it is an array format, then it is also an array format when reading, if it is an object format , It is also an object format when reading, but the object format is equivalent to an alias
      when?: string | boolean //Linkage condition
      target?: string //The field path to be operated, supports FormPathPattern path syntax, note: relative path is not supported! !
      effects?: SchemaReactionEffect[] //Independent life cycle hook in active mode
      fulfill?: {
        //To meet the conditions
        state?: IGeneralFieldState //Update state
        schema?: ISchema //Update Schema
        run?: string //Execute statement
      }
      otherwise?: {
        //Does not meet the conditions
        state?: IGeneralFieldState //Update state
        schema?: ISchema //Update Schema
        run?: string //Execute statement
      }
    }
  | ((field: Field) => void) //Can be complex linkage

type SchemaReactions<Field = any> =
  | SchemaReaction<Field>
  | SchemaReaction<Field>[]
```

#### Example

**Active linkage**

Writing method one, standard initiative linkage

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": {
        "target": "target",
        "when": "{{$self.value === '123'}}",
        "fulfill": {
          "state": {
            "visible": false
          }
        },
        "otherwise": {
          "state": {
            "visible": true
          }
        }
      }
    },
    "target": {
      "type": "string",
      "x-component": "Input"
    }
  }
}
```

Writing method two, local expression distribution linkage

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": {
        "target": "target",
        "fulfill": {
          "state": {
            "visible": "{{$self.value === '123'}}" //Any level of attributes supports expressions
          }
        }
      }
    },
    "target": {
      "type": "string",
      "x-component": "Input"
    }
  }
}
```

Writing method three, linkage of adjacent elements

```json
{
  "type": "array",
  "x-component": "ArrayTable",
  "items": {
    "type": "object",
    "properties": {
      "source": {
        "type": "string",
        "x-component": "Input",
        "x-reactions": {
          "target": ".target",
          "fulfill": {
            "state": {
              "visible": "{{$self.value === '123'}}" //Any level of attributes supports expressions
            }
          }
        }
      },
      "target": {
        "type": "string",
        "x-component": "Input"
      }
    }
  }
}
```

Writing method four, based on Schema protocol linkage

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": {
        "target": "target",
        "fulfill": {
          "schema": {
            "x-visible": "{{$self.value === '123'}}" //Any level of attributes supports expressions
          }
        }
      }
    },
    "target": {
      "type": "string",
      "x-component": "Input"
    }
  }
}
```

Writing method five, based on run statement linkage

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": {
        "fulfill": {
          "run": "$form.setFieldState('target',state=>{state.visible = $self.value === '123'})"
        }
      }
    },
    "target": {
      "type": "string",
      "x-component": "Input"
    }
  }
}
```

Writing method six, based on the linkage of life cycle hooks

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": {
        "target": "target",
        "effects": ["onFieldInputValueChange"],
        "fulfill": {
          "state": {
            "visible": "{{$self.value === '123'}}" //Any level of attributes supports expressions
          }
        }
      }
    },
    "target": {
      "type": "string",
      "x-component": "Input"
    }
  }
}
```

**Passive linkage**

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "x-component": "Input"
    },
    "target": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": {
        "dependencies": ["source"], //Dependency path is written by default to take value. If you rely on other attributes of the field, you can use source#modified, and use # to split to get detailed attributes
        // "dependencies":{ aliasName:"source" }, //alias form
        "fulfill": {
          "schema": {
            "x-visible": "{{$deps[0] === '123'}}" //Any level of attributes supports expressions
          }
        }
      }
    }
  }
}
```

**Complex linkage**

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "x-component": "Input"
    },
    "target": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": "{{myReaction}}" //For externally passed functions, more complex linkages can be realized within the function
    }
  }
}
```

**Component attribute linkage**

Writing one, operating status

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": {
        "target": "target",
        "fulfill": {
          "state": {
            "component[1].style.color": "{{$self.value === '123'?'red':'blue'}}" //Any level attribute supports expressions, and the key is a support path Expression, can achieve precise manipulation of attributes
          }
        }
      }
    },
    "target": {
      "type": "string",
      "x-component": "Input"
    }
  }
}
```

Writing method two, operating the Schema protocol

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": {
        "target": "target",
        "fulfill": {
          "schema": {
            "x-component-props.style.color": "{{$self.value === '123'?'red':'blue'}}" //Any level of property supports expressions, and the key is supported Path expression, can achieve precise operation properties
          }
        }
      }
    },
    "target": {
      "type": "string",
      "x-component": "Input"
    }
  }
}
```

## Built-in expression scope

Built-in expression scope is mainly used to realize various linkage relationships in expressions

### $self

Can only be consumed by expressions in x-reactions, representing the current field instance

### $dependencies

It can only be consumed by expressions in x-reactions, corresponding to the dependencies defined by x-reactions, and the sequence of the array is the same

### $deps

It can only be consumed by expressions in x-reactions, corresponding to the dependencies defined by x-reactions, and the sequence of the array is the same

### $form

Can only be consumed by expressions in x-reactions, representing the current Form instance

### $target

Can only be consumed in expressions in x-reactions, representing the target field of active mode
