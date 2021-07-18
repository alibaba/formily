---
order: 5
---

# FormPath

The core of FormPath in Formily is to solve 2 types of problems:

- Path matching problem
- Data manipulation issues

Path matching requires that the given path must be a valid path matching syntax, such as `*(aa,bb,cc)`.

Data operation requires that the given path must be a legal data operation path, that is, it must be in the form of `a.b.c` and cannot carry `*`

## Constructor

```ts
class FormPath {
  constructor(pattern: FormPathPattern, base?: FormPathPattern)
}
```

## Attributes

| Property           | Description                                                                     | Type                      | Default Value |
| ------------------ | ------------------------------------------------------------------------------- | ------------------------- | ------------- |
| length             | If the path is a non-matching path, the length of the path can be read          | Number                    | `0`           |
| entire             | Path complete string, consistent with the input parameter data                  | String                    |               |
| segments           | If the path is a non-matching path, you can read the complete path segmentation | `Array<String \| Number>` | `[]`          |
| isMatchPattern     | Is the path a matching path                                                     | Boolean                   |               |
| isWildMatchPattern | Is the path a fully wildcarded path, such as `a.b.*`                            | Boolean                   |               |
| haveExcludePattern | Does the path have reverse matching, such as `*(!a.b.c)`                        | Boolean                   |               |
| tree               | Parsed AST tree                                                                 | Node                      |               |

## FormPathPattern

### Signature

```ts
type FormPathPattern = string | number | Array<string | number> | RegExp
```

### Data path syntax

#### Point path

**description**

It is our most commonly used `a.b.c` format, which uses dot notation to divide each path node, mainly used to read and write data

**Example**

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.setIn(target, 'a.b.c', 'value')
console.log(FormPath.getIn(target, 'a.b.c')) //'value'
console.log(target) //{a:{b:{c:'value'}}}
```

#### Subscript path

For array paths, there will be subscripts. Our subscripts can use dot syntax or square brackets.

```ts
import { FormPath } from '@formily/core'

const target = {
  array: [],
}

FormPath.setIn(target, 'array.0.aa', '000')
console.log(FormPath.getIn(target, 'array.0.aa')) //000
console.log(target) //{array:[{aa:'000'}]}
FormPath.setIn(target, 'array[1].aa', '111')
console.log(FormPath.getIn(target, 'array.1.aa')) //111
console.log(target) //{array:[{aa:'000'},{aa:'111'}]}
```

#### Deconstruction expression

The deconstruction expression is similar to the ES6 deconstruction grammar, except that it does not support `...` deconstruction. It is very suitable for scenarios where the front and back data is inconsistent. It has several characteristics:

- The deconstruction expression will be regarded as a node of the point path, we can regard it as a normal string node, but it will take effect during data manipulation, so only the deconstruction expression needs to be matched as a normal node node in the matching grammar Can
- Use the deconstruction path in setIn, the data will be deconstructed
- Use the deconstruction path in getIn, the data will be reorganized

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.setIn(target, 'parent.[aa,bb]', [11, 22])
console.log(target) //{parent:{aa:11,bb:22}}
console.log(FormPath.getIn(target, 'parent.[aa,bb]')) //[11,22]
console.log(FormPath.parse('parent.[aa,bb]').toString()) //parent.[aa,bb]
```

#### relative path

The relative path syntax is mainly expressed in dot syntax at the head of the data type path. It is very useful for calculating adjacent elements of the array. It has several characteristics:

- A dot represents the current path
- n dots represent n-1 steps forward
  - Subscripts can be used to calculate expressions in square brackets: `[+]` represents the current subscript +1, `[-]` represents the current subscript - 1, `[+n]` represents the current subscript +n, ` [-n]` represents the current subscript - n
