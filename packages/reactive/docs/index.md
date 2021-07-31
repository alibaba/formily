---
title: Formily-Alibaba unified front-end form solution
order: 10
hero:
  title: Reactive Library
  desc: DDD-oriented Responsive State Management Solution
  actions:
    - text: Home Site
      link: //v2.formilyjs.org
    - text: Document
      link: /guide
features:
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01bHdrZJ1rEOESvXEi5_!!6000000005599-55-tps-800-800.svg
    title: High Performance
    desc: Efficient update, Demand rendering
  - icon: https://img.alicdn.com/imgextra/i2/O1CN01YqmcpN1tDalwgyHBH_!!6000000005868-55-tps-800-800.svg
    title: Zero Dependencies
    desc: Cross Device,Cross Framework
  - icon: https://img.alicdn.com/imgextra/i4/O1CN01u6jHgs1ZMwXpjAYnh_!!6000000003181-55-tps-800-800.svg
    title: Smart Tips
    desc: Embrace Typescript
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
---

## Installation

```bash
$ npm install --save @formily/reactive

```

## Quick start

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
