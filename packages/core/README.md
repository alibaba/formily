# @uform/core
> UForm 内核包

## quick start

```jsx
import { createForm, LifeCycleTypes, FormLifeCycle, FormPath } from './src'

const form = createForm()
// form.registerField({ path: 'a', rules: ['number'] }) // string
// form.registerField({ path: 'b', rules: [() => ({ type: 'warning', message: 'warning msg' })] }) // CustomValidator
// form.registerField({ path: 'c', rules: [() => ({ type: 'error', message: 'warning msg' })] }) // CustomValidator
// form.registerField({ path: 'd', rules: [() => 'straight error msg'] }) // CustomValidator
// form.registerField({ path: 'e', rules: [{ required: true, message: 'desc msg' }] }) // ValidateDescription

form.registerField({ path: 'a', rules: [(value) => {
    console.log('==>valuevalue', value);
    return value === undefined ? { type: 'error', message: 'a is required' } : null
}] })
form.registerField({ path: 'b', rules: [(value) => {
    return value === undefined ? { type: 'warning', message: 'b is required' } : null
}] })
// form.setFieldValue('a', 1)
const result = form.validate();
result.then(({ warnings, errors }) => {
    console.log('warnings', warnings);
    console.log('errors', errors);
});

```