- When path matching, group matching and range matching cannot be used, such as `*(..[+1].aa,..[+2].bb)`

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('.dd', 'aa.bb.cc').toString()) //aa.bb.dd
console.log(FormPath.parse('..[].dd', 'aa.1.cc').toString()) //aa.1.dd
console.log(FormPath.parse('..[+].dd', 'aa.1.cc').toString()) //aa.2.dd
console.log(FormPath.parse('..[+10].dd', 'aa.1.cc').toString()) //aa.11.dd
```

### Match path syntax

#### Full match

Full match is equivalent to matching all paths, only a `*` identification is required

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('*').match('aa')) //true
console.log(FormPath.parse('*').match('aa.bb')) //true
console.log(FormPath.parse('*').match('cc')) //true
```

#### Partial match

Local matching is equivalent to matching all paths of a node position, and also only needs to use a `*` mark

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.*.cc').match('aa.bb.cc')) //true
console.log(FormPath.parse('aa.*.cc').match('aa.kk.cc')) //true
console.log(FormPath.parse('aa.*.cc').match('aa.dd.cc')) //true
```

#### Group Match

Grouped matching can match multiple paths, and also supports nesting, syntax: `*(pattern1,pattern2,pattern3...)`

```ts
import { FormPath } from '@formily/core'

console.log(
  FormPath.parse('aa.*(bb,kk,dd,ee.*(oo,gg).gg).cc').match('aa.bb.cc')
) //true
console.log(
  FormPath.parse('aa.*(bb,kk,dd,ee.*(oo,gg).gg).cc').match('aa.kk.cc')
) //true
console.log(
  FormPath.parse('aa.*(bb,kk,dd,ee.*(oo,gg).gg).cc').match('aa.dd.cc')
) //true
console.log(
  FormPath.parse('aa.*(bb,kk,dd,ee.*(oo,gg).gg).cc').match('aa.ee.oo.gg.cc')
) //true
console.log(
  FormPath.parse('aa.*(bb,kk,dd,ee.*(oo,gg).gg).cc').match('aa.ee.gg.gg.cc')
) //true
```

#### Reverse match

Reverse matching is mainly used to exclude the specified path, syntax: `*(!pattern1,pattern2,pattern3)`

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('*(!aa,bb,cc)').match('aa')) //false
console.log(FormPath.parse('*(!aa,bb,cc)').match('kk')) //true
```

#### Extended matching

Extended matching is mainly used to match the starting substring of the path, syntax: `pattern~`

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('test~').match('test_111')) //true
console.log(FormPath.parse('test~').match('test_222')) //true
```

#### Range match

Range matching is mainly used to match the array index range, syntax: `*[x:y]`, x and y can be empty, representing open range matching

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.*[1:2].bb').match('aa.1.bb')) //true
console.log(FormPath.parse('aa.*[1:2].bb').match('aa.2.bb')) //true
console.log(FormPath.parse('aa.*[1:2].bb').match('aa.3.bb')) //false
console.log(FormPath.parse('aa.*[1:].bb').match('aa.3.bb')) //true
console.log(FormPath.parse('aa.*[:100].bb').match('aa.3.bb')) //true
console.log(FormPath.parse('aa.*[:100].bb').match('aa.1000.bb')) //false
```

#### Escape match

For path nodes that contain keywords, we can use escape syntax matching, the syntax is `\\` or `[[]]`

```ts
import { FormPath } from '@formily/core'

console.log(
  FormPath.parse('aa.\\,\\*\\{\\}\\.\\(\\).bb').match(
    'aa.\\,\\*\\{\\}\\.\\(\\).bb'
  )
) //true
console.log(FormPath.parse('aa.[[,*{}.()]].bb').match('aa.[[,*{}.()]].bb')) // true
```

#### Destructuring matching

