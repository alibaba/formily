---
order: 4
---

# Form Checkers

> The type checker is mainly used to determine the specific type of an object

## isForm

#### Description

Determine whether an object is a [Form](/api/models/form) object

#### Signature

```ts
interface isForm {
  (target: any): target is Form
}
```

#### Example

```ts
import { createForm, isForm } from '@formily/core'

const form = createForm()

console.log(isForm(form)) //true
```

## isField

#### Description

Determine whether an object is a [Field](/api/models/field) object

#### Signature

```ts
interface isField {
  (target: any): target is Field
}
```

#### Example

```ts
import { createForm, isField } from '@formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })

console.log(isField(field)) //true
```

## isArrayField

#### Description

Determine whether an object is [ArrayField](/api/models/array-field) object

#### Signature

```ts
interface isArrayField {
  (target: any): target is ArrayField
}
```

#### Example

```ts
import { createForm, isArrayField } from '@formily/core'

const form = createForm()

const field = form.createArrayField({ name: 'target' })

console.log(isArrayField(field)) //true
```

## isObjectField

#### Description

Determine whether an object is a [ObjectField](/api/models/object-field) object

#### Signature

```ts
interface isObjectField {
  (target: any): target is ObjectField
}
```

#### Example

```ts
import { createForm, isObjectField } from '@formily/core'

const form = createForm()

const field = form.createObjectField({ name: 'target' })

console.log(isObjectField(field)) //true
```

## isVoidField

#### Description

Determine whether an object is a [VoidField](/api/models/void-field) object

#### Signature

```ts
interface isVoidField {
  (target: any): target is VoidField
}
```

#### Example

```ts
import { createForm, isVoidField } from '@formily/core'

const form = createForm()

const field = form.createVoidField({ name: 'target' })

console.log(isVoidField(field)) //true
```

## isGeneralField

#### Description

Determine whether an object is a Field/ArrayField/ObjectField/VoidField object

#### Signature

```ts
interface isGeneralField {
  (target: any): target is Field | ArrayField | ObjectField | VoidField
}
```

#### Example

```ts
import { createForm, isGeneralField } from '@formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })
const arr = form.createArrayField({ name: 'array' })
const obj = form.createObjectField({ name: 'object' })
const vod = form.createVoidField({ name: 'void' })

console.log(isGeneralField(field)) //true
console.log(isGeneralField(arr)) //true
console.log(isGeneralField(obj)) //true
console.log(isGeneralField(vod)) //true
console.log(isGeneralField({})) //false
```

## isDataField

#### Description

Determine whether an object is a Field/ArrayField/ObjectField object

#### Signature

```ts
interface isDataField {
  (target: any): target is Field | ArrayField | ObjectField
}
```

#### Example

```ts
import { createForm, isDataField } from '@formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })
const arr = form.createArrayField({ name: 'array' })
const obj = form.createObjectField({ name: 'object' })
const vod = form.createVoidField({ name: 'void' })

console.log(isDataField(field)) //true
console.log(isDataField(arr)) //true
console.log(isDataField(obj)) //true
console.log(isDataField(vod)) //false
console.log(isDataField({})) //false
```

## isFormState

#### Description

