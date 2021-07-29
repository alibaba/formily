# reaction

## Description

Receive a tracker function and a callback response function. If there is observable data in the tracker, the tracker function will be executed repeatedly when the data changes, but the callback execution must be executed when the tracker function return value changes.

## Signature

```ts
interface IReactionOptions<T> {
  name?: string
  equals?: (oldValue: T, newValue: T) => boolean //Dirty check
  fireImmediately?: boolean //Is it triggered by default for the first time, bypassing the dirty check
}

interface reaction<T> {
  (
    tracker: () => T,
    subscriber?: (newValue: T, oldValue: T) => void,
    options?: IReactionOptions<T>
  ): void
}
```

## Example

```ts
import { observable, reaction, batch } from '@formily/reactive'

const obs = observable({
  aa: 1,
  bb: 2,
})

const dispose = reaction(() => {
  return obs.aa + obs.bb
}, console.log)

batch(() => {
  //Won't trigger because the value of obs.aa + obs.bb has not changed
  obs.aa = 2
  obs.bb = 1
})

obs.aa = 4

dispose()
```
