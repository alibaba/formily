# ArrayCards

> 卡片列表，对于每行字段数量较多，联动较多的场景比较适合使用 ArrayCards
>
> 注意：该组件只适用于 Schema 场景

## Markup Schema 案例

<dumi-previewer demoPath="guide/array-cards/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/array-cards/json-schema" />

## Effects 联动案例

<dumi-previewer demoPath="guide/array-cards/effects-markup-schema" />

## JSON Schema 联动案例

<dumi-previewer demoPath="guide/array-cards/effects-json-schema" />

## API

### ArrayCards

> 表格组件

参考 [https://element.eleme.io/#/zh-CN/component/card](https://element.eleme.io/#/zh-CN/component/card)

### ArrayCards.Addition

> 添加按钮

扩展属性

| 属性名       | 类型    | 描述       | 默认值   |
| ------------ | ------- | ---------- | -------- | -------- |
| title        | string  | 文案       |          |
| method       | `'push' | 'unshift'` | 添加方式 | `'push'` |
| defaultValue | any     | 默认值     |          |

其余参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCards.Remove

> 删除按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCards.MoveDown

> 下移按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCards.MoveUp

> 上移按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCards.Index

> 索引渲染器

无属性

### ArrayCards.useIndex

> 读取当前渲染行索引的 Hook

### ArrayCards.useRecord

> 读取当前渲染记录的 Hook
