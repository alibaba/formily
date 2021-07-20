# markObservable

## Description

Mark any object or class prototype as being hijacked by observable. React Node and objects with toJSON/toJS methods will be automatically bypassed in @formily/reactive. In special scenarios, we may hope that the object should be hijacked, so you can use it markObservable mark

## Signature

```ts
interface markObservable<T> {
  (target: T): T
}
```

## Example

```ts
import { observable, autorun, markObservable } from '@formily/reactive'

class A {
  property = ''

  toJSON() {}
}

const a = observable(new A())

autorun(() => {
  console.log(a.property) //will not be triggered when the property changes, because there is a toJSON method in the A instance
})

a.property = 123

//--------------------------------------------

const b = observable(markObservable(new A())) //instance-level mark, only valid for the current instance

autorun(() => {
  console.log(b.property) //Can be triggered when the property changes, because it has been marked as observable
})

b.property = 123

//--------------------------------------------

markObservable(A) //Class-level mark, then all instances will take effect

const c = observable(new A())

autorun(() => {
  console.log(c.property) //Can be triggered when the property changes, because it has been marked as observable
})

c.property = 123
```
