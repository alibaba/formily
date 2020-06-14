# 管理业务逻辑

如何管理业务逻辑？因为现在 Formily 本身就是作为一个表单框架而存在，它解决的问题域很大，所以一旦项目复杂度足够高了之后，我们到底该如何管理业务逻辑就成一个问题了，这个时候就需要一个最佳实践来指导大家开发。

因为 Formily 是分为 3 种开发模式，在这里我们只讲 Schema 开发模式，所以，在 Schema 开发模式中，我们的业务逻辑管理主要分为：

- 管理业务字段
- 管理联动逻辑
- 管理异步逻辑
- 管理扩展组件
- 批处理字段

## 管理业务字段

> 如果是后端数据驱动的纯 JSON Schema 模式，则不需要管理业务字段，这里主要是针对 JSX Schema 开发模式

**方法**：物理拆分

**优点**：将业务字段拆分，方便多人协作管理，也方便后续定位问题

**例子**：

①：封装业务字段集

```tsx
// src/fields/BusinessCard.tsx
import React from 'react'
import { SchemaMarkupField as Field } from '@formily/antd'
import { FormCard, Input } from '@formily/antd-components'

export const BusinessCard = () => {
  return (
    <FormCard title="Business Card">
      <Field type="string" name="aa" x-component="Input" />
      <Field type="string" name="bb" x-component="Input" />
      <Field type="string" name="cc" x-component="Input" />
      <Field type="string" name="dd" x-component="Input" />
    </FormCard>
  )
}
```

②：引入业务字段集

```tsx
// src/index.tsx
import React from 'react'
import { SchemaForm } from '@formily/antd'
import { BusinessCard } from './fields/BusinessCard'

export const App = () => {
  return (
    <SchemaForm>
      <BusinessCard />
    </SchemaForm>
  )
}
```

**说明**：

因为 SchemaMarkupField 内部是借助 Context 收集 json schema 的，所以我们可以做到跨节点收集数据，这样就很方便对业务字段集做物理拆分

## 管理联动逻辑

**方法**：

- 物理拆分、使用 effectHook 进行逻辑抽象
- 抽象可复用联动操作方法

**优点**：解耦业务逻辑，方便多人协作

**例子**：

①：抽象通用联动方法

```tsx
// src/effects/useLinkageUtils.ts
import { createFormActions, FormPath } from '@formily/antd'

export const useLinkageUtils = () => {
  const { setFieldState } = createFormActions()
  const linkage = (key, defaultValue) => (path, value) =>
    setFieldState(path, state => {
      FormPath.setIn(state, key, value !== undefined ? value : defaultValue)
    })
  return {
    hide: linkage('visible', false),
    show: linkage('visible', true),
    visible: linkage('visible'),
    enum: linkage('props.enum', []),
    loading: linkage('loading', true),
    loaded: linkage('loading', false),
    value: linkage('value')
  }
}
```

②：定义业务联动逻辑

```tsx
// src/effects/useBusinessEffects.ts
import { createFormActions, FormEffectHooks } from '@formily/antd'
import { useLinkageUtils } from './useLinkageUtils'
const { onFieldValueChange$ } = FormEffectHooks

export const useBusinessEffects = context => {
  const linkage = useLinkageUtils()
  onFieldValueChange$('aaa').subscribe(({ value }) => {
    linkage.visible(value)
  })
}
```

③：引入 createEffects

```tsx
// src/effects/index.ts
import { useBusinessEffects } from './useBusinessEffects'

export const createEffects = context => () => {
  //高阶函数，方便接收上下文依赖变量
  useBusinessEffects(context)
}
```

④：传入 createEffects

```tsx
// src/index.tsx
import React from 'react'
import { SchemaForm } from '@formily/antd'
import { createEffects } from './effects'
import { BusinessCard } from './fields/BusinessCard'

export const App = () => {
  return (
    <SchemaForm effects={createEffects()}>
      <BusinessCard />
    </SchemaForm>
  )
}
```

## 管理异步逻辑

在表单中普遍存在的异步逻辑有 3 种：

- 表单初始化异步默认值数据
- 异步下拉选项数据
- 可搜索的异步下拉选项

#### 表单初始化默认值

①：定义 React Hook

```tsx
// src/hooks/useInitialValues.ts
import { useState, useEffect } from 'react'

export const useInitialValues = () => {
  const [state, setState] = useState()
  useEffect(() => {
    fetch('xxxx')
      .then(res => res.json())
      .then(res => {
        setState(res.data)
      })
  }, [])
  return state
}
```

