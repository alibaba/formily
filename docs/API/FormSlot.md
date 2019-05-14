# FormSlot

## 介绍

顾名思义，它就是一个表单的插槽组件，有些场景，表单结构很可能会插入一些跟整个表单
没任何关系的内容，但是它在交互，信息流层面却又是一个值得插入的行为，所以
，FormSlot 就是为了解决这个问题而存在的

## 依赖

    import {FormLayout} from '@uform/next(antd)'

## API

没有任何属性 API，您只需给其子节点随意的填充内容即可

## 用例

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, Field, FormLayout, FormSlot } from '@uform/next(antd)'

ReactDOM.render(
  <SchemaForm>
    <Field type="object">
      <FormBlock title="基础信息">
        <FormSlot>
          <div>这是一个随意插入的内容</div>
        </FormSlot>
      </FormBlock>
    </Field>
  </SchemaForm>,
  document.getElementById('root')
)
```
