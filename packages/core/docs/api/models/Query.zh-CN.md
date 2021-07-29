---
order: 5
---

# Query

调用[Form](/api/models/form#query)或[Field](/api/models/field#query)实例中的 query 方法所返回的 Query 对象

## 方法

### take

#### 描述

从查询结果集中提取第一个结果

注意，必须要存在对应的节点才能读取

#### 签名

```ts
interface take {
  (): GeneralField
  <Result>(getter: (field: GeneralField, address: FormPath) => Result): Result
}
```

### map

#### 描述

遍历并映射查询结果集

注意，必须要存在对应的节点才能遍历

#### 签名

```ts
interface map {
  (): GeneralField[]
  <Result>(
    mapper?: (field: GeneralField, address: FormPath) => Result
  ): Result[]
}
```

### forEach

#### 描述

遍历查询结果集

注意，必须要存在对应的节点才能遍历

#### 签名

```ts
interface forEach {
  <Result>(eacher: (field: GeneralField, address: FormPath) => Result): void
}
```

### reduce

#### 描述

对查询结果集执行 reduce 操作

注意，必须要存在对应的节点才能遍历

#### 签名

```ts
interface reduce {
  <Result>(
    reducer: (value: Result, field: GeneralField, address: FormPath) => Result,
    initial?: Result
  ): Result
}
```

### get

#### 描述

从查询结果集中找到第一个结果，并读取其属性

注意，必须要存在对应的节点才能读取

#### 签名

```ts
interface get {
  <K extends keyof IGeneralFieldState>(key: K): IGeneralFieldState[K]
}
```

### getIn

#### 描述

从查询结果集中找到第一个结果，并读取其属性，支持 [FormPathPattern](/api/entry/form-path#formpathpattern) 路径语法

注意，必须要存在对应的节点才能读取

#### 签名

```ts
interface getIn {
  (pattern?: FormPathPattern): any
}
```

### value

#### 描述

查询指定路径值，不局限于 Field 节点

#### 签名

```ts
interface value {
  (): any
}
```

### initialValue

#### 描述

查询指定路径初始值，不局限于 Field 节点

#### 签名

```ts
interface initialValue {
  (): any
}
```
