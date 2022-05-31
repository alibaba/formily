---
order: 8
---

# ExpressionScope

## 描述

用于自定义组件内部给 json-schema 表达式传递局部作用域

## 签名

```ts
interface IExpressionScopeProps {
  value?: any
}
type ExpressionScope = Vue.Component<any, any, any, IExpressionScopeProps>
```

## 用例

<dumi-previewer demoPath="api/components/expression-scope" />
