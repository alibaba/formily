# 实现复杂布局

## 内联布局

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
import { Input, DatePicker, NumberPicker } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const App = () => (
  <Printer>
    <SchemaForm inline components={{ Input, NumberPicker, DatePicker }}>
      <Field name="aaa" type="string" title="字段1" x-component="Input" />
      <Field
        name="bbb"
        type="number"
        title="字段2"
        x-component="NumberPicker"
      />
      <Field name="ccc" type="date" title="字段3" x-component="DatePicker" />​
      <FormButtonGroup>
        <Submit>提交</Submit>​ <Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 给 SchemaForm 组件传入 inline 属性即可把表单变成内联模式

## 复杂组合布局

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
import { Button, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
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
  CheckboxSingle: Checkbox,
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

const createRichTextUtils = () => {
  return {
    text(...args) {
      return React.createElement('span', {}, ...args)
    },
    link(text, href, target) {
      return React.createElement('a', { href, target }, text)
    },
    gray(text) {
      return React.createElement(
        'span',
        { style: { color: 'gray', margin: '0 3px' } },
        text
      )
    },
    red(text) {
      return React.createElement(
        'span',
        { style: { color: 'red', margin: '0 3px' } },
        text
      )
    },
    help(text, offset = 3) {
      return React.createElement(
        Tooltip,
        { title: text },
        <QuestionCircleOutlined
          style={{ margin: '0 3px', cursor: 'default', marginLeft: offset }}
        />
      )
    },
    tips(text, tips) {
      return React.createElement(
        Tooltip,
        { title: tips },
        <span style={{ margin: '0 3px', cursor: 'default' }}>{text}</span>
      )
    }
  }
}

const App = () => {
  return (
    <Printer>
      <SchemaForm
        labelCol={8}
        wrapperCol={6}
        components={components}
        expressionScope={createRichTextUtils()}
        effects={({ setFieldState }) => {
          FormEffectHooks.onFieldValueChange$('bbb').subscribe(({ value }) => {
            setFieldState('detailCard', state => {
              state.visible = value
            })
          })
        }}
      >
        <FormCard title="基本信息">
          <Field
            name="checkbox"
            type="string"
            title="{{ text('字段1',help('这是帮助信息')) }}"
            enum={[
              {
                label: '{{ text("选项1",help("这是帮助信息")) }}',
                value: '1111'
              },
              {
                label:
                  '{{ text("选项2",red(link("这是个链接","https://taobao.com","_blank")))}}',
                value: '2222'
              }
            ]}
            description="{{ text('主要信息', gray('(次要信息)'),tips(red('(重要信息)'),'重要提示') ) }}"
            x-component="Checkbox"
          />
          <Field
            name="radio"
            type="string"
            title="{{ text('字段2',help('这是帮助信息')) }}"
            enum={[
              {
                label: '{{ text("选项1",help("这是帮助信息")) }}',
                value: '1111'
              },
              {
                label:
                  '{{ text("选项2",red(link("这是个链接","https://taobao.com","_blank")))}}',
                value: '2222'
              }
            ]}
            description="{{ text('主要信息', gray('(次要信息)'),tips(red('(重要信息)'),'重要提示') ) }}"
            x-component="Radio"
          />
        </FormCard>
        <FormCard title="详细信息">
          <Field name="aaa" type="string" title="字段1" x-component="Input" />
          <Field
            name="ccc"
            type="date"
            title="字段3"
            x-component="DatePicker"
            x-props={{
              addonAfter: "{{ help('这是帮助信息',10) }}"
            }}
          />
          ​
          <Field
            name="bbb"
            type="number"
            title="显示高级信息"
            enum={[
              { value: true, label: '显示' },
              { value: false, label: '隐藏' }
            ]}
            default={false}
            x-component="Select"
            x-props={{
              addonAfter: "{{ help('这是帮助信息',10) }}"
            }}
          />
        </FormCard>
        <FormCard title="高级信息" name="detailCard">
          <FormLayout labelCol={8} wrapperCol={12}>
            <FormItemGrid title="字段3" gutter={10} cols={[6, 11]}>
              <Field name="ddd" type="number" x-component="NumberPicker" />
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
                x-props={{
                  addonAfter: "{{ help('这是帮助信息',10) }}"
                }}
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
        </FormCard>
        <Field
          name="sign"
          type="string"
          title=" "
          x-props={{
            colon: false
          }}
          x-component-props={{
            children:
              "{{text('确认签署',link('《xxxx协议》','https://taobao.com','_blank'))}}"
          }}
          x-component="CheckboxSingle"
        />
        <FormButtonGroup offset={8} sticky>
          ​<Submit>提交</Submit>​<Reset>重置</Reset>​
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 抽象了几个可复用的富文本工具方法，主要用在表达式中使用，可以快速实现很多简单的富文本文案场景
- 每个 Field 都可以配一个 x-props.addonAfter，可以给组件尾部追加文案
- FormCard 是卡片式布局，FormBlock 是属于内联式卡片布局

## 网格布局

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
import { FormItemGrid, Input } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const App = () => (
  <Printer>
    <SchemaForm components={{ Input }} onSubmit={v => console.log(v)}>
      <FormItemGrid gutter={20}>
        <Field type="string" name="a1" title="查询字段1" x-component="Input" />
        <Field type="string" name="a2" title="查询字段2" x-component="Input" />
        <Field type="string" name="a3" title="查询字段3" x-component="Input" />
        <Field type="string" name="a4" title="查询字段4" x-component="Input" />
      </FormItemGrid>
      <FormItemGrid gutter={20} cols={[6, 6]}>
        <Field type="string" name="a5" title="查询字段5" x-component="Input" />
        <Field type="string" name="a6" title="查询字段6" x-component="Input" />
      </FormItemGrid>
      <FormButtonGroup style={{ minWidth: 150 }}>
        ​<Submit>提交</Submit>​<Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 使用 FormItemGrid 可以实现网格布局，如果加了 title 属性，就能处理 FormItem 维度的网格布局

## 分步表单

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormSpy,
  createFormActions
} from '@formily/antd'
import { Input, FormStep, FormLayout } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const actions = createFormActions()
let cache = {
  graph: {},
  current: 0
}

const App = () => (
  <Printer>
    <SchemaForm
      components={{ Input }}
      actions={actions}
      onSubmit={v => console.log(v)}
    >
      <FormStep
        style={{ marginBottom: 20 }}
        dataSource={[
          { title: '步骤1', name: 'basicInfo' },
          { title: '步骤2', name: '*(companyInfo,itemInfo)' },
          { title: '步骤3', name: 'businessInfo' }
        ]}
      />
      <Field type="object" name="basicInfo">
        <FormLayout labelCol={8} wrapperCol={8}>
          <Field
            type="string"
            name="a1"
            title="字段1"
            required
            x-component="Input"
          />
        </FormLayout>
      </Field>
      <Field type="object" name="companyInfo">
        <FormLayout labelCol={8} wrapperCol={8}>
          <Field
            type="string"
            name="a2"
            title="字段2"
            required
            x-component="Input"
          />
        </FormLayout>
      </Field>
      <Field type="object" name="itemInfo">
        <FormLayout labelCol={8} wrapperCol={8}>
          <Field
            type="string"
            name="a3"
            title="字段3"
            required
            x-component="Input"
          />
        </FormLayout>
      </Field>

      <Field type="object" name="businessInfo">
        <FormLayout labelCol={8} wrapperCol={8}>
          <Field
            type="string"
            name="a4"
            title="字段4"
            required
            x-component="Input"
          />
        </FormLayout>
      </Field>
      <FormSpy
        selector={FormStep.ON_FORM_STEP_CURRENT_CHANGE}
        reducer={(state, action) => {
          switch (action.type) {
            case FormStep.ON_FORM_STEP_CURRENT_CHANGE:
              return { ...state, step: action.payload }
            default:
              return { step: { value: 0 } }
          }
        }}
      >
        {({ state }) => {
          const formStepState = state.step ? state : { step: { value: 0 } }
          return (
            <FormButtonGroup align="center">
              <Button
                disabled={formStepState.step.value === 0}
                onClick={() => {
                  actions.dispatch(FormStep.ON_FORM_STEP_PREVIOUS)
                }}
              >
                上一步
              </Button>
              <Button
                onClick={() => {
                  actions.dispatch(FormStep.ON_FORM_STEP_NEXT)
                }}
              >
                下一步
              </Button>
              <Submit>提交</Submit>​<Reset>重置</Reset>​
              <Button
                onClick={() => {
                  cache.current = state.step
                  cache.graph = actions.getFormGraph()
                }}
              >
                存储当前状态
              </Button>
              <Button
                onClick={() => {
                  actions.setFormGraph(cache.graph)
                  actions.dispatch(
                    FormStep.ON_FORM_STEP_CURRENT_CHANGE,
                    cache.current
                  )
                }}
              >
                回滚状态
              </Button>
            </FormButtonGroup>
          )
        }}
      </FormSpy>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 使用 FormStep 组件需要传入 dataSource，同时指定对应要控制的字段 name，这个 name 属性是一个 FormPathPattern，可以使用匹配语法匹配任何字段
- 消费 FormStep 状态，主要使用 FormSpy 来消费，借助 reducer 可以自定义状态
- 借助 actions.dispatch 可以手工触发 FormStep 的生命周期钩子

**FormStep API**

## 选项卡表单

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormSpy,
  createFormActions
} from '@formily/antd'
import { Input, FormTab } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const actions = createFormActions()

const App = () => (
  <Printer>
    <SchemaForm
      components={{ Input }}
      actions={actions}
      onSubmit={v => console.log(v)}
    >
      <FormTab>
        <FormTab.TabPane name="tab-1" tab="选项1">
          <Field
            type="string"
            name="a1"
            title="字段1"
            required
            x-component="Input"
          />
        </FormTab.TabPane>
        <FormTab.TabPane name="tab-2" tab="选项2">
          <Field
            type="string"
            name="a2"
            title="字段2"
            required
            x-component="Input"
          />
          <Field
            type="string"
            name="a3"
            title="字段3"
            required
            x-component="Input"
          />
          <Field
            type="string"
            name="a4"
            title="字段4"
            required
            x-component="Input"
          />
          <Field
            type="string"
            name="a5"
            title="字段5"
            required
            x-component="Input"
          />
        </FormTab.TabPane>
      </FormTab>
      <FormButtonGroup>
        <Submit />
        <Button onClick={()=>{
          actions.dispatch(FormTab.ON_FORM_TAB_ACTIVE_KEY_CHANGE,{
            value:'tab-2'
          })
        }}>切换到第二个选项</Button>
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 从@formily/antd-components中导出FormTab
- FormTab中的渲染是会强制全部渲染的，主要是为了收集校验
- 如果被隐藏的Tab校验错误，在Tab Title上会展现Badge小红标，同时浏览器自动滚动
