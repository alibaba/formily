# FormButtonGroup

## 介绍

用于组织表单按钮与整体表单的布局方式

## 依赖

```javascript
import { FormButtonGroup } from '@uform/next(antd)'
```

## API

| 属性名称 | 属性描述 | 属性类型 | 默认值 |
| ---- | ---- | ---- | --- |
| align | 按钮内容的定位 | `'left'|'right'|'start'|'end'|'top'|'bottom'|'center'` |  |
| itemStyle | 按钮组容器样式 | `React.CSSProperties` | {} |
| offset | 按钮组容器左偏移距离 | `number` |  |
| span | 按钮组容器宽度 | `number` |  |
| sticky | 是否洗底 | `boolean` | false |
| style | 大容器样式 | `React.CSSProperties` | {} |

## 用例

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, FormButtonGroup } from '@uform/next(antd)'

ReactDOM.render(
  <SchemaForm>
    <FormButtonGroup offset={7} sticky align="center">
      <Button
        onClick={() => {
          alert('自定义按钮')
        }}
      >
        上传文件
      </Button>
    </FormButtonGroup>
  </SchemaForm>,
  document.getElementById('root')
)
```
