# FormLayout

> 区块级布局批量控制组件，借助该组件，我们可以轻松的控制被 FormLayout 圈住的所有 FormItem 组件的布局模式

## Markup Schema 案例

<dumi-previewer demoPath="guide/form-layout/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/form-layout/json-schema" />

## Template 案例

<dumi-previewer demoPath="guide/form-layout/template" />

## API

| 属性名         | 类型                 | 描述                    | 默认值         |
| -------------- | -------------------- | ----------------------- | -------------- | -------- | ---------- | ---- |
| style          | CSSProperties        | 样式                    | -              |
| className      | string               | 类名                    | -              |
| colon          | boolean              | 是否有冒号              | true           |
| labelAlign     | `right` \| `left`    | 标签内容对齐            | -              |
| wrapperAlign   | `right` \| `left`    | 组件容器内容对齐        | -              |
| labelWrap      | boolean              | 标签内容换行            | false          |
| labelWidth     | number               | 标签宽度(px)            | -              |
| wrapperWidth   | number               | 组件容器宽度(px)        | -              |
| wrapperWrap    | boolean              | 组件容器换行            | false          |
| labelCol       | number               | 标签宽度(24 column)     | -              |
| wrapperCol     | number               | 组件容器宽度(24 column) | -              |
| fullness       | boolean              | 组件容器宽度 100%       | false          |
| size           | `'small'             | 'default'               | 'large'`       | 组件尺寸 | default    |
| layout         | `'vertical'          | 'horizontal'            | 'inline'`      | 布局模式 | horizontal |
| direction      | `'rtl'               | 'ltr'`                  | 方向(暂不支持) | ltr      |
| shallow        | boolean              | 上下文浅层传递          | true           |
| feedbackLayout | `'loose'             | 'terse'                 | 'popover'      | 'none'`  | 反馈布局   | true |
| tooltipLayout  | `'icon'` \| `'text'` | 问提示布局              | `"icon"`       |
