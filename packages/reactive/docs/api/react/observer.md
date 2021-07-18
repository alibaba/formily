# observer

## observer

### Description

In React, turn Function Component into Reaction, and dependencies will be collected every time the view is re-rendered, and dependency updates will be automatically re-rendered

<Alert>
Note: Only Function Component is supported
</Alert>

### Signature

```ts
interface IObserverOptions {
  forwardRef?: boolean //Whether to pass the reference transparently
  scheduler?: (updater: () => void) => void //The scheduler, you can manually control the timing of the update
  displayName?: string //displayName of the packaged component
}

interface observer<T extends React.FC> {
  (component: T, options?: IObserverOptions): T
}
```

### Example

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const obs = observable({
  value: 'Hello world',
})

export default observer(() => {
  return (
    <div>
      <div>
        <input
          style={{
            height: 28,
            padding: '0 8px',
            border: '2px solid #888',
            borderRadius: 3,
          }}
          value={obs.value}
          onChange={(e) => {
            obs.value = e.target.value
          }}
        />
      </div>
      <div>{obs.value}</div>
    </div>
  )
})
```

## Observer

### Description

Similar to Vue's responsive slot, it receives a Function RenderProps, as long as any responsive data consumed inside the Function, it will be automatically re-rendered as the data changes, and it is easier to achieve local accurate rendering

### Signature

```ts
interface IObserverProps {
  children?: () => React.ReactElement
}

type Observer = React.FC<IObserverProps>
```

### Example

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { observable } from '@formily/reactive'
import { Observer } from '@formily/reactive-react'

const obs = observable({
  value: 'Hello world',
})

export default () => {
  return (
    <div>
      <div>
        <Observer>
          {() => (
            <input
              style={{
                height: 28,
                padding: '0 8px',
                border: '2px solid #888',
                borderRadius: 3,
              }}
              value={obs.value}
              onChange={(e) => {
                obs.value = e.target.value
              }}
            />
          )}
        </Observer>
      </div>
      <Observer>{() => <div>{obs.value}</div>}</Observer>
    </div>
  )
}
```
