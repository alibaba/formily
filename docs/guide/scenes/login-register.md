# Log in&Sign up

## Log in

#### Markup Schema Cases

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
          <Tabs.TabPane key="1" tab="Password Login">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField>
                <SchemaField.String
                  name="username"
                  title="Username"
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
                  title="Password"
                  required
                  x-decorator="FormItem"
                  x-component="Input"
                  x-component-props={{
                    prefix: "{{icon('LockOutlined')}}",
                  }}
                />
              </SchemaField>
              <Submit block size="large">
                Log in
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="Mobile Login">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField>
                <SchemaField.String
                  name="phone"
                  title="Phone Number"
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
                  title="Verification Code"
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
                Log in
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
          <a href="#Sign up">Sign up</a>
          <a href="#Forgot password">Forgot password?</a>
        </div>
      </Card>
    </div>
  )
}
```

#### JSON Schema Cases

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
      title: 'Username',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: 'Password',
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
      title: 'Phone Number',
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
      title: 'Verification Code',
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
          <Tabs.TabPane key="1" tab="Password Login">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField schema={normalSchema} />
              <Submit block size="large">
                Log in
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="Mobile Login">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField schema={phoneSchema} />
              <Submit block size="large">
                Log in
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
          <a href="#Sign up">Sign up</a>
          <a href="#Forgot password">Forgot password?</a>
        </div>
      </Card>
    </div>
  )
}
```

