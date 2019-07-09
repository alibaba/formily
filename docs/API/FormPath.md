# FormPath

## 介绍

专注于解决表单字段的路径匹配问题

## 类型描述

```typescript
interface FormPath {
   match: (
      pattern      : string,                       //匹配模式字符串
      matchRealPath: boolean,                      //是否匹配真实路径，该属性是用于处理path为FormField时，是否匹配完整路径
      filter       : (pattern: string) => boolean  //过滤器，相当于是基于pattern所匹配的结果再进行一次过滤操作
   )=>(
          path: string | Array<string> | FormField
      )=>boolean,
   transform:(
      path    : string | Array<string>,          //要改变的路径
      regexp  : RegExp,                          //提取正则，该正则会在路径遍历过程中将某个路径节点按照该正则提取出来，然后以参数形式放到callback中
      operator: (...paths: string[]) => string;  //路径处理器，根据正则提取出来的路径节点，做一些转换处理，并返回最终路径
   )=> string
}
```

## 依赖

```javascript
import {FormPath} from '@uform/core'
```

## Pattern路径匹配语法

**全通配**

    "*"

**扩展匹配**

    "aaa~" or "~" or "aaa~.bbb.cc"

**部分通配**

    "a.b.*.c.*"

**分组通配**

    "a.b.*(aa.bb.dd,cc,mm)"
    or 
    "a.b.*(!aa.bb.dd,cc,mm)"

**嵌套分组通配**

    "a.b.*(aa.bb.*(aa.b,c),cc,mm)"
    or 
    "a.b.*(!aa.bb.*(aa.b,c),cc,mm)"

**范围通配**

    "a.b.*[10:100]"
    or 
    "a.b.*[10:]"
    or 
    "a.b.*[:100]"

**关键字通配**

    "a.b.[[cc.uu()sss*\\[1222\\]]]"

## 用例

```javascript
import {FormPath} from '@uform/core'

FormPath.match('aa')('aa') // true
FormPath.match('*')('aa')  //true
FormPath.match('aa.*')('aa') //false
FormPath.match('aa.*')('aa.bb') // true
FormPath.match('aa.*(bb,cc)')('aa.dd') //false
FormPath.match('aa.*(!bb,cc)')('aa.dd') //true

FormPath.transform('aa.2.bb.3.dd',/\d+/,($1,$2)=>{
   return `aa.${$1+1}.bb.${$2-1}.dd`
}) // aa.3.bb.2.dd
```
