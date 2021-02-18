---
title: React 版逻辑图布局组件
order: 10
hero:
  title: FORMILY REACT LOGIC DIAGRAM
  desc: React 版逻辑图布局组件
  actions:
    - text: 主站文档
      link: //formilyjs.org
    - text: API文档
      link: /api
features:
  - icon: https://img.alicdn.com/imgextra/i2/O1CN016i72sH1c5wh1kyy9U_!!6000000003550-55-tps-800-800.svg
    title: 更易用
    desc: 开箱即用，案例丰富
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01bHdrZJ1rEOESvXEi5_!!6000000005599-55-tps-800-800.svg
    title: 更高效
    desc: 傻瓜写法，超高性能
  - icon: https://img.alicdn.com/imgextra/i3/O1CN01xlETZk1G0WSQT6Xii_!!6000000000560-55-tps-800-800.svg
    title: 更专业
    desc: 完备，灵活，优雅
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
---

## 安装

```bash
$ npm install --save @formily/react-logic-diagram

```

## 快速开始

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { LogicDiagram, NodeTypes } from '@formily/react-logic-diagram'

export default () => {
  const logicOperatorMap = { '&&': '并且', '||': '或者' }
  const compareOperatorMap = {
    '===': '等于',
    '!==': '不等于',
    '>=': '大于等于',
    '<=': '小于等于',
  }
  return (
    <LogicDiagram
      disabled
      data={{
        logicOperator: '||',
        children: [
          { field: 'fieldA', compareOperator: '===', value: 'aaa' },
          {
            logicOperator: '&&',
            children: [
              { field: 'fieldB', compareOperator: '>=', value: 1 },
              { field: 'fieldB', compareOperator: '<=', value: 100 },
            ],
          },
          { field: 'fieldC', compareOperator: '!==', value: 'ccc' },
        ],
      }}
      nonLeafNodeWidth={48}
      renderNode={(path, type, data) => {
        switch (type) {
          case NodeTypes.RELATION:
            return (
              <div style={{ lineHeight: '24px', padding: 8 }}>
                {logicOperatorMap[data.logicOperator]}
              </div>
            )
          case NodeTypes.RULE:
            return (
              <div style={{ lineHeight: '24px', padding: 8 }}>
                <span>{data.field}</span>
                <span style={{ marginLeft: 8, marginRight: 8 }}>
                  {compareOperatorMap[data.compareOperator]}
                </span>
                <span>{data.value}</span>
              </div>
            )
          default:
            return null
        }
      }}
    />
  )
}
```