②：引入 React Hook

```tsx
// src/index.tsx
import React from 'react'
import { SchemaForm } from '@formily/antd'
import { createEffects } from './effects'
import { BusinessCard } from './fields/BusinessCard'
import { useInitialValues } from './hooks/useInitialValues'

export const App = () => {
  const initialValues = useInitialValues()
  return (
    <SchemaForm initialValues={initialValues} effects={createEffects()}>
      <BusinessCard />
    </SchemaForm>
  )
}
```

#### 异步下拉选项

①：定义 EffectHook

```tsx
// src/effects/useAsyncDataSource.ts
import { createFormActions, FormEffectHooks, FormPath } from '@formily/antd'
import { useLinkageUtils } from './useLinkageUtils'
const { onFormInit$ } = FormEffectHooks

const useAsyncDataSource = (name, service) => {
  const { dispatch, setFieldState } = createFormActions()
  const linkage = useLinkageUtils()
  onFormInit$().subscribe(() => {
    setFieldState(name, state => {
      FormPath.setIn(state, 'props.x-props.hasFeedback', true)
    })
    linkage.loading(name)
    service().then(res => {
      linkage.loaded(name)
      linkage.enum(name, res)
      //请求结束可以dispatch一个自定义事件收尾，方便后续针对该事件做联动
      dispatch('requestAsyncDataSource', {
        name,
        payload: res
      })
    })
  })
}
```

②：引入 EffectHook

```tsx
// src/effects/index.ts
import { useBusinessEffects } from './useBusinessEffects'
import { useAsyncDataSource } from './useAsyncDataSource'

//高阶函数，方便接收上下文依赖变量
export const createEffects = context => () => {
  useBusinessEffects(context)
  //给aaa.bbb设置下拉枚举
  useAsyncDataSource('aaa.bbb', async () => {
    const data = await fetch('xxx').then(res.json())
    return data.map(({ name, code }) => {
      return {
        label: name,
        value: code
      }
    })
  })
}
```

#### 可搜索的异步下拉选项

①：定义 EffectHook

```tsx
// src/effects/useAsyncSearchDataSource.ts
import { createFormActions, FormEffectHooks, FormPath } from '@formily/antd'
import { useLinkageUtils } from './useLinkageUtils'
const { onFormInit$ } = FormEffectHooks

const useSearchDataSource = (name, service) => {
  const { dispatch, setFieldState } = createFormActions()
  const linkage = useLinkageUtils()
  onFormInit$().subscribe(() => {
    setFieldState(name, state => {
      FormPath.setIn(state, 'props.x-props.hasFeedback', true)
      FormPath.setIn(state, 'props.x-component-props.filterOption', false)
      FormPath.setIn(state, 'props.x-component-props.showSearch', true)
      FormPath.setIn(state, 'props.x-component-props.onSearch', value => {
        if (!value) return
        linkage.loading(name)
        service(value).then(res => {
          linkage.loaded(name)
          linkage.enum(name, res)
          //请求结束可以dispatch一个自定义事件收尾，方便后续针对该事件做联动
          dispatch('requestSearchDataSource', {
            name,
            payload: res
          })
        })
      })
    })
  })
}
```

②：引入 EffectHook

```tsx
// src/effects/index.ts
import { useBusinessEffects } from './useBusinessEffects'
import { useAsyncDataSource } from './useAsyncDataSource'
import { useSearchDataSource } from './useSearchDataSource'

//高阶函数，方便接收上下文依赖变量
export const createEffects = context => ($) => {
  useBusinessEffects(context)
  //给aaa.bbb设置下拉枚举
  useAsyncDataSource('aaa.bbb', async () => {
    const data = await fetch('xxx').then(res.json())
    return data.map(({ name, code }) => {
      return {
        label: name,
        value: code
      }
    })
  })
  //给aaa.bbb设置搜索枚举
  useSearchDataSource('aaa.ccc',, async (value) => {
    const data = await fetch(`xxx?keyword=${value}`).then(res.json())
    return data.map(({ name, code }) => {
      return {
        label: name,
        value: code
      }
    })
  })

  $('requestAsyncDataSource','aaa.bbb').subscribe(()=>{
    //监听aaa.ccc的下拉选项查询结果
  })

  $('requestSearchDataSource','aaa.ccc').subscribe(()=>{
    //监听aaa.ccc的搜索结果，考虑一种场景，我们需要在搜索的过程实时联动
  })
}
```

