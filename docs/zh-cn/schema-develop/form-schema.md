# 理解 Form Schema

Schema 开发，最核心的就是 Schema，只有我们理解了这套协议之后，我们就能更高效，更快速的来开发表单了。

## 结构

首先，我们要理解，这份 Schema 是一份递归协议，它主要用于描述数据结构，但是 Formily 对其做了扩展，可以支持描述 UI：

```json
{
  "type": "object",
  "properties": {
    "key": {
      "type": "string"
    },
    "key1": {
      "type": "object",
      "properties": {
        "key2": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "key3": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}
```

可以看到，只要 type 指定为 object 或者 array 的时候，我们就可以指定它的 properties 或者 items，继续向下递归描述。目前而言，我们的递归结构，其实也就是 object 和 array。然后这份 Schema 描述的数据结构其实是：

```json
{
  "key": "string",
  "key1": {
    "key2": [
      {
        "key3": "string"
      }
    ]
  }
}
```

了解到 Schema 可以描述数据结构之后，在这里，我们暂且把拥有 type 属性的对象叫做一个字段节点，然后我们就可以看详细每个字段节点的可选属性了。

## 属性

| 属性名               | 描述                                   | 类型                                                              |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| title                | 字段标题                               | `React.ReactNode`                                                 |
| name                 | 字段所属的父节点属性名                 | `string`                                                          |
| description          | 字段描述                               | `React.ReactNode`                                                 |
| default              | 字段默认值                             | `any`                                                             |
| readOnly             | 是否只读与 editable 一致               | `boolean`                                                         |
| type                 | 字段类型                               | `'string' | 'object' | 'array' | 'number' | string`               |
| enum                 | 枚举数据                               | `Array<string | number | { label: React.ReactNode, value: any }>` |
| const                | 校验字段值是否与 const 的值相等        | `any`                                                             |
| multipleOf           | 校验字段值是否可被 multipleOf 的值整除 | `number`                                                          |
| maximum              | 校验最大值(大于)                       | `number`                                                          |
| exclusiveMaximum     | 校验最大值（大于等于）                 | `number`                                                          |
| minimum              | 校验最小值(小于)                       | `number`                                                          |
| exclusiveMinimum     | 最小值（小于等于）                     | `number`                                                          |
| maxLength            | 校验最大长度                           | `number`                                                          |
| minLength            | 校验最小长度                           | `number`                                                          |
| pattern              | 正则校验规则                           | `string | RegExp`                                                 |
| maxItems             | 最大条目数                             | `number`                                                          |
| minItems             | 最小条目数                             | `number`                                                          |
| uniqueItems          | 是否校验重复                           | `boolean`                                                         |
| maxProperties        | 最大属性数量                           | `number`                                                          |
| minProperties        | 最小属性数量                           | `number`                                                          |
| required             | 必填                                   | `boolean`                                                         |
| format               | 正则规则类型，详细类型可以往后看       | `InternalFormats`                                                 |
| properties           | 对象属性                               | `{[key : string]:Schema}`                                         |
| items                | 数组描述                               | `Schema | Schema[]`                                               |
| additionalItems      | 额外数组元素描述                       | `Schema`                                                          |
| patternProperties    | 动态匹配对象的某个属性的 Schema        | `{[key : string]:Schema}`                                         |
| additionalProperties | 匹配对象额外属性的 Schema              | `Schema`                                                          |
| triggerType          | 字段校验时机                           | `"onChange" | "onBlur"`                                           |
| editable             | 字段是否可编辑                         | `boolean`                                                         |
| visible              | 字段是否可见(数据+样式)                | `boolean`                                                         |
| display              | 字段样式是否可见                       | `boolean`                                                         |
| x-props              | 字段扩展属性                           | `{ [name: string]: any }`                                         |
| x-index              | 字段顺序                               | `number`                                                          |
| x-rules              | 字段校验规则，详细描述可以往后看       | [ValidatePatternRules](#validatepatternrules)                     |
| x-component          | 字段 UI 组件名称，大小写不敏感         | `string`                                                          |
| x-component-props    | 字段 UI 组件属性                       | `{}`                                                              |
| x-linkages           | 字段间联动协议，详细描述可以往后看        | `Array<{ target: FormPathPattern, type: string, [key: string]: any }>` |
| x-mega-props         | 字段布局属性                         | `{ [name: string]: any }`                                             |

## x-props 扩展属性

| 属性名                     | 描述                                              | 类型      |
| -------------------------- | ------------------------------------------------- | --------- |
| `x-props.addonAfter`       | FormItem 的尾随内容                               | ReactNode |
| `x-props.itemStyle`        | FormItem 的 style 属性                            | Object    |
| `x-props.itemClassName`    | FormItem 的 className 属性                        | String    |
| `x-props.triggerType`      | 配置校验触发类型 `"onChange" | "onBlur" | "none"` | String    |
| 针对组件库的 FormItem 属性 | 比如 labelCol/wrapperCol 等                       |           |

## Form Schema 表达式

Formily 针对 Form Schema 支持了表达式的能力，可以帮助我们在 JSON 字符串中注入一些逻辑能力

```tsx
<SchemaForm
  schema={{
    type: 'object',
    aa: {
      title: '{{customTitle}}',
      description: '{{customDescription}}',
      'x-component-props': {
        placeholder: '{{customPlaceholder}}'
      }
    }
  }}
  expressionScope={{
    customTitle: 'this is custom title',
    customDescription: 'this is custom description',
    customPlaceholder: 'this is custom placeholder'
  }}
/>
```

例子说明：

- 通过 expressionScope 注入上下文
- 表达式要求字段值必须为字符串，同时首位字符必须是以`{{`开始，以`}}`结束，否则会被认为普通字符串，不会被编译
- 表达式编译执行只会在父组件渲染的时候执行

## Form Schema 联动协议

考虑到协议层面希望做低纬度控制联动交互，所以我们抽象了一个叫做 x-linkages 的协议，帮助我们在协议层描述简单联动，注意，这个只是简单联动，它无法描述异步联动，也无法描述联动过程中的各种复杂数据处理。

### 抽象结构

首先，我们要理解 x-linkages 的核心抽象结构：

```json
{
  "type": "string",
  "x-linkages": [
    {
      "type": "value:visible",
      "target": "aa",
      "condition": "{{ $self.value === 123 }}"
    }
  ]
}
```

**案例说明**

- x-linkages 是一个数组结构，代表借助它可以实现 1 对多联动
- 每个数组项代表一个联动命令，需要指定联动类型 type 字段，也需要指定被联动的目标字段(target)
- target 是一个 FormPathPattern 匹配表达式，在这里我们可以使用 FormPath 的各种匹配语法
- 需要指定每个联动发生的条件(condition)，由一个表达式来驱动

### target 相邻路径查找

- `prevPath.[].fieldName`代表当前行字段
- `prevPath.[+].fieldName`代表下一行字段
- `prevPath.[-].fieldName`代表上一行字段
- `prevPath.[+2].fieldName`代表下下一行字段
- `prevPath.[-2].fieldName`代表上上一行字段
- 依次类推往下递增或者递减

### target 向前路径查找

- `.path.a.b`代表基于当前字段路径往后计算
- `..path.a.b`代表往前计算相对路径
- `...path.a.b`代表继续往前计算相对路径
- 以此类推向前查找

### 表达式说明

目前表达式的上下文注入了一些环境变量：

```typescript
{
  ...FormProps.expressionScope, //代表SchemaForm属性上通过expressionScope传递下来的上下文
  $value, //代表当前字段的值
  $self, //代表当前字段的状态
  $form, //代表当前表单实例
  $target //代表目标字段状态
}

```

### 更多联动协议

目前 Formily 内置了 3 种联动类型，主要有：

- value:visible，由值变化控制指定字段显示隐藏
- value:schema，由值变化控制指定字段的 schema
- value:state，由值变化控制指定字段的状态

```typescript
{
  type: "object",
  properties: {
    aaa: {
      type: "string",
      "x-linkages": [
        {
          type: "value:schema",
          target: "bbb",
          condition: '{{ $self.value == "123"}}',//当值为123时发生联动
          schema: {//控制bbb字段的标题，如果不指定condition，默认会走到该处
            title: "这是标题"
          },
          otherwise: {//条件不满足时控制bbb字段标题
            title: ""
          }
        }
      ]
    },
    bbb: {
      type: "string",
      "x-linkages": [
        {
          type: "value:state",
          target: "ccc",
          condition: '{{ $self.value == "123"}}',//当值为123时发生联动
          state:{//控制bbb字段的可编辑状态，如果不指定condition，默认会走到该处
             editable:true
          },
          otherwise:{//条件不满足时控制bbb字段的编辑状态
            editable:false
          }
        }
      ]
    },
    ccc: {
      type: "string"
    }
  }
}

```

> 注意：如果不指定 condition，那么默认会执行 state(value:state)/schema(value:schema)流程

### 扩展联动协议

想要了解更多高级内容，可以详细查看 [理解表单扩展机制](#/L3TOTn/g7SDSEi8HO)

## ValidatePatternRules

```typescript
type ValidatePatternRules =
  | InternalFormats
  | CustomValidator
  | ValidateDescription
  | Array<InternalFormats | CustomValidator | ValidateDescription>

type InternalFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'idcard'
  | 'taodomain'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | string //自定义正则规则

interface ValidateDescription {
  //正则规则类型
  format?: InternalFormats
  //自定义校验规则
  validator?: CustomValidator
  //是否必填
  required?: boolean
  //自定以正则
  pattern?: RegExp | string
  //最大长度规则
  max?: number
  //最大数值规则
  maximum?: number
  //封顶数值规则
  exclusiveMaximum?: number
  //封底数值规则
  exclusiveMinimum?: number
  //最小数值规则
  minimum?: number
  //最小长度规则
  min?: number
  //长度规则
  len?: number
  //是否校验空白符
  whitespace?: boolean
  //枚举校验规则
  enum?: any[]
  //自定义错误文案
  message?: string
  //自定义校验规则
  [key: string]: any
}

type SyncValidateResponse =
  | null
  | string
  | boolean
  | {
      type?: 'error' | 'warning'
      message: string
    }
type AsyncValidateResponse = Promise<SyncValidateResponse>
type ValidateResponse = SyncValidateResponse | AsyncValidateResponse
type CustomValidator = (
  value: any,
  description?: ValidateDescription
) => ValidateResponse
```
