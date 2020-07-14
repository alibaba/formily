# 理解表单状态

在前面的很多例子中，其实我们或多或少已经接触到了表单状态的概念，特别是实现联动逻辑的过程中，我们都是收敛到了设置字段状态，那么我们的表单到底有哪些状态呢？

## FormState

| 状态名        | 描述                                        | 类型                                          | 默认值      |
| ------------- | ------------------------------------------- | --------------------------------------------- | ----------- |
| displayName   | Form 状态标识                               | string                                        | "FormState" |
| modified      | 表单 value 是否发生变化                     | boolean                                       | false       |
| valid         | 表单是否处于合法态                          | boolean                                       | true        |
| invalid       | 表单是否处于非法态，如果校验失败则会为 true | boolean                                       | False       |
| loading       | 表单是否处于加载态                          | boolean                                       | false       |
| validating    | 表单是否处于校验中                          | boolean                                       | false       |
| initialized   | 表单是否已经初始化                          | boolean                                       | false       |
| submitting    | 表单是否正在提交                            | boolean                                       | false       |
| editable      | 表单是否可编辑                              | boolean                                       | false       |
| errors        | 表单错误信息集合                            | `Array<{ path: string, messages: string[] }>` | []          |
| warnings      | 表单警告信息集合                            | `Array<{ path: string, messages: string[] }>` | []          |
| values        | 表单值                                      | object                                        | {}          |
| initialValues | 表单初始值                                  | object                                        | {}          |
| mounted       | 表单是否已挂载                              | boolean                                       | false       |
| unmounted     | 表单是否已卸载                              | boolean                                       | false       |
| 扩展状态      | 通过 setFormState 可以直接设置扩展状态      | any                                           |             |

> 注意，这里的 values 是状态名，如果是表单组件属性名，对应的是 value，而不是 values，因为状态管理是独立于 React 的，选用 value 作为 SchemaForm/Form 属性，主要是与 React 规范对齐

## FieldState

| 状态名         | 描述                                                                                                         | 类型                                          | 默认值       |
| -------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ------------ |
| displayName    | Field 状态标识                                                                                               | string                                        | "FieldState" |
| dataType       | 字段值类型                                                                                                   | `"any" | "array"`                             | "any"        |
| name           | 字段数据路径                                                                                                 | string                                        |              |
| path           | 字段节点路径                                                                                                 | string                                        |              |
| initialized    | 字段是否已经初始化                                                                                           | boolean                                       | false        |
| pristine       | 字段 value 是否等于 initialValue                                                                             | boolean                                       | false        |
| valid          | 字段是否合法                                                                                                 | boolean                                       | false        |
| invalid        | 字段是否非法                                                                                                 | boolean                                       | false        |
| touched        | 字段是否被 touch                                                                                             | boolean                                       | false        |
| visible        | 字段是否显示(如果为 false，字段值不会被提交)                                                                 | boolean                                       | true         |
| display        | 字段是否 UI 显示(如果为 false，字段值可以被提交)                                                             | boolean                                       | true         |
| editable       | 字段是否可编辑                                                                                               | boolean                                       | true         |
| loading        | 字段是否处于加载态                                                                                           | boolean                                       | false        |
| modified       | 字段的 value 是否变化                                                                                        | boolean                                       | false        |
| active         | 字段是否被激活(onFocus 触发)                                                                                 | boolean                                       | false        |
| visited        | 字段是否被 visited(onBlur 触发)                                                                              | boolean                                       | false        |
| validating     | 字段是否正在校验                                                                                             | boolean                                       | false        |
| values         | 字段值集合，value 属性相当于是 values[0]，该集合主要来源于组件的 onChange 事件的回调参数                     | any[]                                         | []           |
| errors         | 字段错误消息集合                                                                                             | string[]                                      | []           |
| effectErrors   | 人工操作的错误消息集合(在 setFieldState 中设置 errors 会被重定向到设置 effectErrors)                         | string[]                                      | []           |
| ruleErrors     | 校验规则的错误消息集合                                                                                       | string[]                                      | []           |
| warnings       | 字段警告信息集合                                                                                             | string[]                                      | []           |
| effectWarnings | 人工操作的警告信息集合(在 setFieldState 中设置 warnings 会被重定向到设置 effectWarnings)                     | string[]                                      | []           |
| ruleWarnings   | 校验规则的警告信息集合                                                                                       | string[]                                      | []           |
| value          | 字段值                                                                                                       | any                                           |              |
| initialValue   | 字段初始值                                                                                                   | any                                           |              |
| rules          | 字段校验规则                                                                                                 | [ValidatePatternRules](#validatepatternrules) | []           |
| required       | 字段是否必填                                                                                                 | boolean                                       | false        |
| mounted        | 字段是否已挂载                                                                                               | boolean                                       | false        |
| unmounted      | 字段是否已卸载                                                                                               | boolean                                       | false        |
| inputed        | 字段是否主动输入过                                                                                           | true                                          |
| props          | 字段扩展 UI 属性(如果是 Schema 模式，props 代表每个 SchemaField 属性，如果是 JSX 模式，则代表 FormItem 属性) | {}                                            |              |
| 扩展状态       | 通过 setFieldState 可以直接设置扩展状态                                                                      | any                                           |              |

## VirtualFieldState

VirtualFieldState 代表 VirtualField 的状态，VirtualField 是 Formily 节点树中的虚拟节点，它是无值节点，所以提交的时候，不会带值，但是我们又能控制它的具体 UI 属性，所以在 Formily 中，它更多的职责是作为布局组件而存在

| 状态名      | 描述                                                                                                         | 类型    | 默认值              |
| ----------- | ------------------------------------------------------------------------------------------------------------ | ------- | ------------------- |
| displayName | VirtualField 状态标识                                                                                        | string  | "VirtualFieldState" |
| name        | 字段数据路径                                                                                                 | string  |                     |
| path        | 字段节点路径                                                                                                 | string  |                     |
| initialized | 字段是否已经初始化                                                                                           | boolean | false               |
| visible     | 字段是否显示(如果为 false，字段值不会被提交)                                                                 | boolean | true                |
| display     | 字段是否 UI 显示(如果为 false，字段值可以被提交)                                                             | boolean | true                |
| mounted     | 字段是否已挂载                                                                                               | boolean | false               |
| unmounted   | 字段是否已卸载                                                                                               | boolean | false               |
| props       | 字段扩展 UI 属性(如果是 Schema 模式，props 代表每个 SchemaField 属性，如果是 JSX 模式，则代表 FormItem 属性) | {}      |                     |
| 扩展状态    | 通过 setFieldState 可以直接设置扩展状态                                                                      | any     |                     |

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
