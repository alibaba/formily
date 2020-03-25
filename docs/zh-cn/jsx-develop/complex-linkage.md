# 实现复杂联动逻辑

我们的联动逻辑的复杂度通常取决于是否存在以下几种问题：

- 联动类型复杂
  - 一对多联动
  - 多对一联动
  - 多依赖联动
  - 链式联动
  - 循环联动
  - 联动校验
- 联动过程中存在异步
- 联动过程中存在大量数据转换逻辑
- 自增列表中相邻字段或者与上一级/下一级字段间的联动
- 动态联动，这里主要讲的是 JSON Schema 中的动态联动，比如是用户手工配置联动规则

上面分析那么多，其实每种问题都是比较麻烦的，一不小心，就会把代码变得非常难以维护，所以我们在解决这类复杂问题的时候，更多的是需要寻找一个可以优雅分解问题的解题策略。

直接看例子：

## 一对多联动

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  createFormActions,
  FormEffectHooks,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input, Select } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const useOneToManyEffects = () => {
  const { setFieldState } = createFormActions()

  onFieldValueChange$('aa').subscribe(({ value }) => {
    setFieldState('*(bb,cc,dd)', state => {
      state.visible = value
    })
  })
}

const App = () => {
  return (
    <Printer>
      <Form
        onSubmit={values => {
          console.log(values)
        }}
        effects={() => {
          useOneToManyEffects()
        }}
      >
        <FormItem
          initialValue={false}
          name="aa"
          title="AA"
          component={Select}
          dataSource={[
            { label: 'visible', value: true },
            { label: 'hidden', value: false }
          ]}
        />
        <FormItem name="bb" title="BB" component={Input} />
        <FormItem name="cc" title="CC" component={Input} />
        <FormItem name="dd" title="DD" component={Input} />
      </Form>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 使用 FormEffectHooks 可以很方便的将联动逻辑拆分出去，方便我们进行物理分离
- 借助路径系统的批量匹配能力实现一对多联动

## 多对一联动

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  createFormActions,
  FormEffectHooks,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input, Select } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const useManyToOneEffects = () => {
  const { setFieldState } = createFormActions()
  onFieldValueChange$('bb').subscribe(({ value }) => {
    setFieldState('aa', state => {
      state.visible = value
    })
  })
  onFieldValueChange$('cc').subscribe(({ value }) => {
    setFieldState('aa', state => {
      state.value = value
    })
  })
}

const App = () => {
  return (
    <Printer>
      <Form
        onSubmit={values => {
          console.log(values)
        }}
        effects={() => {
          useManyToOneEffects()
        }}
      >
        <FormItem name="aa" title="AA" component={Input} />
        <FormItem
          dataSource={[
            { label: 'visible', value: true },
            { label: 'hidden', value: false }
          ]}
          initialValue={false}
          name="bb"
          title="BB"
          component={Select}
        />
        <FormItem name="cc" title="CC" component={Input} />
      </Form>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 多对一联动其实就是一对一联动，只不过作用的对象是同一个字段
- BB 控制 AA 显示隐藏，CC 控制 AA 的值

## 多依赖联动

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  createFormActions,
  FormEffectHooks,
  createEffectHook,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { combineLatest } from 'rxjs/operators'
import { Input, Select } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$, onFormMount$ } = FormEffectHooks

const customEvent$ = createEffectHook('CUSTOM_EVENT')

const useMultiDepsEffects = () => {
  const { setFieldState, dispatch } = createFormActions()

  onFormMount$().subscribe(() => {
    setTimeout(() => {
      dispatch('CUSTOM_EVENT', true)
    }, 3000)
  })

  onFieldValueChange$('aa')
    .pipe(combineLatest(customEvent$()))
    .subscribe(([{ value, values }, visible]) => {
      setFieldState('bb', state => {
        state.visible = visible
      })
      setFieldState('cc', state => {
        state.visible = value
        if (values[1] && values[1].otherInfo) {
          state.value = values[1].otherInfo
        }
      })
    })
}

const App = () => {
  return (
    <Printer>
      <Form
        onSubmit={values => {
          console.log(values)
        }}
        effects={() => {
          useMultiDepsEffects()
        }}
      >
        <FormItem
          dataSource={[
            { label: 'visible', value: true, otherInfo: '123' },
            { label: 'hidden', value: false, otherInfo: '321' }
          ]}
          initialValue={false}
          name="aa"
          title="AA"
          component={Select}
        />
        <FormItem name="bb" visible={false} title="BB" component={Input} />
        <FormItem name="cc" title="CC" component={Input} />
      </Form>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- FormItem 组件 visible 属性可以控制初始显示状态
- BB 的显示受外部异步事件所控制
- CC 的显示隐藏状态受 AA 的值控制，CC 的值受 AA 的附加信息所控制，同时整体联动依赖一个外部异步事件
- 使用 rxjs 操作符 combineLatest 可以解决联动异步依赖问题

## 链式联动

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  createFormActions,
  FormEffectHooks,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input, Select } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const useChainEffects = () => {
  const { setFieldState } = createFormActions()
  onFieldValueChange$('aa').subscribe(({ value }) => {
    setFieldState('bb', state => {
      state.visible = value
    })
  })
  onFieldValueChange$('bb').subscribe(({ value }) => {
    setFieldState('cc', state => {
      state.visible = value
    })
  })
}

const App = () => {
  return (
    <Printer>
      <Form
        onSubmit={values => {
          console.log(values)
        }}
        effects={() => {
          useChainEffects()
        }}
      >
        <FormItem
          dataSource={[
            { label: 'visible', value: true },
            { label: 'hidden', value: false }
          ]}
          initialValue={false}
          name="aa"
          title="AA"
          component={Select}
        />
        <FormItem
          dataSource={[
            { label: 'visible', value: true },
            { label: 'hidden', value: false }
          ]}
          initialValue={false}
          name="bb"
          title="BB"
          component={Select}
        />
        <FormItem name="cc" title="CC" component={Input} />
      </Form>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 链式联动，其实也是可以归一化为一对一联动
- AA 控制 BB 显示隐藏，BB 控制 CC 隐藏

## 循环联动

> 联动关系 Total = Price \* Count;Count = Total / Price;Price = Total / Count

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
  createFormActions
} from '@formily/antd'
import { NumberPicker } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFormInit$, onFieldValueChange$ } = FormEffectHooks

const useCyclicLinkageEffects = () => {
  const { setFieldState, getFieldState } = createFormActions()
  onFieldValueChange$('total').subscribe(({ value }) => {
    if (!value) return
    setFieldState('count', state => {
      const price = getFieldState('price', state => state.value)
      if (!price) return
      state.value = value / price
    })
    setFieldState('price', state => {
      const count = getFieldState('count', state => state.value)
      if (!count) return
      state.value = value / count
    })
  })
  onFieldValueChange$('price').subscribe(({ value }) => {
    if (!value) return
    setFieldState('total', state => {
      const count = getFieldState('count', state => state.value)
      if (!count) return
      state.value = value * count
    })
    setFieldState('count', state => {
      const total = getFieldState('total', state => state.value)
      if (!total) return
      state.value = total / value
    })
  })
  onFieldValueChange$('count').subscribe(({ value }) => {
    if (!value) return
    setFieldState('total', state => {
      const price = getFieldState('price', state => state.value)
      if (!price) return
      state.value = value * price
    })
    setFieldState('price', state => {
      const total = getFieldState('total', state => state.value)
      if (!total) return
      state.value = total / value
    })
  })
}

const App = () => (
  <Printer>
    <Form
      effects={() => {
        useCyclicLinkageEffects()
      }}
      onChange={v => console.log(v)}
      labelCol={6}
      wrapperCol={4}
      onSubmit={v => console.log(v)}
    >
      <FormItem
        name="total"
        type="number"
        required
        title="Total"
        component={NumberPicker}
      />
      <FormItem
        name="count"
        type="number"
        required
        title="Count"
        component={NumberPicker}
      />
      <FormItem
        name="price"
        type="number"
        required
        title="Price"
        component={NumberPicker}
      />
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例详解**

- 循环联动，其实也是可以归一到一对一联动的

## 联动校验

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
  createFormActions
} from '@formily/antd'
import { Input, Password } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const useLinkageValidateEffects = () => {
  const { setFieldState, getFieldState } = createFormActions()
  onFieldValueChange$('*(password,confirm)').subscribe(fieldState => {
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
}

const App = () => (
  <Printer>
    <Form
      labelCol={6}
      wrapperCol={6}
      effects={() => {
        useLinkageValidateEffects()
      }}
    >
      <FormItem name="username" title="用户名" required component={Input} />
      <FormItem
        name="password"
        title="密码"
        checkStrength
        help={
          <ul>
            <li>1. 长度不小于8个</li>
            <li>2. 必须包含大小写数字符号</li>
          </ul>
        }
        required
        component={Password}
      />
      <FormItem
        name="confirm"
        title="确认密码"
        checkStrength
        required
        component={Password}
      />
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 联动校验都需要手动操作字段状态的 errors 属性来控制，你既需要控制错误的出现时机，也要控制错误的隐藏时机

## 异步联动

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
  createFormActions,
  FormPath
} from '@formily/antd'
import { Select, Input } from '@formily/antd-components'
import { merge } from 'rxjs'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFormInit$, onFieldValueChange$, onFieldInit$ } = FormEffectHooks

const createLinkageUtils = () => {
  const { setFieldState } = createFormActions()
  const linkage = (key, defaultValue) => (path, value) =>
    setFieldState(path, state => {
      FormPath.setIn(state, key, value !== undefined ? value : defaultValue)
    })
  return {
    hide: linkage('visible', false),
    show: linkage('visible', true),
    enum: linkage('props.enum', []),
    loading: linkage('loading', true),
    loaded: linkage('loading', false),
    value: linkage('value')
  }
}

const useAsyncLinkageEffect = () => {
  const linkage = createLinkageUtils()
  onFieldValueChange$('aa').subscribe(fieldState => {
    if (!fieldState.value) return
    linkage.show('bb')
    linkage.loading('bb')
    setTimeout(() => {
      linkage.loaded('bb')
      linkage.enum('bb', ['1111', '2222'])
      linkage.value('bb', '1111')
    }, 1000)
  })
  merge(onFieldValueChange$('bb'), onFieldInit$('bb')).subscribe(
    fieldState => {
      if (!fieldState.value) return linkage.hide('cc')
      linkage.show('cc')
      linkage.value('cc', fieldState.value)
    }
  )
}

const App = () => (
  <Printer>
    <Form
      effects={() => {
        useAsyncLinkageEffect()
      }}
      onChange={v => console.log(v)}
      labelCol={6}
      wrapperCol={4}
      onSubmit={v => console.log(v)}
    >
      <FormItem
        name="aa"
        dataSource={['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee']}
        title="AA"
        component={Select}
      />
      <FormItem
        name="bb"
        title="BB"
        dataSource={[]}
        visible={false}
        hasFeedback
        component={Select}
      />
      <FormItem name="cc" title="CC" component={Input} />
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </Form>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 借助 createFormActions，我们可以创建出一些可复用的联动操作原子函数

## 自增列表联动

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import {
  Form,
  FormItem,
  FieldList,
  FormButtonGroup,
  FormEffectHooks,
  createFormActions,
  FormPath,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input, Select } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const App = () => {
  return (
    <Printer>
      <Form
        onSubmit={values => {
          console.log(values)
        }}
        effects={({ setFieldState }) => {
          onFieldValueChange$('array.*.aa').subscribe(({ name, value }) => {
            setFieldState(
              FormPath.transform(name, /\d/, $1 => {
                return `array.${$1}.bb`
              }),
              state => {
                state.visible = value
              }
            )
          })
        }}
      >
        <FieldList name="array">
          {({ state, mutators }) => {
            const onAdd = () => mutators.push()
            return (
              <div>
                {state.value.map((item, index) => {
                  return (
                    <div key={index}>
                      <FormItem
                        name={`array.${index}.aa`}
                        title="Sibling visible"
                        dataSource={[
                          { label: '显示', value: true },
                          { label: '隐藏', value: false }
                        ]}
                        initialValue={true}
                        component={Select}
                      />
                      <FormItem name={`array.${index}.bb`} title="BB" component={Input} />
                    </div>
                  )
                })}
                <Button onClick={onAdd}>add</Button>
              </div>
            )
          }}
        </FieldList>
      </Form>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 借助 FormPath.transform 可以求出自增列表字段的相邻字段

## 外部联动

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  createFormActions,
  FormEffectHooks,
  FormSpy,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input, Select } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const useOneToManyEffects = () => {
  const { setFieldState } = createFormActions()
  onFieldValueChange$('aa').subscribe(({ value }) => {
    setFieldState('*(bb,cc,dd)', state => {
      state.visible = value
    })
  })
}

const actions = createFormActions()

const App = () => {
  return (
    <Printer>
      <Form
        actions={actions}
        effects={() => {
          useOneToManyEffects()
        }}
      >
        <FormItem
          dataSource={[
            { label: 'visible', value: true },
            { label: 'hidden', value: false }
          ]}
          initialValue={false}
          name="aa"
          title="AA"
          component={Select}
        />
        <FormItem name="bb" title="BB" component={Input} />
        <FormItem name="cc" title="CC" component={Input} />
        <FormItem name="dd" title="DD" component={Input} />
        <FormButtonGroup>
          <FormSpy selector={[['onFieldValueChange', 'aa']]}>
            {({ state }) => {
              return (
                state.value && (
                  <>
                    <Submit />
                    <Button
                      onClick={() => {
                        actions.setFieldState('bb', state => {
                          state.value = '' + Math.random()
                        })
                      }}
                    >
                      修改BB的值
                    </Button>
                  </>
                )
              )
            }}
          </FormSpy>
        </FormButtonGroup>
      </Form>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 主联动逻辑是一对多联动
- 借助 FormSpy 可以针对具体字段做监听，所以可以很方便的做 UI 联动状态同步
- 借助 FormActions 可以方便的在外部操作 Form 内部状态
