# observe

## Description

Very different from autorun/reaction/Tracker, using observe will monitor all operations of observable objects, support deep monitoring and shallow monitoring

<Alert>
Note: The read operation will not be monitored
</Alert>

## Signature

```ts
type PropertyKey = string | number | symbol

type ObservablePath = Array<string | number>

type OperationType =
  | 'add'
  | 'delete'
  | 'clear'
  | 'set'
  | 'get'
  | 'iterate'
  | 'has'

interface IChange {
  key?: PropertyKey
  path?: ObservablePath
  value?: any
  oldValue?: any
  type?: OperationType
}

interface IDispose {
  (): void
}

interface observe {
  (
    target: object,
    observer?: (change: IChange) => void,
    deep?: boolean //default is true
  ): IDispose //Release the monitor
}
```

## Example

```ts
import { observable, observe } from '@formily/reactive'

const obs = observable({
  aa: 11,
})

const dispose = observe(obs, (change) => {
  console.log(change)
})

obs.aa = 22

dispose()
```
