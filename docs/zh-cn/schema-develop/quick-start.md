# 快速开始

本篇文章，我们会力求让大家 10 分钟之内了解到 Formily 的全貌，同时也能引导大家如何看文档，如何快速实战，怎么以一个最佳实践去开发页面。

在这里，我们直接以一个实际项目作为例子，也就是我们常说的 CRUD 页面。

该项目总共分成以下几个部分，我会一步步的讲解：

1. 环境准备
2. 开发查询列表页
3. 开发创建记录页
4. 开发编辑记录页
5. 开发查看详情页
6. 实现一些联动逻辑
7. 定制一些校验规则
8. 完善跳转链接

### 环境准备

**安装**

> 如果你使用的是 Ant Design

```bash
npm install --save antd @formily/antd @formily/antd-components
```

@formily/antd 主要是作为 Form 核心库，@formily/antd-components 主要作为 Form 的 antd 扩展组件库

> 如果你使用的是 Fusion Next

```bash
npm install --save next @formily/next @formily/next-components
```

@formily/next 主要是作为 Form 核心库，@formily/next-components 主要作为 Form 的 fusion 扩展组件库

**引入**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm } from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components' // 或者@formily/next-components
```

这里需要注意几点：

- 引入 SchemaForm，用于 Schema 渲染表单
- 从@formily/antd-components 中引入 Input 组件(按需引入)，该 Input 组件属于扩展后的 Input 组件，它内部实现了一些额外状态的映射
- 想要看完整的扩展组件列表，可以跳转至 API 列表中详细查看`@formily/antd-components`的具体 API

### 开发查询列表页

```jsx
import React from 'react'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components' // 或者@formily/next-components
import { fetch } from 'mfetch'
import { Table } from 'antd'
import 'antd/dist/antd.css'

const service = ({ values, pagination, sorter = {}, filters = {} }) => {
  return fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: 10,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      ...values,
      ...filters
    }
  })
    .then(res => res.json())
    .then(({ results, info }) => {
      return {
        dataSource: results,
        ...pagination,
        total: 200
      }
    })
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]

const App = () => {
  const { form, table } = useFormTableQuery(service)
  return (
    <>
      <SchemaForm
        {...form}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field type="string" name="name" title="Name" x-component="Input" />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <Table
        {...table}
        columns={columns}
        rowKey={record => record.login.uuid}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 使用 React Hook useFormTableQuery 可以快速开发一个查询列表页
- 调用 useFormTableQuery 会返回 Table 和 Form 属性，只需简单传递给对应组件即可
- useFormTableQuery 的传入参数是一个返回 Promise 对象的函数，该函数约定了它的出入参形式，如果接口请求出入参不符合这个约定，需要手动转换。

### 开发创建记录页面

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import Printer from '@formily/printer'
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating
} from '@formily/antd-components' // 或者@formily/next-components
import 'antd/dist/antd.css'

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  NumberPicker,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  Upload,
  Range,
  Rating,
  Transfer
}

