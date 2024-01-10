# tracker

## Description

Mainly used to access the manual tracking dependency tool of React/Vue. The tracker function will not be executed repeatedly when the dependency changes. It requires the user to manually execute it repeatedly, which will only trigger the scheduler

## Signature

```ts
class Tracker {
  constructor(scheduler?: (reaction: this['track']) => void, name?: string)
  track: <T>(tracker?: () => T) => T
  dispose: () => void
}
```

## Example

```ts
import { observable, Tracker } from '@formily/reactive'

const obs = observable({
  aa: 11,
})

const view = () => {
  console.log(obs.aa)
}

const tracker = new Tracker(() => {
  tracker.track(view)
})

tracker.track(view)

obs.aa = 22

tracker.dispose()
```
