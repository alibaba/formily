# Submit

## 介绍

用于快速提交，其内部自动做与 Form 组件的通讯，无需写过多的提交相关的处理逻辑

## 依赖

```javascript
import { Submit } from '@uform/next(antd)'
```

## API

继承 [next-button](http://gitlab.alibaba-inc.com/next/button) /
[ant-button](https://ant.design/components/button-cn/)

## 用例

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, FormButtonGroup, Submit } from '@uform/next(antd)'

ReactDOM.render(
  <SchemaForm>
    <FormButtonGroup offset={7} sticky align="center">
      <Submit />
      // 自定义文案
      <Submit>自定义提交文案</Submit>
    </FormButtonGroup>
  </SchemaForm>,
  document.getElementById('root')
)
```
