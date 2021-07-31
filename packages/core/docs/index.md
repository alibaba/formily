---
title: Formily-Alibaba unified front-end form solution
order: 10
hero:
  title: Core Library
  desc: Alibaba Unified Form Solution
  actions:
    - text: Home Site
      link: //v2.formilyjs.org
    - text: Document
      link: /guide
features:
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01bHdrZJ1rEOESvXEi5_!!6000000005599-55-tps-800-800.svg
    title: High Performance
    desc: Efficient update, Demand rendering
  - icon: https://img.alicdn.com/imgextra/i3/O1CN0194OqFF1ui6mMT4g7O_!!6000000006070-55-tps-800-800.svg
    title: Excellent Reusability
    desc: Independent side effects, Pluggable
  - icon: https://img.alicdn.com/imgextra/i2/O1CN01QnfYS71E44I1ZpxU9_!!6000000000297-55-tps-800-800.svg
    title: Elegant Linkage Writing
    desc: Flexible, Complete, Elegant
  - icon: https://img.alicdn.com/imgextra/i2/O1CN01YqmcpN1tDalwgyHBH_!!6000000005868-55-tps-800-800.svg
    title: Complete domain model
    desc: Pure Core, No UI, No Framework
  - icon: https://img.alicdn.com/imgextra/i4/O1CN018vDmpl2186xdLu6KI_!!6000000006939-55-tps-800-800.svg
    title: Friendly debugging
    desc: Natural docking with Formily DevTools
  - icon: https://img.alicdn.com/imgextra/i4/O1CN01u6jHgs1ZMwXpjAYnh_!!6000000003181-55-tps-800-800.svg
    title: Smart Tips
    desc: Embrace Typescript
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
---

## Installation

```bash
$ npm install --save @formily/core

```

## Quick start

> The following case is to teach you step by step to implement a form from scratch
>
> @formily/core brings you the following capabilities:
>
> 1. Responsive computing capabilities
> 2. Verification capability, verification internationalization capability
> 3. Value Management Ability
> 4. Linkage management capabilities
> 5. Development tool debugging capabilities, [download Formily Devtools](https://chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN)

```tsx
/**
 * defaultShowCode: true
 */
import React, { createContext, useMemo, useContext, useEffect } from 'react'
import { createForm, setValidateLanguage } from '@formily/core'
import { observer } from '@formily/reactive-react'

//Create a context to facilitate Field consumption
const FormContext = createContext()
//Create a context to facilitate the consumption of FormItem
const FieldContext = createContext()

//State bridge component
const Field = observer((props) => {
  const form = useContext(FormContext)
  //Create a field
  const field = form.createField(props)
  useEffect(() => {
    //Mount field
    field.onMount()
    return () => {
      //Unload field
      field.onUnmount()
    }
  })
  if (!field.visible || field.hidden) return null
  //Render the field, associate the field state with the UI component
  const component = React.createElement(field.component[0], {
    ...field.component[1],
    value: field.value,
    onChange: field.onInput,
  })

  //Render field wrapper
  const decorator = React.createElement(
    field.decorator[0],
    field.decorator[1],
    component
  )

  return (
    <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>
  )
})

// FormItem UI component
const FormItem = observer(({ children }) => {
  const field = useContext(FieldContext)
  return (
    <div>
      <div style={{ height: 20 }}>{field.title}:</div>
      {children}
      <div style={{ height: 20, fontSize: 12, color: 'red' }}>
        {field.errors.join(',')}
      </div>
    </div>
  )
})

// Input UI component
const Input = (props) => {
  return (
    <input
      {...props}
      value={props.value || ''}
      style={{
        ...props.style,
        border: '2px solid rgb(186 203 255)',
        borderRadius: 6,
        width: '100%',
        height: 28,
        padding: '0 5px',
      }}
    />
  )
}

//Form management entrance
const FormProvider = (props) => {
  useEffect(() => {
    //Mount form
    props.form?.onMount()
    return () => {
      //Uninstall the form
      props.form?.onUnmount()
    }
  })
  return (
    <FormContext.Provider value={props.form}>
      {props.children}
    </FormContext.Provider>
  )
}

//Form response monitor
const FormConsumer = observer((props) => {
  const form = useContext(FormContext)
  return <div>{props.children(form)}</div>
})

/*
 * The above logic has been implemented in @formily/react or @formily/vue, and there is no need to rewrite it in actual use
 */

//Switch the built-in check internationalization copy to English
setValidateLanguage('en')

export default () => {
  const form = useMemo(() => createForm({ validateFirst: true }))

  const createPasswordEqualValidate = (equalName) => (field) => {
    if (
      form.values.confirm_password &&
      field.value &&
      form.values[equalName] !== field.value
    ) {
      field.errors = ['Password does not match Confirm Password.']
    } else {
      field.errors = []
    }
  }

  return (
    <FormProvider form={form}>
      <Field
        name="name"
        title="Name"
        required
        decorator={[FormItem]}
        component={[Input, { placeholder: 'Please Input' }]}
      />
      <Field
        name="password"
        title="Password"
        required
        decorator={[FormItem]}
        component={[Input, { type: 'password', placeholder: 'Please Input' }]}
        reactions={createPasswordEqualValidate('confirm_password')}
      />
      <Field
        name="confirm_password"
        title="Confirm Password"
        required
        decorator={[FormItem]}
        component={[Input, { type: 'password', placeholder: 'Please Input' }]}
        reactions={createPasswordEqualValidate('password')}
      />
      <code>
        <pre>
          <FormConsumer>
            {(form) => JSON.stringify(form.values, null, 2)}
          </FormConsumer>
        </pre>
      </code>
    </FormProvider>
  )
}
```
