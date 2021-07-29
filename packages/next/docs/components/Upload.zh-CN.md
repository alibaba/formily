# Upload

> 上传组件
>
> 注意：使用上传组件，推荐用户进行二次封装，用户无需关心上传组件与 Formily 的数据通信，只需要处理样式与基本上传配置即可。

## Markup Schema 案例

```tsx
import React from 'react'
import {
  Upload,
  FormItem,
  FormButtonGroup,
  Submit,
  FormLayout,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

const NormalUpload = (props) => {
  return (
    <Upload
      {...props}
      withCredentials={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button>
        <UploadOutlined />
        上传文件
      </Button>
    </Upload>
  )
}

const CardUpload = (props) => {
  return (
    <Upload.Card
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      withCredentials={false}
      headers={{
        authorization: 'authorization-text',
      }}
    />
  )
}

const DraggerUpload = (props) => {
  return (
    <Upload.Dragger
      {...props}
      withCredentials={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      <div className="next-upload-drag">
        <p className="next-upload-drag-icon" style={{ fontSize: 50 }}>
          <InboxOutlined />
        </p>
        <p className="next-upload-drag-text">
          click to <Button text>download template</Button> or drag file here
        </p>
        <p className="next-upload-drag-hint">supports docx, xls, PDF </p>
      </div>
    </Upload.Dragger>
  )
}

const SchemaField = createSchemaField({
  components: {
    NormalUpload,
    CardUpload,
    DraggerUpload,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={14}>
      <SchemaField>
        <SchemaField.Array
          name="upload"
          title="上传"
          x-decorator="FormItem"
          x-component="NormalUpload"
          required
        />
        <SchemaField.Array
          name="upload2"
          title="卡片上传"
          x-decorator="FormItem"
          x-component="CardUpload"
          required
        />
        <SchemaField.Array
          name="upload3"
          title="拖拽上传"
          x-decorator="FormItem"
          x-component="DraggerUpload"
          required
        />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import {
  Upload,
  FormItem,
  FormButtonGroup,
  Submit,
  FormLayout,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

const NormalUpload = (props) => {
  return (
    <Upload
      {...props}
      withCredentials={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button>
        <UploadOutlined />
        上传文件
      </Button>
    </Upload>
  )
}

const CardUpload = (props) => {
  return (
    <Upload.Card
      {...props}
      withCredentials={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    />
  )
}

const DraggerUpload = (props) => {
  return (
    <Upload.Dragger
      {...props}
      withCredentials={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      <div className="next-upload-drag">
        <p className="next-upload-drag-icon" style={{ fontSize: 50 }}>
          <InboxOutlined />
        </p>
        <p className="next-upload-drag-text">
          click to <Button text>download template</Button> or drag file here
        </p>
        <p className="next-upload-drag-hint">supports docx, xls, PDF </p>
      </div>
    </Upload.Dragger>
  )
}

const SchemaField = createSchemaField({
  components: {
    NormalUpload,
    CardUpload,
    DraggerUpload,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    upload: {
      type: 'array',
      title: '上传',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'NormalUpload',
    },
    upload2: {
      type: 'array',
      title: '卡片上传',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'CardUpload',
    },
    upload3: {
      type: 'array',
      title: '拖拽上传',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'DraggerUpload',
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={14}>
      <SchemaField schema={schema} />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## 纯 JSX 案例

```tsx
import React from 'react'
import {
  Upload,
  FormItem,
  FormButtonGroup,
  Submit,
  FormLayout,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { Button } from '@alifd/next'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

const NormalUpload = (props) => {
  return (
    <Upload
      {...props}
      withCredentials={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button>
        <UploadOutlined />
        上传文件
      </Button>
    </Upload>
  )
}

const CardUpload = (props) => {
  return (
    <Upload.Card
      {...props}
      withCredentials={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    />
  )
}

const DraggerUpload = (props) => {
  return (
    <Upload.Dragger
      {...props}
      withCredentials={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      <div className="next-upload-drag">
        <p className="next-upload-drag-icon" style={{ fontSize: 50 }}>
          <InboxOutlined />
        </p>
        <p className="next-upload-drag-text">
          click to <Button text>download template</Button> or drag file here
        </p>
        <p className="next-upload-drag-hint">supports docx, xls, PDF </p>
      </div>
    </Upload.Dragger>
  )
}

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={14}>
      <Field
        name="upload"
        title="上传"
        required
        decorator={[FormItem]}
        component={[NormalUpload]}
      />
      <Field
        name="upload2"
        title="卡片上传"
        required
        decorator={[FormItem]}
        component={[CardUpload]}
      />
      <Field
        name="upload3"
        title="拖拽上传"
        required
        decorator={[FormItem]}
        component={[DraggerUpload]}
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## API

参考 https://fusion.design/pc/component/basic/upload
