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
  Form,
  FormItem,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
  FormItemDeepProvider as FormLayout,
  InternalVirtualField as VirtualField,
  createFormActions
} from '@formily/antd'
import { isArr, map } from '@formily/shared'
import { Button, Card, Row, Col } from 'antd'
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
  const [state, setState] = useState({ editable: true })
  const [graph, setFormGraph] = useState('')
  return (
    <Printer noSchema>
      <Form
        actions={actions}
        editable={state.editable}
        effects={({ setFieldState }) => {
          FormEffectHooks.onFieldValueChange$('bbb').subscribe(({ value }) => {
            setFieldState('detailCard', state => {
              state.visible = value
            })
          })
          FormEffectHooks.onFieldValueChange$('ccc').subscribe(({ value }) => {
            setFieldState('layout_1', state => {
              state.visible = value
            })
          })
        }}
        labelCol={8}
        wrapperCol={6}
      >
        <Card title="基本信息" style={{ marginBottom: 15 }}>
          <FormItem name="aaa" label="字段1" component={Input} />
          <FormItem
            name="bbb"
            label="控制详细信息显示隐藏"
            dataSource={[
              { value: true, label: '显示' },
              { value: false, label: '隐藏' }
            ]}
            initialValue={true}
            component={Select}
          />
          <FormItem
            name="ccc"
            label="控制字段3显示隐藏"
            dataSource={[
              { value: true, label: '显示' },
              { value: false, label: '隐藏' }
            ]}
            initialValue={true}
            component={Select}
          />
        </Card>
        <VirtualField name="detailCard">
          <Card title="详细信息">
            <FormLayout labelCol={8} wrapperCol={12}>
              <FormItem name="layout_1" label="字段3">
                <Row gutter={10}>
                  <Col span={6}>
                    <FormItem name="ddd" component={NumberPicker} />
                  </Col>
                  <Col span={18}>
                    <FormItem name="eee" component={DatePicker} />
                  </Col>
                </Row>
              </FormItem>
              <FormItem name="layout_2" title="对象字段">
                <Row gutter={10}>
                  <Col span={6}>
                    <FormItem
                      name="mmm.ddd1"
                      initialValue={123}
                      component={NumberPicker}
                    />
                  </Col>
                  <Col span={18}>
                    <FormItem
                      name="mmm.[startDate,endDate]"
                      component={DatePicker.RangePicker}
                    />
                  </Col>
                </Row>
              </FormItem>
            </FormLayout>
            <FormLayout labelCol={8} wrapperCol={16}>
              <FormItem name="layout_3" label="文本串联">
                <div style={{ display: 'flex' }}>
                  <span style={{ marginRight: 5 }}>定</span>
                  <FormItem
                    initialValue={10}
                    required
                    name="aa1"
                    style={{
                      width: 80
                    }}
                    help="简单描述"
                    component={Input}
                  />
                  <span style={{ margin: '0 5px' }}>元/票 退</span>
                  <FormItem
                    initialValue={20}
                    required
                    name="aa2"
                    help="简单描述"
                    component={NumberPicker}
                  />
                  <span style={{ margin: '0 5px' }}>元/票 改</span>
                  <FormItem
                    initialValue={30}
                    required
                    name="aa3"
                    help="简单描述"
                    component={NumberPicker}
                  />
                  <span style={{ margin: '0 5px' }}>元/票</span>
                </div>
              </FormItem>
            </FormLayout>
            <FormItem name="aas" label="字段4" component={Input} />​
            <Card title="区块">
              <FormItem name="ddd2" label="字段5" component={Input} />
              <FormItem name="eee2" label="字段6" component={Input} />
            </Card>
          </Card>
        </VirtualField>​<FormButtonGroup offset={8} sticky>
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
          <Button
            type="primary"
            onClick={() => setState({ editable: !state.editable })}
          >
            {state.editable ? '详情' : '编辑'}
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
      </Form>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 调用 actions.getFormGraph()可以直接查看实时表单状态树
- 节点状态树中是有可能存在 ReactNode，所以 JSON.stringify 打印的时候需要先将 ReactNode 转换一下，否则会报循环引用错误
