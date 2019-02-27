<p align="center">
<img src="https://img.alicdn.com/tfs/TB1Tw1_ImzqK1RjSZFLXXcn2XXa-1400-797.png">
<a href="https://www.npmjs.com/package/@uform/react"><img src="https://img.shields.io/npm/v/@uform/react.svg"></a>
<a href="https://www.npmjs.com/package/@uform/antd"><img src="https://img.shields.io/npm/v/@uform/antd.svg"></a>
<a href="https://www.npmjs.com/package/@uform/next"><img src="https://img.shields.io/npm/v/@uform/next.svg"></a>
<a href="https://travis-ci.com/alibaba/uform"><img src="https://travis-ci.com/alibaba/uform.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
</p>

***

> 面向复杂场景的中后台表单解决方案
>
> UForm 谐音 Your Form , 代表，这才是你想要的Form解决方案
> 
> 🚧 文档&单测持续完善中，目前暂时不能投入生产环境使用！

## 特性

- 🚀 高性能，表单字段按需渲染，大大减轻React渲染压力
- 🧩 支持Ant Design/Fusion Next组件体系
- 🎨 JSX标签化写法/JSON Schema数据驱动方案无缝迁移过渡
- 🏅 副作用逻辑独立管理，涵盖各种复杂联动校验逻辑

- 🌯 支持各种表单复杂布局方案



## 安装

```bash
npm install --save @uform/antd
或者
npm install --save @uform/next
```



## 快速开始

```jsx
import React from 'react'
import SchemaForm,{
  Field,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'

ReactDOM.render(
   <SchemaForm defaultValue={{aa:'123'} onSubmit={values=>console.log(values)}>
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
,mountNode)
```


### LICENSE

UForm is open source software licensed as [MIT.](https://github.com/alibaba/uform/blob/master/LICENSE.md)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/4060976?v=4" width="100px;" alt="Janry"/><br /><sub><b>Janry</b></sub>](https://github.com/janryWang)<br />[🎨](#design-janryWang "Design") | [<img src="https://avatars1.githubusercontent.com/u/3118988?v=4" width="100px;" alt="SkyCai"/><br /><sub><b>SkyCai</b></sub>](http://cnt1992.github.io)<br />[🎨](#design-cnt1992 "Design") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
