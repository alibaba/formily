# 登录注册

## 登录

#### Markup Schema 案例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, Password, Submit } from '@formily/antd'
import { Tabs, Card } from 'antd'
import * as ICONS from '@ant-design/icons'
import { VerifyCode } from './VerifyCode'

const normalForm = createForm({
  validateFirst: true,
})

const phoneForm = createForm({
  validateFirst: true,
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
  },
  scope: {
    icon(name) {
      return React.createElement(ICONS[name])
    },
  },
})

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs style={{ overflow: 'visible', marginTop: -10 }}>
          <Tabs.TabPane key="1" tab="账密登录">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField>
                <SchemaField.String
                  name="username"
                  title="用户名"
                  required
                  x-decorator="FormItem"
                  x-component="Input"
                  x-validator={{
                    required: true,
                  }}
                  x-component-props={{
                    prefix: "{{icon('UserOutlined')}}",
                  }}
                />
                <SchemaField.String
                  name="password"
                  title="密码"
                  required
                  x-decorator="FormItem"
                  x-component="Password"
                  x-component-props={{
                    prefix: "{{icon('LockOutlined')}}",
                  }}
                />
              </SchemaField>
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="手机登录">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField>
                <SchemaField.String
                  name="phone"
                  title="手机号"
                  required
                  x-validator="phone"
                  x-decorator="FormItem"
                  x-component="Input"
                  x-component-props={{
                    prefix: "{{icon('PhoneOutlined')}}",
                  }}
                />
                <SchemaField.String
                  name="verifyCode"
                  title="验证码"
                  required
                  x-decorator="FormItem"
                  x-component="VerifyCode"
                  x-component-props={{
                    prefix: "{{icon('LockOutlined')}}",
                  }}
                  x-reactions={[
                    {
                      dependencies: ['.phone#value', '.phone#valid'],
                      fulfill: {
                        state: {
                          'component[1].readyPost': '{{$deps[0] && $deps[1]}}',
                          'component[1].phoneNumber': '{{$deps[0]}}',
                        },
                      },
                    },
                  ]}
                />
              </SchemaField>
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href="#新用户注册">新用户注册</a>
          <a href="#忘记密码">忘记密码?</a>
        </div>
      </Card>
    </div>
  )
}
```

#### JSON Schema 案例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, Password, Submit } from '@formily/antd'
import { Tabs, Card } from 'antd'
import * as ICONS from '@ant-design/icons'
import { VerifyCode } from './VerifyCode'

const normalForm = createForm({
  validateFirst: true,
})

const phoneForm = createForm({
  validateFirst: true,
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
  },
  scope: {
    icon(name) {
      return React.createElement(ICONS[name])
    },
  },
})

const normalSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
  },
}

const phoneSchema = {
  type: 'object',
  properties: {
    phone: {
      type: 'string',
      title: '手机号',
      required: true,
      'x-validator': 'phone',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('PhoneOutlined')}}",
      },
    },
    verifyCode: {
      type: 'string',
      title: '验证码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'VerifyCode',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
      'x-reactions': [
        {
          dependencies: ['.phone#value', '.phone#valid'],
          fulfill: {
            state: {
              'component[1].readyPost': '{{$deps[0] && $deps[1]}}',
              'component[1].phoneNumber': '{{$deps[0]}}',
            },
          },
        },
      ],
    },
  },
}

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs style={{ overflow: 'visible', marginTop: -10 }}>
          <Tabs.TabPane key="1" tab="账密登录">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField schema={normalSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="手机登录">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField schema={phoneSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href="#新用户注册">新用户注册</a>
          <a href="#忘记密码">忘记密码?</a>
        </div>
      </Card>
    </div>
  )
}
```

#### 纯 JSX 案例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import { Form, FormItem, Input, Password, Submit } from '@formily/antd'
import { Tabs, Card } from 'antd'
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons'
import { VerifyCode } from './VerifyCode'

const normalForm = createForm({
  validateFirst: true,
})

