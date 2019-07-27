# Submit

## 介绍

用于快速提交，其内部自动做与 Form 组件的通讯，无需写过多的提交相关的处理逻辑

## 依赖

```javascript
import { Submit } from '@uform/next(antd)'
```

## API

继承 [next-button](https://fusion.design/component/basic/button#button) /
[ant-button](https://ant.design/components/button-cn/#API)
> 原有组件的 loading 属性会被扩展的 showLoading 属性所替代

**扩展属性**

| 属性名称 | 属性描述 | 属性类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | --- | --- |
| showLoading | 主要用于控制Submit组件是否自动展示loading图标，要求SchemaForm的onSubmit回调必须返回Promise对象才会生效。 | `boolean` | - | - |

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
