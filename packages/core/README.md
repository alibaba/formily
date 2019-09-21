# @uform/core
> UForm 内核包

## quick start

```jsx
import { createForm, LifeCycleTypes, FormLifeCycle, FormPath } from './src'

const resetInitValues = {
    aa: {
    bb: [{ aa: 123 }, { aa: 321 }]
    }
};
const form = createForm({
    values: resetInitValues
})
form.registerField({ path: 'aa' })
form.registerField({ path: 'aa.bb' })
form.registerField({ path: 'aa.bb.0' })
form.registerField({ path: 'aa.bb.1' })
form.registerField({ path: 'aa.bb.0.aa' })
form.registerField({ path: 'aa.bb.1.aa' })
console.log('getFormGraph change before', form.getFormGraph());
form.setFieldState('aa.bb.0.aa', state => {
    state.value = 'aa changed'
})
console.log('getFormGraph reset before', form.getFormGraph());
form.reset()
console.log('getFormGraph reset after', form.getFormGraph());
```