# model

## Description

Quickly define the domain model, and automatically declare the model attributes:

- Automatic declaration of getter/setter properties computed
- Function automatically declare action
- Common attributes are automatically declared observable

## Signature

```ts
interface model<Target extends object> {
  (target: Target): Target
}
```

## Example

```ts
import { model, autorun } from '@formily/reactive'

const obs = model({
  aa: 1,
  bb: 2,
  get cc() {
    return this.aa + this.bb
  },
  update(aa, bb) {
    this.cc
  },
})

autorun(() => {
  console.log(obs.cc)
})

obs.aa = 3

obs.update(4, 6)
```
