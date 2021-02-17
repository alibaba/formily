---
order: 3
---

# ObjectField

调用[createObjectField](/api/models/form#createobjectfield)所返回的 ObjectField 模型。

因为 ObjectField 是继承至 [Field](/api/models/field) 模型的，所以大部分 API 参考 Field 模型即可，该文档只讲解扩展方法

## 方法

### addProperty

#### 描述

给对象添加属性，并触发 onInput

#### 签名

```ts
interface addProperty {
  (key: FormPathPattern, value: any): Promise<void>
}
```

### removeProperty

#### 描述

移除对象属性，并触发 onInput

#### 签名

```ts
interface removeProperty {
  (key: FormPathPattern): Promise<void>
}
```

### existProperty

#### 描述

判断属性是否存在

#### 签名

```ts
interface existProperty {
  (key: FormPathPattern): boolean
}
```

## 类型

### IObjectFieldState

主要属性参考[IFieldState](/api/models/field#ifieldstate)，只是 value 的数据类型要求是对象
