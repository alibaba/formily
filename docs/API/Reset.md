# Reset

## 介绍

用于快速重置，其内部自动做与 Form 组件的通讯，无需写过多的重置相关的处理逻辑

## 依赖

```javascript
import { Reset } from '@formily/next(antd)'
```

## API

继承 next-button / [ant-button](https://ant.design/components/button-cn/)

> 注意：如果要实现默认值重置，必须在 Field 级别设置 default 属性才生效，如果是在
> Form 级别传 value 或 defaultValue 是不能实现默认值重置的

## 用例

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, FormButtonGroup, Reset } from '@formily/next(antd)'

ReactDOM.render(
  <SchemaForm>
    <FormButtonGroup offset={7} sticky align="center">
      <Reset />
      // 自定义文案
      <Reset>自定义重置文案</Reset>
    </FormButtonGroup>
  </SchemaForm>,
  document.getElementById('root')
)
```
