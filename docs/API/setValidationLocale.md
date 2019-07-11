# setValidationLocale

## 介绍

设置正则校验规则的国际化文案

## 类型描述

```typescript
interface Locale {
  [isoCode: string]: string
}

type setValidationLocale = (locale: Locale) => void
```

## 依赖

```javascript
import {setValidationLocale} from '@uform/core'
```

## 默认配置

```json
{
  en:{
    pattern:'%s value %s does not match pattern %s',
    required: '%s is required',
    number:'%s is not a number',
    integer:'%s is not an integer number',
    url:'%s is a invalid url',
    email:"%s is not a email format",
    ipv6:"%s is not a ipv6 format",
    ipv4:"%s is not a ipv4 format",
    idcard:"%s is not an idcard format",
    taodomain:"%s is not a taobao domain format",
    qq:"%s is not a qq number format",
    phone:"%s is not a phone number format",
    money:"%s is not a currency format",
    zh:"%s is not a chinese string",
    date:"%s is not a valid date format",
    zip:"%s is not a zip format"
  },
  zh:{
    pattern:'%s 不是一个合法的字段',
    required: '%s 是必填字段',
    number:'%s 不是合法的数字',
    integer:'%s 不是合法的整型数字',
    url:'%s 不是合法的url',
    email:"%s 不是合法的邮箱格式",
    ipv6:"%s 不是合法的ipv6格式",
    ipv4:"%s 不是合法的ipv4格式",
    idcard:"%s 不是合法的身份证格式",
    taodomain:"%s 不符合淘系域名规则",
    qq:"%s 不符合QQ号格式",
    phone:"%s 不是有效的手机号",
    money:"%s 不是有效货币格式",
    zh:"%s 不是合法的中文字符串",
    date:"%s 不是合法的日期格式",
    zip:"%s 不是合法的邮编格式"
  }
}
```
