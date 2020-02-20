# @formily/next-components

### 安装

```bash
npm install --save @formily/next-components
```



### Array Components

#### array

```tsx
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  FormItemGrid,
  FormButtonGroup,
  Submit,
  Reset,
  FormBlock,
  FormLayout
} from '@formily/next'
import '@alifd/next/dist/next.css'
import Printer from '@formily/printer'

const App = () => {
  const [value, setValues] = useState({})
  useEffect(() => {
    setTimeout(() => {
      setValues({
        array: [{ array2: [{ aa: '123', bb: '321' }] }]
      })
    }, 1000)
  }, [])
  return (
    <Printer>
      <SchemaForm initialValues={value} onSubmit={v => console.log(v)}>
        <Field
          title="数组"
          name="array"
          maxItems={3}
          type="array"
          x-props={{
            renderAddition: '这是定制的添加文案',
            renderRemove: '这是定制的删除文案'
          }}
        >
          <Field type="object">
            <FormBlock title="基础信息">
              <FormLayout labelCol={9} wrapperCol={6}>
                <Field name="aa" type="string" title="字段1" />
                <Field name="bb" type="string" title="字段2" />
                <FormItemGrid title="字段3" gutter={10}>
                  <Field name="cc" type="string" />
                  <Field name="dd" type="string" />
                </FormItemGrid>
              </FormLayout>
            </FormBlock>
            <FormBlock title="嵌套数组">
              <Field name="array2" maxItems={3} type="array">
                <Field type="object">
                  <FormLayout labelCol={9} wrapperCol={6}>
                    <Field name="aa" type="string" title="字段1" />
                    <Field name="bb" type="string" title="字段2" />
                    <FormItemGrid title="字段3" gutter={10}>
                      <Field name="cc" type="string" />
                      <Field name="dd" type="string" />
                    </FormItemGrid>
                  </FormLayout>
                </Field>
              </Field>
            </FormBlock>
          </Field>
        </Field>
        <FormButtonGroup>
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### cards

**用法**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  FormItemGrid,
  FormButtonGroup,
  Submit,
  Reset,
  FormBlock,
  FormLayout
} from '@formily/next'
import '@alifd/next/dist/next.css'
import Printer from '@formily/printer'

const App = () => (
  <Printer>
    <SchemaForm>
      <Field
        name="array"
        maxItems={3}
        type="array"
        x-component="cards"
        x-props={{
          title: '这是卡片标题',
          renderAddition: '这是定制的添加文案',
          renderRemove: '这是定制的删除文案'
        }}
      >
        <Field type="object">
          <FormLayout labelCol={6} wrapperCol={8}>
            <Field
              name="aa"
              type="string"
              description="hello world"
              title="字段1"
            />
            <Field name="bb" type="string" title="字段2" />
            <Field name="cc" type="string" title="字段3" />
            <Field name="dd" type="string" title="字段4" />
            <Field name="dd" type="string" title="字段5" />
            <Field name="ee" type="string" title="字段6" />
            <Field name="ff" type="string" title="字段7" />
            <Field name="gg" type="daterange" title="字段8" />
          </FormLayout>
          <Field
            name="array"
            maxItems={3}
            type="array"
            x-component="cards"
            x-props={{ title: '这是卡片标题' }}
          >
            <Field type="object">
              <FormLayout labelCol={6} wrapperCol={8}>
                <Field
                  name="aa"
                  type="string"
                  description="hello world"
                  title="字段1"
                />
                <Field name="bb" type="string" title="字段2" />
                <Field name="cc" type="string" title="字段3" />
                <Field name="dd" type="string" title="字段4" />
                <Field name="dd" type="string" title="字段5" />
                <Field name="ee" type="string" title="字段6" />
                <Field name="ff" type="string" title="字段7" />
                <Field name="gg" type="daterange" title="字段8" />
              </FormLayout>
            </Field>
          </Field>
        </Field>
      </Field>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### table

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  FormItemGrid,
  FormButtonGroup,
  Submit,
  Reset,
  FormBlock,
  FormLayout
} from '@formily/next'
import '@alifd/next/dist/next.css'
import Printer from '@formily/printer'

const App = () => (
  <Printer>
    <SchemaForm>
      <FormLayout>
        <Field
          title="数组"
          name="array"
          maxItems={3}
          type="array"
          x-component="table"
          x-props={{
            renderExtraOperations() {
              return <div>Hello worldasdasdasdasd</div>
            },
            operationsWidth: 300
          }}
        >
          <Field type="object">
            <Field
              name="aa"
              type="string"
              description="hello world"
              title="字段1"
            />
            <Field name="bb" type="string" title="字段2" />
            <Field name="cc" type="string" title="字段3" />
            <Field name="dd" type="string" title="字段4" x-index={1} />
            <Field name="ee" type="string" title="字段5" />
            <Field name="ff" type="string" title="字段6" />
            <Field name="gg" type="string" title="字段7" />
            <Field name="hh" type="daterange" title="字段8" />
          </Field>
        </Field>
      </FormLayout>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### Layout Components


#### `<FormCard/>`

> FormCard 组件 Props, 完全继承自 [CardProps](#CardProps)。
> FormCard与[FormBlock](#FormBlock) 唯一区别是样式上是否有框

**用法**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { FormCard, SchemaMarkupField as Field } from '@formily/next'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm>
    <FormCard title="block">
      <Field type="string" name="username" title="username" />
    </FormCard>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormBlock/>`

