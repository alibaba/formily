# Schema

## 描述

@formily/vue 协议驱动最核心的部分，Schema 在其中是一个通用 Class，用户可以自行使用，同时在 SchemaField 和 RecursionField 中都有依赖它，它主要有几个核心能力：

- 解析 json-schema 的能力
- 将 json-schema 转换成 Field Model 的能力
- 编译 json-schema 表达式的能力

从@formily/vue 中可以导出 Schema 这个 Class，但是如果你不希望使用@formily/vue，你可以单独依赖@formily/json-schema 这个包

## 构造器

```ts
class Schema {
  constructor(json: ISchema, parent?: ISchema)
}
```

基于一份 json schema 数据创建一棵 Schema Tree，保证每个 schema 节点都是包含对应方法的

## 属性

| 属性                 | 描述                                              | 类型                                                                               | 字段模型映射                                                             |
| -------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| type                 | 类型                                              | [SchemaTypes](#schematypes)                                                        | [GeneralField](https://core.formilyjs.org/api/models/field#generalfield) |
| title                | 标题                                              | React.ReactNode                                                                    | `title`                                                                  |
| description          | 描述                                              | React.ReactNode                                                                    | `description`                                                            |
| default              | 默认值                                            | Any                                                                                | `initialValue`                                                           |
| readOnly             | 是否只读                                          | Boolean                                                                            | `readOnly`                                                               |
| writeOnly            | 是否只写                                          | Boolean                                                                            | `editable`                                                               |
| enum                 | 枚举                                              | [SchemaEnum](#schemaenum)                                                          | `dataSource`                                                             |
| const                | 校验字段值是否与 const 的值相等                   | Any                                                                                | `validator`                                                              |
| multipleOf           | 校验字段值是否可被 multipleOf 的值整除            | Number                                                                             | `validator`                                                              |
| maximum              | 校验最大值(大于)                                  | Number                                                                             | `validator`                                                              |
| exclusiveMaximum     | 校验最大值（大于等于                              | Number                                                                             | `validator`                                                              |
| minimum              | 校验最小值(小于)                                  | Number                                                                             | `validator`                                                              |
| exclusiveMinimum     | 最小值（小于等于）                                | Number                                                                             | `validator`                                                              |
| maxLength            | 校验最大长度                                      | Number                                                                             | `validator`                                                              |
| minLength            | 校验最小长度                                      | Number                                                                             | `validator`                                                              |
| pattern              | 正则校验规则                                      | RegExpString                                                                       | `validator`                                                              |
| maxItems             | 最大条目数                                        | Number                                                                             | `validator`                                                              |
| minItems             | 最小条目数                                        | Number                                                                             | `validator`                                                              |
| uniqueItems          | 是否校验重复                                      | Boolean                                                                            | `validator`                                                              |
| maxProperties        | 最大属性数量                                      | Number                                                                             | `validator`                                                              |
| minProperties        | 最小属性数量                                      | Number                                                                             | `validator`                                                              |
| required             | 必填                                              | Boolean                                                                            | `validator`                                                              |
| format               | 正则校验格式                                      | [ValidatorFormats](https://core.formilyjs.org/api/models/field#fieldvalidator)     | `validator`                                                              |
| properties           | 属性描述                                          | [SchemaProperties](#schemaproperties)                                              | -                                                                        |
| items                | 数组描述                                          | [SchemaItems](#schemaitems)                                                        | -                                                                        |
| additionalItems      | 额外数组元素描述                                  | Schema                                                                             | -                                                                        |
| patternProperties    | 动态匹配对象的某个属性的 Schema                   | [SchemaProperties](#schemaproperties)                                              | -                                                                        |
| additionalProperties | 匹配对象额外属性的 Schema                         | Schema                                                                             | -                                                                        |
| x-index              | UI 展示顺序                                       | Number                                                                             | -                                                                        |
| x-pattern            | UI 交互模式                                       | [FieldPatternTypes](https://core.formilyjs.org/api/models/field#fieldpatterntypes) | `pattern`                                                                |
| x-display            | UI 展示                                           | [FieldDisplayTypes](https://core.formilyjs.org/api/models/field#fielddisplaytypes) | `display`                                                                |
| x-validator          | 字段校验器                                        | [FieldValidator](https://core.formilyjs.org/api/models/field#fieldvalidator)       | `validator`                                                              |
| x-decorator          | 字段 UI 包装器组件                                | `String \| React.FC`                                                               | `decorator`                                                              |
| x-decorator-props    | 字段 UI 包装器组件属性                            | Any                                                                                | `decorator`                                                              |
| x-component          | 字段 UI 组件                                      | `String \| React.FC`                                                               | `component`                                                              |
| x-component-props    | 字段 UI 组件属性                                  | Any                                                                                | `component`                                                              |
| x-reactions          | 字段联动协议                                      | [SchemaReactions](#schemareactions)                                                | `reactions`                                                              |
| x-content            | 字段内容，用来传入某个组件的子节点                | React.ReactNode                                                                    | ReactChildren                                                            |
| x-visible            | 字段显示隐藏                                      | Boolean                                                                            | `visible`                                                                |
| x-hidden             | 字段 UI 隐藏(保留数据)                            | Boolean                                                                            | `hidden`                                                                 |
| x-disabled           | 字段禁用                                          | Boolean                                                                            | `disabled`                                                               |
| x-editable           | 字段可编辑                                        | Boolean                                                                            | `editable`                                                               |
| x-read-only          | 字段只读                                          | Boolean                                                                            | `readOnly`                                                               |
| x-read-pretty        | 字段阅读态                                        | Boolean                                                                            | `readPretty`                                                             |
| definitions          | Schema 预定义                                     | [SchemaProperties](#schemaproperties)                                              | -                                                                        |
| $ref                 | 从 Schema 预定义中读取 Schema 并合并至当前 Schema | String                                                                             | -                                                                        |
| x-data               | 扩展属性                                          | Object                                                                             | data                                                                     |

#### 详细说明

- x-component 的组件标识与[createSchemaField](/api/components/schema-field#签名)传入的组件集合的 Key 匹配
- x-decorator 的组件标识与[createSchemaField](/api/components/schema-field#签名)传入的组件集合的 Key 匹配
- Schema 的每个属性都能使用字符串表达式<code v-pre>{{expression}}</code>，表达式变量可以从 createSchemaField 中传入，也可以从 SchemaField 组件中传入
- $ref 指定 Schema 预定义的格式必须是<code v-pre>#/definitions/address</code>这种格式，不支持加载远程 JSON Schema

## 方法

### addProperty

#### 描述

添加属性描述

#### 签名

```ts
interface addProperty {
  (key: string | number, schema: ISchema): Schema //返回添加后的Schema对象
}
```

### removeProperty

#### 描述

移除属性描述

#### 签名

```ts
interface removeProperty {
  (key: string | number): Schema //返回被移除的Schema对象
}
```

### setProperties

#### 描述

覆盖式更新属性描述

#### 签名

```ts
interface setProperties {
  (properties: SchemaProperties): Schema //返回当前Schema对象
}
```

SchemaProperties 参考 [SchemaProperties](#schemaproperties)

### addPatternProperty

#### 描述

添加正则属性描述

#### 签名

```ts
interface addPatternProperty {
  (regexp: string, schema: ISchema): Schema //返回添加后的Schema对象
}
```

### removePatternProperty

#### 描述

移除正则属性描述

#### 签名

```ts
interface removePatternProperty {
  (regexp: string): Schema //返回移除后的Schema对象
}
```

### setPatternProperties

#### 描述

覆盖式更新正则属性描述

#### 签名

```ts
interface setPatternProperties {
  (properties: SchemaProperties): Schema //返回当前Schema对象
}
```

SchemaProperties 参考 [SchemaProperties](#schemaproperties)

### setAdditionalProperties

#### 描述

覆盖式更新扩展属性描述

#### 签名

```ts
interface setAdditionalProperties {
  (properties: ISchema): Schema //返回扩展属性Schema对象
}
```

### setItems

#### 描述

覆盖式更新数组项描述

#### 签名

```ts
interface setItems {
  (items: SchemaItems): SchemaItems //返回更新后的SchemaItems对象
}
```

SchemaItems 参考 [SchemaItems](#schemaitems)

### setAdditionalItems

#### 描述

覆盖式更新数组扩展项描述

#### 签名

```ts
interface setAdditionalItems {
  (items: ISchema): Schema //返回更新后的Schema对象
}
```

SchemaItems 参考 [SchemaItems](#schemaitems)

### mapProperties

#### 描述

遍历并映射当前 Schema 的 properties 属性，同时会基于 x-index 顺序来遍历

#### 签名

```ts
interface mapProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

### mapPatternProperties

#### 描述

遍历并映射当前 Schema 的 patternProperties 属性，同时会基于 x-index 顺序来遍历

#### 签名

```ts
interface mapPatternProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

### reduceProperties

#### 描述

reduce 当前 Schema 的 properties 属性，同时会基于 x-index 顺序来遍历

#### 签名

```ts
interface reduceProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

### reducePatternProperties

#### 描述

reduce 当前 Schema 的 patternProperties 属性，同时会基于 x-index 顺序来遍历

#### 签名

```ts
interface reducePatternProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

### compile

#### 描述

深度递归当前 Schema 对象中的表达式片段，编译表达式，并返回 Schema，我们可以传入作用域对象，在表达式中即可消费作用域变量

表达式片段约定：以`{{`开头`}}`结尾的字符串代表一个表达式片段

#### 签名

```ts
interface compile {
  (scope: any): Schema
}
```

### fromJSON

#### 描述

将普通 json 数据转换成 Schema 对象

#### 签名

```ts
interface fromJSON {
  (json: ISchema): Schema
}
```

### toJSON

#### 描述

将当前 Schema 对象转换成普通 json 数据

#### 签名

```ts
interface toJSON {
  (): ISchema
}
```

### toFieldProps

#### 描述

将当前 Schema 对象转换成 Formily 字段模型属性，映射关系参考 [属性](#属性)

#### 签名

```ts
import { IFieldFactoryProps } from '@formily/core'

interface toFieldProps {
  (): IFieldFactoryProps
}
```

IFieldFactoryProps 参考 [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

## 静态方法

### getOrderProperties

#### 描述

从 Schema 中获取排序后的 properties

#### 签名

```ts
interface getOrderProperties {
  (schema: ISchema = {}, propertiesName: keyof ISchema = 'properties'): ISchema
}
```

### compile

#### 描述

深度遍历任意对象中的表达式片段，表达式片段约定：以`{{`开头`}}`结尾的字符串代表一个表达式片段

#### 签名

```ts
interface compile {
  (target: any, scope: any): any
}
```

### shallowCompile

#### 描述

浅层遍历任意对象中的表达式片段，表达式片段约定：以`{{`开头`}}`结尾的字符串代表一个表达式片段

#### 签名

```ts
interface shallowCompile {
  (target: any, scope: any): any
}
```

### silent

#### 描述

是否静默编译，如果是，则表达式报错不会有任何提醒

#### 签名

```ts
interface silent {
  (value?: boolean): void
}
```

### isSchemaInstance

#### 描述

判断某个对象是否为 Schema Class 的实例对象

#### 签名

```ts
interface isSchemaInstance {
  (target: any): target is Schema
}
```

### registerCompiler

#### 描述

注册表达式编译器

#### 签名

```ts
interface registerCompiler {
  (compiler: (expression: string, scope: any) => any): void
}
```

### registerPatches

#### 描述

注册 Schema 补丁，方便做不同版本的 Schema 协议兼容

#### 签名

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPatches {
  (...args: SchemaPatch[]): void
}
```

### registerVoidComponents

#### 描述

给字段组件打上标识，标识该组件是虚拟组件，与 formily1.x 做兼容

#### 签名

```ts
interface registerVoidComponents {
  (components: string[]): void
}
```

#### 用例

```ts
import { Schema } from '@formily/react'

Schema.registerVoidComponents(['card', 'tab', 'step'])
```

::: warning

  <p>注意，该 api 需要配合 <code>enablePolyfills(['1.0'])</code> 使用</p>
:::

### registerTypeDefaultComponents

#### 描述

给 Schema 类型标识默认组件类型

#### 签名

```ts
interface registerTypeDefaultComponents {
  (maps: Record<string, string>): void
}
```

#### 用例

```ts
import { Schema } from '@formily/vue'

Schema.registerTypeDefaultComponents({
  string: 'Input',
  number: 'NumberPicker',
  array: 'ArrayTable',
})
```

注意，该 api 需要配合 <code>enablePolyfills(['1.0'])</code> 使用

### registerPolyfills

#### 描述

注册协议兼容垫片

#### 签名

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPolyfills {
  (version: string, patch: SchemaPatch): void
}
```

#### 用例

```ts
import { Schema } from '@formily/react'

Schema.registerPolyfills('1.0', (schema) => {
  schema['x-decorator'] = 'FormItem'
  return schema
})
```

### enablePolyfills

#### 描述

开启协议垫片，默认内置 1.0 版本协议兼容垫片，主要兼容特性：

- x-decorator 不声明，自动作为 FormItem
- x-linkages 转换为 x-reactions
- x-props 自动转换为 x-decorator-props
- x-rules 转换为 x-validator
- editable 转换为 x-editable
- visible 转换为 x-visible
- x-component 为 card/block/grid-row/grid-col/grid/layout/step/tab/text-box 自动转换 VoidField，

#### 签名

```ts
interface enablePolyfills {
  (versions: string[]): void
}
```

#### 用例

```ts
import { Schema } from '@formily/vue'

Schema.enablePolyfills(['1.0'])
```

## 类型

### ISchema

#### 描述

ISchema 就是一份普通 JSON 数据，同时它是遵循 Schema [属性](#属性) 规范的 JSON 数据

### SchemaTypes

#### 描述

Schema 描述的类型

#### 签名

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

#### 描述

Schema 属性描述

#### 签名

```ts
type SchemaProperties = Record<string, ISchema>
```

### SchemaItems

#### 描述

Schema 数组项描述

#### 签名

```ts
type SchemaItems = ISchema | ISchema[]
```

### SchemaEnum

#### 描述

Schema 枚举

#### 签名

```ts
type SchemaEnum<Message> = Array<
  | string
  | number
  | { label: Message; value: any; [key: string]: any }
  | { key: any; title: Message; [key: string]: any }
>
```

### SchemaReactions

#### 描述

Schema 联动协议，如果 reaction 对象里包含 target，则代表主动联动模式，否则代表被动联动模式  
如果想实现更复杂的联动，可以通过作用域传入 reaction 响应器函数进行处理  
FormPathPattern 路径语法文档看[这里](https://core.formilyjs.org/zh-CN/api/entry/form-path#formpathpattern)

#### 签名

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
      dependencies?: //依赖的字段路径列表，支持FormPathPattern数据路径语法, 只能以点路径描述依赖，支持相对路径
      | Array<
            | string //如果数组里是string，那么读的时候也是数组格式
            | {
                //如果数组里是对象, 那么读的时候通过name从$deps获取
                name?: string //从$deps读取时的别名
                type?: string //字段类型
                source?: string //字段路径
                property?: string //依赖属性, 默认为value
              }
          >
        | Record<string, string> //如果是对象格式，读的时候也是对象格式，只是对象的key相当于别名
      when?: string | boolean //联动条件
      target?: string //要操作的字段路径，支持FormPathPattern匹配路径语法，注意：不支持相对路径！！
      effects?: SchemaReactionEffect[] //主动模式下的独立生命周期钩子
      fulfill?: {
        //满足条件
        state?: IGeneralFieldState //更新状态
        schema?: ISchema //更新Schema
        run?: string //执行语句
      }
      otherwise?: {
        //不满足条件
        state?: IGeneralFieldState //更新状态
        schema?: ISchema //更新Schema
        run?: string //执行语句
      }
    }
  | ((field: Field) => void) //支持函数, 可以复杂联动

type SchemaReactions<Field = any> =
  | SchemaReaction<Field>
  | SchemaReaction<Field>[] //支持传入数组
```

#### 用例

**主动联动**

写法一，标准主动联动

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

写法二，局部表达式分发联动

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
            "visible": "{{$self.value === '123'}}" //任意层次属性都支持表达式
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

写法三，相邻元素联动

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
              "visible": "{{$self.value === '123'}}" //任意层次属性都支持表达式
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

写法四，基于 Schema 协议联动

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
            "x-visible": "{{$self.value === '123'}}" //任意层次属性都支持表达式
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

写法五，基于 run 语句联动

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

写法六，基于生命周期钩子联动

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
            "visible": "{{$self.value === '123'}}" //任意层次属性都支持表达式
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

**被动联动**

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
        "dependencies": ["source"], //依赖路径写法默认是取value，如果依赖的是字段的其他属性，可以使用 source#modified，用#分割取详细属性
        // "dependencies":{ aliasName:"source" }, //别名形式
        "fulfill": {
          "schema": {
            "x-visible": "{{$deps[0] === '123'}}" //任意层次属性都支持表达式
          }
        }
      }
    }
  }
}
```

**复杂联动**

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
      "x-reactions": "{{myReaction}}" //外部传入的函数，在函数内可以实现更复杂的联动
    }
  }
}
```

**组件属性联动**

写法一，操作状态

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
            "component[1].style.color": "{{$self.value === '123' ? 'red' : 'blue'}}" //任意层次属性都支持表达式，同时key是支持路径表达式的，可以实现精确操作属性
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

写法二，操作 Schema 协议

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
            "x-component-props.style.color": "{{$self.value === '123' ? 'red' : 'blue'}}" //任意层次属性都支持表达式，同时key是支持路径表达式的，可以实现精确操作属性
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

## 内置表达式作用域

内置表达式作用域主要用于在表达式中实现各种联动关系

### $self

代表当前字段实例，可以在普通属性表达式中使用，也能在 x-reactions 中使用

### $values

代表顶层表单数据，可以在普通属性表达式中使用，也能在 x-reactions 中使用

### $form

代表当前 Form 实例，可以在普通属性表达式中使用，也能在 x-reactions 中使用

### $observable

用于创建响应式对象，使用方式与 observable 一致

### $memo

用于创建持久引用数据，使用方式与 autorun.memo 一致

### $effect

用于响应 autorun 第一次执行的下一个微任务时机与响应 autorun 的 dispose，使用方式与 autorun.effect 一致

### $dependencies

只能在 x-reactions 中的表达式消费，与 x-reactions 定义的 dependencies 对应，数组顺序一致

### $deps

只能在 x-reactions 中的表达式消费，与 x-reactions 定义的 dependencies 对应，数组顺序一致

### $target

只能在 x-reactions 中的表达式消费，代表主动模式的 target 字段
