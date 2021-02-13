---
order: 4
---

# Form Checkers

> 类型检查器主要用于判断某个对象具体是什么类型

## isForm

#### 描述

判断一个对象是否为 [Form](/api/models/form) 对象

#### 签名

```ts
interface isForm {
  (target: any): target is Form
}
```

#### 用例

```ts
import { createForm, isForm } from '@formily/core'

const form = createForm()

console.log(isForm(form)) //true
```

## isField

#### 描述

判断一个对象是否为 [Field](/api/models/field) 对象

#### 签名

```ts
interface isField {
  (target: any): target is Field
}
```

#### 用例

```ts
import { createForm, isField } from '@formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })

console.log(isField(field)) //true
```

## isArrayField

#### 描述

判断一个对象是否为 [ArrayField](/api/models/array-field) 对象

#### 签名

```ts
interface isArrayField {
  (target: any): target is ArrayField
}
```

#### 用例

```ts
import { createForm, isArrayField } from '@formily/core'

const form = createForm()

const field = form.createArrayField({ name: 'target' })

console.log(isArrayField(field)) //true
```

## isObjectField

#### 描述

判断一个对象是否为 [ObjectField](/api/models/object-field) 对象

#### 签名

```ts
interface isObjectField {
  (target: any): target is ObjectField
}
```

#### 用例

```ts
import { createForm, isObjectField } from '@formily/core'

const form = createForm()

const field = form.createObjectField({ name: 'target' })

console.log(isObjectField(field)) //true
```

## isVoidField

#### 描述

判断一个对象是否为 [VoidField](/api/models/void-field) 对象

#### 签名

```ts
interface isVoidField {
  (target: any): target is VoidField
}
```

#### 用例

```ts
import { createForm, isVoidField } from '@formily/core'

const form = createForm()

const field = form.createVoidField({ name: 'target' })

console.log(isVoidField(field)) //true
```

## isGeneralField

#### 描述

判断一个对象是否为 Field/ArrayField/ObjectField/VoidField 对象

#### 签名

```ts
interface isGeneralField {
  (target: any): target is Field | ArrayField | ObjectField | VoidField
}
```

#### 用例

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

#### 描述

判断一个对象是否为 Field/ArrayField/ObjectField 对象

#### 签名

```ts
interface isDataField {
  (target: any): target is Field | ArrayField | ObjectField
}
```

#### 用例

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

#### 描述

判断一个对象是否为 [IFormState](/api/models/form#iformstate) 对象

#### 签名

```ts
interface isFormState {
  (target: any): target is IFormState
}
```

#### 用例

```ts
import { createForm, isFormState } from '@formily/core'

const form = createForm()

console.log(isFormState(form)) //false
console.log(isFormState(form.getState())) //true
```

## isFieldState

#### 描述

判断一个对象是否为 [IFieldState](/api/models/field#ifieldstate) 对象

#### 签名

```ts
interface isFieldState {
  (target: any): target is IFieldState
}
```

#### 用例

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

#### 描述

判断一个对象是否为 [IArrayFieldState](/api/models/array-field#iarrayfieldstate) 对象

#### 签名

```ts
interface isArrayFieldState {
  (target: any): target is IArrayFieldState
}
```

#### 用例

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

#### 描述

判断一个对象是否为 [IObjectFieldState](/api/models/object-field#iobjectfieldstate) 对象

#### 签名

```ts
interface isObjectFieldState {
  (target: any): target is IObjectFieldState
}
```

#### 用例

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

#### 描述

判断一个对象是否为 [IVoidFieldState](/api/models/void-field#ivoidfieldstate) 对象

#### 签名

```ts
interface isVoidFieldState {
  (target: any): target is IVoidFieldState
}
```

#### 用例

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

#### 描述

判断一个对象是否为 IFieldState/IArrayFieldState/IObjectFieldState/IVoidFieldState 对象

#### 签名

```ts
interface isGeneralFieldState {
  (target: any): target is
    | IFieldState
    | IArrayFieldState
    | IObjectFieldState
    | IVoidFieldState
}
```

#### 用例

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

#### 描述

判断一个对象是否为 IFieldState/IArrayFieldState/IObjectFieldState 对象

#### 签名

```ts
interface isDataFieldState {
  (target: any): target is IFieldState | IArrayFieldState | IObjectFieldState
}
```

#### 用例

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

#### 描述

判断一个对象是否为 Query 对象

#### 签名

```ts
interface isQuery {
  (target: any): target is Query
}
```

#### 用例

```ts
import { createForm, isQuery } from '@formily/core'

const form = createForm()
console.log(isQuery(form.query('target'))) //true
```
