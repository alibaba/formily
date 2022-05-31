---
title: Formily - 阿里巴巴统一前端表单解决方案
order: 10
hero:
  title: Alibaba Formily
  desc: 阿里巴巴统一前端表单解决方案
  actions:
    - text: 查看文档
      link: /zh-CN/guide
    - text: 快速开始
      link: /zh-CN/guide/quick-start
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

```tsx
/**
 * inline: true
 */
import React from 'react'
import { Section } from './site/Section'
import './site/styles.less'

export default () => (
  <Section
    title="傻瓜写法，超高性能"
    style={{ marginTop: 40 }}
    titleStyle={{ paddingBottom: 100 }}
  >
    <iframe
      className="codesandbox"
      src="https://codesandbox.io/embed/formilyyaliceshi-vbu4w?fontsize=12&module=%2FApp.tsx&theme=dark"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  </Section>
)
```

```tsx
/**
 * inline: true
 */
import React from 'react'
import { Section } from './site/Section'
import './site/styles.less'

export default () => (
  <Section
    title="拖拽搭建，高效开发"
    style={{ marginTop: 140 }}
    titleStyle={{ paddingBottom: 140 }}
    scale={1.2}
  >
    <a href="//designable-antd.formilyjs.org" target="_blank" rel="noreferrer">
      <img src="//img.alicdn.com/imgextra/i2/O1CN01eI9FLz22tZek2jv7E_!!6000000007178-2-tps-3683-2272.png" />
    </a>
  </Section>
)
```

```tsx
/**
 * inline: true
 */
import React from 'react'
import { Section } from './site/Section'
import './site/styles.less'

export default () => (
  <Section
    title="纯净内核，更易扩展"
    style={{ marginTop: 140 }}
    titleStyle={{ paddingBottom: 100 }}
  >
    <a href="//core.formilyjs.org" target="_blank" rel="noreferrer">
      <img src="//img.alicdn.com/imgextra/i3/O1CN01iEwHrP1NUw84xTded_!!6000000001574-55-tps-1939-1199.svg" />
    </a>
  </Section>
)
```

```tsx
/**
 * inline: true
 */
import React from 'react'
import { Section } from './site/Section'
import { Contributors } from './site/Contributors'
import './site/styles.less'

export default () => (
  <Section
    title="社区活跃，能者众多"
    style={{ marginTop: 100 }}
    titleStyle={{ paddingBottom: 140 }}
  >
    <Contributors />
  </Section>
)
```

```tsx
/**
 * inline: true
 */
import React from 'react'
import { Section } from './site/Section'
import { QrCode, QrCodeGroup } from './site/QrCode'
import './site/styles.less'

export default () => (
  <Section
    title="高质量技术交流"
    style={{ marginTop: 140 }}
    titleStyle={{ paddingBottom: 140 }}
  >
    <QrCodeGroup>
      <QrCode link="//img.alicdn.com/imgextra/i2/O1CN01n7kuJW1nrXhBw3Nud_!!6000000005143-0-tps-1284-1644.jpg" />
      <QrCode
        title="该群已满"
        link="//img.alicdn.com/imgextra/i3/O1CN018neaqX1HvbT6SUIbp_!!6000000000820-0-tps-1284-1644.jpg"
      />
    </QrCodeGroup>
  </Section>
)
```
