# 理解表单节点树

我们在之前的教程中已经有讲到虚拟节点状态(VirtualFieldState)，我们也有讲到整体 Formily 架构

- Form
  - FormState
  - FormLifeCycle
- Field
  - FieldState
  - VirtualFieldState
  - FieldLifeCycle

现在我们整体来讲一下 Formily 节点树，先理解下面这张图：

![](https://img.alicdn.com/tfs/TB1.rAamG61gK0jSZFlXXXDKFXa-1496-898.png)

如果存在这样一棵树的话，那么:

- c 字段的 name 属性则是 a.c，path 属性是 a.b.c
- b 字段的 name 属性是 a.b，path 属性是 a.b
- d 字段的 name 属性是 a.d，path 属性是 a.d
- e 字段的 name 属性是 a.d.e，path 属性是 a.d.e

这一来解释之后，我们就大概明白了，只要在某个节点路径中，存在 VirtualField，那么
它的数据路径就会略过 VirtualField，但是，对于 VirtualField 自身这个节点，它的
name 属性，是包含它自身的节点标识的，这就是为什么 b 字段的 name 属性是 a.b 的原因

## 节点树结构

我们的节点树其实就是一颗状态树，同时，它也是一颗扁平的状态树，它主要由 FormState/FieldState/VirtualFieldState 所构成

```typescript

{
  "":{
    display:"FormState",
    ...
  },
  "xxx.xxx.xx":{
    display:"FieldState",
    ...
  },
  "xxx.xxx.xx":{
    display:"VirtualFieldState",
    ...
  }
}

```

我们看看以下例子：

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
  createFormActions
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
import { isArr, map } from '@formily/shared'
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

const serializeObject = obj => {
  if (isArr(obj)) {
    return obj.map(serializeObject)
  } else if (typeof obj === 'object') {
    if ('$$typeof' in obj && '_owner' in obj) {
      return '#ReactNode'
    } else if (obj.toJS) {
      return obj.toJS()
    } else if (obj.toJSON) {
      return obj.toJSON()
    } else {
      return map(obj, serializeObject)
    }
  }
  return obj
}

const actions = createFormActions()

const App = () => {
  const [graph, setFormGraph] = useState('')
  return (
    <Printer>
      <SchemaForm
        actions={actions}
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
            onClick={() => {
              setFormGraph(
                JSON.stringify(serializeObject(actions.getFormGraph()), null, 2)
              )
            }}
          >
            查看节点树
          </Button>
          <Reset>重置</Reset>​
        </FormButtonGroup>
        <div
          style={{
            height: 400,
            overflow: 'auto',
            border: '1px solid red',
            padding: 10
          }}
        >
          <code>
            <pre>{graph}</pre>
          </code>
        </div>
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 调用 actions.getFormGraph()可以直接查看实时表单状态树
- 节点状态树中是有可能存在 ReactNode，所以 JSON.stringify 打印的时候需要先将 ReactNode 转换一下，否则会报循环引用错误