const App = () => (
  <Printer>
    <SchemaForm labelCol={5} wrapperCol={14} components={components}>
      <Field type="string" title="String" name="string" x-component="Input" />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
        title="Radio"
        name="radio"
        x-component="Radio"
      />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
        required
        title="Select"
        name="select"
        x-component="Select"
      />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
        required
        title="Checkbox"
        name="checkbox"
        x-component="Checkbox"
      />
      <Field
        type="string"
        title="TextArea"
        name="textarea"
        x-component="TextArea"
      />
      <Field
        type="number"
        title="数字选择"
        name="number"
        x-component="NumberPicker"
      />
      <Field
        type="boolean"
        title="开关选择"
        name="boolean"
        x-component="Switch"
      />
      <Field
        type="string"
        title="日期选择"
        name="date"
        x-component="DatePicker"
      />
      <Field
        type="array<date>"
        title="日期范围"
        default={['2018-12-19', '2018-12-19']}
        name="daterange"
        x-component="DateRangePicker"
      />
      <Field type="string" title="年份" name="year" x-component="YearPicker" />
      <Field
        type="string"
        title="月份"
        name="month"
        x-component="MonthPicker"
      />
      <Field type="string" title="时间" name="time" x-component="TimePicker" />
      <Field type="string" title="周" name="week" x-component="WeekPicker" />
      <Field
        type="array"
        title="卡片上传文件"
        name="upload"
        x-component-props={{ listType: 'card' }}
        x-component="Upload"
      />
      <Field
        type="array"
        title="拖拽上传文件"
        name="upload2"
        x-component-props={{ listType: 'dragger' }}
        x-component="Upload"
      />
      <Field
        type="array"
        title="普通上传文件"
        name="upload3"
        x-component-props={{ listType: 'text' }}
        x-component="Upload"
      />
      <Field
        type="number"
        title="范围选择"
        name="range"
        x-component-props={{ min: 0, max: 1024, marks: [0, 1024] }}
        x-component="Range"
      />
      <Field
        type="number"
        enum={[
          { key: 1, title: '选项1' },
          { key: 2, title: '选项2' }
        ]}
        x-component-props={{ render: item => item.title }}
        title="穿梭框"
        name="transfer"
        x-component="Transfer"
      />
      <Field type="number" title="等级" name="rating" x-component="Rating" />
      <FormButtonGroup offset={5}>
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 使用了按需依赖的方式来载入 Schema 扩展组件，@formily/antd-components 中的扩展组件全部都是封装后的组件，只能给 Formily 的 SchemaForm 和 FormItem 组件消费
- 使用了 JSX Schema 的形式来开发表单，点击 Print JSON Schema 可以查看对应的 JSON Schema 形式
- 如果不想每次都手动注册扩展组件，可以参考以下写法

```tsx
import { setup } from '@formily/antd-components' //或者@formily/next-components

setup() //只需调用一次即可自动装载扩展组件，想要了解详细的x-component映射枚举表可以查看详细API列表
```

### 开发编辑记录页

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import Printer from '@formily/printer'
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating
} from '@formily/antd-components' // 或者@formily/next-components
import 'antd/dist/antd.css'

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  NumberPicker,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  Upload,
  Range,
  Rating,
  Transfer
}

const getInitialValues = () => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove({
        daterange: ['2018-12-19', '2018-12-19'],
        string: 'this is string',
        radio: '2',
        checkbox: ['2', '3', '4'],
        textarea:
          'this is long text.this is long text.this is long text.this is long text.this is long text.',
        rating: 3,
        transfer: [1, 2],
        range: 384,
        date: '2020-02-20',
        month: '2020-08',
        time: '22:29:53',
        week: '2020-9th',
        number: 123,
        boolean: true,
        select: '2'
      })
    }, 1000)
  })
}

