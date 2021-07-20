---
order: 2
---

# Field Effect Hooks

## onFieldInit

#### 描述

用于监听某个字段初始化的副作用钩子，我们在调用 createField 的时候就会触发字段初始化事件

#### 签名

```ts
interface onFieldInit {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

<Alert>
  FormPathPattern的语法格式请参考 <a href="/api/entry/form-path">FormPath</a>
</Alert>

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldInit } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldInit('target', () => {
            setResponse('target已初始化')
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          form.createField({ name: 'target' })
        }}
      >
        创建字段
      </button>
    </ActionResponse>
  )
}
```

## onFieldMount

#### 描述

用于监听某个字段已挂载的副作用钩子，我们在调用 onMount 的时候就会触发字段挂载事件

#### 签名

```ts
interface onFieldMount {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldMount } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldMount('target', () => {
            setResponse('target已挂载')
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          form.createField({ name: 'target' }).onMount()
        }}
      >
        创建并挂载字段
      </button>
    </ActionResponse>
  )
}
```

## onFieldUnmount

#### 描述

用于监听某个字段已卸载的副作用钩子，我们在调用 onUnmount 的时候就会触发卸载事件

#### 签名

```ts
interface onFieldUnmount {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldMount, onFieldUnmount } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldMount('target', () => {
            setResponse('target已挂载')
          })
          onFieldUnmount('target', () => {
            setResponse('target已卸载')
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          form.createField({ name: 'target' }).onMount()
        }}
      >
        创建并挂载字段
      </button>
      <button
        onClick={() => {
          form.createField({ name: 'target' }).onUnmount()
        }}
      >
        卸载字段
      </button>
    </ActionResponse>
  )
}
```

## onFieldReact

用于实现字段响应式逻辑的副作用钩子，它的核心原理就是字段初始化的时候会执行回调函数，同时自动追踪依赖，依赖数据发生变化时回调函数会重复执行

#### 签名

```ts
interface onFieldReact {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldReact('target', () => {
            setResponse(
              'target ' + (form.values.other === 123 ? '显示' : '隐藏')
            )
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          form.createField({ name: 'target' })
        }}
      >
        初始化target
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: 'other' })
          field.setValue(123)
        }}
      >
        赋值other = 123
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: 'other' })
          field.setValue(null)
        }}
      >
        赋值other = null
      </button>
    </ActionResponse>
  )
}
```

> 该示例会追踪 values.other 的变化，如果等于 123，就会控制 target 显示，否则隐藏

## onFieldChange

#### 描述

用于监听某个字段的属性变化的副作用钩子

#### 签名

```ts
interface onFieldChange {
  (
    pattern: FormPathPattern,
    watches?: string[],
    callback: (field: Field, form: Form) => void
  )
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

可以传入具体要监听的的属性集合，也可以不传，默认是监听 value 变化

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldChange } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldChange('target', () => {
            setResponse('target值变化：' + field.value)
          })
          onFieldChange('target', ['component'], () => {
            setResponse('target组件变化')
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target' })
          field.setValue(field.value ? field.value + 1 : 1)
        }}
      >
        设置值
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target' })
          field.setComponent('Input')
        }}
      >
        设置组件
      </button>
    </ActionResponse>
  )
}
```

## onFieldValueChange

用于监听某个字段值变化的副作用钩子

#### 签名

```ts
interface onFieldValueChange {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldValueChange('target', () => {
            setResponse('target值变化：' + field.value)
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target' })
          field.setValue(field.value ? field.value + 1 : 1)
        }}
      >
        设置值
      </button>
    </ActionResponse>
  )
}
```

## onFieldInitialValueChange

用于监听某个字段默认值变化的副作用钩子

#### 签名

```ts
interface onFieldInitialValueChange {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldInitialValueChange } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldInitialValueChange('target', () => {
            setResponse('target默认值变化：' + field.value)
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target' })
          field.setInitialValue(field.value ? field.value + 1 : 1)
        }}
      >
        设置值
      </button>
    </ActionResponse>
  )
}
```

## onFieldInputValueChange

用于监听某个字段 onInput 触发的副作用钩子

#### 签名

```ts
interface onFieldInputValueChange {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldInputValueChange } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldInputValueChange('target', () => {
            setResponse('target 值变化：' + field.value)
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target' })
          field.onInput(field.value ? field.value + 1 : 1)
        }}
      >
        调用onInput
      </button>
    </ActionResponse>
  )
}
```

## onFieldValidateStart

#### 描述

监听某个字段校验触发开始的副作用钩子

#### 签名

```ts
interface onFieldValidateStart {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldValidateStart } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldValidateStart('target', () => {
            setResponse('target校验开始')
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target', required: true })
          field.onInput('')
        }}
      >
        触发校验
      </button>
    </ActionResponse>
  )
}
```

## onFieldValidateEnd

#### 描述

监听某个字段校验触发结束的副作用钩子

#### 签名

```ts
interface onFieldValidateEnd {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldValidateEnd } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldValidateEnd('target', () => {
            setResponse('target校验结束')
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target', required: true })
          field.onInput('')
        }}
      >
        触发校验
      </button>
    </ActionResponse>
  )
}
```

## onFieldValidateFailed

#### 描述

监听某个字段校验触发失败的副作用钩子

#### 签名

```ts
interface onFieldValidateFailed {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFieldValidateFailed } from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldValidateFailed('target', () => {
            setResponse('target校验失败')
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target', required: true })
          field.onInput('')
        }}
      >
        触发校验
      </button>
    </ActionResponse>
  )
}
```

## onFieldValidateSuccess

#### 描述

监听某个字段校验触发成功的副作用钩子

#### 签名

```ts
interface onFieldValidateSuccess {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import {
  createForm,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@formily/core'
import { ActionResponse } from './ActionResponse'

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldValidateFailed('target', () => {
            setResponse('target校验失败')
          })
          onFieldValidateSuccess('target', () => {
            setResponse('target校验成功')
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target', required: true })
          field.onInput('')
        }}
      >
        触发失败
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: 'target', required: true })
          field.onInput('123')
        }}
      >
        触发成功
      </button>
    </ActionResponse>
  )
}
```
