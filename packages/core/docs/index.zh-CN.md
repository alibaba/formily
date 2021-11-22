---
title: Formily - 阿里巴巴统一前端表单解决方案
order: 10
hero:
  title: Core Library
  desc: 阿里巴巴统一前端表单解决方案
  actions:
    - text: 主站文档
      link: //formilyjs.org
    - text: 内核文档
      link: /zh-CN/guide
features:
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01bHdrZJ1rEOESvXEi5_!!6000000005599-55-tps-800-800.svg
    title: 超高的性能
    desc: 依赖追踪，高效更新，按需渲染
  - icon: https://img.alicdn.com/imgextra/i3/O1CN0194OqFF1ui6mMT4g7O_!!6000000006070-55-tps-800-800.svg
    title: 极佳的复用性
    desc: 副作用独立，逻辑可拔插
  - icon: https://img.alicdn.com/imgextra/i2/O1CN01QnfYS71E44I1ZpxU9_!!6000000000297-55-tps-800-800.svg
    title: 优雅的联动写法
    desc: 灵活，完备，优雅
  - icon: https://img.alicdn.com/imgextra/i2/O1CN01YqmcpN1tDalwgyHBH_!!6000000005868-55-tps-800-800.svg
    title: 完备的领域模型
    desc: 跨终端，跨框架，UI无关
  - icon: https://img.alicdn.com/imgextra/i4/O1CN018vDmpl2186xdLu6KI_!!6000000006939-55-tps-800-800.svg
    title: 友好的调试体验
    desc: 天然对接Formily DevTools
  - icon: https://img.alicdn.com/imgextra/i4/O1CN01u6jHgs1ZMwXpjAYnh_!!6000000003181-55-tps-800-800.svg
    title: 完美的智能提示
    desc: 拥抱Typescript
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
---

## 安装

```bash
$ npm install --save @formily/core

```

## 快速开始

> 以下案例是一步步教您从零实现一个表单
>
> @formily/core 给您带来了以下几个能力：
>
> 1. 响应式计算能力
> 2. 校验能力、校验国际化能力
> 3. 值管理能力
> 4. 联动管理能力
> 5. 开发工具调试能力，[下载 Formily Devtools](https://chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN)

```tsx
/**
 * defaultShowCode: true
 */
import React, { createContext, useMemo, useContext, useEffect } from 'react'
import { createForm, setValidateLanguage } from '@formily/core'
import { observer } from '@formily/reactive-react'

//创建上下文，方便Field消费
const FormContext = createContext()
//创建上下文，方便FormItem消费
const FieldContext = createContext()

//状态桥接器组件
const Field = observer((props) => {
  const form = useContext(FormContext)
  //创建字段
  const field = form.createField(props)
  useEffect(() => {
    //挂载字段
    field.onMount()
    return () => {
      //卸载字段
      field.onUnmount()
    }
  })
  if (!field.visible || field.hidden) return null
  //渲染字段，将字段状态与UI组件关联
  const component = React.createElement(field.component[0], {
    ...field.component[1],
    value: field.value,
    onChange: field.onInput,
  })

  //渲染字段包装器
  const decorator = React.createElement(
    field.decorator[0],
    field.decorator[1],
    component
  )

  return (
    <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>
  )
})

// FormItem UI组件
const FormItem = observer(({ children }) => {
  const field = useContext(FieldContext)
  return (
    <div>
      <div style={{ height: 20 }}>{field.title}:</div>
      {children}
      <div style={{ height: 20, fontSize: 12, color: 'red' }}>
        {field.selfErrors.join(',')}
      </div>
    </div>
  )
})

// Input UI组件
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

//表单管理入口
const FormProvider = (props) => {
  useEffect(() => {
    //挂载表单
    props.form?.onMount()
    return () => {
      //卸载表单
      props.form?.onUnmount()
    }
  })
  return (
    <FormContext.Provider value={props.form}>
      {props.children}
    </FormContext.Provider>
  )
}

//表单响应式监控器
const FormConsumer = observer((props) => {
  const form = useContext(FormContext)
  return <div>{props.children(form)}</div>
})

/*
 * 以上逻辑都已经在 @formily/react 或 @formily/vue 中实现，实际使用无需重复编写
 */

//切换内置校验国际化文案为英文
setValidateLanguage('en')

export default () => {
  const form = useMemo(() => createForm({ validateFirst: true }))

  const createPasswordEqualValidate = (equalName) => (field) => {
    if (
      form.values.confirm_password &&
      field.value &&
      form.values[equalName] !== field.value
    ) {
      field.selfErrors = ['Password does not match Confirm Password.']
    } else {
      field.selfErrors = []
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
