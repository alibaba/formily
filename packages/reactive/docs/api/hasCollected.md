# hasCollected

## describe

Used to detect whether a certain piece of execution logic has dependent collection

## Signature

```ts
interface hasCollected {
  (callback?: () => void): boolean
}
```

## Example

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable({
  aa: 11,
})

autorun(() => {
  console.log(
    hasCollected(() => {
      obs.aa
    })
  ) //return true
  console.log(
    hasCollected(() => {
      11 + 22
    })
  ) //return false
})

obs.aa = 22
```
