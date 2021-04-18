# 快速开始

本篇文章，我们会力求让大家 10 分钟之内了解到 Formily 的全貌，同时也能引导大家如何看文档，如何快速实战，怎么以一个最佳实践去开发页面。

在这里，我们直接以一个实际项目作为例子，也就是我们常说的 CRUD 页面。

该项目总共分成以下几个部分，我会一步步的讲解：

1. 环境准备
2. 热身案例
3. 开发查询列表页
4. 开发创建记录页
5. 开发编辑记录页
6. 开发查看详情页
7. 实现一些联动逻辑
8. 实现一些表单布局
9. 实现一些校验规则

## 环境准备

**安装**

> 如果你使用的是 Ant Design

```bash
npm install --save antd @formily/antd@1.x @formily/antd-components
```

@formily/antd 主要是作为 Form 核心库，@formily/antd-components 主要作为 Form 的 antd 扩展组件库，我们可以不使用@formily/antd-components，它只是作为扩展包

> 如果你使用的是 Fusion Next

```bash
npm install --save next @formily/next@1.x @formily/next-components
```

@formily/next 主要是作为 Form 核心库，@formily/next-components 主要作为 Form 的 fusion 扩展组件库，我们可以不使用@formily/next-components，它只是作为扩展包

**引入**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components' // 或者@formily/next-components
```

这里需要注意几点：

- 引入 SchemaForm，用于 Schema 渲染表单
- 引入 SchemaMarkupField，用于渲染 Schema 节点
- 引入 FormButtonGroup，用于处理表单按钮组布局
- 引入 Submit，用于处理按钮点击自动触发提交操作
- 引入 Reset，用于处理按钮点击自动触发重置操作
- 从@formily/antd-components 中引入 Input 组件(按需引入)，该 Input 组件属于扩展后的 Input 组件，它内部实现了一些额外状态的映射
- 想要看完整的扩展组件列表，可以跳转至 API 列表中详细查看`@formily/antd-components`的具体 API

## 热身案例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input } from 'antd'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <SchemaForm
      components={{ Input }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <Field type="string" name="name" title="Name" x-component="Input" />
      <FormButtonGroup>
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  )
}

/*
 JSON Schema写法
const App = () => {
  const { form, table } = useFormTableQuery(service)
  return (
    <SchemaForm
      components={{ Input }}
      schema={{
        type:"object",
        properties:{
          name:{
            type:"string",
            title:"Name",
            x-component":"Input"
          }
        }
      }}
      onSubmit={(values)=>{
        console.log(values)
      }}
    >
      <FormButtonGroup>
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  )
}
*/

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- SchemaForm 的 components 属性可以传入任意一个只要满足 value/onChange 属性的组件
- Field 组件代表每个 json schema 的一个原子描述节点，它的属性与 json schema 完全等价。
- Field 指定 x-component 的名称会和 SchemaForm 属性传入的 components 映射起来。

> 注意：以上代码是以 JSX Schema 形式来写的，后面我们的案例也都会以 JSX Schema 形式来写，如果想要了解对应的 JSON Schema 写法，每个案例下方都会有一个 Print Schema 的按钮，点击可以查看与其完全等价的 JSON Schema 写法

## 开发查询列表页

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
import { Input } from '@formily/antd-components' // 或者@formily/next-components
import { fetch } from 'mfetch'
import { Table } from 'antd'
import 'antd/dist/antd.css'

const service = ({ values, pagination, sorter = {}, filters = {} }) => {
  return fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: pagination.pageSize,
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

## 开发创建记录页

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
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
  TimeRangePicker: TimePicker.RangePicker,
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
        title="Select"
        name="select"
        x-component="Select"
      />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
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
      <Field
        type="string"
        title="时间范围"
        name="timerange"
        x-component="TimeRangePicker"
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

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 使用了按需依赖的方式来载入 Schema 扩展组件，@formily/antd-components 中的扩展组件全部都是封装后的组件，只能给 Formily 的 SchemaForm 和 FormItem 组件消费
- 使用 Printer 组件，它内部会拦截 actions.getFormSchema，点击 Print JSON Schema 可以查看 JSX Schema 等价转换的 JSON Schema 形式
- 如果不想每次都手动注册扩展组件，可以参考以下写法

```tsx
import { setup } from '@formily/antd-components' //或者@formily/next-components

