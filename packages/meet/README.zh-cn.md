# @formily/meet

### 安装

```bash
npm install --save @formily/meet
```

### Components

---

#### `<SchemaForm/>`

基于@formily/react 的核心组件 SchemaForm 进一步扩展出来的 SchemaForm 组件，推荐生产环境下使用

| 参数               | 说明                                                                                                          | 类型                                                                             | 默认值 |
| :----------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------- | :----- |
| schema             | 通过 schema 渲染表单                                                                                          | [ISchema](#ISchema)                                                              |        |
| fields             | 传入自定义表单组件                                                                                            | { [key: string]: [ISchemaFieldComponent](#ISchemaFieldComponent) }               |        |
| virtualFields      | 传入自定义虚拟组件                                                                                            | { [key: string]: [ISchemaVirtualFieldComponent](#ISchemaVirtualFieldComponent) } |        |
| formComponent      | 全局注册 Form 渲染组件                                                                                        | string `or` React.ReactElement                                                   |        |
| formItemComponent  | 全局注册 FormItem 渲染组件                                                                                    | React.ReactElement                                                               |        |
| labelCol           | label 布局控制                                                                                                | number `or` { span: number; offset?: number }                                    |        |
| wrapperCol         | FormItem 布局控制                                                                                             | number `or` { span: number; offset?: number }                                    |        |
| previewPlaceholder | 自定义预览 placeholder                                                                                        | string `or` ((props: [IPreviewTextProps](#IPreviewTextProps)) => string)         |        |
| prefix             | 样式前缀                                                                                                      | string                                                                           |        |
| inline             | 是否为内联表单                                                                                                | boolean                                                                          |        |
| size               | 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。 | 'large' `or` 'medium' `or` 'small'                                               |        |
| labelAlign         | 标签的位置                                                                                                    | 'top' `or` 'left' `or` 'inset'                                                   |        |
| labelTextAlign     | 标签的左右对齐方式                                                                                            | 'left' `or` 'right'                                                              |        |
| labelCol           | 控制所有 Item 的 labelCol                                                                                     | `{}`                                                                             |        |
| wrapperCol         | 控制所有 Item 的 wrapperCol                                                                                   | `{}`                                                                             |        |
| className          | 扩展 class                                                                                                    | string                                                                           |        |
| style              | 自定义内联样式                                                                                                | React.CSSProperties                                                              |        |
| component          | 设置标签类型                                                                                                  | string `or` (() => void)                                                         |        |
| value              | 全局 value                                                                                                    | {}                                                                               |        |
| defaultValue       | 全局 defaultValue                                                                                             | {}                                                                               |        |
| initialValues      | 全局 initialValues                                                                                            | {}                                                                               |        |
| actions            | FormActions 实例                                                                                              | [FormActions](#FormActions)                                                      |        |
| effects            | IFormEffect 实例                                                                                              | IFormEffect<FormEffectPayload, [FormActions](#FormActions)>                      |        |
| form               | 表单实例                                                                                                      | [IForm](#IForm)                                                                  |        |
| onChange           | 表单变化回调                                                                                                  | (values: {}) => void                                                             |        |
| onSubmit           | form 内有 `htmlType="submit"` 或 actions.submit 时 触发                                                       | (values: {}) => void `or` Promise<{}>                                            |        |
| onReset            | form 内有 <Reset/> 或 actions.reset 时 触发                                                                   | () => void                                                                       |        |
| onValidateFailed   | 校验失败时触发                                                                                                | (valideted: [IFormValidateResult](#IFormValidateResult)) => void                 |        |
| children           | 全局 value                                                                                                    | React.ReactElement `or` ((form: [IForm](#IForm)) => React.ReactElement)          |        |
| useDirty           | 是否使用脏检查，默认会走 immer 精确更新                                                                       | boolean                                                                          |        |
| editable           | 是否可编辑                                                                                                    | boolean `or` ((name: string) => boolean)                                         |        |
| validateFirst      | 是否走悲观校验，遇到第一个校验失败就停止后续校验                                                              | boolean                                                                          |        |

#### `<SchemaMarkupField/>`

> @formily/meet 的核心组件，用于描述表单字段

| 参数                 | 说明                                    | 类型                                                              | 默认值 |
| :------------------- | :-------------------------------------- | :---------------------------------------------------------------- | :----- |
| name                 | 字段名                                  | string                                                            |        |
| title                | 字段 label                              | React.ReactNode                                                   |        |
| description          | 字段描述信息                            | React.ReactNode                                                   |        |
| readOnly             | 只读                                    | boolean                                                           |        |
| writeOnly            | 只写                                    | boolean                                                           |        |
| type                 | 字段类型                                | 'string' `or` 'object' `or` 'array' `or` 'number' `or` string     |        |
| enum                 | 相当于字段 dataSource                   | `Array<string | number | { label: React.ReactNode; value: any }>` |        |
| required             | 是否必填，为 true 会同时设置校验规则    | string[] `or` boolean                                             |        |
| format               | 正则规则类型，详细类型可以往后看        | string                                                            |        |
| properties           | 对象属性                                | { [key: string]: [ISchema](#ISchema) }                            |        |
| items                | 数组描述                                | [ISchema](#ISchema) `or` [ISchema](#ISchema)[]                    |        |
| patternProperties    | 动态匹配对象的某个属性的 Schema         | { [key: string]: [ISchema](#ISchema) }                            |        |
| additionalProperties | 匹配对象额外属性的 Schema               | [ISchema](#ISchema)                                               |        |
| editable             | 字段是否可编辑                          | boolean                                                           |        |
| visible              | 字段是否显示（伴随 value 的显示和隐藏） | boolean                                                           |        |
| display              | 字段是否显示（纯视觉，不影响 value）    | boolean                                                           |        |
| x-component          | 用于渲染的组件                          | string                                                            |        |
| x-component-props    | 组件的属性                              | { [name: string]: any }                                           |        |
| x-rules              | 校验规则                                | [ValidatePatternRules](#ValidatePatternRules)                     |        |
| x-props              | 字段扩展属性                            | { [name: string]: any }                                           |        |
| x-index              | 字段顺序                                | number                                                            |        |
| default              | 字段默认值                              | any                                                               |        |
| const                | 校验字段值是否与 const 的值相等         | any                                                               |        |
| multipleOf           | 校验字段值是否可被 multipleOf 的值整除  | number                                                            |        |
| maximum              | 最大值                                  | number                                                            |        |
| exclusiveMaximum     | 校验最大值（大于等于）                  | number                                                            |        |
| minimum              | 最小值                                  | number                                                            |        |
| exclusiveMinimum     | 最小值（小于等于）                      | number                                                            |        |
| maxLength            | 最大长度                                | number                                                            |        |
| minLength            | 最小长度                                | number                                                            |        |
| pattern              | 正则校验规则                            | string `or` RegExp                                                |        |
| maxItems             | 最大项数                                | number                                                            |        |
| minItems             | 最小项数                                | number                                                            |        |

**用法**

例子 1： 

```js
import { render } from 'rax'
import DriverUniversal from 'driver-universal'

import { SchemaForm } from '@formily/meet'

import { setup } from '@formily/meet-components'

setup()

const radioData = [
  {
    label: 'Radio 1',
    value: 1
  },
  {
    label: 'Radio 2',
    value: 2
  }
]

const province = [
  {
    label: '北京',
    value: '01',
    children: [
      {
        label: '东城区',
        value: '01-1'
      },
      {
        label: '西城区',
        value: '01-2'
      },
      {
        label: '崇文区',
        value: '01-3'
      },
      {
        label: '宣武区',
        value: '01-4'
      }
    ]
  },
  {
    label: '浙江',
    value: '02',
    children: [
      {
        label: '杭州',
        value: '02-1',
        children: [
          {
            label: '西湖区',
            value: '02-1-1'
          },
          {
            label: '上城区',
            value: '02-1-2'
          },
          {
            label: '江干区',
            value: '02-1-3'
          },
          {
            label: '下城区',
            value: '02-1-4'
          }
        ]
      },
      {
        label: '宁波',
        value: '02-2',
        children: [
          {
            label: 'xx区',
            value: '02-2-1'
          },
          {
            label: 'yy区',
            value: '02-2-2'
          }
        ]
      },
      {
        label: '温州',
        value: '02-3'
      },
      {
        label: '嘉兴',
        value: '02-4'
      },
      {
        label: '湖州',
        value: '02-5'
      },
      {
        label: '绍兴',
        value: '02-6'
      }
    ]
  }
]

const data = [
  {
    label: 'Option 1',
    value: 1
  },
  {
    label: 'Option 2',
    value: 2
  },
  {
    label: 'Option 3',
    value: 3
  },
  {
    label: 'Option 4',
    value: 4
  },
  {
    label: 'Option 5',
    value: 5
  },
  {
    label: 'Option 6',
    value: 6
  },
  {
    label: 'Option 7',
    value: 7
  }
]

const App = () => {
  return (
    <SchemaForm
      value={{
        boolean: true,
        input: 567890,
        username: '567898765678',
        number: 10
      }}
      onSubmit={v => console.log(v)}
      onChange={v => console.log(v)}
      labelType="inner"
      schema={{
        type: 'object',
        'x-component-props': {},
        properties: {
          content: {
            type: 'object',
            'x-component': 'formContent',
            properties: {
              input: {
                type: 'string',
                title: 'Password',

                'x-rules': [
                  {
                    required: true,
                    message: '密码必填！'
                  }
                ],
                'x-component-props': {
                  type: 'password',
                  clear: true,
                  align: 'left'
                }
              },
              username: {
                title: 'Username',
                type: 'string',
                'x-rules': [
                  {
                    required: true,
                    message: '姓名字段必填！'
                  }
                ],
                'x-component-props': {
                  align: 'left'
                }
              },
              gutter1: {
                type: 'object',
                'x-component': 'gutter',
                'x-component-props': {
                  style: {
                    height: 100
                  }
                }
              },
              date: {
                title: 'Date',
                type: 'date',
                'x-component-props': {
                  type: 'datetime',
                  selectSecond: true
                }
              },
              gutter2: {
                type: 'object',
                'x-component': 'gutter',
                'x-component-props': {
                  style: {
                    height: 40
                  }
                }
              },
              select: {
                title: 'Normal Select',
                type: 'select',
                picker: 'radio',
                'x-component-props': {
                  data: data,
                  type: 'multiple',
                  placeholder: 'Please Sele5678ct...'
                }
              },
              select2: {
                title: 'Format Label',
                type: 'select',
                'x-component-props': {
                  data: province,
                  type: 'cascade',
                  placeholder: 'Please Select',
                  delimiter: ' / '
                }
              },

              boolean: {
                title: 'Switch',
                type: 'boolean',

                'x-component-props': {
                  checked: 'true',
                  styles: {}
                },
                styles: {
                  'text-align': 'left'
                }
              },
              textArea: {
                title: 'Textarea',
                type: 'string',
                'x-component-props': {
                  placeholder: 'this is textArea',
                  multiline: true,
                  rows: 3
                }
              },
              number: {
                type: 'number',
                title: 'Number',
                'x-component-props': {
                  min: 0,
                  max: 100,
                  tooltipVisible: false,
                  styles: {
                    'number-picker__button': {
                      height: '30px',
                      width: '30px'
                    },
                    'number-picker__input': {
                      height: '30px',
                      width: '60px'
                    }
                  }
                }
              },
              checkbox: {
                type: 'checkbox',
                title: 'Checkbox',
                'x-component-props': {
                  data: [
                    {
                      label: 'checkbox 1',
                      value: '1'
                    },
                    {
                      label: 'checkbox 2',
                      value: '2',
                      disabled: true
                    },
                    {
                      label: 'checkbox 3',
                      value: '3'
                    }
                  ],
                  styles: {
                    'number-picker__input': {
                      height: '30px',
                      width: '60px'
                    }
                  }
                }
              },
              range: {
                type: 'range',
                title: 'Range',
                'x-component-props': {
                  tooltipVisible: false,
                  step: 0.01,
                  max: 100,
                  defaultValue: 60,
                  marks: {
                    '0': '0',
                    '100': '100'
                  },
                  style: {
                    marginBottom: '25px',
                    marginRight: '10px',
                    width: 320
                  }
                }
              },
              radio: {
                type: 'radio',
                title: 'Radio',
                required: 'true',
                'x-component-props': {
                  data: radioData,
                  direction: 'horizontal',
                  styles: {
                    radio__circle: {
                      borderColor: 'red',
                      borderWidth: '2px'
                    }
                  }
                }
              }
            }
          },
          footer: {
            type: 'object',
            'x-component': 'formFooter',
            'x-component-props': {
              style: {
                form__footer: {
                  display: 'block',
                  color: 'red'
                }
              }
            },
            properties: {
              submit: {
                type: 'object',
                'x-component': 'submit',
                'x-component-props': {
                  children: '提交',
                  style: {
                    width: '160px',
                    marginRight: '25px'
                  },
                  styles: {
                    button: {
                      background: '#5050e6'
                    },
                    button__text: {
                      color: '#ffffff'
                    }
                  }
                }
              },
              reset: {
                type: 'object',
                'x-component': 'reset',
                'x-component-props': {
                  children: '重置',
                  style: {
                    width: '160px',
                    marginTop: '10px'
                  },
                  styles: {
                    button__text: {
                      color: '#5050e6'
                    }
                  }
                }
              }
            }
          }
        }
      }}
    ></SchemaForm>
  )
}

render(<App />, null, { driver: DriverUniversal })
```
