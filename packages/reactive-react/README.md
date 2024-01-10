# @formily/reactive-react

## QuikStart

```tsx
import React from 'react'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const obs = observable({
  count: 0,
})

export default observer(() => {
  return (
    <div>
      {obs.count}
      <button
        onClick={() => {
          obs.count++
        }}
      >
        Click
      </button>
    </div>
  )
})
```
