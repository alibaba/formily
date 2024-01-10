# useForm

## 描述

主要在自定义组件中读取当前[Form](https://core.formilyjs.org/api/models/form)实例，用于实现一些副作用依赖，比如依赖 Form 的 errors 信息之类的，用于实现一些较为复杂的场景化组件

## 签名

```ts
interface useForm {
  (): Form
}
```

## 用例

<dumi-previewer demoPath="api/hooks/use-form" />
