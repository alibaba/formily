# registerFieldMiddleware

## 介绍

注册一个表单字段包装组件，类似于HOC，但是它是先注册组件层级浅,后注册的组件层级深，所以起名middleware

## 类型描述

```typescript
type registerFieldMiddleware = (...wrappers : React.ComponentType<any>) => React.ComponentType<any>

```

## 依赖

```javascript
import {registerFieldMiddleware} from '@uform/react'
```

## 用例

```javascript
import {registerFieldMiddleware} from '@uform/react'

registerFieldMiddleware((Field)=>{
  return (props)=><div><Field {...props}/></div>
})
```
