# observer

## observer

### Description

The observer is a [HOC](https://reactjs.bootcss.com/docs/higher-order-components.html), which is used to add reactive features to react functional components.

### When to use

When a component uses an [observable](https://reactive.formilyjs.org/api/observable) object inside, and you want the component to respond to changes in the observable object.

### API definition

```ts
interface IObserverOptions {
  // Do you need observers to use forwardRef to pass ref attributes
  forwardRef?: boolean
  scheduler?: (updater: () => void) => void
  displayName?: string
}

function observer<P, Options extends IObserverOptions>(
  component: React.FunctionComponent<P>,
  options?: Options
): React.MemoExoticComponent<
  React.FunctionComponent<
    Options extends { forwardRef: true }
      ? React.PropsWithRef<P>
      : React.PropsWithoutRef<P>
  >
>
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

### Note

`observer` can only receive callable function components, and does not support packaged components such as `React.forwardRef` | `React.memo`.

## Observer

### Description

Similar to Vue's responsive slot, it receives a Function RenderProps, as long as any responsive data consumed inside the Function, it will be automatically re-rendered as the data changes, and it is easier to achieve local accurate rendering

In fact, the function of this API is basically the same as that of FormConsumer, except that FormConsumer reveals the form instance of the current context in the RenderProps parameter.

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
import { Observer } from '@formily/react'

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
