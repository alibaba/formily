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
      <FormTab name="tabs" defaultActiveKey={'tab-2'}>
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
        <Button
          onClick={() => {
            actions.dispatch(FormTab.ON_FORM_TAB_ACTIVE_KEY_CHANGE, {
              value: 'tab-2'
            })
          }}
        >
          切换到第二个选项
        </Button>
        <Button
          onClick={() => {
            actions.setFieldState('tabs', state => {
              state.props['x-component-props'] =
                state.props['x-component-props'] || {}
              const { hiddenKeys } = state.props['x-component-props']
              state.props['x-component-props'].hiddenKeys =
                hiddenKeys && hiddenKeys.length ? [] : ['tab-2']
            })
          }}
        >
          隐藏/显示第二个选项卡
        </Button>
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 从@formily/antd-components 中导出 FormTab
- FormTab 中的渲染是会强制全部渲染的，主要是为了收集校验
- 如果被隐藏的 Tab 校验错误，在 Tab Title 上会展现 Badge 小红标，同时浏览器自动滚动

## 自适应复合栅格布局

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import styled from "styled-components";
import {
  SchemaForm,
  SchemaField,
  SchemaMarkupField as Field,  
  MegaLayout,
  FormMegaLayout
} from "@formily/antd";
import { ArrayList } from "@formily/react-shared-components";
import { toArr, isFn, FormPath } from "@formily/shared";
import { FormCard, Input, Checkbox } from "@formily/antd-components";
import "antd/dist/antd.css";

const ArrayComponents = {
  CircleButton: props => <Button {...props} />,
  TextButton: props => <Button text {...props} />,
  AdditionIcon: () => <div>+Add</div>,
  RemoveIcon: () => <div>Remove</div>,
  MoveDownIcon: () => <div>Down</div>,
  MoveUpIcon: () => <div>Up</div>
};

const ArrayCustom = props => {
  const { value, schema, className, editable, path, mutators } = props;
  const {
    renderAddition,
    renderRemove,
    renderMoveDown,
    renderMoveUp,
    renderEmpty,
    renderExtraOperations,
    ...componentProps
  } = schema.getExtendsComponentProps() || {};

  const onAdd = () => {
    const items = Array.isArray(schema.items)
      ? schema.items[schema.items.length - 1]
      : schema.items;
    mutators.push(items.getEmptyValue());
  };

  return (
    <ArrayList
      value={value}
      minItems={schema.minItems}
      maxItems={schema.maxItems}
      editable={editable}
      components={ArrayComponents}
      renders={{
        renderAddition,
        renderRemove,
        renderMoveDown,
        renderMoveUp,
        renderEmpty // 允许开发者覆盖默认
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {toArr(value).map((item, index) => {
          return (
            <div style={{ marginBottom: "16px" }} key={index}>
              <SchemaField path={FormPath.parse(path).concat(index)} />
            </div>
          );
        })}
      </div>
      <ArrayList.Empty>
        {({ children }) => {
          return (
            <div
              {...componentProps}
              size="small"
              className={`card-list-item card-list-empty`}
              onClick={onAdd}
            >
              <div>{children}</div>
            </div>
          );
        }}
      </ArrayList.Empty>
      <ArrayList.Addition>
        {({ children, isEmpty }) => {
          if (!isEmpty) {
            return (
              <div
                style={{ marginLeft: "12px", cursor: 'pointer' }}
                className="array-cards-addition"
                onClick={onAdd}
              >
                <PlusCircleOutlined style={{ color: '#1890ff' }}/>
              </div>
            );
          }
        }}
      </ArrayList.Addition>
    </ArrayList>
  );
};

ArrayCustom.isFieldComponent = true;

const App = () => {
  return (
    <SchemaForm components={{ Input, Checkbox, ArrayCustom }}>
      <FormCard title="基本信息">
        <FormMegaLayout
          labelWidth="100"
          grid
          full
          autoRow
          labelAlign="left"
          columns="3"
          responsive={{ lg: 3, m: 2, s: 1 }}
        >
          <Field name="username" title="姓名" x-component="Input" required/>
          <Field name="gender" title="性别" x-component="Input" required/>
          <Field name="company" title="公司" x-component="Input" required/>
          <Field title="固定电话" name="phoneList" type="array" required
            default={[
              { phone: '010-1234 5678' },
              { phone: '010-1234 5678' }
            ]}
            x-component="ArrayCustom"
          >
            <Field type="object" x-mega-props={{ columns: 1 }}>
              <Field name="phone" x-component="Input" />
            </Field>
          </Field>

          <Field
            title="部门职务"
            name="departmentList"
            type="array"
            required
            default={[
              { group: "项目1部", position: '项目经理' },
              { group: "项目1部", position: '研发经理', isManeger: true }
            ]}
            x-component="ArrayCustom"
          >
              <Field type="object" x-mega-props={{ columns: 2 }}>
                <Field name="group" x-mega-props={{ span: 2 }} x-component="Input" />
                <Field name="position" x-component="Input" />
                <Field name="isManeger" x-component="Checkbox" x-component-props={{
                  children: '是否主管'
                }} />
              </Field>
          </Field>
          
          <Field
            title="手机号"
            name="mobileList"
            type="array"
            required
            default={[
              { mobile: "136 0123 4567", enableSMS: true },
              { mobile: "136 0123 4567", enableSMS: false }
            ]}
            x-component="ArrayCustom"
          >
            <Field type="object" x-mega-props={{ columns: 2 }}>
              <Field name="mobile" x-component="Input" />
              <Field name="enableSMS" x-component="Checkbox" x-component-props={{
                children: '接受短信'
              }} />
            </Field>
          </Field>
        </FormMegaLayout>
      </FormCard>      
    </SchemaForm>
  );
};

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 结合自定义 ArrayList 以及 MegaLayout 的在栅格场景下的应用
- 配合响应式布局，能够根据屏幕宽度进行自适应
- 在 ArrayList场景下，如何通过Field（object）来改变columns
