# @formily/next-components

### 安装

```bash
npm install --save @formily/next-components
```

### 手动维护组件

通过在`<SchemaForm>`传入components，可以快速置入组件，表单字段通过`x-component`使用到内置的组件。

```tsx
import { SchemaForm, SchemaMarkupField as Field, FormButtonGroup, Submit } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

export default () => {
  return (
    <SchemaForm
      components={{ Input }}
    >
      <Field
        title="Text"
        name="text"
        x-component="Input"
      />
    </SchemaForm>
  )
}

```

### 使用内置组件

通过 `setup` 方法，可以快速置入内置的表单组件，免去维护全局`components`的工作。

```tsx
import { SchemaForm, SchemaMarkupField as Field, FormButtonGroup, Submit } from '@formily/next'
import { setup } from '@formily/next-components'
import '@alifd/next/dist/next.css'

setup()
export default () => {
  return (
    <SchemaForm>
      <Field
        type="string"
        title="Text"
        name="text"
      />
    </SchemaForm>
  )
}

```

### 内置组件类型

通过 `setup`后，内置的表单字段有以下类型

| type类型       | 对应组件                             | 描述                 |
|:--------------|:----------------------------------|:----------------------|
| string   | Input                     | 输入框组件         |
| string(有enum属性时)   | Select                     | 选择框组件         |
| textarea   | Input.Textarea                     | 多行输入框组件         |
| password   | Password                     | 密码输入框         |
| checkbox   | CheckboxGroup                     | Checkbox         |
| radio   | RadioGroup                     | Radio         |
| boolean   | Switch                     | 开关组件         |
| date   | DatePicker                     | 日期选择器         |
| time   | TimePicker                     | 时间选择器         |
| daterange   | DatePicker x 2                     | 范围日期选择器         |
| rating   | Rating                     | 评价组件         |
| object   |                      | 嵌套表单         | 自动连接路径信息
| array   |                      | 表单数组         | 表单数组


