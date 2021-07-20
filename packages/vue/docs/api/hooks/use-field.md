# useField

## 描述

主要用在自定义组件内读取当前字段属性，操作字段状态等，在所有 Field 组件的子树内都能使用，注意，拿到的是[GeneralField](https://core.formilyjs.org/api/models/field#generalfield)，如果需要对不同类型的字段做处理，请使用[Type Checker](https://core.formilyjs.org/api/entry/form-checker)

::: warning
注意：如果要在自定义组件内使用 useField，并响应字段模型变化，需要使用 [observer](/api/shared/observer) 包裹自定义组件
:::

## 签名

```ts
interface useField {
  (): Ref<Field>
}
```

## 用例

<dumi-previewer demoPath="api/hooks/use-field" />
