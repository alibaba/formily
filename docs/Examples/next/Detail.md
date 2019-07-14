# 表单详情

> 该案例默认不显示数据，用来体现缺省状态，如果想查看有数据的形式，点击加载详情数据按钮即可

#### Demo 示例

```jsx
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
  FormPath,
  FormBlock,
  FormLayout,
  createFormActions
} from '@uform/next'
import { Button } from '@alifd/next'
import Printer from '@uform/printer'
import '@alifd/next/dist/next.css'
const actions = createFormActions()

const App = () => {
  const [state, setState] = useState({ editable: false })
  return (
    <Printer>
      <SchemaForm
        actions={actions}
        onChange={values=>setState(values)}
        initialValues={state.value}
        editable={state.editable}
        labelCol={7}
        wrapperCol={12}
      >
        <FormCard title="aaa" name="card1">
          <FormCard title="aaa" name="card">
            <Field
              type="string"
              name="string"
              required
              title="字符串"
              x-props={{
                addonTextAfter: '%'
              }}
            />
            <Field
              type="radio"
              enum={[
                { label: '选项1', value: '1' },
                { label: '选项2', value: '2' },
                { label: '选项3', value: '3' },
                { label: '选项4', value: '4' }
              ]}
              required
              title="Radio"
              name="radio"
            />
            <Field
              type="string"
              enum={[
                { label: '选项1', value: '1' },
                { label: '选项2', value: '2' },
                { label: '选项3', value: '3' },
                { label: '选项4', value: '4' }
              ]}
              required
              title="Select单选"
              name="select"
            />
          </FormCard>
        </FormCard>
        <FormCard title="bbbb">
          <Field
            type="string"
            enum={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
              { label: '选项3', value: '3' },
              { label: '选项4', value: '4' }
            ]}
            required
            title="Select多选"
            x-props={{ multiple: true }}
            name="multiselect"
          />
          <Field
            type="checkbox"
            enum={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
              { label: '选项3', value: '3' },
              { label: '选项4', value: '4' }
            ]}
            required
            title="Checkbox"
            name="checkbox"
          />
        </FormCard>
        <Field type="number" title="数字选择" name="number" />
        <Field type="boolean" title="开关选择" name="boolean" />
        <Field type="date" title="日期选择" name="date" />
        <Field type="daterange" title="日期范围" name="daterange" />
        <Field type="year" title="年份" name="year" />
        <Field type="time" title="时间" name="time" />
        <Field
          type="upload"
          title="卡片上传文件"
          name="upload"
          x-props={{
            listType: 'card',
            action:
              'https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload'
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
          <Button
            type="primary"
            onClick={() => setState({ editable: !state.editable })}
          >
            {!state.editable ? '编辑' : '详情'}
          </Button>
          <Button
            onClick={() => {
              setState({
                value: {
                  string: 200,
                  radio: '1',
                  select: '2',
                  multiselect: ['2', '3'],
                  checkbox: ['1', '2'],
                  number: 123333,
                  boolean: true,
                  date: '2018-11-30',
                  daterange: ['2018-11-30', '2019-01-02'],
                  year: '2018',
                  time: '22:00:00',
                  upload: [
                    {
                      downloadURL:
                        '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png',
                      imgURL:
                        '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png',
                      name: 'doc.svg'
                    }
                  ],
                  range: 200,
                  rating: 3
                }
              })
            }}
          >
            加载详情数据
          </Button>
          <Button
            onClick={() => {
              actions.validate()
            }}
          >
            手动触发校验
          </Button>
          <Reset >值重置</Reset>
          <Button
            onClick={() => {
              actions.reset({validate:false})
            }}
          >
            无错重置
          </Button>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
