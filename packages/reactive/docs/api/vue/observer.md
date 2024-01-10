# observer

## describe

In Vue, the component rendering method is changed to Reaction, and dependencies are collected every time the view is re-rendered, and dependencies are updated automatically to re-render.

### Signature

```ts
interface IObserverOptions {
  scheduler?: (updater: () => void) => void //The scheduler, you can manually control the timing of the update
  name?: string //name of the packaged component
}

interface observer<T extends VueComponent> {
  (component: T, options?: IObserverOptions): T
}
```

## Example

```html
<template>
  <div>
    <div>
      <input
        :style="{
           height: 28,
           padding: '0 8px',
           border: '2px solid #888',
           borderRadius: 3,
         }"
        :value="obs.value"
        @input="(e) => {
           obs.value = e.target.value
         }"
      />
    </div>
    <div>{{obs.value}}</div>
  </div>
</template>

<script>
  import { observable } from '@formily/reactive'
  import { observer } from '@formily/reactive-vue'

  export default observer({
    data() {
      // can coexist with vue's response system
      const obs = observable({
        value: 'Hello world',
      })
      return {
        obs,
      }
    },
  })
</script>
```
