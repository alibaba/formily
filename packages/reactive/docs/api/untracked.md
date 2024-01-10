# untracked

## Description

Usage is similar to batch, and will never be collected by dependencies within a given untracker function

## Signature

```ts
interface untracked<T extends () => any> {
  (untracker?: T): ReturnType<T>
}
```

## Example

```ts
import { observable, autorun, untracked } from '@formily/reactive'

const obs = observable({
  aa: 11,
})

autorun(() => {
  console.log(untracked(() => obs.aa)) // will not trigger when changes
})

obs.aa = 22
```
