<p align="center">
<img src="https://img.alicdn.com/tfs/TB1VsOcRbrpK1RjSZTEXXcWAVXa-1400-689.png">
<a href="https://www.npmjs.com/package/@uform/core"><img src="https://img.shields.io/npm/v/@uform/core.svg"></a>
<a href="https://www.npmjs.com/package/@uform/react"><img src="https://img.shields.io/npm/v/@uform/react.svg"></a>
<a href="https://www.npmjs.com/package/@uform/next"><img src="https://img.shields.io/npm/v/@uform/next.svg"></a>
<a href="https://www.npmjs.com/package/@uform/antd"><img src="https://img.shields.io/npm/v/@uform/antd.svg"></a>
<a href="https://travis-ci.com/alibaba/uform"><img src="https://travis-ci.com/alibaba/uform.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
</p>

面向复杂场景的中后台表单解决方案，UForm 谐音 Your Form , 代表，这才是你想要的 Form 解决方案

---

## 特性

- 🚀 高性能，字段分布式渲染，大大减轻 React 渲染压力
- 🧩 支持 Ant Design/Fusion Next 组件体系
- 🎨 JSX 标签化写法/JSON Schema 数据驱动方案无缝迁移过渡
- 🏅 副作用逻辑独立管理，涵盖各种复杂联动校验逻辑
- 🌯 支持各种表单复杂布局方案

![](https://img.alicdn.com/tfs/TB1qL9dRXzqK1RjSZFvXXcB7VXa-2430-552.gif)

## 安装

```bash
npm install --save @uform/antd
或者
npm install --save @uform/next
```



## 文档地址

https://alibaba.github.io/uform

## 快速开始

```jsx
import React from 'react'
import SchemaForm, { Field, FormButtonGroup, Submit, Reset } from '@uform/next'
import '@alifd/next/dist/next.css'

export default () => (
  <SchemaForm
    defaultValue={{ aa: '123' }}
    onSubmit={values => console.log(values)}
  >
    <Field
      type="string"
      enum={['1', '2', '3', '4']}
      required
      title="Radio"
      x-component="radio"
      name="radio"
    />
    <Field
      type="string"
      enum={['1', '2', '3', '4']}
      required
      title="Select"
      name="select"
    />
    <Field
      type="string"
      enum={['1', '2', '3', '4']}
      required
      x-component="checkbox"
      title="Checkbox"
      name="checkbox"
    />
    <Field type="number" title="数字选择" name="number" />
    <Field type="boolean" title="开关选择" name="boolean" />
    <Field type="date" title="日期选择" name="date" />
    <Field type="daterange" title="日期范围" name="daterange" />
    <Field type="year" title="年份" name="year" />
    <Field type="time" title="时间" name="time" />
    <Field
      type="array"
      title="卡片上传文件"
      name="upload"
      x-component="upload"
      x-props={{ listType: 'card' }}
    />
    <Field
      type="array"
      title="拖拽上传文件"
      name="upload2"
      x-component="upload"
      x-props={{ listType: 'dragger' }}
    />
    <Field
      type="array"
      title="普通上传文件"
      name="upload3"
      x-component="upload"
      x-props={{ listType: 'text' }}
    />
    <Field
      type="number"
      title="范围选择"
      name="range"
      x-component="range"
      x-props={{ min: 0, max: 1024, marks: [0, 1024] }}
    />
    <Field type="array" x-component="transfer" title="穿梭框" name="transfer" />
    <Field type="number" x-component="rating" title="等级" name="rating" />
    <FormButtonGroup offset={7}>
      <Submit />
      <Reset />
    </FormButtonGroup>
  </SchemaForm>
)
```

### LICENSE

UForm is open source software licensed as
[MIT.](https://github.com/alibaba/uform/blob/master/LICENSE.md)

## Contributors

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/4060976?v=4" width="100px;" alt="Janry"/><br /><sub><b>Janry</b></sub>](https://github.com/janryWang)<br />[🎨](#design-janryWang "Design") | [<img src="https://avatars1.githubusercontent.com/u/3118988?v=4" width="100px;" alt="SkyCai"/><br /><sub><b>SkyCai</b></sub>](http://cnt1992.github.io)<br />[🎨](#design-cnt1992 "Design") |
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
