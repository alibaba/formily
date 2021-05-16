# mapReadPretty

## 描述

因为大多数第三方组件都不支持阅读态，如果想要快速支持阅读态的话，即可使用 mapReadPretty 函数来映射一个阅读态组件

## 签名

```ts
interface mapReadPretty {
  (component: Vue.Component): Vue.Component
}
```

## 用例

<dumi-previewer demoPath="api/shared/map-read-pretty" />
