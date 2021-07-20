---
order: 2
---

# ArrayField

调用[createArrayField](/api/models/form#createarrayfield)所返回的 ArrayField 模型。

因为 ArrayField 是继承至 [Field](/api/models/field) 模型的，所以大部分 API 参考 Field 模型即可，该文档只讲解扩展方法

## 方法

<Alert>

注意：以下方法不仅会对数组数据做更新，同时还会对子节点做状态转置，如果不希望自动转置状态，可以直接调用`setValue`方法覆盖式更新值即可。

</Alert>

### push

#### 描述

往数组尾部追加元素，并触发 onInput

#### 签名

```ts
interface push {
  (...items: any[]): Prommise<void>
}
```

### pop

#### 描述

弹出数组最后一个元素，并触发 onInput

#### 签名

```ts
interface pop {
  (): Promise<void>
}
```

### insert

#### 描述

往数组中插入元素，并触发 onInput

#### 签名

```ts
interface insert {
  (index: number, ...items: any[]): Promise<void>
}
```

### remove

#### 描述

删除数组元素，并触发 onInput

#### 签名

```ts
interface remove {
  (index: number): Promise<void>
}
```

### shift

#### 描述

弹出数组第一个元素，并触发 onInput

#### 签名

```ts
interface shift {
  (): Promise<void>
}
```

### unshift

#### 描述

往数组头部追加元素，并触发 onInput

#### 签名

```ts
interface unshift {
  (...items: any[]): Promise<void>
}
```

### move

#### 描述

移动数组元素，并触发 onInput

#### 签名

```ts
interface move {
  (fromIndex: number, toIndex: number): Promise<void>
}
```

### moveUp

#### 描述

上移数组元素，并触发 onInput

#### 签名

```ts
interface moveUp {
  (index: number): Promise<void>
}
```

### moveDown

#### 描述

下移数组元素，并触发 onInput

#### 签名

```ts
interface moveDown {
  (index: number): Promise<void>
}
```

## 类型

### IArrayFieldState

主要属性参考[IFieldState](/api/models/field#ifieldstate)，只是 value 的数据类型要求是数组
