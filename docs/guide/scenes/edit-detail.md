# Edit Details

## Edit

#### Markup Schema Cases

```tsx
import React, { useState, useEffect } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button, Spin } from 'antd'
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
    IDUpload,
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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        username: 'Aston Martin',
        firstName: 'Aston',
        lastName: 'Martin',
        email: 'aston_martin@aston.com',
        gender: 1,
        birthday: '1836-01-03',
        address: ['110000', '110000', '110101'],
        idCard: [
          {
            name: 'this is image',
            thumbUrl:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            uid: 'rc-upload-1615825692847-2',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
        contacts: [
          {
            name: 'Zhang San',
            phone: '13245633378',
            email: 'zhangsan@gmail.com',
          },
          { name: 'Li Si', phone: '16873452678', email: 'lisi@gmail.com' },
        ],
      })
      setLoading(false)
    }, 2000)
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="Edit User" style={{ width: 620 }}>
        <Spin spinning={loading}>
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
              <SchemaField.Void
                title="Name"
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
                    placeholder: 'firstName',
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
                    title="Contact Informations"
                    x-decorator="Editable.Popover"
                    x-component="FormLayout"
                    x-component-props={{
                      layout: 'vertical',
                    }}
                    x-reactions={[
                      {
                        fulfill: {
                          schema: {
                            title: '{{$self.query(".name").value() }}',
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
                Submit
              </Submit>
            </FormButtonGroup.FormItem>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}
```

#### JSON Schema Cases

```tsx
import React, { useState, useEffect } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button, Spin } from 'antd'
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
    IDUpload,
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
    name: {
      type: 'void',
      title: 'Name',
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
            placeholder: 'firstName',
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
            title: 'Contact Informations',
            'x-decorator': 'Editable.Popover',
            'x-component': 'FormLayout',
            'x-component-props': {
              layout: 'vertical',
            },
            'x-reactions': [
              {
                fulfill: {
                  schema: {
                    title: '{{$self.query(".name").value() }}',
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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        username: 'Aston Martin',
        firstName: 'Aston',
        lastName: 'Martin',
        email: 'aston_martin@aston.com',
        gender: 1,
        birthday: '1836-01-03',
        address: ['110000', '110000', '110101'],
        idCard: [
          {
            name: 'this is image',
            thumbUrl:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            uid: 'rc-upload-1615825692847-2',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
        contacts: [
          {
            name: 'Zhang San',
            phone: '13245633378',
            email: 'zhangsan@gmail.com',
          },
          { name: 'Li Si', phone: '16873452678', email: 'lisi@gmail.com' },
        ],
      })
      setLoading(false)
    }, 2000)
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="Edit User" style={{ width: 620 }}>
        <Spin spinning={loading}>
          <Form
            form={form}
            labelCol={5}
            wrapperCol={16}
            onAutoSubmit={console.log}
          >
            <SchemaField schema={schema} />
            <FormButtonGroup.FormItem>
              <Submit block size="large">
                Submit
              </Submit>
            </FormButtonGroup.FormItem>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}
```

#### Pure JSX Cases

```tsx
import React, { useState, useEffect } from 'react'
import { createForm } from '@formily/core'
import { Field, VoidField, ArrayField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  ArrayBase,
  Editable,
  FormButtonGroup,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './index.less'

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

const fetchAddress = (field) => {
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
}

export default () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        username: 'Aston Martin',
        firstName: 'Aston',
        lastName: 'Martin',
        email: 'aston_martin@aston.com',
        gender: 1,
        birthday: '1836-01-03',
        address: ['110000', '110000', '110101'],
        idCard: [
          {
            name: 'this is image',
            thumbUrl:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            uid: 'rc-upload-1615825692847-2',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
        contacts: [
          {
            name: 'Zhang San',
            phone: '13245633378',
            email: 'zhangsan@gmail.com',
          },
          { name: 'Li Si', phone: '16873452678', email: 'lisi@gmail.com' },
        ],
      })
      setLoading(false)
    }, 2000)
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="Edit User" style={{ width: 620 }}>
        <Spin spinning={loading}>
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
                    placeholder: 'firstName',
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
              reactions={fetchAddress}
            />
            <Field
              name="idCard"
              title="ID"
              required
              decorator={[FormItem]}
              component={[IDUpload]}
            />
            <ArrayField name="contacts" title="Contacts" decorator={[FormItem]}>
              {(field) => (
                <ArrayBase>
                  {field.value?.map((item, index) => (
                    <div key={index} className="array-items-item">
                      <Field
                        name={`${index}`}
                        title="Contact Informations"
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
                            title="Name"
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
                            title="Email"
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
                            title="Phone Number"
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
                  <ArrayBase.Addition title="Add Contact" />
                </ArrayBase>
              )}
            </ArrayField>
            <FormButtonGroup.FormItem>
              <Submit block size="large">
                Submit
              </Submit>
            </FormButtonGroup.FormItem>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}
```

## Details

#### Markup Schema Cases

