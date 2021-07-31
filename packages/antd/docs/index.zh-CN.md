---
title: Formily - 阿里巴巴统一前端表单解决方案
order: 10
hero:
  title: Formily Antd
  desc: 基于Ant Design封装的优雅且易用的Formily2.x组件体系
  actions:
    - text: 主站文档
      link: //v2.formilyjs.org
    - text: 组件文档
      link: /zh-CN/components
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
$ npm install --save antd moment
$ npm install --save @formily/core @formily/react @formily/antd

```

## 快速开始

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { NumberPicker, FormItem, Space } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field } from '@formily/react'

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
