# 理解表单路径系统

我们在生命周期章节中有讲到，Formily 主要由几部分构成：

- Form
  - FormState
  - FormLifeCycle
- Field
  - FieldState
  - VirtualFieldState
  - FieldLifeCycle

两个实体 Form 与 Field 之间的关系是 1 对多的关系，那这些关系是怎么关联起来的呢？Formily 表单路径系统，我们可以说生命周期管理心脏，状态管理是肌肉，那么，路径系统就是血管，没有血管，整个体系就根本无法运作起来。

在 Formily 中，我们抽象了一个通用的类，叫做 **FormPath** ，其实它就是[cool-path](https://github.com/janrywang/cool-path)

这个类，提供了针对数据路径一系列的解析，匹配，取值，求值的能力。可以帮助我们在表单的很多地方高效实现业务逻辑。

下面我们具体看看怎么使用 FormPath。

## 如何在 Formily 中使用 FormPath

FormPath 现在基本上都是内置在 Formily 中的，我们在 Formily 中主要有几个地方会用到 FormPath

- 监听字段变化
- 操作字段状态
- 解构字段
- 对路径做组合，转换操作

在这里我们主要讲前 3 个场景，最后一个，我们直接看 FormPath API 即可

## 匹配语法

**全通配**

```
"*"
```

**扩展匹配**

```
"aaa~" or "~" or "aaa~.bbb.cc"
```

**部分通配**

```
"a.b.*.c.*"
```

**分组通配**

```
"a.b.*(aa.bb.dd,cc,mm)"
or
"a.b.*(!aa.bb.dd,cc,mm)"
```

**嵌套分组通配**

```
"a.b.*(aa.bb.*(aa.b,c),cc,mm)"
or
"a.b.*(!aa.bb.*(aa.b,c),cc,mm)"
```

**范围通配**

```
"a.b.*[10:100]"
or
"a.b.*[10:]"
or
"a.b.*[:100]"
```

**关键字通配**

```
"a.b.[[cc.uu()sss*\\[1222\\]]]"
```

## 使用路径匹配能力监听字段变化

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  FormEffectHooks,
  createFormActions,
  FormPath,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { ArrayTable, Input } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldChange$ } = FormEffectHooks

const actions = createFormActions()

