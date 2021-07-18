# action

## Description

Internally wrap a function with [batch](/api/batch), making the function a batch operation mode, solving the problem of multiple atomic operation reactions triggering multiple times, and at the same time, the action can also be marked as an annotation in the define The method is batch mode.

## Signature

```ts
interface action<T extends (...args: any[]) => any> {
  (callback?: T): T
}
```

## Example

```ts
import { observable, action } from '@formily/reactive'

const obs = observable({})

const method = action(() => {
  obs.aa = 123
  obs.bb = 321
})

method()
```
