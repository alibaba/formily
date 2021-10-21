# FormGrid

> FormGrid 组件

## Markup Schema 案例

<dumi-previewer demoPath="guide/form-grid/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/form-grid/json-schema" />

## 原生案例

<dumi-previewer demoPath="guide/form-grid/native" />

## API

### FormGrid

| 属性名      | 类型                | 描述         | 默认值            |
| ----------- | ------------------- | ------------ | ----------------- |
| minWidth    | `number / number[]` | 元素最小宽度 | 100               |
| maxWidth    | `number / number[]` | 元素最大宽度 | -                 |
| minColumns  | `number / number[]` | 最小列数     | 0                 |
| maxColumns  | `number / number[]` | 最大列数     | -                 |
| breakpoints | number[]            | 容器尺寸断点 | `[720,1280,1920]` |
| columnGap   | number              | 列间距       | 8                 |
| rowGap      | number              | 行间距       | 4                 |
| colWrap     | boolean             | 自动换行     | true              |

注意：

- minWidth 生效优先级高于 minColumn
- maxWidth 优先级高于 maxColumn
- minWidth/maxWidth/minColumns/maxColumns 的数组格式代表与断点数组映射

### FormGrid.GridColumn

| 属性名   | 类型   | 描述                                                 | 默认值 |
| -------- | ------ | ---------------------------------------------------- | ------ |
| gridSpan | number | 元素所跨列数，如果为-1，那么会自动反向跨列填补单元格 | 1      |

### FormGrid.useGridSpan

#### 描述

根据容器宽度计算出正确的 span，防止元素溢出

#### 签名

```ts
interface uesGridSpan {
  (gridSpan: number): number
}
```
