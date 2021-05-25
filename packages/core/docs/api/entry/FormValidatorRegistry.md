---
order: 6
---

# Form Validator Registry

## setValidateLanguage

#### 描述

设置内置校验规则语言

#### 签名

```ts
interface setValidationLanguage {
  (language: string): void
}
```

#### 用例

```ts
import { setValidationLanguage } from '@formily/core'

setValidationLanguage('en-US')

setValidationLanguage('zh-CN')
```

## registerValidateFormats

#### 描述

注册通用正则规则，目前内置正则库参考：[formats.ts](https://github.com/alibaba/formily/blob/master/packages/validator/src/formats.ts)

#### 签名

```ts
interface registerValidateFormats {
  (rules: { [key: string]: RegExp }): void
}
```

#### 用例

```ts
import { registerValidateFormats } from '@formily/core'

registerValidateFormats({
  integer: /^[+-]?\d+$/,
})
```

## registerValidateLocale

#### 描述

全局注册校验语言包，目前内置语言包参考：[locale.ts](https://github.com/alibaba/formily/blob/master/packages/validator/src/locale.ts)

#### 签名

```ts
interface registerValidateLocale {
  (locales: {
    [key: string]: {
      key: string
    }
  }): void
}
```

#### 用例

```ts
import { registerValidateLocale } from '@formily/core'

registerValidateLocale({
  ja: {
    required: 'この項目は必須です',
  },
})
```

## registerValidateMessageTemplateEnigne

#### 描述

全局注册校验消息模板引擎，我们在校验器中返回校验消息的时候，可以基于模板引擎语法做转换

#### 签名

```ts
interface registerValidateMessageTemplateEnigne {
  (template: (message: ValidatorFunctionResponse, context: any) => any): void
}
```

#### 用例

```ts
import { registerValidateMessageTemplateEnigne } from '@formily/core'

registerValidateMessageTemplateEnigne((message, context) => {
  return message.replace(/\<\%\s*([\w.]+)\s*\%\>/g, (_, $0) => {
    return FormPath.getIn(context, $0)
  })
})
```

## registerValidateRules

#### 描述

注册通用校验规则，目前内置规则库参考：[rules.ts](https://github.com/alibaba/formily/blob/master/packages/validator/src/rules.ts)

#### 签名

```ts
interface registerValidateRules {
  (rules: {
    [key: string]: (
      value: any,
      rule: ValidatorRules,
      ctx: Context
    ) => ValidateResult | Promise<ValidateResult>
  }): void
}
```

#### 用例

```ts
import { registerValidateRules } from '@formily/core'

registerValidateRules({
  custom(value) {
    return value > 100 ? 'error' : ''
  },
})
```


## getValidateLocaleIOSCode

#### 描述

根据IOS Code 获取 Locales

#### 签名

```ts
interface getISOCode {
  (language: string): Record<string, string> | undefined;
}
```

#### 用例

```ts
import { getValidateLocaleIOSCode } from '@formily/core'

getValidateLocaleIOSCode('en');

// {
//   pattern: 'This field is invalid',
//   invalid: 'This field is invalid',
//   required: 'The field value is required',
//   number: 'The field value is not a number',
//   integer: 'The field value is not an integer number',
//   url: 'The field value is a invalid url',
//   email: 'The field value is not a email format',
//   ipv6: 'The field value is not a ipv6 format',
//   ipv4: 'The field value is not a ipv4 format',
//   idcard: 'The field value is not an idcard format',
//   qq: 'The field value is not a qq number format',
//   phone: 'The field value is not a phone number format',
//   money: 'The field value is not a currency format',
//   zh: 'The field value is not a chinese string',
//   date: 'The field value is not a valid date format',
//   zip: 'The field value is not a zip format',
//   len: 'The length or number of entries must be {{len}}',
//   min: 'The length or number of entries must be at least {{min}}',
//   maximum: 'The field value cannot be greater than {{maximum}}',
//   exclusiveMaximum: 'The field value must be less than {{exclusiveMaximum}}',
//   minimum: 'The field value cannot be less than {{minimum}}',
//   exclusiveMinimum:
//     'The field value must be greater than {{exclusiveMinimum}}',
//   max: 'The field length or number of entries must be at most {{max}}',
//   whitespace: 'This field value cannot be blank string.',
//   enum: 'The field value must be one of {{enum}}',
//   schema: {
//     const: 'The field value must be equal to {{const}}',
//     multipleOf: 'The field value must be divisible by {{multipleOf}}',
//     maxProperties:
//       'The number of field properties cannot be greater than {{maxProperties}}',
//     minProperties:
//       'The number of field properties cannot be less than {{maxProperties}}',
//     uniqueItems: 'Array elements are not unique',
//   }
// }
```
