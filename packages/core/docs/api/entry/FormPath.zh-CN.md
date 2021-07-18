---
order: 5
---

# FormPath

FormPath 在 Formily 中核心是解决 2 类问题：

- 路径匹配问题
- 数据操作问题

路径匹配是要求给定的路径必须是合法的路径匹配语法，比如`*(aa,bb,cc)`。

数据操作则要求给定的路径必须是合法的数据操作路径，也就是必须为`a.b.c`这样的形式，不能带`*`

## 构造函数

```ts
class FormPath {
  constructor(pattern: FormPathPattern, base?: FormPathPattern)
}
```

## 属性

| 属性               | 描述                                                   | 类型                      | 默认值 |
| ------------------ | ------------------------------------------------------ | ------------------------- | ------ |
| length             | 如果路径为非匹配型路径，则可以读取路径的长度           | Number                    | `0`    |
| entire             | 路径完整字符串，与入参数据一致                         | String                    |        |
| segments           | 如果路径为非匹配型路径，则可以读取到完整的路径分割片段 | `Array<String \| Number>` | `[]`   |
| isMatchPattern     | 该路径是否是匹配型路径                                 | Boolean                   |        |
| isWildMatchPattern | 该路径是否是全通配路径，比如`a.b.*`                    | Boolean                   |        |
| haveExcludePattern | 该路径是否存在反向匹配，比如`*(!a.b.c)`                | Boolean                   |        |
| tree               | 解析后的 AST 树                                        | Node                      |        |

## FormPathPattern

### 签名

```ts
type FormPathPattern = string | number | Array<string | number> | RegExp
```

### 数据路径语法

#### 点路径

**描述**

就是我们最常用的`a.b.c`格式，用点符号来分割每个路径节点，主要用来读写数据

**用例**

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.setIn(target, 'a.b.c', 'value')
console.log(FormPath.getIn(target, 'a.b.c')) //'value'
console.log(target) //{a:{b:{c:'value'}}}
```

#### 下标路径

对于数组路径，都会有下标，我们的下标可以用点语法，也可以用中括号

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

#### 解构表达式

解构表达式类似于 ES6 的解构语法，只是它不支持`...`解构，在前后端数据不一致的场景非常适用，它主要有几个特点：

- 解构表达式会作为点路径的某个节点，我们可以把它看做一个普通字符串节点，只是在数据操作时会生效，所以在匹配语法中只需要把解构表达式作为普通节点节点来匹配即可
- 在 setIn 中使用解构路径，数据会被解构
- 在 getIn 中使用解构路径，数据会被重组

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.setIn(target, 'parent.[aa,bb]', [11, 22])
console.log(target) //{parent:{aa:11,bb:22}}
console.log(FormPath.getIn(target, 'parent.[aa,bb]')) //[11,22]
console.log(FormPath.parse('parent.[aa,bb]').toString()) //parent.[aa,bb]
```

#### 相对路径

相对路径语法主要是在数据型路径头部用点语法表示，对于计算数组的相邻元素非常好用，它主要有几个特点：

- 一个点代表当前路径
- n 个点代表往前 n-1 步
  - 中括号中可以用下标计算表达式：`[+]`代表当前下标+1，`[-]`代表当前下标-1，`[+n]`代表当前下标+n，`[-n]`代表当前下标-n
- 路径匹配的时候不能使用分组匹配和范围匹配，比如`*(..[+1].aa,..[+2].bb)`这样的形式

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('.dd', 'aa.bb.cc').toString()) //aa.bb.dd
console.log(FormPath.parse('..[].dd', 'aa.1.cc').toString()) //aa.1.dd
console.log(FormPath.parse('..[+].dd', 'aa.1.cc').toString()) //aa.2.dd
console.log(FormPath.parse('..[+10].dd', 'aa.1.cc').toString()) //aa.11.dd
```

### 匹配路径语法

#### 全匹配

全匹配相当于是匹配所有路径，只需要用一个`*`标识即可

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('*').match('aa')) //true
console.log(FormPath.parse('*').match('aa.bb')) //true
console.log(FormPath.parse('*').match('cc')) //true
```

#### 局部匹配

局部匹配相当于是匹配一个节点位置的所有路径，同样只需要用一个`*`标识即可

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.*.cc').match('aa.bb.cc')) //true
console.log(FormPath.parse('aa.*.cc').match('aa.kk.cc')) //true
console.log(FormPath.parse('aa.*.cc').match('aa.dd.cc')) //true
```

#### 分组匹配

分组匹配可以匹配多个路径，同时还支持嵌套，语法：`*(pattern1,pattern2,pattern3...)`

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

#### 反向匹配

反向匹配主要用于排除指定路径，语法：`*(!pattern1,pattern2,pattern3)`

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('*(!aa,bb,cc)').match('aa')) //false
console.log(FormPath.parse('*(!aa,bb,cc)').match('kk')) //true
```