const phoneForm = createForm({
  validateFirst: true,
})

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs style={{ overflow: 'visible', marginTop: -10 }}>
          <Tabs.TabPane key="1" tab="账密登录">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <Field
                name="username"
                title="用户名"
                required
                decorator={[FormItem]}
                component={[
                  Input,
                  {
                    prefix: <UserOutlined />,
                  },
                ]}
              />
              <Field
                name="password"
                title="密码"
                required
                decorator={[FormItem]}
                component={[
                  Password,
                  {
                    prefix: <LockOutlined />,
                  },
                ]}
              />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="手机登录">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <Field
                name="phone"
                title="手机号"
                required
                validator="phone"
                decorator={[FormItem]}
                component={[
                  Input,
                  {
                    prefix: <PhoneOutlined />,
                  },
                ]}
              />
              <Field
                name="verifyCode"
                title="验证码"
                required
                reactions={(field) => {
                  const phone = field.query('.phone')
                  field.setComponentProps({
                    readyPost: phone.get('valid') && phone.get('value'),
                    phoneNumber: phone.get('value'),
                  })
                }}
                decorator={[FormItem]}
                component={[
                  VerifyCode,
                  {
                    prefix: <LockOutlined />,
                  },
                ]}
              />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href="#新用户注册">新用户注册</a>
          <a href="#忘记密码">忘记密码?</a>
        </div>
      </Card>
    </div>
  )
}
```

## 新用户注册

#### Markup Schema 案例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Password,
  Cascader,
  DatePicker,
  Submit,
  Space,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const form = createForm({
  validateFirst: true,
})

const IDUpload = (props) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
  )
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    Password,
    IDUpload,
    Space,
    ArrayItems,
    Editable,
  },
  scope: {
    fetchAddress: (field) => {
      const transform = (data = {}) => {
        return Object.entries(data).reduce((buf, [key, value]) => {
          if (typeof value === 'string')
            return buf.concat({
              label: value,
              value: key,
            })
          const { name, code, cities, districts } = value
          const _cities = transform(cities)
          const _districts = transform(districts)
          return buf.concat({
            label: name,
            value: code,
            children: _cities.length
              ? _cities
              : _districts.length
              ? _districts
              : undefined,
          })
        }, [])
      }

      field.loading = true
      fetch('//unpkg.com/china-location/dist/location.json')
        .then((res) => res.json())
        .then(
          action.bound((data) => {
            field.dataSource = transform(data)
            field.loading = false
          })
        )
    },
  },
})

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="新用户注册" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField>
            <SchemaField.String
              name="username"
              title="用户名"
              required
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="password"
              title="密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{
                checkStrength: true,
              }}
              x-reactions={[
                {
                  dependencies: ['.confirm_password'],
                  fulfill: {
                    state: {
                      selfErrors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
                    },
                  },
                },
              ]}
            />
            <SchemaField.String
              name="confirm_password"
              title="确认密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{
                checkStrength: true,
              }}
              x-reactions={[
                {
                  dependencies: ['.password'],
                  fulfill: {
                    state: {
                      selfErrors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
                    },
                  },
                },
              ]}
            />
            <SchemaField.Void
              title="姓名"
              x-decorator="FormItem"
              x-decorator-props={{
                asterisk: true,
                feedbackLayout: 'none',
              }}
              x-component="FormGrid"
            >
              <SchemaField.String
                name="firstName"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '姓',
                }}
                required
              />
              <SchemaField.String
                name="lastName"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '名',
                }}
                required
              />
            </SchemaField.Void>
            <SchemaField.String
              name="email"
              title="邮箱"
              required
              x-validator="email"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="gender"
              title="性别"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                {
                  label: '男',
                  value: 1,
                },
                {
                  label: '女',
                  value: 2,
                },
                {
                  label: '第三性别',
                  value: 3,
                },
              ]}
              required
            />
            <SchemaField.String
              name="birthday"
              title="生日"
              required
              x-decorator="FormItem"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="address"
              title="地址"
              required
              x-decorator="FormItem"
              x-component="Cascader"
              x-reactions="{{fetchAddress}}"
            />
            <SchemaField.String
              name="idCard"
              title="身份证复印件"
              required
              x-decorator="FormItem"
              x-component="IDUpload"
            />
            <SchemaField.Array
              name="contacts"
              title="联系人信息"
              required
              x-decorator="FormItem"
              x-component="ArrayItems"
            >
              <SchemaField.Object x-component="ArrayItems.Item">
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayItems.SortHandle"
                />
                <SchemaField.Void
                  name="popover"
                  title="维护联系人信息"
                  x-decorator="Editable.Popover"
                  x-component="FormLayout"
                  x-component-props={{
                    layout: 'vertical',
                  }}
                  x-reactions={[
                    {
                      dependencies: ['.popover.name'],
                      fulfill: {
                        schema: {
                          title: '{{$deps[0]}}',
                        },
                      },
                    },
                  ]}
                >
                  <SchemaField.String
                    name="name"
                    required
                    title="姓名"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{
                      style: {
                        width: 300,
                      },
                    }}
                  />
                  <SchemaField.String
                    name="email"
                    title="邮箱"
                    x-validator={[{ required: true }, 'email']}
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{
                      style: {
                        width: 300,
                      },
                    }}
                  />
                  <SchemaField.String
                    name="phone"
                    required
                    title="手机号"
                    x-validator="phone"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{
                      style: {
                        width: 300,
                      },
                    }}
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayItems.Remove"
                />
              </SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayItems.Addition"
                title="新增联系人"
              />
            </SchemaField.Array>
          </SchemaField>
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              注册
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

#### JSON Schema 案例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Password,
  Cascader,
  DatePicker,
  Submit,
  Space,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const form = createForm({
  validateFirst: true,
})

const IDUpload = (props) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
  )
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    Password,
    IDUpload,
    Space,
    ArrayItems,
    Editable,
  },
  scope: {
    fetchAddress: (field) => {
      const transform = (data = {}) => {
        return Object.entries(data).reduce((buf, [key, value]) => {
          if (typeof value === 'string')
            return buf.concat({
              label: value,
              value: key,
            })
          const { name, code, cities, districts } = value
          const _cities = transform(cities)
          const _districts = transform(districts)
          return buf.concat({
            label: name,
            value: code,
            children: _cities.length
              ? _cities
              : _districts.length
              ? _districts
              : undefined,
          })
        }, [])
      }

      field.loading = true
      fetch('//unpkg.com/china-location/dist/location.json')
        .then((res) => res.json())
        .then(
          action.bound((data) => {
            field.dataSource = transform(data)
            field.loading = false
          })
        )
    },
  },
})

const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    password: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
      'x-reactions': [
        {
          dependencies: ['.confirm_password'],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
            },
          },
        },
      ],
    },
    confirm_password: {
      type: 'string',
      title: '确认密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
      'x-reactions': [
        {
          dependencies: ['.password'],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
            },
          },
        },
      ],
    },
    name: {
      type: 'void',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'FormGrid',
      properties: {
        firstName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '姓',
          },
        },
        lastName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '名',
          },
        },
      },
    },
    email: {
      type: 'string',
      title: '邮箱',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': 'email',
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
        {
          label: '第三性别',
          value: 3,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    birthday: {
      type: 'string',
      required: true,
      title: '生日',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    address: {
      type: 'string',
      required: true,
      title: '地址',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-reactions': '{{fetchAddress}}',
    },
    idCard: {
      type: 'string',
      required: true,
      title: '身份证复印件',
      'x-decorator': 'FormItem',
      'x-component': 'IDUpload',
    },
    contacts: {
      type: 'array',
      required: true,
      title: '联系人信息',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        'x-component': 'ArrayItems.Item',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          popover: {
            type: 'void',
            title: '完善联系人信息',
            'x-decorator': 'Editable.Popover',
            'x-component': 'FormLayout',
            'x-component-props': {
              layout: 'vertical',
            },
            'x-reactions': [
              {
                dependencies: ['.popover.name'],
                fulfill: {
                  schema: {
                    title: '{{$deps[0]}}',
                  },
                },
              },
            ],
            properties: {
              name: {
                type: 'string',
                title: '姓名',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              email: {
                type: 'string',
                title: '邮箱',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'email'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              phone: {
                type: 'string',
                title: '手机号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'phone'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '新增联系人',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="新用户注册" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField schema={schema} />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              注册
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

#### 纯 JSX 案例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { Field, VoidField, ArrayField } from '@formily/react'
import {
  Form,
  FormItem,
  Input,
  Select,
  Password,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  FormButtonGroup,
  ArrayBase,
  Editable,
  FormLayout,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const form = createForm({
  validateFirst: true,
})

const IDUpload = (props) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
  )
}

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="新用户注册" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <Field
            name="username"
            title="用户名"
            required
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="password"
            title="密码"
            required
            decorator={[FormItem]}
            component={[
              Password,
              {
                checkStrength: true,
              },
            ]}
            reactions={(field) => {
              const confirm = field.query('.confirm_password')
              field.selfErrors =
                confirm.get('value') &&
                field.value &&
                field.value !== confirm.get('value')
                  ? '确认密码不匹配'
                  : ''
            }}
          />
          <Field
            name="confirm_password"
            title="确认密码"
            required
            decorator={[FormItem]}
            component={[
              Password,
              {
                checkStrength: true,
              },
            ]}
            reactions={(field) => {
              const password = field.query('.password')
              field.selfErrors =
                password.get('value') &&
                field.value &&
                field.value !== password.get('value')
                  ? '确认密码不匹配'
                  : ''
            }}
          />
          <VoidField
            name="name"
            title="姓名"
            decorator={[
              FormItem,
              {
                asterisk: true,
                feedbackLayout: 'none',
              },
            ]}
            component={[FormGrid]}
          >
            <Field
              name="firstName"
              decorator={[FormItem]}
              component={[
                Input,
                {
                  placeholder: '姓',
                },
              ]}
              required
            />
            <Field
              name="lastName"
              decorator={[FormItem]}
              component={[
                Input,
                {
                  placeholder: '名',
                },
              ]}
              required
            />
          </VoidField>
          <Field
            name="email"
            title="邮箱"
            required
            validator="email"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="gender"
            title="性别"
            decorator={[FormItem]}
            component={[Select]}
            dataSource={[
              {
                label: '男',
                value: 1,
              },
              {
                label: '女',
                value: 2,
              },
              {
                label: '第三性别',
                value: 3,
              },
            ]}
            required
          />
          <Field
            name="birthday"
            title="生日"
            required
            decorator={[FormItem]}
            component={[DatePicker]}
          />
          <Field
            name="address"
            title="地址"
            required
            decorator={[FormItem]}
            component={[Cascader]}
            reactions={(field) => {
              const transform = (data = {}) => {
                return Object.entries(data).reduce((buf, [key, value]) => {
                  if (typeof value === 'string')
                    return buf.concat({
                      label: value,
                      value: key,
                    })
                  const { name, code, cities, districts } = value
                  const _cities = transform(cities)
                  const _districts = transform(districts)
                  return buf.concat({
                    label: name,
                    value: code,
                    children: _cities.length
                      ? _cities
                      : _districts.length
                      ? _districts
                      : undefined,
                  })
                }, [])
              }

              field.loading = true
              fetch('//unpkg.com/china-location/dist/location.json')
                .then((res) => res.json())
                .then(
                  action.bound((data) => {
                    field.dataSource = transform(data)
                    field.loading = false
                  })
                )
            }}
          />
          <Field
            name="idCard"
            title="身份证复印件"
            required
            decorator={[FormItem]}
            component={[IDUpload]}
          />
          <ArrayField name="contacts" title="联系人信息" decorator={[FormItem]}>
            {(field) => (
              <ArrayBase>
                {field.value?.map((item, index) => (
                  <div key={index} className="array-items-item">
                    <Field
                      name={`${index}`}
                      title="完善联系人信息"
                      component={[Editable.Popover]}
                      reactions={(field) => {
                        field.title =
                          field.query('.[].name').value() || field.title
                      }}
                    >
                      <VoidField
                        name="layout"
                        component={[FormLayout, { layout: 'vertical' }]}
                      >
                        <Field
                          name="name"
                          title="姓名"
                          required
                          decorator={[FormItem]}
                          component={[
                            Input,
                            {
                              style: {
                                width: 300,
                              },
                            },
                          ]}
                        />
                        <Field
                          name="email"
                          title="邮箱"
                          required
                          validator="email"
                          decorator={[FormItem]}
                          component={[
                            Input,
                            {
                              style: {
                                width: 300,
                              },
                            },
                          ]}
                        />
                        <Field
                          name="phone"
                          title="手机号"
                          required
                          validator="phone"
                          decorator={[FormItem]}
                          component={[
                            Input,
                            {
                              style: {
                                width: 300,
                              },
                            },
                          ]}
                        />
                      </VoidField>
                    </Field>
                    <FormItem.BaseItem>
                      <ArrayBase.Remove index={index} />
                      <ArrayBase.MoveDown index={index} />
                      <ArrayBase.MoveUp index={index} />
                    </FormItem.BaseItem>
                  </div>
                ))}
                <ArrayBase.Addition title="新增联系人" />
              </ArrayBase>
            )}
          </ArrayField>
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              注册
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

## 忘记密码

#### Markup Schema 案例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  Input,
  Password,
  Submit,
  FormButtonGroup,
} from '@formily/antd'
import { Card } from 'antd'

const form = createForm({
  validateFirst: true,
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
  },
})

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="变更密码" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField>
            <SchemaField.String
              name="username"
              title="用户名"
              required
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="email"
              title="邮箱"
              required
              x-validator="email"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="old_password"
              title="原始密码"
              required
              x-decorator="FormItem"
              x-component="Password"
            />
            <SchemaField.String
              name="password"
              title="新密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{
                checkStrength: true,
              }}
              x-reactions={[
                {
                  dependencies: ['.confirm_password'],
                  fulfill: {
                    state: {
                      selfErrors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
                    },
                  },
                },
              ]}
            />
            <SchemaField.String
              name="confirm_password"
              title="确认密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{
                checkStrength: true,
              }}
              x-reactions={[
                {
                  dependencies: ['.password'],
                  fulfill: {
                    state: {
                      selfErrors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
                    },
                  },
                },
              ]}
            />
          </SchemaField>
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              确认变更
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

#### JSON Schema 案例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  Input,
  Password,
  Submit,
  FormButtonGroup,
} from '@formily/antd'
import { Card } from 'antd'

const form = createForm({
  validateFirst: true,
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
  },
})

const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    email: {
      type: 'string',
      title: '邮箱',
      required: true,
      'x-validator': 'email',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    oldPassword: {
      type: 'string',
      title: '原始密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
    },
    password: {
      type: 'string',
      title: '新密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
      'x-reactions': [
        {
          dependencies: ['.confirm_password'],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
            },
          },
        },
      ],
    },
    confirm_password: {
      type: 'string',
      title: '确认密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
      'x-reactions': [
        {
          dependencies: ['.password'],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
            },
          },
        },
      ],
    },
  },
}

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="变更密码" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField schema={schema} />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              确认变更
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

#### 纯 JSX 案例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import {
  Form,
  FormItem,
  Input,
  Password,
  Submit,
  FormButtonGroup,
} from '@formily/antd'
import { Card } from 'antd'

const form = createForm({
  validateFirst: true,
})

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="变更密码" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <Field
            name="username"
            title="用户名"
            required
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="email"
            title="邮箱"
            required
            validator="email"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="old_password"
            title="原始密码"
            required
            decorator={[FormItem]}
            component={[Password]}
          />
          <Field
            name="password"
            title="新密码"
            required
            decorator={[FormItem]}
            component={[
              Password,
              {
                checkStrength: true,
              },
            ]}
            reactions={(field) => {
              const confirm = field.query('.confirm_password')
              field.selfErrors =
                confirm.get('value') &&
                field.value &&
                field.value !== confirm.get('value')
                  ? '确认密码不匹配'
                  : ''
            }}
          />
          <Field
            name="confirm_password"
            title="确认密码"
            required
            decorator={[FormItem]}
            component={[
              Password,
              {
                checkStrength: true,
              },
            ]}
            reactions={(field) => {
              const confirm = field.query('.password')
              field.selfErrors =
                confirm.get('value') &&
                field.value &&
                field.value !== confirm.get('value')
                  ? '确认密码不匹配'
                  : ''
            }}
          />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              确认变更
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```
