# FormItemGrid

## 介绍

实现表单字段的局部网格布局能力

## 依赖

```javascript
import { FormItemGrid } from '@uform/next(antd)'
```

## API

| 属性名称 | 属性描述 | 属性类型 | 默认值 |
| ---- | ---- | ---- | --- |
| cols | 内部网格宽度占比 | `Array<number | { span: number, offset: number }>` | 不传值默认等比分割，可传入类似[4, 8]进行不等比分割，如果数组元素传对象，则是`[{ span:3,offset:0 }]`这样的形式 |
| description | 描述文案 | `string | JSX.Element | null` |  |
| gutter | 列间距 | `number` | 0 |
| title | 标题 | `string | JSX.Element | null` |  |

## 用例

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, Field, FormCard, FormItemGrid } from '@uform/next(antd)'

ReactDOM.render(
  <SchemaForm>
    <FormCard title="基本信息">
      ​ <Field name="aaa" type="string" title="字段1" />
      ​ <Field name="bbb" type="number" title="字段2" />
      ​ <Field name="ccc" type="date" title="字段3" />​
    </FormCard>
    <FormCard title="详细信息">
      <FormItemGrid title="字段4" gutter={10} cols={[9, 15]}>
        <Field name="ddd" type="number" />
        ​ <Field name="eee" type="date" />
      </FormItemGrid>
    </FormCard>
  </SchemaForm>,
  document.getElementById('root')
)
```
