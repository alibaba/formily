---
title: Formily - 阿里巴巴统一前端表单解决方案
order: 10
hero:
  title: Reactive Library
  desc: 面向DDD的响应式状态管理方案
  actions:
    - text: 主站文档
      link: //v2.formilyjs.org
    - text: 开发指南
      link: /zh-CN/guide
features:
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01bHdrZJ1rEOESvXEi5_!!6000000005599-55-tps-800-800.svg
    title: 超高性能
    desc: 依赖追踪，高效更新，按需渲染
  - icon: https://img.alicdn.com/imgextra/i2/O1CN01YqmcpN1tDalwgyHBH_!!6000000005868-55-tps-800-800.svg
    title: 跨终端，跨框架
    desc: UI无关，框架无关
  - icon: https://img.alicdn.com/imgextra/i4/O1CN01u6jHgs1ZMwXpjAYnh_!!6000000003181-55-tps-800-800.svg
    title: 智能提示
    desc: 拥抱Typescript
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
---

## 安装

```bash
$ npm install --save @formily/reactive

```

## 快速开始

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const obs = observable({
  value: 'Hello world',
})

export default observer(() => {
  return (
    <div>
      <div>
        <input
          style={{
            height: 28,
            padding: '0 8px',
            border: '2px solid #888',
            borderRadius: 3,
          }}
          value={obs.value}
          onChange={(e) => {
            obs.value = e.target.value
          }}
        />
      </div>
      <div>{obs.value}</div>
    </div>
  )
})
```
