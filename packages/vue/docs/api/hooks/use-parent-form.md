# useParentForm

## 描述

用于读取最近的 Form 或者 ObjectField 实例，主要方便于调用子表单的 submit/validate

## 签名

```ts
interface useParentForm {
  (): Form | ObjectField
}
```

## 用例

<dumi-previewer demoPath="api/hooks/use-parent-form" />
