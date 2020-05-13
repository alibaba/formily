# react-schema-editor

react-schema-editor is a UI tool for build form schema.

## Usage

```
npm install @formily/react-schema-editor -S
```

## Demo

```jsx
import React from 'react'
import { SchemaEditor } from './src'

function SchemaEditorDemo() {
  const [schema, setSchema] = React.useState({
    type: 'object',
    properties: {
      string: {
        type: 'string',
        'x-component': 'Input',
        title: 'String'
      },
      radio: {
        type: 'string',
        'x-component': 'Radio',
        'x-component-props': {
          options: ['1', '2', '3', '4']
        },
        title: 'Radio'
      },
      select: {
        type: 'string',
        'x-component': 'Select',
        'x-component-props': {
          options: [
            {
              label: 'Jack',
              key: 'jack',
              value: 'jack'
            },
            {
              label: 'Rose',
              key: 'rose',
              value: 'rose'
            },
            {
              label: 'Others',
              key: 'others',
              value: 'others'
            }
          ]
        },
        title: 'Select'
      },
      checkbox: {
        type: 'string',
        'x-component': 'Checkbox',
        'x-component-props': {
          options: ['Apple', 'Pear', 'Orange']
        },
        title: 'Checkbox'
      },
      textarea: {
        type: 'string',
        'x-component': 'Textarea',
        title: 'TextArea'
      },
      number: {
        type: 'number',
        'x-component': 'InputNumber',
        title: '数字选择'
      },
      boolean: {
        type: 'boolean',
        'x-component': 'Switch',
        title: '开关选择'
      },
      date: {
        type: 'string',
        'x-component': 'DatePicker',
        title: '日期选择'
      },
      daterange: {
        type: 'object',
        'x-component': 'DateRangePicker',
        title: '日期范围'
      },
      year: {
        type: 'string',
        'x-component': 'YearPicker',
        title: '年份'
      },
      month: {
        type: 'string',
        'x-component': 'MonthPicker',
        title: '月份'
      },
      time: {
        type: 'string',
        'x-component': 'TimePicker',
        title: '时间'
      },
      week: {
        type: 'string',
        'x-component': 'WeekPicker',
        title: '周'
      },
      upload: {
        type: 'array',
        'x-component': 'Upload',
        'x-component-props': {
          fileList: [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url:
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            },
            {
              uid: '-2',
              name: 'image.png',
              status: 'done',
              url:
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            },
            {
              uid: '-3',
              name: 'image.png',
              status: 'done',
              url:
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            },
            {
              uid: '-4',
              name: 'image.png',
              status: 'done',
              url:
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            },
            {
              uid: '-5',
              name: 'image.png',
              status: 'error'
            }
          ],
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          listType: 'picture-card'
        },
        title: '卡片上传文件'
      },
      range: {
        type: 'number',
        'x-component': 'Range',
        title: '范围选择'
      },
      transfer: {
        type: 'number',
        'x-component': 'Transfer',
        'x-component-props': {
          dataSource: [
            {
              key: '1',
              title: '选项1'
            },
            {
              key: '2',
              title: '选项2'
            }
          ]
        },
        title: '穿梭框'
      },
      rating: {
        type: 'number',
        'x-component': 'Rate',
        title: '等级'
      }
    }
  })

  // return <div>Hello</div>
  return <SchemaEditor schema={schema} onChange={setSchema} />
}

ReactDOM.render(<SchemaEditorDemo />, document.getElementById('root'))
```