## 管理扩展组件

**方法**：物理拆分

**优点**：解耦逻辑，可维护性高

**例子**：

①：定义扩展组件

```tsx
// src/extensions/MyComponent.tsx
import { connect } from '@formily/antd'

export const MyComponent = connect()(({ value, onChange }) => {
  //内部接收value,调用onChange
})
```

②：引入扩展组件

```tsx
// src/index.tsx
import React from 'react'
import { SchemaForm } from '@formily/antd'
import { createEffects } from './effects'
import { BusinessCard } from './fields/BusinessCard'
import { useInitialValues } from './hooks/useInitialValues'
import { MyComponent } from './extentions/MyComponent'

export const App = () => {
  const initialValues = useInitialValues()
  return (
    <SchemaForm
      components={{
        MyComponent
      }}
      initialValues={initialValues}
      effects={createEffects()}
    >
      <BusinessCard />
    </SchemaForm>
  )
}
```

## 批处理字段

**方法**：借助 FormPath 能力，对所有字段进行批处理

**优点**：大大提高开发效率

① ：定义 EffectHook

```tsx
// src/effects/useAsyncSearchDataSource.ts
import { createFormActions, FormEffectHooks } from '@formily/antd'
const { onFormInit$ } = FormEffectHooks

const useBatchLocales = locales => {
  const { dispatch, setFieldState } = createFormActions()
  onFormInit$().subscribe(() => {
    setFieldState('*', state => {
      if (state.name && locales[state.name]) {
        state.props.title = locales[state.name]
      }
    })
  })
}
```

②：引入 EffectHook

```tsx
// src/effects/index.ts
import { useBusinessEffects } from './useBusinessEffects'
import { useAsyncDataSource } from './useAsyncDataSource'
import { useSearchDataSource } from './useSearchDataSource'
import { useBatchLocales } from './useBatchLocales'

//高阶函数，方便接收上下文依赖变量
export const createEffects = context => ($) => {
  useBatchLocales(context.locale)
  useBusinessEffects(context)
  //给aaa.bbb设置下拉枚举
  useAsyncDataSource('aaa.bbb', async () => {
    const data = await fetch('xxx').then(res.json())
    return data.map(({ name, code }) => {
      return {
        label: name,
        value: code
      }
    })
  })
  //给aaa.bbb设置搜索枚举
  useSearchDataSource('aaa.ccc',, async (value) => {
    const data = await fetch(`xxx?keyword=${value}`).then(res.json())
    return data.map(({ name, code }) => {
      return {
        label: name,
        value: code
      }
    })
  })

  $('requestAsyncDataSource','aaa.bbb').subscribe(()=>{
    //监听aaa.ccc的下拉选项查询结果
  })

  $('requestSearchDataSource','aaa.ccc').subscribe(()=>{
    //监听aaa.ccc的搜索结果，考虑一种场景，我们需要在搜索的过程实时联动
  })
}
```

③：定义国际化文案

```tsx
// src/locale/zh-cn/index.ts
export {
  aaa:'文案1',
  'aaa.bbb':'文案2'
}
```

④：引入国际化文案，并传入 createEffects

```tsx
// src/index.tsx
import React from 'react'
import { SchemaForm } from '@formily/antd'
import { createEffects } from './effects'
import { BusinessCard } from './fields/BusinessCard'
import { useInitialValues } from './hooks/useInitialValues'
import { MyComponent } from './extentions/MyComponent'
import zhCN from './local/zh-cn'

export const App = () => {
  const initialValues = useInitialValues()
  return (
    <SchemaForm
      components={{
        MyComponent
      }}
      initialValues={initialValues}
      effects={createEffects({
        locale: zhCN
      })}
    >
      <BusinessCard />
    </SchemaForm>
  )
}
```

## 整体目录结构

- src
  - extensions
    - MyComponent.tsx
  - hooks
    - useInitialValues.ts
  - fields
    - BusinessCard.tsx
  - effects
    - useBusinessEffects.ts
    - useAsyncDataSource.ts
    - useSearchDataSource.ts
    - useBatchLocales.ts
    - index.ts
  - locale
    - zh-cn
      - Index.ts
  - Index.tsx

## 总结

整体来看，我们这样一层层的将项目分解了之后，后续的整体维护性就会大大提高，当然你们还可以根据自己业务的特殊性来做一些定制。
