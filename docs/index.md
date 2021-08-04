---
title: Formily - Alibaba unified front-end form solution
order: 10
hero:
  title: Alibaba Formily
  desc: Alibaba Unified Front-end Form Solution
  actions:
    - text: Introduction
      link: /guide
    - text: Quick start
      link: /guide/quick-start
features:
  - icon: https://img.alicdn.com/imgextra/i2/O1CN016i72sH1c5wh1kyy9U_!!6000000003550-55-tps-800-800.svg
    title: Easier to Use
    desc: Out of the box, rich cases
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01bHdrZJ1rEOESvXEi5_!!6000000005599-55-tps-800-800.svg
    title: More Efficient
    desc: Fool writing, ultra-high performance
  - icon: https://img.alicdn.com/imgextra/i3/O1CN01xlETZk1G0WSQT6Xii_!!6000000000560-55-tps-800-800.svg
    title: More Professional
    desc: Complete, flexible and elegant
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
    title="Fool Writing, Ultra-high Performance"
    style={{ marginTop: 40 }}
    titleStyle={{ paddingBottom: 100, fontWeight: 'bold' }}
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
    title="Form Builder,Efficient Development"
    style={{ marginTop: 140, fontWeight: 'bold' }}
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
    title="Pure Core, More Extensibility"
    style={{ marginTop: 140 }}
    titleStyle={{ paddingBottom: 100, fontWeight: 'bold' }}
  >
    <a href="//core.formilyjs.org" target="_blank" rel="noreferrer">
      <img src="//img.alicdn.com/imgextra/i3/O1CN0191vNVu1TYxFZA3KGN_!!6000000002395-55-tps-1939-1199.svg" />
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
    title="Active Community & Genius People"
    style={{ marginTop: 100 }}
    titleStyle={{ paddingBottom: 140, fontWeight: 'bold' }}
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
    title="High-Quality Community Group"
    style={{ marginTop: 140 }}
    titleStyle={{ paddingBottom: 140, fontWeight: 'bold' }}
  >
    <QrCodeGroup>
      <QrCode link="//img.alicdn.com/imgextra/i2/O1CN010HJI5V1nFWmwSvj1q_!!6000000005060-0-tps-1284-1644.jpg" />
      <QrCode
        title="Already Full"
        link="//img.alicdn.com/imgextra/i3/O1CN018neaqX1HvbT6SUIbp_!!6000000000820-0-tps-1284-1644.jpg"
      />
    </QrCodeGroup>
  </Section>
)
```
