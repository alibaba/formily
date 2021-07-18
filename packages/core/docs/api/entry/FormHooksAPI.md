---
order: 3
---

# Form Hooks API

## createEffectHook

#### Description

Create a custom hook listener

#### Signature

```ts
interface createEffectHook {
  (
    type: string,
    callback?: (
      payload: any,
      form: Form,
      ...ctx: any[] //user-injected context
    ) => (...args: any[]) => void //High-level callbacks are used to process the encapsulation of the listener and help users achieve parameter customization capabilities
  )
}
```

#### Example

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, createEffectHook } from '@formily/core'
import { ActionResponse } from './ActionResponse'

const onCustomEvent = createEffectHook(
  'custom-event',
  (payload, form) => (listener) => {
    listener(payload, form)
  }
)

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onCustomEvent((payload, form) => {
            setResponse(payload + 'Form:' + form.id)
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          form.notify('custom-event', 'This is Custom Event')
        }}
      >
        Notify
      </button>
    </ActionResponse>
  )
}
```

## createEffectContext

#### Description

In the effects function, if we abstract a lot of fine-grained hooks, we need to pass it layer by layer if we want to read the top-level context data in hooks, which is obviously very inefficient, so formily provides createEffectContext to help users quickly obtain context data

#### Signature

```ts
interface createEffectContext<T> {
  (defaultValue: T): {
    provide(value: T): void
    consume(): T
  }
}
```

#### Example

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFormSubmit, createEffectContext } from '@formily/core'
import { ActionResponse } from './ActionResponse'

const { provide, consume } = createEffectContext()

const useMyHook = () => {
  const setResponse = consume()
  onFormSubmit(() => {
    setResponse('Context communication succeeded')
  })
}

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          provide(setResponse)
          useMyHook()
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          form.submit()
        }}
      >
        submit
      </button>
    </ActionResponse>
  )
}
```

## useEffectForm

#### Description

useEffectForm is actually a convenient usage of EffectContext, because most scene users will read Form instances, so there is no need to manually define an EffectFormContext

#### Signature

```ts
interface useEffectForm {
  (): Form
}
```

#### Example

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, useEffectForm, createEffectContext } from '@formily/core'
import { ActionResponse } from './ActionResponse'

const { provide, consume } = createEffectContext()

const useMyHook = () => {
  const form = useEffectForm()
  const setResponse = consume()
  setResponse('Communication successful:' + form.id)
}

export default () => {
  const [response, setResponse] = useState('')
  useMemo(
    () =>
      createForm({
        effects() {
          provide(setResponse)
          useMyHook()
        },
      }),
    []
  )
  return <ActionResponse response={response} />
}
```
