# injections

## 描述

@formily/vue 的所有 injections，方便用户做更复杂的个性化定制，我们可以通过 inject 来消费这些上下文

## FormContext

#### 描述

Form 上下文，可以获取当前 Form 实例

#### 签名

```ts
import { Form } from '@formily/core'

const FormContext = inject<Form>(FormSymbol)
```

## FieldContext

#### 描述

字段上下文，可以获取当前字段实例

#### 签名

```ts
import { GeneralField } from '@formily/core'

const FieldContext = inject<GeneralField>(FieldSymbol)
```

## SchemaMarkupContext

#### 描述

Schema 标签上下文，主要用于收集 JSX Markup 写法的 Schema 标签，然后转换成标准 JSON Schema

#### 签名

```ts
SchemaMarkupContext = inject<Schema>(SchemaMarkupSymbol)
```

## SchemaContext

#### 描述

字段 Schema 上下文，主要用于获取当前字段的 Schema 信息

#### 签名

```ts
const SchemaContext = inject<Schema>(SchemaSymbol)
```

## SchemaExpressionScopeContext

#### 描述

Schema 表达式作用域上下文

#### 签名

```ts
const SchemaExpressionScopeContext = inject<any>(SchemaExpressionScopeSymbol)
```

## SchemaOptionsContext

#### 描述

Schema 全局参数上下文，主要用于获取从 createSchemaField 传入的参数

#### 签名

```ts
const SchemaOptionsContext =
  inject<ISchemaFieldFactoryOptions>(SchemaOptionsSymbol)
```
