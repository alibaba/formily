# 校验

> 校验和联动往往是相辅相成的，联动负责提升用户体验，引导用户一步步的完成数据输入
> ，校验则是阻止用户输入任何非法数据
>
> 联动规则和校验规则的复杂度都会根据业务场景的复杂度而线性提升
>
> 还是借助 effects，我们可以方便的来处理各种场景的校验逻辑

### 简单数据校验

> 当前例子涉及基本的字符格式校验与自定义校验

#### Demo 示例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { filter, withLatestFrom, map } from 'rxjs/operators'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormPath,
  FormBlock,
  FormLayout,
  createFormActions
} from '@uform/antd'
import { Button } from 'antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'

const App = () => (
  <Printer>
    <SchemaForm labelCol={6} wrapperCol={6}>
      <Field type="string" name="name" title="姓名" required />
      <Field type="string" name="nickname" title="昵称" required />
      <Field
        type="date"
        name="birthday"
        title="生日"
        description="试试选择2018-11-30"
        x-rules={[
          val =>
            new Promise(resolve => {
              setTimeout(() => {
                if (val === '2018-11-30') {
                  resolve('不允许输入2018-11-30')
                } else {
                  resolve()
                }
              }, 1000)
            })
        ]}
        required
      />
      <Field
        type="string"
        name="phone"
        x-rules="phone"
        title="手机号"
        required
      />
      <Field type="string" name="qq" x-rules="qq" title="QQ号" required />
      <Field type="string" name="email" x-rules="email" title="邮箱" required />
      <Field
        type="string"
        name="home"
        x-rules="url"
        title="个人主页地址"
        required
      />
      <Field
        type="string"
        name="money"
        x-rules="money"
        title="月薪"
        x-props={{ placeholder: '¥100,000', addonAfter: '元' }}
        required
      />
      <Field
        type="string"
        name="idcard"
        x-rules="idcard"
        title="身份证"
        required
      />
      <Field type="string" name="zip" x-rules="zip" title="邮政编码" required />
      <Field
        type="string"
        name="custom"
        x-rules={val =>
          new Promise(resolve => {
            setTimeout(() => {
              if (val === '123') {
                resolve('不允许输入123')
              } else {
                resolve()
              }
            }, 1000)
          })
        }
        title="自定义校验规则"
        required
      />
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 联动数据校验

#### Demo 示例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { filter, withLatestFrom, map } from 'rxjs/operators'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormPath,
  FormBlock,
  FormLayout,
  createFormActions
} from '@uform/antd'
import { Button, Icon } from 'antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'

const PasswordPrefixIcon = (
  <Icon
    type="lock"
    style={{
      color: 'rgba(0, 0, 0, 0.25)',
      fontSize: 14
    }}
  />
)

const App = () => (
  <Printer>
    <SchemaForm
      labelCol={6}
      wrapperCol={6}
      effects={($, { setFieldState, getFieldState }) => {
        $('onFieldChange', '*(password,confirm)').subscribe(fieldState => {
          const selfName = fieldState.name
          const selfValue = fieldState.value
          const otherName = selfName == 'password' ? 'confirm' : 'password'
          const otherValue = getFieldState(otherName, state => state.value)
          setFieldState(otherName, state => {
            if (selfValue && otherValue && selfValue !== otherValue) {
              state.errors = '两次密码输入不一致'
            } else {
              state.errors = ''
            }
          })
          setFieldState(selfName, state => {
            if (selfValue && otherValue && selfValue !== otherValue) {
              state.errors = '两次密码输入不一致'
            } else {
              state.errors = ''
            }
          })
        })
      }}
    >
      <Field type="string" name="username" title="用户名" required />
      <Field
        type="password"
        name="password"
        title="密码"
        x-props={{
          checkStrength: true,
          prefix: PasswordPrefixIcon,
        }}
        description={
          <ul>
            <li>1. 长度不小于8个</li>
            <li>2. 必须包含大小写数字符号</li>
          </ul>
        }
        required
      />
      <Field
        type="password"
        name="confirm"
        title="确认密码"
        x-props={{
          checkStrength: true,
          prefix: PasswordPrefixIcon,
        }}
        required
      />
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```