setup() //只需调用一次即可自动装载扩展组件，想要了解详细的x-component映射枚举表可以查看详细API列表
```

## 开发编辑记录页

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
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
  TimeRangePicker: TimePicker.RangePicker,
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
        timerange: ['9:00:00', '18:00:00'],
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
          title="Select"
          name="select"
          x-component="Select"
        />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
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
        <Field
          type="string"
          title="时间范围"
          name="timerange"
          x-component="TimeRangePicker"
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

- 借助 initialValues 属性处理异步默认值
- initialValues 只能处理某个字段从无值到有值的填充，从第一次到第 N 次渲染，如果 N-1 次渲染，A 字段已经被填充值，那么第 N 次渲染，即便值变了，也不会发生改变，如果要实现全受控渲染模式，可以给 SchemaForm 传递 value 属性
- 使用 Printer 组件，它内部会拦截 actions.getFormSchema，点击 Print JSON Schema 可以查看 JSX Schema 等价转换的 JSON Schema 形式

## 开发查看详情页

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
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
  TimeRangePicker: TimePicker.RangePicker,
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
        year: '2023',
        time: '22:29:53',
        timerange: ['9:00:00', '18:00:00'],
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
          title="Select"
          name="select"
          x-component="Select"
        />
        <Field
          type="string"
          enum={['1', '2', '3', '4']}
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
        <Field
          type="string"
          title="时间范围"
          name="timerange"
          x-component="TimeRangePicker"
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

- 与编辑页相似，需要用 initialValues 来传递异步默认值
- 借助 editable 属性可以全局控制所有表单项变为阅读态，目前只针对简单数据类型的组件支持阅读，其他组件会以 disabled 状态显示
- 使用 Printer 组件，它内部会拦截 actions.getFormSchema，点击 Print JSON Schema 可以查看 JSX Schema 等价转换的 JSON Schema 形式

## 实现一些联动逻辑

通常，我们的联动逻辑可以分为几类，我们可以是：

- 模式分类
  - 一对多联动(A-->B,A-->C,A-->D)
  - 多对一联动(B-->A,C-->A,D-->A)
  - 链式联动(A-->B,B-->C,C-->D)
  - 循环联动(A-->B,B-->C,C-->A)
- 控制分类
  - 控制显示隐藏
  - 控制值
  - 控制校验信息或校验规则
  - 控制组件属性(只读/禁用/文案/加载态等等)
- 结构分类
  - 对象结构的字段间联动
  - 自增数组结构的字段间联动
- 其他联动
  - 联动发生前存在异步取数
  - 表单之外的组件与表单内字段的联动

梳理了这么多，联动的确非常复杂，但是，Formily 抽象了一个非常优雅的处理联动问题的解决方案，上面所列举的所有问题都可以使用同一种范式来实现，我们可以用一句数学表达式来描述所有联动关系：

```
setFieldState(
  Subscribe(
    FormLifeCycle,
    Selector(Path)
  ),
  TargetState
)
```

这句表达式描述了

- 任何联动，都需要一个路径来描述具体字段
- 通过一个选择器来选择字段，同时任何联动都是从表单生命周期而发起
- 联动的最终操作是操作具体字段的状态，可以是值，可以是它的显示隐藏，也可以是具体组件属性等等。

掌握了以上核心概念，我们可以看看一个实际例子

```js
onFieldValueChange$('aa').subscribe(fieldState => {
  setFieldState('bb', state => {
    state.visible = fieldState.value === 123
  })
})
```

- 这是一段伪代码，但是它也是实际 Formily 写联动逻辑的代码，
- 以上代码首先是监听了表单的生命周期，指定监听 aa 字段的变化，监听函数会返回一个 Rxjs 的 Observable 对象
- 然后根据变化的值去控制 bb 字段的状态，例子中是控制了 bb 的显示隐藏状态，
- 当 aa 的值为 123 时会控制 bb 字段的显示，否则隐藏

下面我们看看实际例子：

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  FormEffectHooks,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import Printer from '@formily/printer'
import { merge } from 'rxjs'
import { Input, Select } from '@formily/antd-components' // 或者@formily/next-components
import 'antd/dist/antd.css'

const components = {
  Input,
  Select
}

const { onFieldValueChange$, onFieldInit$ } = FormEffectHooks

const App = () => {
  return (
    <Printer>
      <SchemaForm
        labelCol={5}
        wrapperCol={14}
        components={components}
        effects={({ setFieldState }) => {
          merge(onFieldValueChange$('aa'), onFieldInit$('aa')).subscribe(
            fieldState => {
              setFieldState('bb', state => {
                state.visible = fieldState.value === 123
              })
            }
          )
        }}
      >
        <Field
          type="string"
          title="AA"
          enum={[
            { label: '123', value: 123 },
            { label: '321', value: 321 }
          ]}
          name="aa"
          x-component="Select"
        />
        <Field type="string" title="BB" name="bb" x-component="Input" />
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

- 在 SchemaForm 组件属性上传入 effects 函数，所有联动操作统一在 effects 中实现
- FormEffectHooks 中包含表单所有生命周期钩子，调用生命周期钩子会返回 Rxjs 的 Observable 对象
- 借助 merge 操作符对字段初始化和字段值变化的时机进行合流，这样联动发生的时机会在初始化和值变化的时候发生
- 使用 Printer 组件，它内部会拦截 actions.getFormSchema，点击 Print JSON Schema 可以查看 JSX Schema 等价转换的 JSON Schema 形式

> 引导：想要了解更多联动的骚操作？可以看看后面的联动详细讲解文章。
>
> 答疑：为什么用 Rxjs？因为 Rxjs 在处理异步问题上，是目前最优秀的解决方案，越是复杂的联动，使用 Rxjs 越能发挥它的最大价值。

## 实现一些表单布局

通常，我们的表单布局主要分为：

- 聚合型布局
  - 字段集聚合
    - 卡片布局
    - 内联布局
  - 网格布局
  - 自增卡片类布局
  - 自增列表类布局
  - 特殊组件布局

在 Formily 中，这些布局基本上都能覆盖到，即便是极端复杂的布局场景，也是可以在自定义组件中实现，下面，我们主要介绍如何使用已有的布局组件。

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks
} from '@formily/antd'
import { Button } from 'antd'
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
  Rating,
  FormItemGrid,
  FormTextBox,
  FormCard,
  FormBlock,
  FormLayout
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

const App = () => {
  const [state, setState] = useState({ editable: true })
  return (
    <Printer>
      <SchemaForm
        editable={state.editable}
        labelCol={8}
        wrapperCol={6}
        components={components}
        effects={({ setFieldState }) => {
          FormEffectHooks.onFieldValueChange$('bbb').subscribe(({ value }) => {
            setFieldState('detailCard', state => {
              state.visible = value
            })
          })
        }}
      >
        <FormCard title="基本信息">
          <Field name="aaa" type="string" title="字段1" x-component="Input" />
          <Field
            name="bbb"
            type="number"
            title="控制详细信息显示隐藏"
            enum={[
              { value: true, label: '显示' },
              { value: false, label: '隐藏' }
            ]}
            default={true}
            x-component="Select"
          />
          <Field
            name="ccc"
            type="date"
            title="字段3"
            x-component="DatePicker"
          />
          ​
        </FormCard>
        <FormCard title="详细信息" name="detailCard">
          <FormLayout labelCol={8} wrapperCol={12}>
            <FormItemGrid title="字段3" gutter={10} cols={[6, 11]}>
              ​<Field name="ddd" type="number" x-component="NumberPicker" />
              ​<Field name="eee" type="date" x-component="DatePicker" />​
            </FormItemGrid>
            <Field type="object" name="mmm" title="对象字段">
              <FormItemGrid gutter={10} cols={[6, 11]}>
                <Field
                  name="ddd1"
                  default={123}
                  type="number"
                  x-component="NumberPicker"
                />
                <Field
                  name="[startDate,endDate]"
                  type="daterange"
                  x-component="DateRangePicker"
                />​
              </FormItemGrid>
            </Field>
          </FormLayout>
          <FormLayout labelCol={8} wrapperCol={16}>
            <FormTextBox
              title="文本串联"
              text="订%s元/票 退%s元/票 改%s元/票"
              gutter={8}
            >
              <Field
                type="string"
                default={10}
                required
                name="aa1"
                x-props={{ style: { width: 80 } }}
                description="简单描述"
                x-component="Input"
              />
              <Field
                type="number"
                default={20}
                required
                name="aa2"
                description="简单描述"
                x-component="NumberPicker"
              />
              <Field
                type="number"
                default={30}
                required
                name="aa3"
                description="简单描述"
                x-component="NumberPicker"
              />
            </FormTextBox>
          </FormLayout>
          <Field name="aas" type="string" title="字段4" x-component="Input" />​
          <FormBlock title="区块">
            <Field
              name="ddd2"
              type="string"
              title="字段5"
              x-component="Input"
            />
            ​
            <Field
              name="eee2"
              type="string"
              title="字段6"
              x-component="Input"
            />
            ​
          </FormBlock>
        </FormCard>​<FormButtonGroup offset={8} sticky>
          ​<Submit>提交</Submit>​
          <Button
            type="primary"
            onClick={() => setState({ editable: !state.editable })}
          >
            {state.editable ? '详情' : '编辑'}
          </Button>
          <Reset>重置</Reset>​
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- FormCard/FormBlock/FormLayout/FormTextBox 都是属于布局扩展组件，这类布局组件只能在 Schema 场景中使用，如果是纯源码开发，则需要自行实现
- 每个布局组件都可以在 JSON Schema 中表示，具体可以点击 Print JSON Schema 按钮查看等价的布局组件使用方式。
- 用户可以借助 createVirtaulBox 自己创建布局组件，想看详细 API，可跳转至 API 手册中查看
- 每个布局组件都有一个 name 属性，可以用于联动控制显示隐藏

> 注意：Formily 布局组件不是普通的 UI 组件，它只能在 SchemaForm 中使用，放到其他地方是不能独立使用的。

## 实现一些校验规则

通常，我们的校验场景可以分为几类，我们可以是：

- 静态校验
  - 必填校验
  - 格式校验
  - 提示型校验
  - 其他规则性校验
- 动态校验
  - 联动校验
  - 异步校验
- 定制校验
  - 定制文案
  - 定制校验模板

下面我们直接看实例，这个实例相对会复杂一些，包含了以上提到了所有内容，需要您慢慢消化。

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  FormEffectHooks,
  FormPath,
  Submit,
  Reset,
  setValidationLocale
} from '@formily/antd' // 或者 @formily/next
import Printer from '@formily/printer'
import { Input, Select, NumberPicker } from '@formily/antd-components' // 或者@formily/next-components
import 'antd/dist/antd.css'

const components = {
  Input,
  Select,
  NumberPicker
}

const { onFieldValueChange$, onFieldInit$ } = FormEffectHooks

setValidationLocale({
  zh: {
    url: 'URL格式不合法，注意：必须要带上协议，可以直接以//开头'
  }
})

const placehodlers = {
  url: 'https://test.alibaba.com',
  email: 'test@alibaba-inc.com',
  qq: '123',
  date: '2012-12-12',
  idcard: '433533199312058746',
  zip: '333333',
  money: '$12.33',
  ipv6: '2001:0db8:86a3:08d3:1319:8a2e:0370:7344',
  ipv4: '168.1.1.0',
  phone: '16835646823',
  zh: '我爱中国'
}

const App = () => {
  return (
    <Printer>
      <SchemaForm
        labelCol={5}
        wrapperCol={14}
        components={components}
        validateFirst
        expressionScope={{
          externalTitle: (
            <span style={{ color: 'green' }}>React Node Message</span>
          ),
          requiredReactNode: (
            <div>
              必填，<span style={{ color: 'blue' }}>富文本错误文案</span>
            </div>
          )
        }}
        effects={({ setFieldState }) => {
          onFieldValueChange$('format_type').subscribe(fieldState => {
            setFieldState('format_text', state => {
              state.value = placehodlers[fieldState.value]
              state.rules = fieldState.value
              state.props['x-component-props'] =
                state.props['x-component-props'] || {}
              state.props['x-component-props'].placeholder =
                placehodlers[fieldState.value]
            })
          })
        }}
      >
        <Field
          type="string"
          required
          title="Required"
          name="required"
          x-component="Input"
        />
        <Field
          type="string"
          required
          title="Format Type"
          name="format_type"
          enum={[
            'url',
            'email',
            'ipv6',
            'ipv4',
            'idcard',
            'taodomain',
            'qq',
            'phone',
            'money',
            'zh',
            'date',
            'zip'
          ]}
          x-component="Select"
        />
        <Field
          type="string"
          required
          title="Format Text"
          name="format_text"
          x-component="Input"
        />
        <Field
          type="string"
          required
          title="Other Rules"
          x-rules={[
            {
              whitespace: true,
              min: 5,
              max: 10,
              validator(value) {
                return value.indexOf('asd') > -1 ? '文本里不能包含asd' : ''
              }
            }
          ]}
          name="custom_rules"
          x-component="Input"
        />
        <Field
          type="string"
          required
          title="Async Validate"
          x-rules={value => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(value !== '57350' ? '验证码验证失败' : '')
              }, 1000)
            })
          }}
          name="remote_code"
          x-props={{
            hasFeedback: true,
            triggerType: 'onBlur'
          }}
          x-component="Input"
          x-component-props={{
            placeholder: 'Please input remote code:57350'
          }}
        />
        <Field
          type="number"
          required
          title="Threshold Validate"
          x-rules={value => {
            if (value > 0 && value < 100) {
              return {
                type: 'warning',
                message: '第一阶梯'
              }
            } else if ((value >= 100) && (value < 500)) {
              return {
                type: 'warning',
                message: '第二阶梯'
              }
            } else if ((value >= 500) && (value < 1000)) {
              return {
                type: 'warning',
                message: '第三阶梯'
              }
            } else if (value >= 1000) {
              return {
                type: 'warning',
                message: '第四阶梯'
              }
            } else {
              return ''
            }
          }}
          name="threshold"
          x-component="NumberPicker"
        />
        <Field
          type="string"
          title="Custom Message"
          x-rules={{
            required: true,
            extra: '校验模板注入变量',
            message: 'Required {{extra}}'
          }}
          name="custom_message"
          x-component="Input"
        />
        <Field
          type="string"
          title="{{externalTitle}}"
          x-rules={[
            {
              required: true,
              message: '{{requiredReactNode}}'
            }
          ]}
          name="react_node_message"
          x-component="Input"
        />
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

- Schema 属性直接指定 required 可以配置必填校验
- setFieldState 中设置 rules 可以修改字段校验规则
- x-rules 的传参形式，既支持直接传函数，也支持指定格式类型，同样也支持传对象或者对象数组形式
- whitespace 规则校验字段是否全空白字符串
- min 规则校验字段最小长度
- max 规则校验字段最大长度
- 对象化传参，自定义校验器用 validator
- 自定义校验器可以返回 Promise 做异步校验，异步校验需要考虑指定`x-props.triggerType="onBlur"`，防止请求次数过多
- 阈值设置形态，通常采用 warning 式校验，需要在自定义校验器的返回值中指定`type:"warning"`
- Schema 任何一个属性都支持`{{}}`表达式，该表达式要求任何一个字段值必须是字符串，同时字符串必须以`{{`开始，`}}`结束
- 通过 SchemaForm 的 expressionScope 属性，从顶层传递上下文，在 Schema 属性表达式中可以读取
- 使用 Printer 组件，它内部会拦截 actions.getFormSchema，点击 Print JSON Schema 可以查看 JSX Schema 等价转换的 JSON Schema 形式
