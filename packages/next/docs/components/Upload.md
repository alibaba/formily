# Upload

> Upload components
>
> Note: Using the upload component, it is recommended that users perform secondary packaging. Users do not need to care about the data communication between the upload component and Formily, only the style and basic upload configuration are required.

## Markup Schema example

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
        upload files
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
          title="Upload"
          x-decorator="FormItem"
          x-component="NormalUpload"
          required
        />
        <SchemaField.Array
          name="upload2"
          title="Card upload"
          x-decorator="FormItem"
          x-component="CardUpload"
          required
        />
        <SchemaField.Array
          name="upload3"
          title="Drag and drop upload"
          x-decorator="FormItem"
          x-component="DraggerUpload"
          required
        />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## JSON Schema case

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
        upload files
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
      title: 'Upload',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'NormalUpload',
    },
    upload2: {
      type: 'array',
      title: 'Card upload',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'CardUpload',
    },
    upload3: {
      type: 'array',
      title: 'Drag and drop upload',
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
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## Pure JSX case

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
        upload files
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
        title="Upload"
        required
        decorator={[FormItem]}
        component={[NormalUpload]}
      />
      <Field
        name="upload2"
        title="Card upload"
        required
        decorator={[FormItem]}
        component={[CardUpload]}
      />
      <Field
        name="upload3"
        title="Drag and drop upload"
        required
        decorator={[FormItem]}
        component={[DraggerUpload]}
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## API

Reference https://fusion.design/pc/component/basic/upload