#### Pure JSX Cases

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
          <Tabs.TabPane key="1" tab="Password Login">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <Field
                name="username"
                title="Username"
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
                title="Password"
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
                Log in
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="Mobile Login">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <Field
                name="phone"
                title="Phone Number"
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
                title="Verification Code"
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
                Log in
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
          <a href="#Sign up">Sign up</a>
          <a href="#Forgot password">Forgot password?</a>
        </div>
      </Card>
    </div>
  )
}
```

## Sign up

#### Markup Schema Cases

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
      <Button icon={<UploadOutlined />}>Upload a copy</Button>
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
      <Card title="Sign up" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField>
            <SchemaField.String
              name="username"
              title="Username"
              required
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="password"
              title="Password"
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
                      errors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "Confirm that the password does not match" : ""}}',
                    },
                  },
                },
              ]}
            />
            <SchemaField.String
              name="confirm_password"
              title="Confirm Password"
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
                      errors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "Confirm that the password does not match" : ""}}',
                    },
                  },
                },
              ]}
            />
            <SchemaField.Void
              title="name"
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
                  placeholder: 'firstname',
                }}
                required
              />
              <SchemaField.String
                name="lastName"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: 'lastname',
                }}
                required
              />
            </SchemaField.Void>
            <SchemaField.String
              name="email"
              title="Email"
              required
              x-validator="email"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="gender"
              title="Gender"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                {
                  label: 'male',
                  value: 1,
                },
                {
                  label: 'female',
                  value: 2,
                },
                {
                  label: 'third gender',
                  value: 3,
                },
              ]}
              required
            />
            <SchemaField.String
              name="birthday"
              title="Birthday"
              required
              x-decorator="FormItem"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="address"
              title="Address"
              required
              x-decorator="FormItem"
              x-component="Cascader"
              x-reactions="{{fetchAddress}}"
            />
            <SchemaField.String
              name="idCard"
              title="ID"
              required
              x-decorator="FormItem"
              x-component="IDUpload"
            />
            <SchemaField.Array
              name="contacts"
              title="Contacts"
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
                  title="Contact Information"
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
                    title="Name"
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
                    title="Email"
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
                    title="Phone Number"
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
                title="Add Contact"
              />
            </SchemaField.Array>
          </SchemaField>
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              Sign up
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

#### JSON Schema Cases

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
      title: 'Username',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    password: {
      type: 'string',
      title: 'Password',
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
              errors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认password不匹配" : ""}}',
            },
          },
        },
      ],
    },
    confirm_password: {
      type: 'string',
      title: 'Confirm Password',
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
              errors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "Confirm that the password does not match" : ""}}',
            },
          },
        },
      ],
    },
    name: {
      type: 'void',
      title: 'name',
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
            placeholder: 'firstname',
          },
        },
        lastName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'lastname',
          },
        },
      },
    },
    email: {
      type: 'string',
      title: 'Email',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': 'email',
    },
    gender: {
      type: 'string',
      title: 'Gender',
      enum: [
        {
          label: 'male',
          value: 1,
        },
        {
          label: 'female',
          value: 2,
        },
        {
          label: 'third gender',
          value: 3,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    birthday: {
      type: 'string',
      required: true,
      title: 'Birthday',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    address: {
      type: 'string',
      required: true,
      title: 'Address',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-reactions': '{{fetchAddress}}',
    },
    idCard: {
      type: 'string',
      required: true,
      title: 'ID',
      'x-decorator': 'FormItem',
      'x-component': 'IDUpload',
    },
    contacts: {
      type: 'array',
      required: true,
      title: 'Contacts',
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
            title: 'improve contact information',
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
                title: 'Name',
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
                title: 'Email',
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
                title: 'Phone Number',
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
          title: 'Add Contact',
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
      <Card title="Sign up" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField schema={schema} />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              Sign up
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

#### Pure JSX Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { Field, VoidField } from '@formily/react'
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
      <Button icon={<UploadOutlined />}>Upload a copy</Button>
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
      <Card title="Sign up" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <Field
            name="username"
            title="Username"
            required
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="password"
            title="Password"
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
              field.errors =
                confirm.get('value') &&
                field.value &&
                field.value !== confirm.get('value')
                  ? 'Confirm that the password does not match'
                  : ''
            }}
          />
          <Field
            name="confirm_password"
            title="Confirm Password"
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
              field.errors =
                password.get('value') &&
                field.value &&
                field.value !== password.get('value')
                  ? 'Confirm that the password does not match'
                  : ''
            }}
          />
          <VoidField
            name="name"
            title="Name"
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
                  placeholder: 'firstname',
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
                  placeholder: 'lastname',
                },
              ]}
              required
            />
          </VoidField>
          <Field
            name="email"
            title="Email"
            required
            validator="email"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="gender"
            title="Gender"
            decorator={[FormItem]}
            component={[Select]}
            dataSource={[
              {
                label: 'male',
                value: 1,
              },
              {
                label: 'female',
                value: 2,
              },
              {
                label: 'third gender',
                value: 3,
              },
            ]}
            required
          />
          <Field
            name="birthday"
            title="Birthday"
            required
            decorator={[FormItem]}
            component={[DatePicker]}
          />
          <Field
            name="address"
            title="Address"
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
            title="ID"
            required
            decorator={[FormItem]}
            component={[IDUpload]}
          />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              Sign up
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

## Forgot password

#### Markup Schema Cases

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
      <Card title="change password" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField>
            <SchemaField.String
              name="username"
              title="Username"
              required
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="email"
              title="Email"
              required
              x-validator="email"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="old_password"
              title="Old Password"
              required
              x-decorator="FormItem"
              x-component="Password"
            />
            <SchemaField.String
              name="password"
              title="New Password"
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
                      errors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "Confirm that the password does not match" : ""}}',
                    },
                  },
                },
              ]}
            />
            <SchemaField.String
              name="confirm_password"
              title="Confirm Password"
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
                      errors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "Confirm that the password does not match" : ""}}',
                    },
                  },
                },
              ]}
            />
          </SchemaField>
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              Confirm
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

#### JSON Schema Cases

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
      title: 'Username',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    email: {
      type: 'string',
      title: 'Email',
      required: true,
      'x-validator': 'email',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    oldPassword: {
      type: 'string',
      title: 'Old Password',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
    },
    password: {
      type: 'string',
      title: 'New Password',
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
              errors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "Confirm that the password does not match" : ""}}',
            },
          },
        },
      ],
    },
    confirm_password: {
      type: 'string',
      title: 'Confirm Password',
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
              errors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "Confirm that the password does not match" : ""}}',
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
      <Card title="change password" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField schema={schema} />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              Confirm
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```

#### Pure JSX Cases

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
      <Card title="change password" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <Field
            name="username"
            title="Username"
            required
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="email"
            title="Email"
            required
            validator="email"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="old_password"
            title="Old Password"
            required
            decorator={[FormItem]}
            component={[Password]}
          />
          <Field
            name="password"
            title="New Password"
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
              field.errors =
                confirm.get('value') &&
                field.value &&
                field.value !== confirm.get('value')
                  ? 'Confirm that the password does not match'
                  : ''
            }}
          />
          <Field
            name="confirm_password"
            title="Confirm Password"
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
              field.errors =
                confirm.get('value') &&
                field.value &&
                field.value !== confirm.get('value')
                  ? 'Confirm that the password does not match'
                  : ''
            }}
          />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              Confirm change
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}
```
