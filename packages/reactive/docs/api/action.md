# action

## Description

Define a batch action. The only difference with batch is that dependencies cannot be collected inside an action

## Signature

```ts
interface action {
  <T>(callback?: () => T): T //In-situ action
  scope<T>(callback?: () => T): T //In-situ local action
  bound<T extends (...args: any[]) => any>(callback: T, context?: any): T //High-level binding
}
```

## Example

```ts
import { observable, action } from '@formily/reactive'

const obs = observable({})

const method = action.bound(() => {
  obs.aa = 123
  obs.bb = 321
})

method()
```
