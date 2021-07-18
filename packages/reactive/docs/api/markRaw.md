# markRaw

## Description

Mark any object or class prototype as never being hijacked by observable, priority is higher than markObservable

## Signature

```ts
interface markRaw<T> {
  (target: T): T
}
```

## Example

```ts
import { observable, autorun, markRaw } from '@formily/reactive'

class A {
  property = ''
}

const a = observable(new A())

autorun(() => {
  console.log(a.property) //It will be triggered when the property changes, because the A instance is a normal object
})

a.property = 123

//--------------------------------------------

const b = observable(markRaw(new A())) //instance-level mark, only valid for the current instance

autorun(() => {
  console.log(b.property) //will not be triggered when the property changes, because it has been marked raw
})

b.property = 123

//--------------------------------------------

markRaw(A) //Class-level mark, then all instances will take effect

const c = observable(new A())

autorun(() => {
  console.log(c.property) //will not be triggered when the property changes, because it has been marked raw
})

c.property = 123
```
