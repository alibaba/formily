# ArrayItems

> 自增列表，对于简单的自增编辑场景比较适合，或者对于空间要求高的场景比较适合
>
> 注意：该组件只适用于 Schema 场景

## Markup Schema 案例

<dumi-previewer demoPath="guide/array-items/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/array-items/json-schema" />

## API

### ArrayItems

继承 HTMLDivElement Props

### ArrayItems.Item

> 列表区块

继承 HTMLDivElement Props

### ArrayItems.SortHandle

> 拖拽手柄

参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button)

### ArrayItems.Addition

> 添加按钮

扩展属性

| 属性名 | 类型 | 描述 | 默认值 |
| ------ | ---- | ---- | ------ ||
| title | string | 文案 | |
| method | `'push' | 'unshift'` | 添加方式 | `'push'` |
| defaultValue | any | 默认值 | |

其余参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.Remove

> 删除按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.MoveDown

> 下移按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.MoveUp

> 上移按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.Index

> 索引渲染器

无属性

### ArrayItems.useIndex

> 读取当前渲染行索引的 Hook
