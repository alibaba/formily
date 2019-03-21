# FormCard

## 介绍

实现卡片式分离表单模块

## 依赖

```javascript
import { FormCard } from '@uform/next(antd)'
```

## API

继承 next-card / [ant-card](https://ant.design/components/card-cn/)

## 用例

```javascript
import React from 'react'
import { SchemaForm, Field, FormCard } from '@uform/next(antd)'

ReactDOM.render(
  <SchemaForm>
    <FormCard title="基本信息">
      ​ <Field name="aaa" type="string" title="字段1" />
      ​ <Field name="bbb" type="number" title="字段2" />
      ​ <Field name="ccc" type="date" title="字段3" />​
    </FormCard>
    <FormCard title="详细信息">
      ​ <Field name="ddd" type="number" />
      ​ <Field name="eee" type="date" />
    </FormCard>
  </SchemaForm>,
  document.getElementById('root')
)
```
