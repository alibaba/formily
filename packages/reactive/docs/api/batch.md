# batch

## Description

Define batch operations, internal dependencies can be collected

## Signature

```ts
interface batch {
  <T>(callback?: () => T): T //In-place batch
  scope<T>(callback?: () => T): T //In-situ local batch
  bound<T extends (...args: any[]) => any>(callback: T, context?: any): T //High-level binding
}
```

## Example

```ts
import { observable, autorun, batch } from '@formily/reactive'

const obs = observable({})

autorun(() => {
  console.log(obs.aa, obs.bb, obs.cc, obs.dd)
})

batch(() => {
  batch.scope(() => {
    obs.aa = 123
  })
  batch.scope(() => {
    obs.cc = 'ccccc'
  })
  obs.bb = 321
  obs.dd = 'dddd'
})
```
