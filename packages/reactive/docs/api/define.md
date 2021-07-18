# define

## Description

Manually define the domain model, you can specify the responsive behavior of specific attributes, or you can specify a method as batch mode

## Signature

```ts
interface define<Target extends object> {
  (
    target: Target,
    annotations?: {
      [key: string]: (...args: any[]) => any
    }
  ): Target
}
```

## Annotations

All Annotations currently supported are:

- observable/observable.deep defines deep hijacking responsive properties
- observable.box defines get/set container
- observable.computed defines calculated properties
- observable.ref defines reference hijacking responsive attributes
- observable.shallow defines shallow hijacking responsive properties
- action/batch defines the batch processing method

## Example

```ts
import { define, observable, action, autorun } from '@formily/reactive'

class DomainModel {
  deep = { aa: 1 }
  shallow = {}
  box = 0
  ref = ''

  constructor() {
    define(this, {
      deep: observable,
      shallow: observable.shallow,
      box: observable.box,
      ref: observable.ref,
      computed: observable.computed,
      action,
    })
  }

  get computed() {
    return this.deep.aa + this.box.get()
  }
  action(aa, box) {
    this.deep.aa = aa
    this.box.set(box)
  }
}

const model = new DomainModel()

autorun(() => {
  console.log(model.computed)
})

model.action(1, 2)
model.action(1, 2) //Repeat calls will not respond repeatedly
model.action(3, 4)
```
