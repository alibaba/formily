# autorun

## Description

Receive a tracker function, if there is observable data in the function, the tracker function will be executed repeatedly when the data changes

## Signature

```ts
interface autorun {
  (tracker: () => void, name?: string): void
}
```

## Example

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable({})

const dispose = autorun(() => {
  console.log(obs.aa)
})

obs.aa = 123

dispose()
```

## autorun.memo

### Description

Used in autorun to create persistent reference data, only re-execute memo internal functions due to dependency changes

Note: Please do not use it in If/For statements, because it depends on the execution order to bind the current autorun

### Signature

```ts
interface memo<T> {
  (callback: () => T, dependencies: any[] = []): T
}
```

Note: The default dependency is `[]`, that is, if the dependency is not passed, it means that the second time will never be executed

### Example

```ts
import { observable, autorun } from '@formily/reactive'

const obs1 = observable({
  aa: 0,
})

const dispose = autorun(() => {
  const obs2 = autorun.memo(() =>
    observable({
      bb: 0,
    })
  )
  console.log(obs1.aa, obs2.bb++)
})

obs1.aa++
obs1.aa++
obs1.aa++
//Execute four times, the output result is
/**
 * 0 0
 * 1 1
 * twenty two
 * 3 3
 */

dispose()
```

## autorun.effect

### Description

In autorun, it is used to respond to the next micro task timing of autorun's first execution and the dispose of responding to autorun

Note: Please do not use it in If/For statements, because it depends on the execution order to bind the current autorun

### Signature

```ts
interface effect {
  (callback: () => void | (() => void), dependencies: any[] = [{}]): void
}
```

Note: The default dependency is `[{}]`, that is, if the dependency is not passed, the representative will continue to execute, because the internal dirty check is a shallow comparison

### Example

```ts
import { observable, autorun } from '@formily/reactive'

const obs1 = observable({
  aa: 0,
})
const fn = jest.fn()
const dispose = autorun(() => {
  const obs2 = autorun.memo(() =>
    observable({
      bb: 0,
    })
  )
  console.log(obs1.aa, obs2.bb++)
  autorun.effect(() => {
    obs2.bb++
  }, [])
})
obs1.aa++
obs1.aa++
obs1.aa++
//Execute five times, the output result is
/**
 * 0 0
 * 1 1
 * twenty two
 * 3 3
 * 3 5
 */

dispose()
```
