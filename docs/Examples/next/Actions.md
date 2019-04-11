# 内外通讯联动

> 是指 Form 外部想要与 Form 进行通讯的场景，比如调用 Form 的 submit 方法
> /validate 方法，或者直接设置 Form 某个字段状态的场景

### 使用 createFormActions 做通讯

> 使用 createFormActions 所创建出来的所有表单操作方法都是同步调用的方式，但是它
> 是必须等待组件初始化完成之后才能调用，否则会报错不过通常我们调用它的方法都是在
> 某个异步事件里调用，所以恰好错开了组件渲染过程的时机，在异步事件内调用就不会报
> 错

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
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
} from '@uform/next'
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
import { Button } from '@alifd/next'
import Printer from '@uform/printer'
import '@alifd/next/dist/next.css'

const actions = createFormActions()

actions.setFieldState('aa', state => { //同步调用会出错
  state.value = '123'
})
actions.submit() //同步调用会出错

const App = () => (
  <Printer>
    <SchemaForm
      actions={actions}
      labelCol={6}
      wrapperCol={4}
      onSubmit={v => alert(JSON.stringify(v))}
    >
      <Field name="aa" type="string" required title="AA" />
      <FormButtonGroup offset={6}>
        <Button onClick={()=>{
            //异步调用没问题
            actions.setFieldState('aa', state => {
              state.value = 'hello world'
            })
            actions.submit()
        }}>修改AA的值并提交表单</Button>
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
console.log(React.unstable_ConcurrentMode)
ReactDOM.render(
  <React.unstable_ConcurrentMode>
      <App />
  </React.unstable_ConcurrentMode>,
  document.getElementById('root')
)
```

### 使用 createAsyncFormActions 做通讯

> 如果用户不想关心 actions 与组件初始化时机的问题，那么可以使用
> createAsyncFormActions，每个被创建出来的方法都将返回一个 Promise 对象这样可以
> 保证方法一定是会在组件初始化完成之后才会调用，也不会报错

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
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
  createAsyncFormActions
} from '@uform/next'
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
import { Button } from '@alifd/next'
import Printer from '@uform/printer'
import '@alifd/next/dist/next.css'

const actions = createAsyncFormActions()

actions.setFieldState('aa', state => {
  //同步调用没问题
  state.value = '123'
})
actions.submit() //同步调用没问题

const App = () => (
  <Printer>
    <SchemaForm
      actions={actions}
      labelCol={6}
      wrapperCol={4}
      onSubmit={v => alert(JSON.stringify(v))}
    >
      <Field name="aa" type="string" required title="AA" />
      <FormButtonGroup offset={6}>
        <Button
          onClick={() => {
            //异步调用没问题
            actions.setFieldState('aa', state => {
              state.value = 'hello world'
            })
            actions.submit()
          }}
        >
          修改AA的值并提交表单
        </Button>
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```
