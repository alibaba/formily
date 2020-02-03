# FormBlock

## 介绍

实现在卡片内部的区块化分割

## 依赖

```javascript
import { FormBlock } from '@formily/next(antd)'
```

## API

继承 next-card / [ant-card](https://ant.design/components/card-cn/)

## 用例

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, Field, FormCard, FormBlock } from '@formily/next(antd)'

ReactDOM.render(
  <SchemaForm>
    <FormCard title="基本信息">
      ​ <Field name="aaa" type="string" title="字段1" />
      ​ <Field name="bbb" type="number" title="字段2" />
      ​ <Field name="ccc" type="date" title="字段3" />​
      <FormBlock title="区块">
        ​ <Field name="ddd2" type="string" title="字段5" />​
        <Field name="eee2" type="string" title="字段6" />​
      </FormBlock>
    </FormCard>
    <FormCard title="详细信息">
      ​ <Field name="ddd" type="number" />
      ​ <Field name="eee" type="date" />
    </FormCard>
  </SchemaForm>,
  document.getElementById('root')
)
```