> FormBlock 组件 Props, 完全继承自 [CardProps](#CardProps)

**用法**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { FormBlock, SchemaMarkupField as Field } from '@formily/next'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm>
    <FormBlock title="block">
      <Field type="string" name="username" title="username" />
    </FormBlock>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormStep/>`

> FormStep 组件 Props

```typescript
interface IFormStep {
  dataSource: StepItemProps[]
  /** next step props**/
  // 当前步骤
  current?: number
  // 展示方向
  direction?: 'hoz' | 'ver'
  // 横向布局时的内容排列
  labelPlacement?: 'hoz' | 'ver'
  // 类型
  shape?: 'circle' | 'arrow' | 'dot'
  // 是否只读模式
  readOnly?: boolean
  // 是否开启动效
  animation?: boolean
  // 自定义样式名
  className?: string
  // StepItem 的自定义渲染
  itemRender?: (index: number, status: string) => React.ReactNode
}
```

**用法**

```tsx
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  FormEffectHooks,
  createFormActions,
  FormGridRow,
  FormItemGrid,
  FormGridCol,
  FormPath,
  FormLayout,
  FormBlock,
  FormCard,
  FormTextBox,
  FormStep
} from '@formily/next'
import { Button } from '@alifd/next'
import '@alifd/next/dist/next.css'

const { onFormInit$ } = FormEffectHooks

const actions = createFormActions()

let cache = {}

export default () => (
  <SchemaForm
    onSubmit={values => {
      console.log('提交')
      console.log(values)
    }}
    actions={actions}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 6 }}
    validateFirst
    effects={({ setFieldState, getFormGraph }) => {
      onFormInit$().subscribe(() => {
        setFieldState('col1', state => {
          state.visible = false
        })
      })
    }}
  >
    <FormStep
      style={{ marginBottom: 20 }}
      dataSource={[
        { title: 'Step1', name: 'step-1' },
        { title: 'Step2', name: 'step-2' },
        { title: 'Step3', name: 'step-3' }
      ]}
    />
    <FormCard name="step-1" title="Step1">
      <Field name="a1" required title="A1" type="string" />
    </FormCard>
    <FormCard name="step-2" title="Step2">
      <Field name="a2" required title="A2" type="string" />
    </FormCard>
    <FormCard name="step-3" title="Step3">
      <Field name="a3" required title="A3" type="string" />
    </FormCard>
    <FormButtonGroup>
      <Submit>提交</Submit>
      <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_PREVIOUS)}>
        上一步
      </Button>
      <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_NEXT)}>
        下一步
      </Button>
      <Button
        onClick={() => {
          cache = actions.getFormGraph()
        }}
      >
        存储当前状态
      </Button>
      <Button
        onClick={() => {
          actions.setFormGraph(cache)
        }}
      >
        回滚状态
      </Button>
    </FormButtonGroup>
  </SchemaForm>
)
```

#### `<FormLayout/>`

> FormLayout 组件 Props

```typescript
interface IFormItemTopProps {
  inline?: boolean
  className?: string
  style?: React.CSSProperties
  labelCol?: number | { span: number; offset?: number }
  wrapperCol?: number | { span: number; offset?: number }
}
```

**用法**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/next'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'
const App = () => (
  <Printer>
    <SchemaForm>
      <FormLayout labelCol={8} wrapperCol={6}>
        <Field name="aaa" type="string" title="字段1" />
        <Field name="bbb" type="number" title="字段2" />
        <Field name="ccc" type="date" title="字段3" />
      </FormLayout>
      <FormButtonGroup offset={8}>
        <Submit>提交</Submit>​ <Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormItemGrid/>`

> FormItemGrid 组件 Props

