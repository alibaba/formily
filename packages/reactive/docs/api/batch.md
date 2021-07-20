# batch

## Description

Receive an operation function and execute it immediately. The execution process is executed in batch mode, that is, each time the operation function is executed once, the Reaction will only respond once. If the batch is nested, the topmost batch will end as the response time, on the contrary , Batch.scope, will not wait for the execution of the top-level batch to complete the response, but immediately respond after the execution of the current scope. At the same time, batch can also mark a method in the define as batch mode by way of annotation.

## Signature

```ts
interface batch<T extends (...args: any[]) => any> {
  (callback?: T): ReturnType<T>
  scope<T extends (...args: any[]) => any>(callback?: T): ReturnType<T>
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
