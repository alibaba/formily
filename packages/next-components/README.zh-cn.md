# @formily/next-components

### 安装

```bash
npm install --save @formily/next-components
```

### 显式加载组件

通过在`<SchemaForm>`传入 components，可以快速置入组件，表单字段通过`x-component`使用到内置的组件。

```tsx
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit
} from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

export default () => {
  return (
    <SchemaForm components={{ Input }}>
      <Field title="Text" name="text" x-component="Input" />
    </SchemaForm>
  )
}
```

### 使用内置组件

通过 `setup` 方法，可以快速置入内置的表单组件，免去维护全局`components`的工作。

```tsx
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit
} from '@formily/next'
import { setup } from '@formily/next-components'
import '@alifd/next/dist/next.css'

setup()
export default () => {
  return (
    <SchemaForm>
      <Field type="string" title="Text" name="text" />
    </SchemaForm>
  )
}
```

### 内置组件类型

通过 `setup`后，内置的表单字段有以下类型

| type 类型              | 对应组件                               | 描述           |
| :--------------------- | :------------------------------------- | :------------- |
| string                 | [Input](#Input)                        | 输入框组件     |
| string(有 enum 属性时) | [Select](#Select)                      | 选择框组件     |
| textarea               | [Textarea](#Textarea)                  | 多行输入框组件 |
| password               | [Password](#Password)                  | 密码输入框     |
| checkbox               | [CheckboxGroup](#Checkbox)             | Checkbox       |
| radio                  | [RadioGroup](#Radio)                   | Radio          |
| boolean                | [Switch](#Swicth)                      | 开关组件       |
| date                   | [DatePicker](#DatePicker)              | 日期选择器     |
| time                   | [TimePicker](#TimePicker)              | 时间选择器     |
| daterange              | [DatePicker.RangePicker](#RangePicker) | 范围日期选择器 |
| rating                 | [Rating](#Rating)                      | 评价组件       |
| object                 |                                        | 嵌套表单       | 自动连接路径信息 |
| array                  | [ArrayCards](#ArrayCards)（默认）      | 表单数组       | 表单数组 |

#### Input

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Input
      }}
      schema={{
        type: 'object',
        properties: {
          string: {
            title: 'String',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: 'input'
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Input
      }}
    >
      <Field
        required
        title="Text"
        name="text"
        x-component="Input"
        x-component-props={{
          placeholder: 'input'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem label="String" name="string" component={Input} />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Select

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Select } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Select
      }}
      schema={{
        type: 'object',
        properties: {
          simpleSelect: {
            title: 'Simple Select',
            enum: ['1', '2', '3', '4'],
            'x-component': 'Select',
            'x-component-props': {
              placeholder: 'select'
            }
          },
          objSelect: {
            title: 'Object Select',
            'x-component': 'Select',
            enum: [
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3' },
              { label: 'Four', value: '4' }
            ],
            'x-component-props': {
              placeholder: 'select'
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Select } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Select
      }}
    >
      <Field
        x-component="Select"
        enum={['1', '2', '3', '4']}
        required
        title="Simple Select"
        name="simpleSelect"
        x-component-props={{
          placeholder: 'select'
        }}
      />
      <Field
        x-component="Select"
        enum={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
        required
        title="Object Select"
        name="objSelect"
        x-component-props={{
          placeholder: 'select'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Select } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="Simple Select"
        name="simpleSelect"
        component={Select}
        dataSource={['1', '2', '3', '4']}
      />
      <FormItem
        label="Object Select"
        name="objSelect"
        component={Select}
        dataSource={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### TextArea

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        TextArea: Input.TextArea
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'String',
            'x-component': 'TextArea',
            'x-component-props': {
              placeholder: 'textarea'
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ TextArea: Input.TextArea }}>
      <Field
        x-component="TextArea"
        title="TextArea"
        name="textarea"
        x-component-props={{
          placeholder: 'textarea'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem label="TextArea" name="textarea" component={Input.TextArea} />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Password

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Password } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Password
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'Password',
            'x-component': 'Password',
            'x-component-props': {
              placeholder: 'Password'
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Password } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ Password }}>
      <Field
        x-component="Password"
        title="Password"
        name="Password"
        x-component-props={{
          placeholder: 'Password'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Password } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem label="Password" name="Password" component={Password} />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### NumberPicker

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { NumberPicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        NumberPicker
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'NumberPicker',
            'x-component': 'NumberPicker'
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { NumberPicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ NumberPicker }}>
      <Field
        x-component="NumberPicker"
        title="NumberPicker"
        name="NumberPicker"
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { NumberPicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="NumberPicker"
        name="NumberPicker"
        component={NumberPicker}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Switch

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Switch } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Switch
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'Switch',
            'x-component': 'Switch'
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Switch } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ Switch }}>
      <Field x-component="Switch" title="Switch" name="Switch" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Switch } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem label="Switch" name="Switch" component={Switch} />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### DatePicker

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        DatePicker
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'DatePicker',
            'x-component': 'DatePicker',
            'x-component-props': {
              format: 'YYYY-MM-DD HH:mm:ss'
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ DatePicker }}>
      <Field
        x-component="DatePicker"
        title="DatePicker"
        name="DatePicker"
        x-component-props={{
          format: 'YYYY-MM-DD HH:mm:ss'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="DatePicker"
        name="DatePicker"
        component={DatePicker}
        format={'YYYY-MM-DD HH:mm:ss'}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### RangePicker

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        RangePicker: DatePicker.RangePicker
      }}
      schema={{
        type: 'object',
        properties: {
          '[start,end]': {
            title: 'RangePicker',
            'x-component': 'RangePicker'
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ RangePicker: DatePicker.RangePicker }}>
      <Field x-component="RangePicker" title="RangePicker" name="[start,end]" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="RangePicker"
        name="[start,end]"
        component={DatePicker.RangePicker}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### WeekPicker

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        WeekPicker: DatePicker.WeekPicker
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'WeekPicker',
            'x-component': 'WeekPicker'
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ WeekPicker: DatePicker.WeekPicker }}>
      <Field x-component="WeekPicker" title="WeekPicker" name="WeekPicker" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="WeekPicker"
        name="WeekPicker"
        component={DatePicker.WeekPicker}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### MonthPicker

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        MonthPicker: DatePicker.MonthPicker
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'MonthPicker',
            'x-component': 'MonthPicker'
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ MonthPicker: DatePicker.MonthPicker }}>
      <Field x-component="MonthPicker" title="MonthPicker" name="MonthPicker" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="MonthPicker"
        name="MonthPicker"
        component={DatePicker.MonthPicker}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### YearPicker

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        YearPicker: DatePicker.YearPicker
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'YearPicker',
            'x-component': 'YearPicker'
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ YearPicker: DatePicker.YearPicker }}>
      <Field x-component="YearPicker" title="YearPicker" name="YearPicker" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="YearPicker"
        name="YearPicker"
        component={DatePicker.YearPicker}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### TimePicker

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { TimePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        TimePicker
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'TimePicker',
            'x-component': 'TimePicker',
            'x-component-props': {
              format: 'YYYY-MM-DD HH:mm:ss'
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { TimePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ TimePicker }}>
      <Field
        x-component="TimePicker"
        title="TimePicker"
        name="TimePicker"
        x-component-props={{
          format: 'YYYY-MM-DD HH:mm:ss'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { TimePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem label="TimePicker" name="TimePicker" component={TimePicker} />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Range

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Range } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Range
      }}
      schema={{
        type: 'object',
        properties: {
          textarea: {
            title: 'Range',
            'x-component': 'Range',
            'x-component-props': {
              min: 0,
              max: 1024,
              marks: [0, 1024]
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Range } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ Range }}>
      <Field
        x-component="Range"
        title="Range"
        name="Range"
        x-component-props={{
          min: 0,
          max: 1024,
          marks: [0, 1024]
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Range } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="Range"
        name="Range"
        component={Range}
        min={0}
        max={1024}
        marks={[0, 1024]}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Upload

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Upload } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Upload
      }}
      schema={{
        type: 'object',
        properties: {
          upload1: {
            title: 'Card Upload',
            'x-component': 'Upload',
            'x-component-props': {
              listType: 'card'
            }
          },
          upload2: {
            title: 'Dragger Upload',
            'x-component': 'Upload',
            'x-component-props': {
              listType: 'dragger'
            }
          },
          upload3: {
            title: 'Text Upload',
            'x-component': 'Upload',
            'x-component-props': {
              listType: 'text'
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Upload } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm components={{ Upload }}>
      <Field
        x-component="Upload"
        title="Card Upload"
        name="upload1"
        x-component-props={{
          listType: 'card'
        }}
      />
      <Field
        x-component="Upload"
        title="Dragger Upload"
        name="upload2"
        x-component-props={{
          listType: 'dragger'
        }}
      />
      <Field
        x-component="Upload"
        title="Text Upload"
        name="upload3"
        x-component-props={{
          listType: 'text'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Upload } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="Card Upload"
        name="upload1"
        component={Upload}
        listType="card"
      />
      <FormItem
        label="Dragger Upload"
        name="upload2"
        component={Upload}
        listType="dragger"
      />
      <FormItem
        label="Text Upload"
        name="upload3"
        component={Upload}
        listType="text"
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Checkbox

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Checkbox } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Checkbox,
        CheckboxGroup: Checkbox.Group
      }}
      schema={{
        type: 'object',
        properties: {
          checkbox: {
            title: 'Simple Checkbox',
            'x-component': 'CheckboxGroup',
            enum: ['1', '2', '3', '4']
          },
          checkbox2: {
            title: 'Object Checkbox',
            'x-component': 'CheckboxGroup',
            enum: [
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3' },
              { label: 'Four', value: '4' }
            ]
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Checkbox } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Checkbox,
        CheckboxGroup: Checkbox.Group
      }}
    >
      <Field
        x-component="CheckboxGroup"
        title="Simple Checkbox"
        name="Checkbox"
        enum={['1', '2', '3', '4']}
      />
      <Field
        x-component="CheckboxGroup"
        title="Object Checkbox"
        name="Checkbox2"
        enum={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Checkbox } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="Simple Checkbox"
        name="Checkbox"
        component={Checkbox.Group}
        dataSource={['1', '2', '3', '4']}
      />
      <FormItem
        label="Object Checkbox"
        name="Checkbox2"
        component={Checkbox.Group}
        dataSource={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Radio

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Radio } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Radio,
        RadioGroup: Radio.Group
      }}
      schema={{
        type: 'object',
        properties: {
          radio: {
            title: 'Simple Radio',
            'x-component': 'RadioGroup',
            enum: ['1', '2', '3', '4']
          },
          radio2: {
            title: 'Object Radio',
            'x-component': 'RadioGroup',
            enum: [
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3' },
              { label: 'Four', value: '4' }
            ]
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Radio } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Radio,
        RadioGroup: Radio.Group
      }}
    >
      <Field
        x-component="RadioGroup"
        title="Simple Radio"
        name="Radio"
        enum={['1', '2', '3', '4']}
      />
      <Field
        title="Object Radio"
        name="Radio2"
        x-component="RadioGroup"
        enum={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Radio } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="Simple Radio"
        name="Radio"
        component={Radio.Group}
        dataSource={['1', '2', '3', '4']}
      />
      <FormItem
        label="Object Radio"
        name="Radio2"
        component={Radio.Group}
        dataSource={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Rating

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Rating } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Rating
      }}
      schema={{
        type: 'object',
        properties: {
          rating: {
            title: 'Rating',
            'x-component': 'Rating',
            'x-component-props': {
              allowHalf: true
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Rating } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Rating
      }}
    >
      <Field
        x-component="Rating"
        title="Simple Rating"
        name="Rating"
        x-component-props={{
          allowHalf: true
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Rating } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem label="Rating" name="Rating" component={Rating} allowHalf />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Transfer

- JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { Transfer } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Transfer
      }}
      schema={{
        type: 'object',
        properties: {
          transfer: {
            title: 'Transfer',
            'x-component': 'Transfer',
            enum: [
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3' },
              { label: 'Four', value: '4' }
            ],
            'x-component-props': {
              showSearch: true
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/next'
import { Transfer } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Transfer
      }}
    >
      <Field
        x-component="Transfer"
        title="Transfer"
        name="Transfer"
        enum={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
        x-component-props={{
          showSearch: true
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

- 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Transfer } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem
        label="Transfer"
        name="Transfer"
        component={Transfer}
        dataSource={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
        showSearch
      />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Array Components

#### ArrayCards

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/next'
import {
  Input,
  ArrayCards,
  DatePicker,
  FormBlock,
  FormItemGrid,
  FormLayout
} from '@formily/next-components'
import '@alifd/next/dist/next.css'
import Printer from '@formily/printer'

const App = () => (
  <Printer>
    <SchemaForm
      components={{
        Input,
        ArrayCards,
        RangePicker: DatePicker.RangePicker
      }}
    >
      <Field
        name="array"
        maxItems={3}
        type="array"
        x-component="ArrayCards"
        x-component-props={{
          title: '这是卡片标题',
          renderAddition: '这是定制的添加文案',
          renderRemove: '这是定制的删除文案'
        }}
      >
        <Field type="object">
          <FormLayout labelCol={6} wrapperCol={8}>
            <Field
              name="aa"
              x-component="Input"
              description="hello world"
              title="字段1"
            />
            <Field name="bb" x-component="Input" title="字段2" />
            <Field name="cc" x-component="Input" title="字段3" />
            <Field name="dd" x-component="Input" title="字段4" />
            <Field name="dd" x-component="Input" title="字段5" />
            <Field name="ee" x-component="Input" title="字段6" />
            <Field name="ff" x-component="Input" title="字段7" />
            <Field name="gg" x-component="RangePicker" title="字段8" />
          </FormLayout>
          <Field
            name="array"
            maxItems={3}
            type="array"
            x-component="ArrayCards"
            x-component-props={{ title: '这是卡片标题' }}
          >
            <Field type="object">
              <FormLayout labelCol={6} wrapperCol={8}>
                <Field
                  name="aa"
                  x-component="Input"
                  description="hello world"
                  title="字段1"
                />
                <Field name="bb" x-component="Input" title="字段2" />
                <Field name="cc" x-component="Input" title="字段3" />
                <Field name="dd" x-component="Input" title="字段4" />
                <Field name="dd" x-component="Input" title="字段5" />
                <Field name="ee" x-component="Input" title="字段6" />
                <Field name="ff" x-component="Input" title="字段7" />
                <Field name="gg" x-component="RangePicker" title="字段8" />
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

#### ArrayTable

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/next'
import {
  Input,
  ArrayTable,
  DatePicker,
  FormBlock,
  FormItemGrid,
  FormLayout
} from '@formily/next-components'
import '@alifd/next/dist/next.css'
import Printer from '@formily/printer'

const App = () => (
  <Printer>
    <SchemaForm
      components={{
        ArrayTable,
        Input,
        RangePicker: DatePicker.RangePicker
      }}
    >
      <FormLayout>
        <Field
          title="数组"
          name="array"
          maxItems={3}
          type="array"
          x-component="ArrayTable"
          x-component-props={{
            renderExtraOperations() {
              return <div>Hello worldasdasdasdasd</div>
            },
            operationsWidth: 300
          }}
        >
          <Field type="object">
            <Field
              name="aa"
              x-component="Input"
              description="hello world"
              title="字段1"
            />
            <Field name="bb" x-component="Input" title="字段2" />
            <Field name="cc" x-component="Input" title="字段3" />
            <Field name="dd" x-component="Input" title="字段4" x-index={1} />
            <Field name="ee" x-component="Input" title="字段5" />
            <Field name="ff" x-component="Input" title="字段6" />
            <Field name="gg" x-component="Input" title="字段7" />
            <Field name="hh" x-component="RangePicker" title="字段8" />
          </Field>
        </Field>
      </FormLayout>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### Layout Components

#### MegaLayout

**Scehma引入方式**

```tsx
import { FormMegaLayout } from '@formily/next-components'
```

**JSX引入方式**

```tsx
import { MegaLayout } from '@formily/next-components'
```

- MegaLayout属性一览

| 字段名     | 描述           | 类型                   | 默认值  |
| :--------- | :------------- | :--------------------- | :------ |
| labelAlign | label 对齐方式 | `left`, `right`, `top` | `right` |
| full   | 表单组件是否撑满 | boolean | false  |
| labelCol   | label 所占列数   | number(0-24) |        |
| wrapperCol | wrapper 所占列数 | number(0-24) |        |
| labelWidth   | label 宽度   | number |        |
| wrapperWidth | wrapper 宽度 | number |        |
| addonBefore  | FormMegaLayout 前辅助文案   | any  |        |
| addonAfter   | FormMegaLayout 后辅助文案   | any  |        |
| description | FormMegaLayout 底部辅助文案 | any  |        |
| inline | 是否启用行内布局 | boolean | false  |
| inset | 是否启用内嵌布局 | boolean | false  |
| hasBorder | 内嵌布局情况下，是否显示边框 | boolean | true  |
| grid    | 是否启用栅格布局 | boolean | false  |
| columns | 栅格布局总共列数 | number  | 3      |
| autoRow | 是否自动换行     | boolean | false  |
| responsive.s  | 媒体查询断点，视口宽度 <=720px，响应式栅格             | Number | Column 值 |
| responsive.m  | 媒体查询断点，720px <= 视口宽度 <= 1200px ，响应式栅格 | Number | Column 值 |
| responsive.lg | 媒体查询断点，视口宽度 >=1200px，响应式栅格            | Number | Column 值 |
| layoutProps.labelCol | 改变自身布局属性, wrapper 比例 | number(0-24) |        |
| layoutProps.wrapperCol | 改变自身布局属性, label 比例 | number(0-24) |        |
| layoutProps.labelWidth | 改变自身布局属性, label 宽度 | number |        |
| layoutProps.wrapperWidth | 改变自身布局属性, wrapper 宽度 | number |        |
| layoutProps.labelAlign | 改变自身label对齐方式 | 'right', 'left', 'top' |        |

- Schema字段对应属性一览

> JSX模式下，属性名前缀为 `mega-props` , Schema模式下则为 `x-mega-props`

| 字段名     | 描述           | 类型                   | 默认值  |
| :--------- | :------------- | :--------------------- | :------ |
| ['x-mega-props'].labelAlign | label 对齐方式 | `left`, `right`, `top` | `right` |
| ['x-mega-props'].full   | 表单组件是否撑满 | boolean | false  |
| ['x-mega-props'].hasBorder   | 内嵌布局情况下，是否显示边框 | boolean | true  |
| ['x-mega-props'].labelCol   | label 所占列数   | number(0-24) |        |
| ['x-mega-props'].wrapperCol | wrapper 所占列数 | number(0-24) |        |
| ['x-mega-props'].labelWidth   | label 宽度   | number |        |
| ['x-mega-props'].wrapperWidth | wrapper 宽度 | number |        |
| ['x-mega-props'].addonBefore  | FormMegaLayout 前辅助文案   | any  |        |
| ['x-mega-props'].addonAfter   | FormMegaLayout 后辅助文案   | any  |        |
| ['x-mega-props'].description | FormMegaLayout 底部辅助文案 | any  |        |
| ['x-mega-props'].span | 所占列数 | number | 1      |

#### FormCard

> FormCard 组件 Props, 完全继承自 [CardProps](#CardProps)。
> FormCard 与[FormBlock](#FormBlock) 唯一区别是样式上是否有框

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { FormCard, Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm components={{ Input }}>
    <FormCard title="block">
      <Field x-component="Input" name="username" title="username" />
    </FormCard>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### FormBlock

> FormBlock 组件 Props, 完全继承自 [CardProps](#CardProps)

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import { FormBlock, Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm components={{ Input }}>
    <FormBlock title="block">
      <Field x-component="Input" name="username" title="username" />
    </FormBlock>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### FormStep

> FormStep 组件 Props

- IFormStep

| 参数           | 说明                  | 类型                                               | 默认值 |
| :------------- | :-------------------- | :------------------------------------------------- | :----- |
| dataSource     | 分步配置              | StepItemProps[]                                    |        |
| current        | 当前步骤              | number                                             |        |
| direction      | 展示方向              | 'hoz' `or` 'ver'                                   |        |
| labelPlacement | 横向布局时的内容排列  | 'hoz' `or` 'ver'                                   |        |
| shape          | 类型                  | 'circle' `or` 'arrow' `or` 'dot'                   |        |
| readOnly       | 是否只读模式          | boolean                                            |        |
| animation      | 是否开启动效          | boolean                                            |        |
| itemRender     | StepItem 的自定义渲染 | (index: number, status: string) => React.ReactNode |        |

**用法**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  Submit,
  FormButtonGroup,
  FormEffectHooks,
  createFormActions,
  Reset
} from '@formily/next'
import {
  Input,
  FormGridRow,
  FormItemGrid,
  FormGridCol,
  FormPath,
  FormLayout,
  FormBlock,
  FormCard,
  FormTextBox,
  FormStep
} from '@formily/next-components'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const { onFormInit$ } = FormEffectHooks

const actions = createFormActions()

let cache = {}

export default () => (
  <SchemaForm
    components={{
      Input
    }}
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
      <Field name="a1" required title="A1" x-component="Input" />
    </FormCard>
    <FormCard name="step-2" title="Step2">
      <Field name="a2" required title="A2" x-component="Input" />
    </FormCard>
    <FormCard name="step-3" title="Step3">
      <Field name="a3" required title="A3" x-component="Input" />
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

#### FormTab

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
} from '@formily/next'
import { Input, FormTab } from '@formily/next-components'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

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

#### FormLayout

- IFormItemTopProps

| 参数       | 说明                                                                                                 | 类型    | 默认值 |
| :--------- | :--------------------------------------------------------------------------------------------------- | :------ | :----- |
| inline     | 是否行内模式                                                                                         | boolean |        |
| labelCol   | label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效 | `{}`    |        |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol                                            | `{}`    |

**用法**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  Submit,
  FormButtonGroup,
  Reset
} from '@formily/next'
import {
  Input,
  NumberPicker,
  DatePicker,
  FormTextBox,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/next-components'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const App = () => (
  <Printer>
    <SchemaForm
      components={{
        Input,
        NumberPicker,
        DatePicker
      }}
    >
      <FormLayout labelCol={8} wrapperCol={6}>
        <Field name="aaa" x-component="Input" title="字段1" />
        <Field name="bbb" x-component="NumberPicker" title="字段2" />
        <Field name="ccc" x-component="DatePicker" title="字段3" />
      </FormLayout>
      <FormButtonGroup offset={8}>
        <Submit>提交</Submit>​ <Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### FormItemGrid

- IFormItemGridProps

| 参数           | 说明                                                                                                        | 类型                                  | 默认值                            |
| :------------- | :---------------------------------------------------------------------------------------------------------- | :------------------------------------ | :-------------------------------- |
| cols           | 列数                                                                                                        | Array<number                          | { span: number; offset: number }> |  |
| gutter         | 列间距离                                                                                                    | number                                |                                   |
| labelCol       | label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效        | `{}`                                  |                                   |
| wrapperCol     | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol                                                   | `{}`                                  |
| help           | 自定义提示信息，如不设置，则会根据校验规则自动生成.                                                         | React.ReactNode                       |                                   |
| extra          | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 位于错误信息后面           | React.ReactNode                       |                                   |
| validateState  | 校验状态，如不设置，则会根据校验规则自动生成                                                                | 'error' `or` 'success' `or` 'loading' |                                   |
| hasFeedback    | 配合 validateState 属性使用，是否展示 success/loading 的校验状态图标, 目前只有 Input 支持                   | boolean                               |                                   |
| size           | 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效 | 'large' `or` 'small' `or` 'medium'    |                                   |
| labelAlign     | 标签的位置                                                                                                  | 'top' `or` 'left' `or` 'inset'        |                                   |
| labelTextAlign | 标签的左右对齐方式                                                                                          | 'left' `or` 'right'                   |                                   |
| asterisk       | required 的星号是否显示                                                                                     | boolean                               |                                   |

**用法**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  Submit,
  FormButtonGroup,
  Reset
} from '@formily/next'
import {
  Input,
  FormTextBox,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/next-components'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const App = () => (
  <Printer>
    <SchemaForm
      components={{
        Input
      }}
      onSubmit={v => console.log(v)}
    >
      <FormItemGrid gutter={20}>
        <Field x-component="Input" name="a1" title="field1" />
        <Field x-component="Input" name="a2" title="field2" />
        <Field x-component="Input" name="a3" title="field3" />
        <Field x-component="Input" name="a4" title="field4" />
      </FormItemGrid>
      <FormItemGrid gutter={20} cols={[6, 6]}>
        <Field x-component="Input" name="a5" title="field5" />
        <Field x-component="Input" name="a6" title="field6" />
      </FormItemGrid>
      <FormButtonGroup style={{ minWidth: 150 }}>
        ​<Submit>提交</Submit>​<Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### FormTextBox

- IFormTextBox

| 参数        | 说明       | 类型            | 默认值 |
| :---------- | :--------- | :-------------- | :----- |
| text        | 文案       | string          |        |
| gutter      | 文案间距离 | number          |        |
| title       | 标题       | React.ReactText |        |
| description | 描述       | React.ReactText |        |

**用法**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  Submit,
  FormButtonGroup,
  Reset
} from '@formily/next'
import {
  Input,
  NumberPicker,
  FormTextBox,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/next-components'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm
        components={{
          Input,
          NumberPicker
        }}
        labelCol={8}
        wrapperCol={6}
        onSubmit={v => console.log(v)}
      >
        <FormCard title="FormTextBox">
          <FormLayout labelCol={8} wrapperCol={16}>
            <FormTextBox
              title="text label"
              text="prefix%suffix prefix2%suffix2 prefix3%suffix3"
              gutter={8}
            >
              <Field
                x-component="Input"
                default={10}
                required
                name="aa1"
                x-component-props={{ style: { width: 80 } }}
                description="desc1"
              />
              <Field
                x-component="NumberPicker"
                default={20}
                required
                name="aa2"
                description="desc2"
              />
              <Field
                x-component="NumberPicker"
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
