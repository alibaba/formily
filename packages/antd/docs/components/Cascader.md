# Cascader

> Cascade selector

## Markup Schema example

```tsx
import React from 'react'
import { Cascader, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, onFieldReact, FormPathPattern } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'

const SchemaField = createSchemaField({
  components: {
    Cascader,
    FormItem,
  },
})

const useAddress = (pattern: FormPathPattern) => {
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
  onFieldReact(pattern, (field) => {
    field.loading = true
    fetch('//unpkg.com/china-location/dist/location.json')
      .then((res) => res.json())
      .then(
        action.bound((data) => {
          field.dataSource = transform(data)
          field.loading = false
        })
      )
  })
}

const form = createForm({
  effects: () => {
    useAddress('address')
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="address"
        title="Address Selection"
        required
        x-decorator="FormItem"
        x-component="Cascader"
        x-component-props={{
          style: {
            width: 240,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema case

```tsx
import React from 'react'
import { Cascader, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'

const SchemaField = createSchemaField({
  components: {
    Cascader,
    FormItem,
  },
})

const transformAddress = (data = {}) => {
  return Object.entries(data).reduce((buf, [key, value]) => {
    if (typeof value === 'string')
      return buf.concat({
        label: value,
        value: key,
      })
    const { name, code, cities, districts } = value
    const _cities = transformAddress(cities)
    const _districts = transformAddress(districts)
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

const useAsyncDataSource =
  (url: string, transform: (data: any) => any) => (field) => {
    field.loading = true
    fetch(url)
      .then((res) => res.json())
      .then(
        action.bound((data) => {
          field.dataSource = transform(data)
          field.loading = false
        })
      )
  }

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    address: {
      type: 'string',
      title: 'Address Selection',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-component-props': {
        style: {
          width: 240,
        },
      },
      'x-reactions': [
        '{{useAsyncDataSource("//unpkg.com/china-location/dist/location.json",transformAddress)}}',
      ],
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <SchemaField
      schema={schema}
      scope={{ useAsyncDataSource, transformAddress }}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Pure JSX case

```tsx
import React from 'react'
import { Cascader, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, onFieldReact, FormPathPattern } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { action } from '@formily/reactive'

const useAddress = (pattern: FormPathPattern) => {
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
  onFieldReact(pattern, (field) => {
    field.loading = true
    fetch('//unpkg.com/china-location/dist/location.json')
      .then((res) => res.json())
      .then(
        action.bound((data) => {
          field.dataSource = transform(data)
          field.loading = false
        })
      )
  })
}

const form = createForm({
  effects: () => {
    useAddress('address')
  },
})

export default () => (
  <FormProvider form={form}>
    <Field
      name="address"
      title="Address Selection"
      decorator={[FormItem]}
      component={[
        Cascader,
        {
          style: {
            width: 240,
          },
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

Reference https://ant.design/components/cascader-cn/
