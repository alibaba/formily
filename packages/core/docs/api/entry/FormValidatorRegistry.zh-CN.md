---
order: 6
---

# Form Validator Registry

## setValidateLanguage

#### 描述

设置内置校验规则语言

#### 签名

```ts
interface setValidateLanguage {
  (language: string): void
}
```

#### 用例

```ts
import { setValidateLanguage } from '@formily/core'

setValidateLanguage('en-US')

setValidateLanguage('zh-CN')
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

## registerValidateMessageTemplateEngine

#### 描述

全局注册校验消息模板引擎，我们在校验器中返回校验消息的时候，可以基于模板引擎语法做转换

#### 签名

```ts
interface registerValidateMessageTemplateEngine {
  (template: (message: ValidatorFunctionResponse, context: any) => any): void
}
```

#### 用例

```ts
import { registerValidateMessageTemplateEngine } from '@formily/core'

registerValidateMessageTemplateEngine((message, context) => {
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

获取内置存在的 ISO Code

#### 签名

```ts
interface getValidateLocaleIOSCode {
  (language: string): string | undefined
}
```

#### 用例

```ts
import { getValidateLocaleIOSCode } from '@formily/core'

getValidateLocaleIOSCode('en')

// ==>  en_US
```