const App = () => {
  const [initialValues, setIntialValues] = useState({})
  useEffect(() => {
    getInitialValues().then(initialValues => {
      setIntialValues(initialValues)
    })
  }, [])
  return (
    <Printer>
      <SchemaForm
        initialValues={initialValues}
        labelCol={5}
        wrapperCol={14}
        components={components}
      >
        <Field type="string" title="String" name="string" x-component="Input" />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
          title="Radio"
          name="radio"
          x-component="Radio"
        />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
          required
          title="Select"
          name="select"
          x-component="Select"
        />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
          required
          title="Checkbox"
          name="checkbox"
          x-component="Checkbox"
        />
        <Field
          type="string"
          title="TextArea"
          name="textarea"
          x-component="TextArea"
        />
        <Field
          type="number"
          title="数字选择"
          name="number"
          x-component="NumberPicker"
        />
        <Field
          type="boolean"
          title="开关选择"
          name="boolean"
          x-component="Switch"
        />
        <Field
          type="string"
          title="日期选择"
          name="date"
          x-component="DatePicker"
        />
        <Field
          type="array<date>"
          title="日期范围"
          default={['2018-12-19', '2018-12-19']}
          name="daterange"
          x-component="DateRangePicker"
        />
        <Field
          type="string"
          title="年份"
          name="year"
          x-component="YearPicker"
        />
        <Field
          type="string"
          title="月份"
          name="month"
          x-component="MonthPicker"
        />
        <Field
          type="string"
          title="时间"
          name="time"
          x-component="TimePicker"
        />
        <Field type="string" title="周" name="week" x-component="WeekPicker" />
        <Field
          type="array"
          title="卡片上传文件"
          name="upload"
          x-component-props={{ listType: 'card' }}
          x-component="Upload"
        />
        <Field
          type="array"
          title="拖拽上传文件"
          name="upload2"
          x-component-props={{ listType: 'dragger' }}
          x-component="Upload"
        />
        <Field
          type="array"
          title="普通上传文件"
          name="upload3"
          x-component-props={{ listType: 'text' }}
          x-component="Upload"
        />
        <Field
          type="number"
          title="范围选择"
          name="range"
          x-component-props={{ min: 0, max: 1024, marks: [0, 1024] }}
          x-component="Range"
        />
        <Field
          type="number"
          enum={[
            { key: 1, title: '选项1' },
            { key: 2, title: '选项2' }
          ]}
          x-component-props={{ render: item => item.title }}
          title="穿梭框"
          name="transfer"
          x-component="Transfer"
        />
        <Field type="number" title="等级" name="rating" x-component="Rating" />
        <FormButtonGroup offset={5}>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 借助initialValues属性处理异步默认值
- initialValues只能处理某个字段从无值到有值的填充，从第一次到第N次渲染，如果N-1次渲染，A字段已经被填充值，那么第N次渲染，即便值变了，也不会发生改变，如果要实现全受控渲染模式，可以给SchemaForm传递value属性

### 开发查看详情页


```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import Printer from '@formily/printer'
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating
} from '@formily/antd-components' // 或者@formily/next-components
import 'antd/dist/antd.css'

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  NumberPicker,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  Upload,
  Range,
  Rating,
  Transfer
}

const getInitialValues = () => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove({
        daterange: ['2018-12-19', '2018-12-19'],
        string: 'this is string',
        radio: '2',
        checkbox: ['2', '3', '4'],
        textarea:
          'this is long text.this is long text.this is long text.this is long text.this is long text.',
        rating: 3,
        transfer: [1, 2],
        range: 384,
        date: '2020-02-20',
        month: '2020-08',
        time: '22:29:53',
        week: '2020-9th',
        number: 123,
        boolean: true,
        select: '2'
      })
    }, 1000)
  })
}

const App = () => {
  const [initialValues, setIntialValues] = useState({})
  useEffect(() => {
    getInitialValues().then(initialValues => {
      setIntialValues(initialValues)
    })
  }, [])
  return (
    <Printer>
      <SchemaForm
        initialValues={initialValues}
        labelCol={5}
        wrapperCol={14}
        editable={false}
        components={components}
      >
        <Field type="string" title="String" name="string" x-component="Input" />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
          title="Radio"
          name="radio"
          x-component="Radio"
        />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
          required
          title="Select"
          name="select"
          x-component="Select"
        />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
          required
          title="Checkbox"
          name="checkbox"
          x-component="Checkbox"
        />
        <Field
          type="string"
          title="TextArea"
          name="textarea"
          x-component="TextArea"
        />
        <Field
          type="number"
          title="数字选择"
          name="number"
          x-component="NumberPicker"
        />
        <Field
          type="boolean"
          title="开关选择"
          name="boolean"
          x-component="Switch"
        />
        <Field
          type="string"
          title="日期选择"
          name="date"
          x-component="DatePicker"
        />
        <Field
          type="array<date>"
          title="日期范围"
          default={['2018-12-19', '2018-12-19']}
          name="daterange"
          x-component="DateRangePicker"
        />
        <Field
          type="string"
          title="年份"
          name="year"
          x-component="YearPicker"
        />
        <Field
          type="string"
          title="月份"
          name="month"
          x-component="MonthPicker"
        />
        <Field
          type="string"
          title="时间"
          name="time"
          x-component="TimePicker"
        />
        <Field type="string" title="周" name="week" x-component="WeekPicker" />
        <Field
          type="array"
          title="卡片上传文件"
          name="upload"
          x-component-props={{ listType: 'card' }}
          x-component="Upload"
        />
        <Field
          type="array"
          title="拖拽上传文件"
          name="upload2"
          x-component-props={{ listType: 'dragger' }}
          x-component="Upload"
        />
        <Field
          type="array"
          title="普通上传文件"
          name="upload3"
          x-component-props={{ listType: 'text' }}
          x-component="Upload"
        />
        <Field
          type="number"
          title="范围选择"
          name="range"
          x-component-props={{ min: 0, max: 1024, marks: [0, 1024] }}
          x-component="Range"
        />
        <Field
          type="number"
          enum={[
            { key: 1, title: '选项1' },
            { key: 2, title: '选项2' }
          ]}
          x-component-props={{ render: item => item.title }}
          title="穿梭框"
          name="transfer"
          x-component="Transfer"
        />
        <Field type="number" title="等级" name="rating" x-component="Rating" />
        <FormButtonGroup offset={5}>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 实现一些联动逻辑

### 实现一些校验规则