#### 扩展匹配

扩展匹配主要用于匹配路径起始子串，语法：`pattern~`

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('test~').match('test_111')) //true
console.log(FormPath.parse('test~').match('test_222')) //true
```

#### 范围匹配

范围匹配主要用于匹配数组索引范围，语法：`*[x:y]`，x 和 y 可以为空，代表开区间匹配

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.*[1:2].bb').match('aa.1.bb')) //true
console.log(FormPath.parse('aa.*[1:2].bb').match('aa.2.bb')) //true
console.log(FormPath.parse('aa.*[1:2].bb').match('aa.3.bb')) //false
console.log(FormPath.parse('aa.*[1:].bb').match('aa.3.bb')) //true
console.log(FormPath.parse('aa.*[:100].bb').match('aa.3.bb')) //true
console.log(FormPath.parse('aa.*[:100].bb').match('aa.1000.bb')) //false
```

#### 转义匹配

对于路径节点中包含关键字的，我们可以使用转义语法匹配，语法`\\`或者`[[]]`

```ts
import { FormPath } from '@formily/core'

console.log(
  FormPath.parse('aa.\\,\\*\\{\\}\\.\\(\\).bb').match(
    'aa.\\,\\*\\{\\}\\.\\(\\).bb'
  )
) //true
console.log(FormPath.parse('aa.[[,*{}.()]].bb').match('aa.[[,*{}.()]].bb')) //true
```

#### 解构匹配

