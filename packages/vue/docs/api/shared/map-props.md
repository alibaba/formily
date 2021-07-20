# mapProps

## 描述

将[Field](https://core.formilyjs.org/api/models/field)属性与组件属性映射的适配器函数，主要与 connect 函数搭配使用

## 签名

```ts
import { Field, GeneralField } from '@formily/core'

type IStateMapper<Props> =
  | {
      [key in keyof Field]?: keyof Props | boolean
    }
  | ((props: Props, field: GeneralField) => Props)

interface mapProps<T extends Vue.Component> {
  (...args: IStateMapper<VueComponentProps<T>>[]): Vue.Component
}
```

- 参数可以传对象(key 是 field 的属性，value 是组件的属性，如果 value 为 true，代表映射的属性名相同)
- 参数可以传函数，函数可以直接对属性做更复杂的映射

## 用例

<dumi-previewer demoPath="api/shared/map-props" />