const App = () => {
  return (
    <Printer>
      <SchemaForm
        actions={actions}
        components={{ ArrayTable, Input }}
        onSubmit={values => {
          console.log(values)
        }}
        initialValues={{
          array: [
            { aa: true, bb: '123' },
            { aa: false, bb: '321' }
          ]
        }}
        effects={({ setFieldState }) => {
          onFieldChange$('array.*.aa').subscribe(({ name, value }) => {
            setFieldState(
              FormPath.transform(name, /\d/, $1 => {
                return `array.${$1}.bb`
              }),
              state => {
                console.log(name, value, state.name)
                state.visible = !!value
              }
            )
          })
        }}
      >
        <Field type="array" name="array" title="Name" x-component="ArrayTable">
          <Field type="object">
            <Field
              type="string"
              name="aa"
              title="控制相邻字段显示隐藏"
              enum={[
                { label: '显示', value: true },
                { label: '隐藏', value: false }
              ]}
              x-component="Input"
            />
            <Field type="string" name="bb" title="BB" x-component="Input" />
          </Field>
        </Field>
        <FormButtonGroup>
          <Button
            onClick={() => {
              const mutators = actions.createMutators('array')
              mutators.push({})
            }}
          >
            Add
          </Button>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 在 `onFieldValueChange$`入参中使用\*批量匹配数组第 n 项的 aa 字段
- 使用 FormPath.transform 将一个路径转换成另外一个路径，目前该例子主要用于转换成相邻路径

## 使用路径匹配能力批量操作字段状态

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  FormEffectHooks,
  createFormActions,
  FormPath,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const App = () => {
  return (
    <Printer>
      <SchemaForm
        components={{ Input }}
        onSubmit={values => {
          console.log(values)
        }}
        effects={({ setFieldState }) => {
          onFieldValueChange$('aa').subscribe(({ name, value }) => {
            setFieldState('*(bb,cc,dd)', state => {
              state.visible = value
            })
          })
        }}
      >
        <Field
          type="string"
          name="aa"
          title="批量控制显示隐藏"
          enum={[
            { label: '显示', value: true },
            { label: '隐藏', value: false }
          ]}
          default={true}
          x-component="Input"
        />
        <Field type="string" name="bb" title="BB" x-component="Input" />
        <Field type="string" name="cc" title="CC" x-component="Input" />
        <Field type="string" name="dd" title="DD" x-component="Input" />
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 借助分组匹配语法进行批量选择字段

## 字段解构

> 字段解构可以说是一个非常强大的特性，它可以对组件生产的值做解构转换，使得快速贴合服务端数据结构要求，无需再做二次转换
> 字段解构主要是对 name 用 ES Deconstruction 语法做解构，需要注意的是，不支持`...`语法

### 最常见的解构案例

> 通常，我们使用日期范围组件的时候组件生产的值是一个数组，但是往往服务端都是以 startDate,endDate 的方式做存储，如果每次前端都花大量精力去转换的话，其实成本还是很高的。所以，我们可以借助字段解构，轻松解决该问题.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd'
import { DatePicker } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const components = {
  DateRangePicker: DatePicker.RangePicker
}

const App = () => (
  <Printer>
    <SchemaForm components={components} labelCol={6} wrapperCol={6}>
      <Field
        type="array"
        name="daterange"
        title="未解构日期"
        required
        x-component="DateRangePicker"
      />
      <Field
        type="array"
        name="[startDate,endDate]"
        title="已解构日期"
        required
        x-component="DateRangePicker"
      />
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 根据自定义组件的复杂解构

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const MyComponent = ({ value, onChange }) => {
  return (
    <div>
      <Button
        onClick={() => {
          onChange({
            aa: {
              bb: {
                cc: 123,
                dd: [333, 444],
                ee: 'abcde'
              }
            }
          })
        }}
      >
        点击上传复杂数据
      </Button>
      <code>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </code>
    </div>
  )
}

const App = () => (
  <Printer>
    <SchemaForm
      components={{
        MyComponent
      }}
      labelCol={6}
      wrapperCol={6}
    >
      <Field
        type="object"
        name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
        title="复杂解构"
        required
        x-component="MyComponent"
      />
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 嵌套数据结构中的字段解构

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd'
import { FormLayout } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const MyComponent = ({ value, onChange }) => {
  return (
    <div>
      <Button
        onClick={() => {
          onChange({
            aa: {
              bb: {
                cc: 123,
                dd: [333, 444],
                ee: 'abcde'
              }
            }
          })
        }}
      >
        点击上传复杂数据
      </Button>
      <code>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </code>
    </div>
  )
}

const App = () => (
  <Printer>
    <SchemaForm components={{ MyComponent }}>
      <Field type="object" name="wrapper">
        <FormLayout labelCol={6} wrapperCol={6}>
          <Field
            type="object"
            name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
            title="复杂解构"
            required
            x-component="MyComponent"
          />
        </FormLayout>
      </Field>
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 使用 FormPath 路径匹配处理联动

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormPath
} from '@formily/antd'
import { Select, FormLayout } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const MyComponent = ({ value, onChange }) => {
  return (
    <div>
      <Button
        onClick={() => {
          onChange({
            aa: {
              bb: {
                cc: 123,
                dd: [333, 444],
                ee: 'abcde'
              }
            }
          })
        }}
      >
        点击上传复杂数据
      </Button>
      <code>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </code>
    </div>
  )
}

const App = () => (
  <Printer>
    <SchemaForm
      components={{
        MyComponent,
        Select
      }}
      effects={($, { setFieldState }) => {
        $('onFieldChange', 'wrapper.relation').subscribe(({ value }) => {
          setFieldState(
            'wrapper.{aa:{bb:{cc:destructor1,dd:[ destructor2, destructor3 ],ee}}}',
            state => {
              state.visible = value == 2
            }
          )
        })
      }}
    >
      <Field type="object" name="wrapper">
        <FormLayout labelCol={6} wrapperCol={6}>
          <Field
            name="relation"
            type="number"
            title="隐藏复杂解构"
            default={1}
            enum={[
              { label: '是', value: 1 },
              { label: '否', value: 2 }
            ]}
            x-component="Select"
          />
          <Field
            type="object"
            name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
            title="复杂解构"
            required
            x-component="MyComponent"
          />
        </FormLayout>
      </Field>
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```