对于携带解构表达式的路径，我们匹配的话，直接匹配即可，无需转义

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('target.[aa,bb]').match('target.[aa,bb]')) //true
```

## 方法

### toString

#### 描述

输出路径的完整字符串，支持匹配型路径与数据操作型路径

#### 签名

```ts
interface toString {
  (): string
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').toString()) //aa.bb.cc
console.log(FormPath.parse('aa.bb.*').toString()) //aa.bb.*
console.log(FormPath.parse('*(aa,bb,cc)').toString()) //*(aa,bb,cc)
```

### toArray

#### 描述

输出路径的数组片段，仅支持数据操作型路径

#### 签名

```ts
interface toArray {
  (): Array<string | number>
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').toArray().join('--')) //aa-bb-cc
console.log(FormPath.parse('aa.bb.*').toArray()) //[]
console.log(FormPath.parse('*(aa,bb,cc)').toArray()) //[]
```

### concat

#### 描述

连接数据操作型路径

#### 签名

```ts
interface concat {
  (...args: FormPathPattern[]): FormPath
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').concat('dd.ee.mm').toString()) //aa.bb.cc.dd.ee.mm
console.log(
  FormPath.parse('aa.bb.cc').concat(['dd', 'ee', 'mm'], 'kk.oo').toString()
) //aa.bb.cc.dd.ee.mm.kk.oo
```

### slice

#### 描述

选取数据操作路径的某个片段

#### 签名

```ts
interface slice {
  (start?: number, end?: number): FormPath
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').slice(1).toString()) //bb.cc
```

### push

#### 描述

往数据操作路径推入某个片段路径

#### 签名

```ts
interface push {
  (...args: FormPathPattern[]): FormPath
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').push('dd.kk').toString()) //aa.bb.cc.dd.kk
```

### pop

#### 描述

从数据操作路径中弹出最后一个 key

#### 签名

```ts
interface pop {
  (): FormPath
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').pop().toString()) //aa.bb
```

### splice

#### 描述

对数据操作路径做 splice 操作

#### 签名

```ts
interface splice {
  (
    startIndex: number,
    deleteCount?: number,
    ...inertItems: Array<string | number>
  ): FormPath
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').splice(2, 1).toString()) //aa.bb
console.log(FormPath.parse('aa.bb.cc').splice(2, 0, 'ee.gg').toString()) //aa.bb.ee.gg.cc
console.log(FormPath.parse('aa.bb.cc').splice(2, 0, ['kk', 'mm']).toString()) //aa.bb.kk.mm.cc
```

### forEach

#### 描述

遍历数据操作路径

#### 签名

```ts
interface forEach {
  (eacher: (key: string | number, index: number) => void): void
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

const keys = []

FormPath.parse('aa.bb.cc').forEach((key) => {
  keys.push(key)
})

console.log(keys) //['aa','bb','cc']
```

### map

#### 描述

循环映射数据操作路径

#### 签名

```ts
interface map {
  (mapper: (key: string | number, index: number) => void): void
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(
  FormPath.parse('aa.bb.cc').map((key) => {
    return key + '~'
  }) //['aa~','bb~','cc~']
)
```

### reduce

#### 描述

reduce 方法法对路径中的每个元素执行一个由您提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值。

#### 签名

```ts
interface reduce<T> {
  (reducer: (value: T, key: string | number, index: number) => void): void
  accumulator: T
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(
  FormPath.parse('aa.bb.cc').reduce((count) => {
    return count + 1
  }, 0)
) //3
```

### parent

#### 描述

获取当前数据操作路径的父级路径

#### 签名

```ts
interface parent {
  (): FormPath
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').parent().toString()) //aa.bb
```

### includes

#### 描述

用于判断给定数据操作路径是否为当前数据操作路径的子路径

#### 签名

```ts
interface includes {
  (pattern: FormPathPattern): boolean
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').includes('aa.bb')) //true

console.log(FormPath.parse('aa.bb.cc').includes('cc.bb')) //false
```

### transform

#### 描述

基于正则提取数据做路径拼装

#### 签名

```ts
interface transform<T> {
  (regExp: RegExp, callback: (...matches: string[]) => T): T
}
```

#### 用例

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

#### 描述

使用路径匹配语法匹配当前路径

#### 签名

```ts
interface match {
  (pattern: FormPathPattern): boolean
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.1.cc').match('aa.*.cc')) //true
```

### matchAliasGroup

#### 描述

别名组匹配，在 formily 中主要用来匹配 address 和 path

#### 签名

```ts
interface matchAliasGroup {
  (pattern: FormPathPattern, alias: FormPathPattern): boolean
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').matchAliasGroup('aa.bb.cc', 'aa.cc')) //true
```

### existIn

#### 描述

基于当前路径判断指定数据是否存在

#### 签名

```ts
interface existIn {
  (pattern: FormPathPattern): boolean
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').existIn({})) //false
```

### getIn

#### 描述

基于当前路径获取指定数据

#### 签名

```ts
interface getIn {
  (pattern: FormPathPattern): any
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.bb.cc').getIn({ aa: { bb: { cc: 'value' } } })) //value
```

### setIn

#### 描述

基于当前路径更新指定数据

#### 签名

```ts
interface setIn {
  (pattern: FormPathPattern, value: any): void
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.parse('aa.bb.cc').setIn(target, 'value')

console.log(FormPath.parse('aa.bb.cc').getIn(target)) //value
```

### deleteIn

#### 描述

基于当前路径删除指定数据

#### 签名

```ts
interface deleteIn {
  (pattern: FormPathPattern): boolean
}
```

#### 用例

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

#### 描述

确保某个路径下必须有数据，如果没有则创建数据

#### 签名

```ts
interface ensureIn {
  (pattern: FormPathPattern, value: any): any
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.parse('aa.bb.cc').ensureIn(target, 'value')

console.log(FormPath.parse('aa.bb.cc').getIn(target)) //value
```

## 静态方法

### match

#### 描述

基于匹配型路径生成一个路径匹配器

#### 签名

```ts
interface match {
  (pattern: FormPathPattern): (pattern: FormPathPattern) => boolean
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.match('aa.*.cc')('aa.bb.cc')) // true
```

### transform

#### 描述

正则转换路径

#### 签名

```ts
interface transform<T> {
  (
    pattern: FormPathPattern,
    regexp: RegExp,
    callback: (...matches: string[]) => T
  ): T
}
```

#### 用例

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

#### 描述

解析路径

#### 签名

```ts
interface parse {
  (pattern: FormPathPattern): FormPath
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.parse('aa.0.bb'))
```

### getIn

基于路径获取数据

#### 签名

```ts
interface getIn {
  (target: any, pattern: FormPathPattern): any
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

console.log(FormPath.getIn({ aa: [{ bb: 'value' }] }, 'aa.0.bb'))
```

### setIn

基于路径更新数据

#### 签名

```ts
interface setIn {
  (target: any, pattern: FormPathPattern, value: any): void
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.setIn(target, 'aa.bb.cc', 'value')

console.log(target) //{aa:{bb:{cc:'value'}}}
```

### deleteIn

基于路径删除数据

#### 签名

```ts
interface deleteIn {
  (target: any, pattern: FormPathPattern): void
}
```

#### 用例

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

#### 描述

判断指定路径是否存在数据

#### 签名

```ts
interface existIn {
  (target: any, pattern: FormPathPattern): void
}
```

#### 用例

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

#### 描述

确保某个路径下必须有数据，如果没有则创建数据

#### 签名

```ts
interface ensureIn {
  (target: any, pattern: FormPathPattern, defaultValue: any): any
}
```

#### 用例

```ts
import { FormPath } from '@formily/core'

const target = {}

FormPath.ensureIn(target, 'aa.bb.cc', 'value')

console.log(FormPath.getIn(target, 'aa.bb.cc')) //value
```
