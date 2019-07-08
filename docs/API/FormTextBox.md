# FormTextBox

## 介绍

解决表单字段间的文本化串联问题，因为有些场景，字段的完全结构化展示对可读性而言是不太方便的，往往是处于词组之间的串联关系。
通过FormTextBox可以解决这样的问题，最大化提升表单可读性。

## 依赖

```javascript
import { FormTextBox } from '@uform/next(antd)'
```

## API

| 属性名称 | 属性描述 | 属性类型 | 默认值 |
| ---- | ---- | ---- | --- |
| text | 字符串文本，以%s来代表字段的位置，同时这种方式对国际化也比较友好 | string | '' |
| description | 描述文案 | string/JSX |  |
| gutter | 间距 | number | 10 |
| title | 标题 | string/JSX |  |

## 用例

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, Field, FormCard, FormTextBox } from '@uform/next(antd)'

ReactDOM.render(
  <SchemaForm>
    <FormCard title="基本信息">
      ​ <Field name="aaa" type="string" title="字段1" />
      ​ <Field name="bbb" type="number" title="字段2" />
      ​ <Field name="ccc" type="date" title="字段3" />​
    </FormCard>
    <FormCard title="详细信息">
      <FormTextBox title="字段4" gutter={10} text="数字 %s 日期 %s">
        <Field name="ddd" type="number" />
        ​ <Field name="eee" type="date" />
      </FormTextBox>
    </FormCard>
  </SchemaForm>,
  document.getElementById('root')
)
```
