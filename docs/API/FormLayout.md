# FormLayout

## 介绍

实现局部布局

## 依赖

```javascript
import { FormLayout } from '@uform/next(antd)'
```

## API

| 属性名称 | 属性描述 | 属性类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | --- | --- |
| className | 容器自定义类名 | `string` | "" |  |
| inline | 内部是否采用行内排列 | `boolean` | false |  |
| labelAlign | 按钮组容器样式 | `'left'|'top'|'inset'` | | "left" | "left"/"top"/"inset" |
| labelCol | 标签宽度占比 | `number` |  |  |
| labelTextAlign | 按钮组容器左偏移距离 | `'left'|'right'` | "right" | "left"/"right" |
| size | 容器大小 | `'small'|'medium'|'large'` | medium | "small"/"medium"/"large" |
| style | 容器样式 | `React.CSSProperties` | {} |  |
| wrapperCol | 容器宽度占比 | `number` |  |  |

## 用例

```javascript
import React from 'react'
import { SchemaForm, Field, FormLayout } from '@uform/next(antd)'

ReactDOM.render(
  <SchemaForm>
    <Field type="object">
      <FormBlock title="基础信息">
        <FormLayout labelCol={9} wrapperCol={6}>
          ​ <Field name="aa" type="string" title="字段1" />
          ​ <Field name="bb" type="string" title="字段2" />
        </FormLayout>
      </FormBlock>
    </Field>
  </SchemaForm>,
  document.getElementById('root')
)
```
