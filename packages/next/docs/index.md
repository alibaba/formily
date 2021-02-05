---
title: Formily - 阿里巴巴统一前端表单解决方案
order: 10
hero:
  title: FORMILY NEXT
  desc: 基于Alibaba Fusion封装的优雅且易用的Formily2.x组件体系
  actions:
    - text: 主站文档
      link: //formilyjs.org
    - text: 组件文档
      link: /components
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 更易用
    desc: 开箱即用，案例丰富
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: 更高效
    desc: 傻瓜写法，超高性能
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01GSZPrz1ZGWzfHPnA8_!!6000000003167-55-tps-800-800.svg
    title: 更专业
    desc: 完备，灵活，优雅
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
---

## 安装

```bash
$ npm install --save @alifd/next mobx mobx-react-lite moment
$ npm install --save @formily/next @formily/react

```

## 快速开始

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { NumberPicker, FormItem, Space } from '@formily/next'
import { createForm, FormProvider, FormConsumer, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Space>
      <Field
        name="price"
        title="价格"
        initialValue={5.2}
        decorator={[FormItem]}
        component={[
          NumberPicker,
          {
            placeholder: '请输入',
            style: {
              width: 100,
            },
          },
        ]}
      />
      <FormItem>×</FormItem>
      <Field
        name="count"
        title="数量"
        initialValue={100}
        decorator={[FormItem]}
        component={[
          NumberPicker,
          {
            placeholder: '请输入',
            style: {
              width: 100,
            },
          },
        ]}
      />
      <FormConsumer>
        {(form) => (
          <FormItem>={` ${form.values.price * form.values.count} 元`}</FormItem>
        )}
      </FormConsumer>
    </Space>
  </FormProvider>
)
```
