# raw

## Description

Obtain the source data from the observable object. Generally, this API is not recommended

<Alert>
Note: Only the source data of the current object can be obtained, excluding deep object properties
</Alert>

## Signature

```ts
interface raw<T extends object> {
  (target: T): T
}
```

## Example

```ts
import { raw, observable } from '@formily/reactive'

const obs = observable({})

obs.aa = { bb: 123 }

console.log(raw(obs))
console.log(raw(obs.aa))
```
