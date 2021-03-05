# @formily/reactive

> Web Reactive Library Like Mobx

## QuikStart

```tsx
import React from 'react'
import { observable, autorun } from '@formily/reactive'

const obs = observable({ aa: 0 })

autorun(() => {
  console.log(obs.aa)
})

export default () => (
  <button
    onClick={() => {
      obs.aa++
    }}
  >
    click
  </button>
)
```
