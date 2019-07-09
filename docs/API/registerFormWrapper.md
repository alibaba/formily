# registerFormWrapper

## 介绍

注册一个表单包装组件，类似于HOC，先注册的组件层级深，后注册的组件层级浅

## 类型描述

```typescript
type registerFormWrapper = (...wrappers : Wrapper) => FormComponent 

type Wrapper = (component: FormComponent) => FormComponent
```

## 依赖

```javascript
import {registerFormWrapper} from '@uform/react'
```

## 用例

```javascript
import {registerFormWrapper} from '@uform/react'

registerFormWrapper((Form)=>{
  return (props)=><div><Form {...props}/></div>
})
```
