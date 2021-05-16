# useFieldSchema

## 描述

主要在自定义组件中读取当前字段的 Schema 信息，该 hook 只能用在 SchemaField 或者 RecursionField 的子树中使用

## 签名

```ts
interface useFieldSchema {
  (): Ref<Schema>
}
```

Schema 参考[Schema](/api/shared/schema)

## 用例

<dumi-previewer demoPath="api/hooks/use-field-schema" />
