# connect

## 描述

主要用于对第三方组件库的无侵入接入 Formily

## 签名

```ts
interface IComponentMapper<T extends Vue.Component> {
  (target: T): Vue.Component
}
interface connect<T extends Vue.Component> {
  (target: T, ...args: IComponentMapper<T>[]): Vue.Component
}
```

入参传入第一个参数是要接入的组件，后面的参数都是组件映射器，每个映射器都是一个函数，通常我们会使用内置的[mapProps](/api/shared/map-props)和[mapReadPretty](/api/shared/map-read-pretty)映射器

## 用例

<dumi-previewer demoPath="api/shared/connect" />
