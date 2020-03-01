# @formily/meet-components

### 安装

```bash
npm install --save @formily/meet-components
```

### 使用内置组件

通过 `setup` 方法，可以快速置入内置的表单组件，免去维护全局`components`的工作。

```tsx
import { SchemaForm, SchemaMarkupField as Field, FormButtonGroup, Submit } from '@formily/meet'
import { setup } from '@formily/meet-components'

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
| string   | [Input](#Input)                     | 输入框组件         |
| string(有enum属性时)   | [Select](#Select)                     | 选择框组件         |
| password   | [Password](#Password)                     | 密码输入框         |
| checkbox   | [CheckboxGroup](#Checkbox)                     | Checkbox         |
| radio   | [RadioGroup](#Radio)                     | Radio         |
| boolean   | [Switch](#Swicth)                     | 开关组件         |
| date   | [DatePicker](#DatePicker)                     | 日期选择器         |
| time   | [TimePicker](#TimePicker)                     | 时间选择器         |
| daterange   | [DatePicker.RangePicker](#RangePicker)                     | 范围日期选择器         |


#### Input

* JSON Schema 方式

```jsx
import { createElement, useState } from 'rax';
import { useLocale } from '@rax-ui/locale';
import { ConfigProvider } from '@alifd/meet';
import {
  SchemaForm,
} from '@formily/meet';

import {
  setup,
} from '@formily/meet-components';

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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx
import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Input } from '@formily/meet-components'

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

render(<App />, null, { driver: DriverUniversal });
```


#### Select

* JSON Schema 方式

```jsx


import { createElement, useState } from 'rax';
import View from 'rax-view';
import { useLocale } from '@rax-ui/locale';
import { ConfigProvider } from '@alifd/meet';
import {
  SchemaForm,
} from '@formily/meet';
import { Select } from '@formily/meet-components'

import {
  setup,
} from '@formily/meet-components';


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Select } from '@formily/meet-components'

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

render(<App />, null, { driver: DriverUniversal });
```


#### TextArea

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { Input } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Input } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



#### Password

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { Password } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Password } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



#### NumberPicker

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { NumberPicker } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { NumberPicker } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



#### Switch

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { Switch } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Switch } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



#### DatePicker

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { DatePicker } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { DatePicker } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



#### RangePicker

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { DatePicker } from '@formily/meet-components'


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
            'x-component': 'RangePicker',
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { DatePicker } from '@formily/meet-components'


const App = () => {
  return (
    <SchemaForm
      components={{ RangePicker: DatePicker.RangePicker }}
    >
      <Field
        x-component="RangePicker"
        title="RangePicker"
        name="[start,end]"
      />
    </SchemaForm>
  )
}

render(<App />, null, { driver: DriverUniversal });
```





#### MonthPicker

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { DatePicker } from '@formily/meet-components'


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
            'x-component': 'MonthPicker',
          },
        }
      }}
    >
      
    </SchemaForm>
  )
}

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { DatePicker } from '@formily/meet-components'


const App = () => {
  return (
    <SchemaForm
      components={{ MonthPicker: DatePicker.MonthPicker }}
    >
      <Field
        x-component="MonthPicker"
        title="MonthPicker"
        name="MonthPicker"
      />
    </SchemaForm>
  )
}

render(<App />, null, { driver: DriverUniversal });
```


#### TimePicker

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { TimePicker } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { TimePicker } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```


#### Range

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { Range } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Range } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



#### Upload

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { Upload } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Upload } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

#### Checkbox

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { Checkbox } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Checkbox } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



#### Radio

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { Radio } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Radio } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



#### Rating

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { Rating } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Rating } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



#### Transfer

* JSON Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
} from '@formily/meet'
import { Transfer } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```

* JSX Schema 方式

```jsx

import { createElement, useState } from 'rax';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
} from '@formily/meet'
import { Transfer } from '@formily/meet-components'


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

render(<App />, null, { driver: DriverUniversal });
```



