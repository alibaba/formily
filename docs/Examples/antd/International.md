# 国际化

> 在 UForm 中配置国际化语言，其实只需要关心 validator 的国际化配置即可(setValidationLanguage)，对于具体
> 组件库的国际化配置，就走默认的组件国际化配置模式即可

### 示例 DEMO

> 中文

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, Field, FormButtonGroup, Submit, Reset,setValidationLanguage } from '@uform/antd'
import { Button,LocaleProvider } from 'antd'
import Printer from '@uform/printer'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'antd/dist/antd.css'

/**
 * 由于文档展示限制，后面的英文案例语言配置会覆盖该配置，如果要看实际效果，请点击案例右下角的codesandbox链接查看
 **/
setValidationLanguage('zh_CN') 

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Printer>
      <SchemaForm labelCol={7} wrapperCol={12}>
        <Field
          type="radio"
          enum={['1', '2', '3', '4']}
          title="Radio"
          name="radio"
        />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
          required
          x-props={{ style: { maxWidth: 300 } }}
          title="Select"
          name="select"
        />
        <Field
          type="checkbox"
          enum={['1', '2', '3', '4']}
          required
          title="Checkbox"
          name="checkbox"
        />
        <Field type="number" title="数字选择" name="number" />
        <Field type="boolean" title="开关选择" name="boolean" />
        <Field type="date" title="日期选择" name="date" />
        <Field
          type="daterange"
          title="日期范围"
          default={['2018-12-19', '2018-12-19']}
          name="daterange"
        />
        <Field type="year" title="年份" name="year" />
        <Field type="time" title="时间" name="time" />
        <Field
          type="upload"
          title="卡片上传文件"
          name="upload"
          x-props={{
            listType: 'card'
          }}
        />
        <Field
          type="upload"
          title="拖拽上传文件"
          name="upload2"
          x-props={{ listType: 'dragger' }}
        />
        <Field
          type="upload"
          title="普通上传文件"
          name="upload3"
          x-props={{ listType: 'text' }}
        />
        <Field
          type="range"
          title="范围选择"
          name="range"
          x-props={{ min: 0, max: 1024, marks: [0, 1024] }}
        />
        <Field type="transfer" title="穿梭框" name="transfer" />
        <Field type="rating" title="等级" name="rating" />
        <FormButtonGroup offset={7} sticky>
          <Submit />
          <Reset/>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  </LocaleProvider>,
  document.getElementById('root')
)
```

> 英文

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, Field, FormButtonGroup, Submit, Reset,setValidationLanguage } from '@uform/antd'
import { Button,LocaleProvider } from 'antd'
import Printer from '@uform/printer'
import enUS from 'antd/lib/locale-provider/en_US'
import 'antd/dist/antd.css'

setValidationLanguage('en_US')

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Printer>
      <SchemaForm labelCol={7} wrapperCol={12}>
        <Field
          type="radio"
          enum={['1', '2', '3', '4']}
          title="Radio"
          name="radio"
        />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
          required
          x-props={{ style: { maxWidth: 300 } }}
          title="Select"
          name="select"
        />
        <Field
          type="checkbox"
          enum={['1', '2', '3', '4']}
          required
          title="Checkbox"
          name="checkbox"
        />
        <Field type="number" title="数字选择" name="number" />
        <Field type="boolean" title="开关选择" name="boolean" />
        <Field type="date" title="日期选择" name="date" />
        <Field
          type="daterange"
          title="日期范围"
          default={['2018-12-19', '2018-12-19']}
          name="daterange"
        />
        <Field type="year" title="年份" name="year" />
        <Field type="time" title="时间" name="time" />
        <Field
          type="upload"
          title="卡片上传文件"
          name="upload"
          x-props={{
            listType: 'card'
          }}
        />
        <Field
          type="upload"
          title="拖拽上传文件"
          name="upload2"
          x-props={{ listType: 'dragger' }}
        />
        <Field
          type="upload"
          title="普通上传文件"
          name="upload3"
          x-props={{ listType: 'text' }}
        />
        <Field
          type="range"
          title="范围选择"
          name="range"
          x-props={{ min: 0, max: 1024, marks: [0, 1024] }}
        />
        <Field type="transfer" title="穿梭框" name="transfer" />
        <Field type="rating" title="等级" name="rating" />
        <FormButtonGroup offset={7} sticky>
          <Submit />
          <Reset />
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  </LocaleProvider>,
  document.getElementById('root')
)
```

