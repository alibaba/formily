# toJS

## Description

Deep recursion converts observable objects into ordinary JS objects

Note: If you mark an object that is already observable with markRaw, then toJS will not convert it into a normal object

## Signature

```ts
interface toJS<T> {
  (target: T): T
}
```

## Example

```ts
import { observable, autorun, toJS } from '@formily/reactive'

const obs = observable({
  aa: {
    bb: {
      cc: 123,
    },
  },
})

const js = toJS(obs)

autorun(() => {
  console.log(js.aa.bb.cc) // will not trigger when changes
})

js.aa.bb.cc = 321
```