Determine whether an object is [IFormState](/api/models/form#iformstate) object

#### Signature

```ts
interface isFormState {
  (target: any): target is IFormState
}
```

#### Example

```ts
import { createForm, isFormState } from '@formily/core'

const form = createForm()

console.log(isFormState(form)) //false
console.log(isFormState(form.getState())) //true
```

## isFieldState

#### Description

Determine whether an object is [IFieldState](/api/models/field#ifieldstate) object

#### Signature

```ts
interface isFieldState {
  (target: any): target is IFieldState
}
```

#### Example

```ts
import { createForm, isFieldState } from '@formily/core'

const form = createForm()
const field = form.createField({
  name: 'target',
})

console.log(isFieldState(field)) //false
console.log(isFieldState(field.getState())) //true
```

## isArrayFieldState

#### Description

Determine whether an object is [IArrayFieldState](/api/models/array-field#iarrayfieldstate) object

#### Signature

```ts
interface isArrayFieldState {
  (target: any): target is IArrayFieldState
}
```

#### Example

```ts
import { createForm, isArrayFieldState } from '@formily/core'

const form = createForm()
const field = form.createArrayField({
  name: 'target',
})

console.log(isArrayFieldState(field)) //false
console.log(isArrayFieldState(field.getState())) //true
```

## isObjectFieldState

#### Description

Determine whether an object is [IObjectFieldState](/api/models/object-field#iobjectfieldstate) object

#### Signature

```ts
interface isObjectFieldState {
  (target: any): target is IObjectFieldState
}
```

#### Example

```ts
import { createForm, isObjectFieldState } from '@formily/core'

const form = createForm()
const field = form.createObjectField({
  name: 'target',
})

console.log(isObjectFieldState(field)) //false
console.log(isObjectFieldState(field.getState())) //true
```

## isVoidFieldState

#### Description

Determine whether an object is [IVoidFieldState](/api/models/void-field#ivoidfieldstate) object

#### Signature

```ts
interface isVoidFieldState {
  (target: any): target is IVoidFieldState
}
```

#### Example

```ts
import { createForm, isVoidFieldState } from '@formily/core'

const form = createForm()
const field = form.createVoidField({
  name: 'target',
})

console.log(isVoidFieldState(field)) //false
console.log(isVoidFieldState(field.getState())) //true
```

## isGeneralFieldState

#### Description

Determine whether an object is an IFieldState/IArrayFieldState/IObjectFieldState/IVoidFieldState object

#### Signature

```ts
interface isGeneralFieldState {
  (target: any): target is
    | IFieldState
    | IArrayFieldState
    | IObjectFieldState
    | IVoidFieldState
}
```

#### Example

```ts
import { createForm, isGeneralFieldState } from '@formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })
const arr = form.createArrayField({ name: 'array' })
const obj = form.createObjectField({ name: 'object' })
const vod = form.createVoidField({ name: 'void' })

console.log(isGeneralFieldState(field)) //false
console.log(isGeneralFieldState(arr)) //false
console.log(isGeneralFieldState(obj)) //false
console.log(isGeneralFieldState(vod)) //false
console.log(isGeneralFieldState(field.getState())) //true
console.log(isGeneralFieldState(arr.getState())) //true
console.log(isGeneralFieldState(obj.getState())) //true
console.log(isGeneralFieldState(vod.getState())) //true
console.log(isGeneralFieldState({})) //false
```

## isDataFieldState

#### Description

Determine whether an object is an IFieldState/IArrayFieldState/IObjectFieldState object

#### Signature

```ts
interface isDataFieldState {
  (target: any): target is IFieldState | IArrayFieldState | IObjectFieldState
}
```

#### Example

```ts
import { createForm, isDataFieldState } from '@formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })
const arr = form.createArrayField({ name: 'array' })
const obj = form.createObjectField({ name: 'object' })
const vod = form.createVoidField({ name: 'void' })

console.log(isDataFieldState(field)) //false
console.log(isDataFieldState(arr)) //false
console.log(isDataFieldState(obj)) //false
console.log(isDataFieldState(vod)) //false
console.log(isDataFieldState(field.getState())) //true
console.log(isDataFieldState(arr.getState())) //true
console.log(isDataFieldState(obj.getState())) //true
console.log(isDataFieldState(vod.getState())) //false
console.log(isDataFieldState({})) //false
```

## isQuery

#### Description

Determine whether an object is a Query object

#### Signature

```ts
interface isQuery {
  (target: any): target is Query
}
```

#### Example

```ts
import { createForm, isQuery } from '@formily/core'

const form = createForm()
console.log(isQuery(form.query('target'))) //true
```
