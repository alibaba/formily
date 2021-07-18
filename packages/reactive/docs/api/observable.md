# observable

> Mainly used to create observable objects with different responsive behaviors, and can be used as an annotation to define to mark responsive attributes

## observable/observable.deep

### Description

Create deep hijacking responsive objects

### Signature

```ts
interface observable<T extends object> {
  (target: T): T
}

interface deep<T extends object> {
  (target: T): T
}
```

### Example

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable({
  aa: {
    bb: 123,
  },
})

autorun(() => {
  console.log(obs.aa.bb)
})

obs.aa.bb = 321
```

## observable.shallow

### Description

Create shallow hijacking responsive objects, that is, only respond to the first-level attribute operations of the target object

### Signature

```ts
interface shallow<T extends object> {
  (target: T): T
}
```

### Example

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable.shallow({
  aa: {
    bb: 111,
  },
})

autorun(() => {
  console.log(obs.aa.bb)
})

obs.aa.bb = 222 // will not respond
obs.aa = { bb: 333 } // can respond
```

## observable.computed

### Description

Create a calculation buffer

### Signature

```ts
interface computed {
  <T extends () => any>(target: T): { value: ReturnType<T> }
  <T extends { get?: () => any; set?: (value: any) => void }>(target: T): {
    value: ReturnType<T['get']>
  }
}
```

### Example

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable({
  aa: 11,
  bb: 22,
})

const computed = observable.computed(() => obs.aa + obs.bb)

autorun(() => {
  console.log(computed.value)
})

obs.aa = 33
```

## observable.ref

### Description

Create reference hijacking responsive objects

### Signature

```ts
interface ref<T extends object> {
  (target: T): { value: T }
}
```

### Example

```ts
import { observable, autorun } from '@formily/reactive'

const ref = observable.ref(1)

autorun(() => {
  console.log(ref.value)
})

ref.value = 2
```

## observable.box

### Description

Similar to ref, except that the data is read and written through the get/set method

### Signature

```ts
interface box<T extends object> {
  (target: T): { get: () => T; set: (value: T) => void }
}
```

### Example

```ts
import { observable, autorun } from '@formily/reactive'

const box = observable.box(1)

autorun(() => {
  console.log(box.get())
})

box.set(2)
```