#### Input

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Input,
      }}
      schema={{
        type: 'object',
        properties: {
          string: {
            title: 'String',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: 'input'
            },
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Input,
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
} from '@formily/next'
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

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
import { Select } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Select,
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
            },
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
            },
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { Select } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Select,
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
} from '@formily/next'
import { Select } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Form>
      <FormItem label="Simple Select" name="simpleSelect" component={Select}
        enum={['1', '2', '3', '4']}
      />
      <FormItem label="Object Select" name="objSelect" component={Select} 
        enum={[
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

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
            },
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{ TextArea: Input.TextArea }}
    >
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="TextArea" name="textarea" component={Input.TextArea} />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Password

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
            },
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { Password } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{ Password }}
    >
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Password } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="Password" name="Password" component={Password} />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### NumberPicker

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
            'x-component': 'NumberPicker',
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { NumberPicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{ NumberPicker }}
    >
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { NumberPicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="NumberPicker" name="NumberPicker" component={NumberPicker} />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```


#### Switch

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
            'x-component': 'Switch',
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { Switch } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{ Switch }}
    >
      <Field
        x-component="Switch"
        title="Switch"
        name="Switch"
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Switch } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="Switch" name="Switch" component={Switch} />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### DatePicker

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
            },
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{ DatePicker }}
    >
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { DatePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="DatePicker" name="DatePicker" component={DatePicker} format={'YYYY-MM-DD HH:mm:ss'} />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### time

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
            },
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { TimePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{ TimePicker }}
    >
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { TimePicker } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="TimePicker" name="TimePicker" component={TimePicker} format={'YYYY-MM-DD HH:mm:ss'} />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Range

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { Range } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{ Range }}
    >
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Range } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="Range" name="Range"
      component={Range}
      min={0}
      max={1024}
      marks={[0, 1024]}
    />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Upload

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { Upload } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{ Upload }}
    >
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Upload } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="Card Upload" name="upload1"
      component={Upload}
      listType="card"
    />
    <FormItem label="Dragger Upload" name="upload2"
      component={Upload}
      listType="dragger"
    />
    <FormItem label="Text Upload" name="upload3"
      component={Upload}
      listType="text"
    />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Checkbox

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
import { Checkbox } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Checkbox,
        CheckboxGroup: Checkbox.Group,
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
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { Checkbox } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Checkbox,
        CheckboxGroup: Checkbox.Group,
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Checkbox } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="Simple Checkbox" name="Checkbox"
      component={Checkbox.Group}
      dataSource={['1', '2', '3', '4']}
    />
    <FormItem label="Object Checkbox" name="Checkbox2"
      component={Checkbox.Group}
      dataSource={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
    />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Radio

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
import { Radio } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Radio,
        RadioGroup: Radio.Group,
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
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/next'
import { Radio } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Radio,
        RadioGroup: Radio.Group,
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Radio } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="Simple Radio" name="Radio"
      component={Radio.Group}
      dataSource={['1', '2', '3', '4']}
    />
    <FormItem label="Object Radio" name="Radio2"
      component={Radio.Group}
      dataSource={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
    />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Rating

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Rating } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="Rating" name="Rating"
      component={Rating}
      allowHalf
    />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Transfer

* JSON Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/next'
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
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

* JSX Schema 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
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

* 纯 JSX(源码) 方式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem } from '@formily/next'
import { Transfer } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (<Form>
    <FormItem label="Transfer" name="Transfer"
      component={Transfer}
      dataSource={[
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' }
      ]}
      showSearch
    />
  </Form>)
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Array Components

#### array

```jsx
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm,
  Field, 
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/next'
import {
  setup,
  FormBlock,
  FormItemGrid,
  FormLayout } from '@formily/next-components'
import '@alifd/next/dist/next.css'
import Printer from '@formily/printer'

setup()


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

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm,
  Field, 
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/next'
import {
  setup,
  FormBlock,
  FormItemGrid,
  FormLayout } from '@formily/next-components'
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

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm,
  Field, 
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/next'
import {
  setup,
  FormBlock,
  FormItemGrid,
  FormLayout } from '@formily/next-components'
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

#### `<FormBlock/>`

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

#### `<FormStep/>`

> FormStep 组件 Props

* IFormStep

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| dataSource    | 分步配置                 | StepItemProps[] |                |
| current    | 当前步骤                 | number |                |
| direction    | 展示方向                 | 'hoz' `|` 'ver' |                |
| labelPlacement    | 横向布局时的内容排列                 | 'hoz' `|` 'ver' |                |
| shape    | 类型                 | 'circle' `|` 'arrow' `|` 'dot' |                |
| readOnly    | 是否只读模式                 | boolean |                |
| animation    | 是否开启动效                 | boolean |                |
| itemRender    | StepItem 的自定义渲染                 | (index: number, status: string) => React.ReactNode |                |


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

#### `<FormLayout/>`

* IFormItemTopProps

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| inline    | 是否行内模式                 | boolean |                |
| labelCol    |label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效                  | `{}` |                |
| wrapperCol    |需要为输入控件设置布局样式时，使用该属性，用法同 labelCol                  | `{}` | 


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
    <SchemaForm components={{
      Input,
      NumberPicker,
      DatePicker
    }}>
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

#### `<FormItemGrid/>`

* IFormItemGridProps

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| cols    | 列数                 | Array<number | { span: number; offset: number }> |                |
| gutter    |列间距离                  | number |                |
| labelCol    |label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效                  | `{}` |                |
| wrapperCol    |需要为输入控件设置布局样式时，使用该属性，用法同 labelCol                  | `{}` | 
| help    |自定义提示信息，如不设置，则会根据校验规则自动生成.                | React.ReactNode | |
| extra    |额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 位于错误信息后面 | React.ReactNode | |
| validateState    |校验状态，如不设置，则会根据校验规则自动生成 | 'error' `|` 'success' `|` 'loading' | |
| hasFeedback    |配合 validateState 属性使用，是否展示 success/loading 的校验状态图标, 目前只有Input支持 | boolean | |
| size    | 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效 | 'large' `|` 'small' `|` 'medium' | |
| labelAlign    | 标签的位置 | 'top' `|` 'left' `|` 'inset' | |
| labelTextAlign    | 标签的左右对齐方式 | 'left' `|` 'right' | |
| asterisk    | required 的星号是否显示 | boolean | |


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
  setup,
  FormTextBox,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/next-components'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

setup()

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

* IFormTextBox

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| text    | 文案                 | string |                |
| gutter    |文案间距离                  | number |                |
| title    |标题                  | React.ReactText |                |
| description    | 描述                  | React.ReactText |                |

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
  setup,
  FormTextBox,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/next-components'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

setup()
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

#### `<TextButton/>`

> TextButton 组件 Props, 完全继承自 [ButtonProps](#ButtonProps)

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm } from '@formily/next'
import { TextButton } from '@formily/next-components'
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

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm } from '@formily/next'
import { CircleButton } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm>
    <CircleButton>ok</CircleButton>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```