For the path with deconstruction expression, if we match, we can directly match without escaping

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('target.[aa,bb]').match('target.[aa,bb]')) //true
```

## Method

### toString

#### Description

The complete string of the output path, supporting matching paths and data manipulation paths

#### Signature

```ts
interface toString {
  (): string
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').toString()) //aa.bb.cc
console.log(FormPath.parse('aa.bb.*').toString()) //aa.bb.*
console.log(FormPath.parse('*(aa,bb,cc)').toString()) //*(aa,bb,cc)
```

### toArray

#### Description

Array fragment of output path, only supports data manipulation path

#### Signature

```ts
interface toArray {
  (): Array<string | number>
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').toArray().join('--')) //aa-bb-cc
console.log(FormPath.parse('aa.bb.*').toArray()) //[]
console.log(FormPath.parse('*(aa,bb,cc)').toArray()) //[]
```

### concat

#### Description

Connection data operation path

#### Signature

```ts
interface concat {
  (...args: FormPathPattern[]): FormPath
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').concat('dd.ee.mm').toString()) //aa.bb.cc.dd.ee.mm
console.log(
  FormPath.parse('aa.bb.cc').concat(['dd', 'ee', 'mm'], 'kk.oo').toString()
) //aa.bb.cc.dd.ee.mm.kk.oo
```

### slice

#### Description

Select a segment of the data operation path

#### Signature

```ts
interface slice {
  (start?: number, end?: number): FormPath
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').slice(1).toString()) //bb.cc
```

### push

#### Description

Push a fragment path to the data operation path

#### Signature

```ts
interface push {
  (...args: FormPathPattern[]): FormPath
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').push('dd.kk').toString()) //aa.bb.cc.dd.kk
```

### pop

#### Description

Pop the last key from the data operation path

#### Signature

```ts
interface pop {
  (): FormPath
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').pop().toString()) //aa.bb
```

### splice

#### Description

Splice the data operation path

#### Signature

```ts
interface splice {
  (
    startIndex: number,
    deleteCount?: number,
    ...inertItems: Array<string | number>
  ): FormPath
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').splice(2, 1).toString()) //aa.bb
console.log(FormPath.parse('aa.bb.cc').splice(2, 0, 'ee.gg').toString()) //aa.bb.ee.gg.cc
console.log(FormPath.parse('aa.bb.cc').splice(2, 0, ['kk', 'mm']).toString()) //aa.bb.kk.mm.cc
```

### forEach

#### Description

Traverse the data operation path

#### Signature

```ts
interface forEach {
  (eacher: (key: string | number, index: number) => void): void
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

const keys = []

FormPath.parse('aa.bb.cc').forEach((key) => {
  keys.push(key)
})

console.log(keys) //['aa','bb','cc']
```

### map

#### Description

Loop mapping data operation path

#### Signature

```ts
interface map {
  (mapper: (key: string | number, index: number) => void): void
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(
  FormPath.parse('aa.bb.cc').map((key) => {
    return key + '~'
  }) //['aa~','bb~','cc~']
)
```

### reduce

#### Description

The reduce method executes a reducer function (executed in ascending order) provided by you on each element in the path, and aggregates the results into a single return value.

#### Signature

```ts
interface reduce<T> {
  (reducer: (value: T, key: string | number, index: number) => void): void
  accumulator: T
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(
  FormPath.parse('aa.bb.cc').reduce((count) => {
    return count + 1
  }, 0)
) //3
```

### parent

#### Description

Get the parent path of the current data operation path

#### Signature

```ts
interface parent {
  (): FormPath
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').parent().toString()) //aa.bb
```

### includes

#### Description

Used to determine whether a given data operation path is a subpath of the current data operation path

#### Signature

```ts
interface includes {
  (pattern: FormPathPattern): boolean
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').includes('aa.bb')) //true

console.log(FormPath.parse('aa.bb.cc').includes('cc.bb')) //false
```

### transform

#### Description

Based on regular extraction data to do path assembly

#### Signature

```ts
interface transform<T> {
  (regExp: RegExp, callback: (...matches: string[]) => T): T
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(
  FormPath.parse('aa.1.cc').transform(
    /\d+/,
    (index) => `aa.${parseInt(index) + 1}.cc`
  )
) //aa.2.cc
```

### match

#### Description

Use path matching syntax to match the current path

#### Signature

```ts
interface match {
  (pattern: FormPathPattern): boolean
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.1.cc').match('aa.*.cc')) //true
```

### matchAliasGroup

#### Description

Alias group matching, mainly used to match address and path in formily

#### Signature

```ts
interface matchAliasGroup {
  (pattern: FormPathPattern, alias: FormPathPattern): boolean
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').matchAliasGroup('aa.bb.cc', 'aa.cc')) //true
```

### existIn

#### Description

Determine whether the specified data exists based on the current path

#### Signature

```ts
interface existIn {
  (pattern: FormPathPattern): boolean
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').existIn({})) //false
```

### getIn

#### Description

Obtain the specified data based on the current path

#### Signature

```ts
interface getIn {
  (pattern: FormPathPattern): any
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').getIn({ aa: { bb: { cc: 'value' } } })) //value
```

### setIn

#### Description

Update the specified data based on the current path

#### Signature

```ts
interface setIn {
  (pattern: FormPathPattern, value: any): void
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.parse('aa.bb.cc').setIn(target, 'value')

console.log(FormPath.parse('aa.bb.cc').getIn(target)) //value
```

### deleteIn

#### Description

Delete the specified data based on the current path

#### Signature

```ts
interface deleteIn {
  (pattern: FormPathPattern): boolean
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

const target = {
  aa: {
    bb: {
      cc: 'value',
    },
  },
}

FormPath.parse('aa.bb.cc').deleteIn(target)
console.log(FormPath.parse('aa.bb.cc').getIn(target)) //undefined
```

### ensureIn

#### Description

Ensure that there must be data under a certain path, if not, create data

#### Signature

```ts
interface ensureIn {
  (pattern: FormPathPattern, value: any): any
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.parse('aa.bb.cc').ensureIn(target, 'value')

console.log(FormPath.parse('aa.bb.cc').getIn(target)) //value
```

## Static method

### match

#### Description

Generate a path matcher based on matching paths

#### Signature

```ts
interface match {
  (pattern: FormPathPattern): (pattern: FormPathPattern) => boolean
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.match('aa.*.cc')('aa.bb.cc')) // true
```

### transform

#### Description

Regular conversion path

#### Signature

```ts
interface transform<T> {
  (
    pattern: FormPathPattern,
    regexp: RegExp,
    callback: (...matches: string[]) => T
  ): T
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(
  FormPath.transform(
    'aa.0.bb',
    /\d+/,
    (index) => `aa.${parseInt(index) + 1}.bb`
  )
) // `aa.1.bb`
```

### parse

#### Description

Resolve path

#### Signature

```ts
interface parse {
  (pattern: FormPathPattern): FormPath
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.0.bb'))
```

### getIn

Get data based on path

#### Signature

```ts
interface getIn {
  (target: any, pattern: FormPathPattern): any
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.getIn({ aa: [{ bb: 'value' }] }, 'aa.0.bb'))
```

### setIn

Update data based on path

#### Signature

```ts
interface setIn {
  (target: any, pattern: FormPathPattern, value: any): void
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.setIn(target, 'aa.bb.cc', 'value')

console.log(target) //{aa:{bb:{cc:'value'}}}
```

### deleteIn

Delete data based on path

#### Signature

```ts
interface deleteIn {
  (target: any, pattern: FormPathPattern): void
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

const target = {
  aa: {
    bb: {
      cc: 'value',
    },
  },
}

FormPath.deleteIn(target, 'aa.bb.cc')

console.log(target) //{aa:{bb:{}}}
```

### existIn

#### Description

Determine whether there is data in the specified path

#### Signature

```ts
interface existIn {
  (target: any, pattern: FormPathPattern): void
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

const target = {
  aa: {
    bb: {
      cc: 'value',
    },
  },
}

console.log(FormPath.existIn(target, 'aa.bb.cc')) //true
console.log(FormPath.existIn(target, 'aa.bb.kk')) //false
```

### ensureIn

#### Description

Ensure that there must be data under a certain path, if not, create data

#### Signature

```ts
interface ensureIn {
  (target: any, pattern: FormPathPattern, defaultValue: any): any
}
```

#### Example

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.ensureIn(target, 'aa.bb.cc', 'value')

console.log(FormPath.getIn(target, 'aa.bb.cc')) //value
```