```typescript
interface IFormItemGridProps {
  cols?: Array<number | { span: number; offset: number }>
  gutter?: number
  /** next Form.Item props**/
  // 样式前缀
  prefix?: string

  // label 标签的文本
  label?: React.ReactNode

  // label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效
  labelCol?: {}

  // 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
  wrapperCol?: {}

  // 自定义提示信息，如不设置，则会根据校验规则自动生成.
  help?: React.ReactNode

  // 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 位于错误信息后面
  extra?: React.ReactNode

  // 校验状态，如不设置，则会根据校验规则自动生成
  validateState?: 'error' | 'success' | 'loading'

  // 配合 validateState 属性使用，是否展示 success/loading 的校验状态图标, 目前只有Input支持
  hasFeedback?: boolean

  // 自定义内联样式
  style?: React.CSSProperties

  // node 或者 function(values)
  children?: React.ReactNode | (() => void)

  // 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。
  size?: 'large' | 'small' | 'medium'

  // 标签的位置
  labelAlign?: 'top' | 'left' | 'inset'

  // 标签的左右对齐方式
  labelTextAlign?: 'left' | 'right'

  // 扩展class
  className?: string

  // [表单校验] 不能为空
  required?: boolean

  // required 的星号是否显示
  asterisk?: boolean

  // required 自定义错误信息
  requiredMessage?: string

  // required 自定义触发方式
  requiredTrigger?: string | Array<any>

  // [表单校验] 最小值
  min?: number

  // [表单校验] 最大值
  max?: number

  // min/max 自定义错误信息
  minmaxMessage?: string

  // min/max 自定义触发方式
  minmaxTrigger?: string | Array<any>

  // [表单校验] 字符串最小长度 / 数组最小个数
  minLength?: number

  // [表单校验] 字符串最大长度 / 数组最大个数
  maxLength?: number

  // minLength/maxLength 自定义错误信息
  minmaxLengthMessage?: string

  // minLength/maxLength 自定义触发方式
  minmaxLengthTrigger?: string | Array<any>

  // [表单校验] 字符串精确长度 / 数组精确个数
  length?: number

  // length 自定义错误信息
  lengthMessage?: string

  // length 自定义触发方式
  lengthTrigger?: string | Array<any>

  // 正则校验
  pattern?: any

  // pattern 自定义错误信息
  patternMessage?: string

  // pattern 自定义触发方式
  patternTrigger?: string | Array<any>

  // [表单校验] 四种常用的 pattern
  format?: 'number' | 'email' | 'url' | 'tel'

  // format 自定义错误信息
  formatMessage?: string

  // format 自定义触发方式
  formatTrigger?: string | Array<any>

  // [表单校验] 自定义校验函数
  validator?: () => void

  // validator 自定义触发方式
  validatorTrigger?: string | Array<any>

  // 是否修改数据时自动触发校验
  autoValidate?: boolean
}
```

**用法**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/next'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const App = () => (
  <Printer>
    <SchemaForm onSubmit={v => console.log(v)}>
      <FormItemGrid gutter={20}>
        <Field type="string" name="a1" title="field1" />
        <Field type="string" name="a2" title="field2" />
        <Field type="string" name="a3" title="field3" />
        <Field type="string" name="a4" title="field4" />
      </FormItemGrid>
      <FormItemGrid gutter={20} cols={[6, 6]}>
        <Field type="string" name="a5" title="field5" />
        <Field type="string" name="a6" title="field6" />
      </FormItemGrid>
      <FormButtonGroup style={{ minWidth: 150 }}>
        ​<Submit>提交</Submit>​<Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormTextBox/>`

> FormTextBox 组件 Props

```typescript
interface IFormTextBox {
  text?: string
  gutter?: number
  title?: React.ReactText
  description?: React.ReactText
}
```

**用法**

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormTextBox,
  FormCard,
  FormLayout
} from '@formily/next'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm labelCol={8} wrapperCol={6} onSubmit={v => console.log(v)}>
        <FormCard title="FormTextBox">
          <FormLayout labelCol={8} wrapperCol={16}>
            <FormTextBox
              title="text label"
              text="prefix%suffix prefix2%suffix2 prefix3%suffix3"
              gutter={8}
            >
              <Field
                type="string"
                default={10}
                required
                name="aa1"
                x-props={{ style: { width: 80 } }}
                description="desc1"
              />
              <Field
                type="number"
                default={20}
                required
                name="aa2"
                description="desc2"
              />
              <Field
                type="number"
                default={30}
                required
                name="aa3"
                description="desc3"
              />
            </FormTextBox>
          </FormLayout>
        </FormCard>
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormButtonGroup/>`

> FormButtonGroup 组件 Props

```typescript
interface IFormButtonGroupProps {
  sticky?: boolean
  style?: React.CSSProperties
  itemStyle?: React.CSSProperties
  className?: string
  align?: 'left' | 'right' | 'start' | 'end' | 'top' | 'bottom' | 'center'
  triggerDistance?: number
  zIndex?: number
  span?: ColSpanType
  offset?: ColSpanType
}
```

**用法**

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/next'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const App = () => {
  const [state, setState] = useState({ editable: true })
  return (
    <Printer>
      <SchemaForm onSubmit={v => console.log(v)}>
        <div>normal</div>
        <FormButtonGroup style={{ minWidth: 150 }}>
          ​<Submit>提交</Submit>​<Reset>重置</Reset>​
        </FormButtonGroup>
        <div>sticky</div>
        <FormButtonGroup offset={8} sticky>
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

#### `<TextButton/>`

> TextButton 组件 Props, 完全继承自 [ButtonProps](#ButtonProps)

**用法**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { TextButton } from '@formily/next'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm>
    <TextButton>content</TextButton>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<CircleButton/>`

> CircleButton 组件 Props, 完全继承自 [ButtonProps](#ButtonProps)

**用法**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { CircleButton } from '@formily/next'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm>
    <CircleButton>ok</CircleButton>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```