```tsx
import React, { useState, useEffect } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, useField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  PreviewText,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const form = createForm({
  readPretty: true,
  validateFirst: true,
})

const IDUpload = (props) => {
  const field = useField()
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      {field.editable && (
        <Button icon={<UploadOutlined />}>Upload a copy</Button>
      )}
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
    IDUpload,
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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        username: 'Aston Martin',
        firstName: 'Aston',
        lastName: 'Martin',
        email: 'aston_martin@aston.com',
        gender: 1,
        birthday: '1836-01-03',
        address: ['110000', '110000', '110101'],
        idCard: [
          {
            name: 'this is image',
            thumbUrl:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            uid: 'rc-upload-1615825692847-2',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
        contacts: [
          {
            name: 'Zhang San',
            phone: '13245633378',
            email: 'zhangsan@gmail.com',
          },
          { name: 'Li Si', phone: '16873452678', email: 'lisi@gmail.com' },
        ],
      })
      setLoading(false)
    }, 2000)
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <PreviewText.Placeholder value="-">
        <Card title="User Details" style={{ width: 620 }}>
          <Spin spinning={loading}>
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
                <SchemaField.Void
                  title="Name"
                  x-decorator="FormItem"
                  x-decorator-props={{
                    feedbackLayout: 'none',
                  }}
                  x-component="FormGrid"
                >
                  <SchemaField.String
                    name="firstName"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{
                      placeholder: 'firstName',
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
                      title="Contact Informations"
                      x-decorator="Editable.Popover"
                      x-component="FormLayout"
                      x-component-props={{
                        layout: 'vertical',
                      }}
                      x-reactions={[
                        {
                          fulfill: {
                            schema: {
                              title: '{{$self.query(".name").value() }}',
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
            </Form>
          </Spin>
        </Card>
      </PreviewText.Placeholder>
    </div>
  )
}
```

#### JSON Schema Cases

```tsx
import React, { useState, useEffect } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, useField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  PreviewText,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const form = createForm({
  readPretty: true,
  validateFirst: true,
})

const IDUpload = (props) => {
  const field = useField()
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      {field.editable && (
        <Button icon={<UploadOutlined />}>Upload a copy</Button>
      )}
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
    IDUpload,
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
    name: {
      type: 'void',
      title: 'Name',
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
            placeholder: 'firstName',
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
            title: 'Contact Informations',
            'x-decorator': 'Editable.Popover',
            'x-component': 'FormLayout',
            'x-component-props': {
              layout: 'vertical',
            },
            'x-reactions': [
              {
                fulfill: {
                  schema: {
                    title: '{{$self.query(".name").value() }}',
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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        username: 'Aston Martin',
        firstName: 'Aston',
        lastName: 'Martin',
        email: 'aston_martin@aston.com',
        gender: 1,
        birthday: '1836-01-03',
        address: ['110000', '110000', '110101'],
        idCard: [
          {
            name: 'this is image',
            thumbUrl:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            uid: 'rc-upload-1615825692847-2',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
        contacts: [
          {
            name: 'Zhang San',
            phone: '13245633378',
            email: 'zhangsan@gmail.com',
          },
          { name: 'Li Si', phone: '16873452678', email: 'lisi@gmail.com' },
        ],
      })
      setLoading(false)
    }, 2000)
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <PreviewText.Placeholder value="-">
        <Card title="User Details" style={{ width: 620 }}>
          <Spin spinning={loading}>
            <Form
              form={form}
              labelCol={5}
              wrapperCol={16}
              onAutoSubmit={console.log}
            >
              <SchemaField schema={schema} />
            </Form>
          </Spin>
        </Card>
      </PreviewText.Placeholder>
    </div>
  )
}
```

#### Pure JSX Cases

```tsx
import React, { useState, useEffect } from 'react'
import { createForm } from '@formily/core'
import { Field, VoidField, ArrayField, useField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  FormGrid,
  ArrayBase,
  Upload,
  PreviewText,
  Editable,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './index.less'

const form = createForm({
  validateFirst: true,
  readPretty: true,
})

const IDUpload = (props) => {
  const field = useField()
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      {field.editable && (
        <Button icon={<UploadOutlined />}>Upload a copy</Button>
      )}
    </Upload>
  )
}

const fetchAddress = (field) => {
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
}

export default () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        username: 'Aston Martin',
        firstName: 'Aston',
        lastName: 'Martin',
        email: 'aston_martin@aston.com',
        gender: 1,
        birthday: '1836-01-03',
        address: ['110000', '110000', '110101'],
        idCard: [
          {
            name: 'this is image',
            thumbUrl:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            uid: 'rc-upload-1615825692847-2',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
        contacts: [
          {
            name: 'Zhang San',
            phone: '13245633378',
            email: 'zhangsan@gmail.com',
          },
          { name: 'Li Si', phone: '16873452678', email: 'lisi@gmail.com' },
        ],
      })
      setLoading(false)
    }, 2000)
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <PreviewText.Placeholder value="-">
        <Card title="Edit User" style={{ width: 620 }}>
          <Spin spinning={loading}>
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
              <VoidField
                name="name"
                title="Name"
                decorator={[
                  FormItem,
                  {
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
                      placeholder: 'firstName',
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
                reactions={fetchAddress}
              />
              <Field
                name="idCard"
                title="ID"
                required
                decorator={[FormItem]}
                component={[IDUpload]}
              />
              <ArrayField
                name="contacts"
                title="Contacts"
                decorator={[FormItem]}
              >
                {(field) => (
                  <ArrayBase>
                    {field.value?.map((item, index) => (
                      <div key={index} className="array-items-item">
                        <Field
                          name={`${index}`}
                          title="Contact Informations"
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
                              title="Name"
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
                              title="Email"
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
                              title="Phone Number"
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
                      </div>
                    ))}
                    <ArrayBase.Addition title="Add Contact" />
                  </ArrayBase>
                )}
              </ArrayField>
            </Form>
          </Spin>
        </Card>
      </PreviewText.Placeholder>
    </div>
  )
}
```
