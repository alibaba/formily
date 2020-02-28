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
  Form,
  FormItem,
  FormButtonGroup,
  FormEffectHooks,
  InternalFieldList as FieldList,
  createFormActions,
  FormPath,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input, Select } from '@formily/antd-components'
import { Button, Row, Col } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const App = () => {
  return (
    <Form
      onSubmit={values => {
        console.log(values)
      }}
      labelCol={5}
      wrapperCol={8}
      effects={({ setFieldState }) => {
        onFieldValueChange$('array.*.aa').subscribe(({ name, value }) => {
          setFieldState(
            FormPath.transform(name, /\d/, $1 => {
              return `array.${$1}.bb`
            }),
            state => {
              state.visible = value
            }
          )
        })
      }}
    >
      <FieldList name="array">
        {({ state, mutators }) => (
          <div>
            {state.value.map((item, index) => {
              return (
                <div key={index}>
                  <FormItem
                    name={`array.${index}.aa`}
                    label="控制相邻字段显示隐藏"
                    dataSource={[
                      { label: '显示', value: true },
                      { label: '隐藏', value: false }
                    ]}
                    component={Select}
                  />
                  <FormItem
                    name={`array.${index}.bb`}
                    label="BB"
                    component={Input}
                  />
                  <Button
                    style={{ marginBottom: 20 }}
                    onClick={() => {
                      mutators.remove(index)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )
            })}
            <Button
              type="primary"
              onClick={() => {
                mutators.push()
              }}
            >
              ADD
            </Button>
          </div>
        )}
      </FieldList>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 在 ` onFieldValueChange$ `入参中使用\*批量匹配数组第 n 项的 aa 字段
- 使用 FormPath.transform 将一个路径转换成另外一个路径，目前该例子主要用于转换成相邻路径

## 使用路径匹配能力批量操作字段状态

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  FormEffectHooks,
  createFormActions,
  FormPath,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input, Select } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const App = () => {
  return (
    <Form
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
      <FormItem
        name="aa"
        label="批量控制显示隐藏"
        dataSource={[
          { label: '显示', value: true },
          { label: '隐藏', value: false }
        ]}
        initialValue={true}
        component={Select}
      />
      <FormItem name="bb" label="BB" component={Input} />
      <FormItem name="cc" label="CC" component={Input} />
      <FormItem name="dd" label="DD" component={Input} />
    </Form>
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
import { Form, FormItem, FormButtonGroup, Submit, Reset } from '@formily/antd'
import { DatePicker } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const App = () => (
  <Printer noSchema>
    <Form labelCol={6} wrapperCol={6}>
      <FormItem
        name="daterange"
        label="未解构日期"
        required
        component={DatePicker.RangePicker}
      />
      <FormItem
        name="[startDate,endDate]"
        label="已解构日期"
        required
        component={DatePicker.RangePicker}
      />
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 根据自定义组件的复杂解构

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem, FormButtonGroup, Submit, Reset } from '@formily/antd'
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
    <Form labelCol={6} wrapperCol={6}>
      <FormItem
        name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
        title="复杂解构"
        required
        component={MyComponent}
      />
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 嵌套数据结构中的字段解构

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem, FormButtonGroup, Submit, Reset } from '@formily/antd'
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
  <Printer noSchema>
    <Form>
      <FormItem
        labelCol={6}
        wrapperCol={6}
        name="wrapper.{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
        label="复杂解构"
        required
        component={MyComponent}
      />
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 使用 FormPath 路径匹配处理联动

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  Submit,
  Reset,
  FormPath,
  FormItemDeepProvider as FormLayout
} from '@formily/antd'
import { Select } from '@formily/antd-components'
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
    <Form
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
      <FormLayout labelCol={6} wrapperCol={6}>
        <FormItem
          name="wrapper.relation"
          label="隐藏复杂解构"
          initialValue={1}
          dataSource={[
            { label: '是', value: 1 },
            { label: '否', value: 2 }
          ]}
          component={Select}
        />
        <FormItem
          name="wrapper.{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
          label="复杂解构"
          required
          component={MyComponent}
        />
      </FormLayout>
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```
