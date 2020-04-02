# @formily/react

> Formily 在 react 层的实现，内置表单状态核心管理(@formily/react), 通过结合 React 和核心管理机制，提供给开发者 API 可以快速操作表单，以及提供相应 UI 层渲染的支持。
> @formily/react 中主要包含了以下部分：
>
> - Form 表单容器
> - Field 表单字段
> - VirtualField 虚拟表单字段
> - FormaSpy 表单替身
> - FormProvider 表单核心提供者
> - FormConsumer 表单核心消费者(即将废弃，请使用 FormSpy)
> - createFormActions 创建表单核心操作 API 实例
> - createAsyncFormActions 创建表单核心操作 API 实例（异步）
> - FormEffectHooks 表单生命周期 hook

### 安装

```bash
npm install --save @formily/react
```

### 目录

<!-- toc -->

- [使用方式](#使用方式)
  - [`快速开始`](#快速开始)
  - [`基础类型字段`](#基础类型字段)
  - [`字段校验`](#字段校验)
  - [`对象类型字段`](#对象类型字段)
  - [`简单数组类型字段`](#简单数组类型字段)
  - [`对象数组类型字段`](#对象数组类型字段)
  - [`display与visible`](#display-visible)
  - [`简单联动`](#简单联动)
  - [`异步联动`](#异步联动)
  - [`联动校验`](#联动校验)
  - [`复杂联动`](#复杂联动)
  - [`复用Effects`](#复用Effects)
  - [`combo字段`](#combo字段)
  - [`跨文件消费表单数据`](#跨文件消费表单数据)
  - [`简单解构`](#简单解构)
  - [`复杂结构`](#复杂结构)
- [Components](#components)
  - [`<Form/>`](#Form)
  - [`<Field/>`](#Field)
  - [`<VirtualField/>`](#VirtualField)
  - [`<FormSpy/>`](#FormSpy)
  - [`<FormProvider/>`](#FormProvider)
  - [`<FormConsumer/>(即将废弃，请使用<FormSpy/>)`](<#FormConsumer(即将废弃，请使用FormSpy)>)
- [Hook](#Hook)
  - [`useFormEffects`](#useFormEffects)
  - [`useFormState`](#useFormState)
  - [`useFieldState`](#useFieldState)
  - [`useForm`](#useForm)
  - [`useField`](#useField)
  - [`useVirtualField`](#useVirtualField)
  - [`useFormSpy`](#useFormSpy)
- [API](#API)
  - [`createFormActions`](#createFormActions)
  - [`createAsyncFormActions`](#createAsyncFormActions)
  - [`FormEffectHooks`](#FormEffectHooks)
  - [`createEffectHook`](#createEffectHook)
- [Interfaces](#Interfaces)
  - [`IForm`](#IForm)
  - [`Imutators`](#Imutators)
  - [`IFormActions`](#IFormActions)
  - [`IFormAsyncActions`](#IFormAsyncActions)
  - [`IFieldState`](#IFieldState)
  - [`IVirtualFieldState`](#IVirtualFieldState)
  - [`IFormSpyProps`](#IFormSpyProps)
  - [`IFieldHook`](#IFieldHook)
  - [`IVirtualFieldHook`](#IVirtualFieldHook)
  - [`ISpyHook`](#ISpyHook)
  - [`SyncValidateResponse`](#SyncValidateResponse)
  - [`AsyncValidateResponse`](#AsyncValidateResponse)
  - [`ValidateResponse`](#ValidateResponse)
  - [`InternalFormats`](#InternalFormats)
  - [`CustomValidator`](#CustomValidator)
  - [`ValidateDescription`](#ValidateDescription)
  - [`ValidateArrayRules`](#ValidateArrayRules)
  - [`ValidatePatternRules`](#ValidatePatternRules)
  - [`IFieldAPI`](#IFieldAPI)
  - [`IVirtualFieldAPI`](#IVirtualFieldAPI)

### 使用方式

---

#### 快速开始

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  FormPath,
  createFormActions,
  FormSpy,
  FormProvider,
  FormConsumer,
  FormEffectHooks
} from '@formily/react'

const { onFormInit$, onFormInputChange$, onFieldInputChange$ } = FormEffectHooks
const actions = createFormActions()
const App = () => {
  return (
    <Form
      actions={actions}
      effects={() => {
        onFormInit$().subscribe(() => {
          console.log('初始化')
        })
        onFieldInputChange$().subscribe(state => {
          console.log('输入变化', state)
        })
      }}
      onChange={() => {}}
    >
      <React.Fragment>
        <label>username: </label>
        <Field name="username">
          {({ state, mutators }) => (
            <React.Fragment>
              <input
                disabled={!state.editable}
                value={state.value || ''}
                onChange={mutators.change}
                onBlur={mutators.blur}
                onFocus={mutators.focus}
              />
              {state.errors}
              {state.warnings}
            </React.Fragment>
          )}
        </Field>
      </React.Fragment>
    </Form>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

#### 基础类型字段

示例：以输入框为例，如何快速绑定表单字段，后续例子都基于此字段拓展。

```typescript
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <div>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        {state.errors}
        {state.warnings}
      </div>
    )}
  </Field>
)
```

#### 字段校验

示例：必填校验 + error 类型校验 + warning 类型校验 + 自定义校验
校验的类型可以是 [ValidatePatternRules](#ValidatePatternRules)，即 [InternalFormats](#InternalFormats) | [CustomValidator](#CustomValidator) | [ValidateDescription](#ValidateDescription) | [ValidateArrayRules](#ValidateArrayRules)

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <h5>required validation</h5>
      <span>username</span>
      <InputField name="username" required />

      <h5>error type validation</h5>
      <span>age</span>
      <InputField
        name="age"
        rules={[
          val =>
            val === undefined
              ? { type: 'error', message: 'age is required' }
              : undefined
        ]}
      />

      <h5>warning type validation</h5>
      <span>gender</span>
      <InputField
        name="gender"
        rules={[
          val =>
            val === undefined
              ? { type: 'warning', message: 'gender is required' }
              : undefined
        ]}
      />

      <h5>built-in validation default to error type validation</h5>
      <span>id</span>
      <InputField
        name="id"
        rules={[
          {
            format: 'number',
            message: 'id is not a number.'
          }
        ]}
      />

      <h5>custom validation</h5>
      <span>verifyCode</span>
      <InputField
        name="verifyCode"
        rules={[
          {
            validator(value) {
              return value === undefined
                ? 'This field can not be empty, please enter {{scope.outerVariable}}'
                : undefined
            },
            scope: {
              outerVariable: '456'
            }
          },

          {
            validator(value) {
              return value === '456'
                ? { type: 'error', message: 'This field can not be 456' }
                : undefined
            }
          }
        ]}
      />

      <div>
        <button
          onClick={() => {
            const result = actions.validate()
            console.log(actions.getFormState(state => state.values))
            result.then(validateResp => {
              console.log(validateResp)
            })
          }}
        >
          validate
        </button>
      </div>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 对象类型字段

示例：用户信息 `user(username, age)`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <span>user</span>
      <Field
        name="user"
        initialValue={{
          username: undefined,
          age: undefined
        }}
      >
        {({ state, mutators }) => {
          return (
            <React.Fragment>
              {Object.keys(state.value).map(key => {
                if (!mutators.exist(key)) return

                return (
                  <div key={key}>
                    <span>{key}</span>
                    <InputField name={`user.${key}`} />
                    <button
                      onClick={() => {
                        mutators.remove(key)
                      }}
                    >
                      x
                    </button>
                  </div>
                )
              })}
              <button
                onClick={() => {
                  mutators.change({
                    ...state.value,
                    [new Date().getTime()]: new Date().getTime()
                  })
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  console.log(
                    'values',
                    actions.getFormState(state => state.values)
                  )
                }}
              >
                print
              </button>
            </React.Fragment>
          )
        }}
      </Field>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 简单数组类型字段

示例：用户 id 列表，增删改查

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <Field name="idList" initialValue={['1', '2', '3']}>
        {({ state, mutators }) => {
          return (
            <React.Fragment>
              {state.value.map((item, index) => {
                return (
                  <div key={index}>
                    <InputField name={`idList[${index}]`} />
                    <button onClick={() => mutators.remove(index)}>
                      Remove
                    </button>
                  </div>
                )
              })}
              <button onClick={() => mutators.push()}>Add Item</button>
            </React.Fragment>
          )
        }}
      </Field>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 对象数组类型字段

示例：用户 id 列表，增删改查

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <Field
        name="userList"
        initialValue={[
          { username: 'bobby', age: 21 },
          { username: 'lily', age: 20 }
        ]}
      >
        {({ state, mutators }) => {
          return (
            <React.Fragment>
              {state.value.map((item, index) => {
                return (
                  <div key={index}>
                    <Field name={`userList[${index}]`} initialValue={{}}>
                      {({ state: innerState, mutators: innerMutator }) => {
                        return (
                          <React.Fragment>
                            {Object.keys(innerState.value).map(key => {
                              if (!innerMutator.exist(key)) return
                              return (
                                <React.Fragment key={key}>
                                  <InputField
                                    name={`userList[${index}].${key}`}
                                  />
                                  <button
                                    onClick={() => {
                                      innerMutator.remove(key)
                                    }}
                                  >
                                    x
                                  </button>
                                </React.Fragment>
                              )
                            })}
                            <button
                              onClick={() => {
                                innerMutator.change({
                                  ...innerState.value,
                                  [new Date().getTime()]: new Date().getTime()
                                })
                              }}
                            >
                              +
                            </button>
                          </React.Fragment>
                        )
                      }}
                    </Field>

                    <button onClick={() => mutators.remove(index)}>
                      Remove
                    </button>
                  </div>
                )
              })}
              <button
                onClick={() =>
                  mutators.push({
                    username: undefined,
                    age: undefined
                  })
                }
              >
                Add Item
              </button>
              <button
                onClick={() =>
                  console.log(actions.getFormState(state => state.values))
                }
              >
                print
              </button>
            </React.Fragment>
          )
        }}
      </Field>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### display visible

示例: display 与 visible 对 values 的影响

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  createFormActions,
  LifeCycleTypes,
  FormSpy
} from '@formily/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const CheckedField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              type="checkbox"
              onChange={() => {
                mutators.change(!state.value)
              }}
              checked={!!state.value}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const actions = createFormActions()
const App = () => {
  return (
    <Form
      actions={actions}
      effects={($, { validate, setFieldState }) => {
        $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
          setFieldState('displayTrigger', state => (state.value = true))
          setFieldState('visibleTrigger', state => (state.value = true))
          setFieldState('a', state => (state.value = 1))
          setFieldState('b', state => (state.value = 2))
        })

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'visibleTrigger').subscribe(
          fieldState => {
            setFieldState('a', state => {
              state.visible = fieldState.value
            })
          }
        )

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'displayTrigger').subscribe(
          fieldState => {
            setFieldState('b', state => {
              state.display = fieldState.value
            })
          }
        )
      }}
    >
      <div>
        <CheckedField label="visible" name="visibleTrigger" />

        <InputField name="a" label="a" />
      </div>
      <div>
        <CheckedField label="display" name="displayTrigger" />
        <InputField name="b" label="b" />
      </div>

      <FormSpy>
        {({ state, form }) => {
          return (
            <code>
              <pre>
                {JSON.stringify(
                  form.getFormState(state => state.values),
                  null,
                  2
                )}
              </pre>
            </code>
          )
        }}
      </FormSpy>

      <button
        onClick={() => console.log(actions.getFormState(state => state.values))}
      >
        print
      </button>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 简单联动

示例：显示及隐藏，修改 props 和 value

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, LifeCycleTypes } from '@formily/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const CheckedField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              type="checkbox"
              onChange={() => {
                mutators.change(!state.value)
              }}
              checked={!!state.value}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const actions = createFormActions()
const App = () => {
  return (
    <Form
      actions={actions}
      effects={($, { setFieldState }) => {
        $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
          setFieldState('a~', state => (state.visible = false))
        })

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'trigger').subscribe(
          triggerState => {
            setFieldState('a~', state => {
              state.visible = triggerState.value
            })
          }
        )

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'a').subscribe(fieldState => {
          setFieldState('a-copy', state => {
            state.value = fieldState.value
          })
        })
      }}
    >
      <CheckedField name="trigger" label="show/hide" />
      <div>
        <InputField label="a" name="a" />
      </div>
      <div>
        <InputField label="a-copy" name="a-copy" />
      </div>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 异步联动

示例：异步切换 select 的 dataSource

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, LifeCycleTypes } from '@formily/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)
const CheckedField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              type="checkbox"
              onChange={() => {
                mutators.change(!state.value)
              }}
              checked={!!state.value}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const SelectField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const { loading, dataSource = [] } = state.props
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <select
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            >
              {dataSource.map(item => (
                <option value={item.value}>{item.label}</option>
              ))}
            </select>
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const actions = createFormActions()
const App = () => {
  return (
    <Form
      actions={actions}
      effects={($, { setFieldState }) => {
        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'trigger').subscribe(
          fieldState => {
            const dataSource = [
              { label: 'aa', value: 'aa' },
              { label: 'bb', value: 'bb' }
            ]
            setFieldState('sync-source', state => {
              state.props.dataSource = fieldState.value ? dataSource : []
            })
            setFieldState('async-source', state => {
              state.props.loading = true
            })

            setTimeout(() => {
              setFieldState('async-source', state => {
                state.props.loading = false
                state.props.dataSource = fieldState.value ? dataSource : []
              })
            }, 300)
          }
        )
      }}
    >
      <CheckedField name="trigger" label="show/reset dataSource" />
      <div>
        <SelectField label="sync-source" name="sync-source" />
      </div>
      <div>
        <SelectField label="async-source" name="async-source" />
      </div>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 联动校验

示例：初始化校验，字段 change 时自动重新触发校验

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, LifeCycleTypes } from '@formily/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const actions = createFormActions()
const App = () => {
  return (
    <Form
      actions={actions}
      effects={($, { validate, setFieldState }) => {
        $(LifeCycleTypes.ON_FORM_MOUNT).subscribe(() => {
          validate()
        })

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'a').subscribe(fieldState => {
          setFieldState('a-copy', state => {
            state.value = fieldState.value
          })
        })
      }}
    >
      <InputField label="a" name="a" />
      <div>
        <InputField label="a-copy" name="a-copy" required />
      </div>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 复杂联动

示例：ArrayField 复杂联动

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, LifeCycleTypes } from '@formily/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const actions = createFormActions()
const App = () => {
  return (
    <Form
      actions={actions}
      effects={($, { validate, setFieldState }) => {
        $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
          setFieldState('userList.*.username', state => {
            state.visible = false
          })
        })

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'trigger').subscribe(
          fieldState => {
            setFieldState('userList.*.username', state => {
              state.visible = fieldState.value
            })
          }
        )
      }}
    >
      <label>show/hide username</label>
      <Field name="trigger">
        {({ state, mutators }) => {
          return (
            <input
              type="checkbox"
              onChange={mutators.change}
              checked={state.value ? 'checked' : undefined}
            />
          )
        }}
      </Field>
      <div>
        <Field
          initialValue={[
            { username: 'bobby', age: 22 },
            { username: 'lily', age: 21 }
          ]}
          name="userList"
        >
          {({ state, mutators }) => {
            return (
              <React.Fragment>
                {state.value.map((item, index) => {
                  return (
                    <div key={index}>
                      <Field name={`userList[${index}]`} initialValue={{}}>
                        {({ state: innerState, mutators: innerMutator }) => {
                          return (
                            <React.Fragment>
                              {Object.keys(innerState.value).map(key => {
                                if (!innerMutator.exist(key)) return
                                return (
                                  <React.Fragment key={key}>
                                    <InputField
                                      label={key}
                                      name={`userList[${index}].${key}`}
                                    />
                                  </React.Fragment>
                                )
                              })}
                              <button
                                onClick={() => {
                                  innerMutator.change({
                                    ...innerState.value,
                                    [new Date().getTime()]: new Date().getTime()
                                  })
                                }}
                              >
                                +
                              </button>
                            </React.Fragment>
                          )
                        }}
                      </Field>

                      <button onClick={() => mutators.remove(index)}>
                        Remove
                      </button>
                    </div>
                  )
                })}
                <button
                  onClick={() =>
                    mutators.push({
                      username: undefined,
                      age: undefined
                    })
                  }
                >
                  Add Item
                </button>
                <button
                  onClick={() =>
                    console.log(actions.getFormState(state => state.values))
                  }
                >
                  print
                </button>
              </React.Fragment>
            )
          }}
        </Field>
      </div>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 复用 Effects

自定义可复用的 effects

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormEffectHooks } from '@formily/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)
const CheckedField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              type="checkbox"
              onChange={() => {
                mutators.change(!state.value)
              }}
              checked={!!state.value}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const { onFormMount$, onFieldValueChange$ } = FormEffectHooks
const getEffects = () => {
  const actions = createFormActions()
  onFormMount$().subscribe(() => {
    actions.setFieldState('a~', state => (state.visible = false))
  })

  onFieldValueChange$('trigger').subscribe(triggerState => {
    actions.setFieldState('a~', state => {
      state.visible = triggerState.value
    })
  })

  onFieldValueChange$('a').subscribe(fieldState => {
    actions.setFieldState('a-copy', state => {
      state.value = fieldState.value
    })
  })
}

const actions = createFormActions()
const App = () => {
  return (
    <Form
      actions={actions}
      effects={() => {
        getEffects()
      }}
    >
      <CheckedField name="trigger" label="show/hide" />
      <div>
        <InputField label="a" name="a" />
      </div>
      <div>
        <InputField label="a-copy" name="a-copy" />
      </div>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### combo 字段

示例：combo username 和 age 字段, 更多用法，请点击[FormSpy](#FormSpy)查看

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormSpy } from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue('username')}
              <br />
              age: {form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 跨文件消费表单数据

```typescript
文件目录
--app
  |---components
  |---customForm
```

示例：跨文件消费表单数据, 更多用法，请参考[FormProvider](#FormProvider) 和 [FormSpy](#FormSpy)

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  createFormActions,
  FormSpy,
  FormProvider
} from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const CustomForm = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
    </Form>
  )
}

const App = () => {
  return (
    <FormProvider>
      <CustomForm />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue('username')}
              <br />
              age: {form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </FormProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 简单解构

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  createFormActions,
  FormSpy,
  FormPath
} from '@formily/react'

const actions = createFormActions()

const App = () => {
  return (
    <Form actions={actions}>
      <label>range input</label>
      <Field name="[start,end]">
        {({ state, mutators }) => {
          const [start, end] = state.value
          return (
            <div>
              <label>start</label>
              <input
                value={start}
                onChange={e => {
                  mutators.change([e.target.value, end])
                }}
              />
              <label>end</label>
              <input
                value={end}
                onChange={e => {
                  mutators.change([start, e.target.value])
                }}
              />
            </div>
          )
        }}
      </Field>
      <button
        onClick={() => {
          actions.setFormState(state => {
            state.values = { start: 'x', end: 'y' }
          })
        }}
      >
        set value
      </button>
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              Form values:
              <code>
                <pre>
                  {JSON.stringify(
                    form.getFormState(state => state.values),
                    null,
                    2
                  )}
                </pre>
              </code>
            </div>
          )
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 复杂解构

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  createFormActions,
  FormSpy,
  FormPath
} from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <Field name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}">
        {({ state, mutators }) => {
          return (
            <div>
              <button
                onClick={() => {
                  mutators.change({
                    aa: {
                      bb: {
                        cc: 123,
                        dd: [333, 444],
                        ee: 'abcde'
                      }
                    }
                  })
                }}
              >
                set value
              </button>
              <div>Field value:</div>
              <code>
                <pre>{JSON.stringify(state.value, null, 2)}</pre>
              </code>
            </div>
          )
        }}
      </Field>
      <button
        onClick={() => {
          actions.setFieldState(
            FormPath.match(
              '[[{aa:{bb:{cc:destructor1,dd:\\[destructor2,destructor3\\],ee}}}]]'
            ),
            state => {
              state.value = {
                aa: {
                  bb: {
                    cc: 'a',
                    dd: ['b', 'c'],
                    ee: 'd'
                  }
                }
              }
            }
          )
        }}
      >
        outside set
      </button>
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              Form values:
              <code>
                <pre>
                  {JSON.stringify(
                    form.getFormState(state => state.values),
                    null,
                    2
                  )}
                </pre>
              </code>
            </div>
          )
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Components

---

#### `<Form/>`

> Form 组件属性定义

```typescript
interface IFormProps {
  //值
  value?: any
  defaultValue?: any
  //初始值
  initialValues?: any
  // formAPI
  actions?: IFormActions | IFormAsyncActions
  // 副作用
  effects?: IFormEffect<any, IFormActions | IFormAsyncActions>
  // IForm实例
  form?: IForm
  onChange?: (values: Value) => void
  onSubmit?: (values: Value) => void | Promise<Value>
  onReset?: () => void
  onValidateFailed?: (valideted: IFormValidateResult) => void
  children?: React.ReactElement | ((form: IForm) => React.ReactElement)
  //是否使用脏检查，默认会走immer精确更新
  useDirty?: boolean
  // 是否可编辑，默认可编辑
  editable?: boolean
  //是否走悲观校验，遇到第一个校验失败就停止后续校验
  validateFirst?: boolean
}
```

#### `<Field/>`

> Field 组件属性定义

```typescript
interface IFieldStateUIProps {
  //节点路径
  path?: FormPathPattern
  //节点路径
  nodePath?: FormPathPattern
  //数据路径
  dataPath?: FormPathPattern
  //数据路径
  name?: string
  //字段值，与values[0]是恒定相等
  value?: any
  //字段多参值，比如字段onChange触发时，给事件回调传了多参数据，那么这里会存储所有参数的值
  values?: any[]
  //初始值
  initialValue?: any
  //数据与样式是否可见
  visible?: boolean
  //样式是否可见
  display?: boolean
  //字段扩展属性
  props?: FieldProps
  //校验规则，具体类型描述参考后面文档
  rules?: ValidatePatternRules[]
  //是否必填
  required?: boolean
  //字段是否可编辑
  editable?: boolean
  //字段是否走脏检查
  useDirty?: boolean
  //字段状态计算容器，主要用于扩展核心联动规则
  computeState?: (draft: IFieldState, prevState: IFieldState) => void
  // 触发校验类型
  triggerType?: 'onChange' | 'onBlur'
  // 值格式化函数，从浏览器event中获取value
  getValueFromEvent?: (...args: any[]) => any
  children?: React.ReactElement | ((api: IFieldAPI) => React.ReactElement)
}
```

**用法**

例子：各种类型的字段

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <div>
        <h5>Basic Field</h5>
        <Field name="id">
          {({ state, mutator }) => {
            return <input value={state.value} onChange={mutator} />
          }}
        </Field>
      </div>

      <div>
        <h5>Object Field</h5>
        <Field
          name="user"
          initialValue={{
            username: undefined,
            age: undefined
          }}
        >
          {({ state, mutators }) => {
            return (
              <React.Fragment>
                {Object.keys(state.value).map(key => {
                  if (!mutators.exist(key)) return

                  return (
                    <div key={key}>
                      <span>{key}</span>
                      <InputField name={`user.${key}`} />
                      <button
                        onClick={() => {
                          mutators.remove(key)
                        }}
                      >
                        x
                      </button>
                    </div>
                  )
                })}
                <button
                  onClick={() => {
                    mutators.change({
                      ...state.value,
                      [new Date().getTime()]: new Date().getTime()
                    })
                  }}
                >
                  +
                </button>
              </React.Fragment>
            )
          }}
        </Field>
      </div>

      <div>
        <h5>ArrayField Field</h5>
        <Field name="idList" initialValue={['1', '2', '3']}>
          {({ state, mutators }) => {
            return (
              <React.Fragment>
                {state.value.map((item, index) => {
                  return (
                    <div key={index}>
                      <InputField name={`idList[${index}]`} />
                      <button onClick={() => mutators.remove(index)}>
                        Remove
                      </button>
                    </div>
                  )
                })}
                <button onClick={() => mutators.push()}>Add Item</button>
              </React.Fragment>
            )
          }}
        </Field>
      </div>

      <div>
        <h5>ArrayObject Field</h5>
        <Field
          name="userList"
          initialValue={[
            { username: 'bobby', age: 21 },
            { username: 'lily', age: 20 }
          ]}
        >
          {({ state, mutators }) => {
            return (
              <React.Fragment>
                {state.value.map((item, index) => {
                  return (
                    <div key={index}>
                      <Field name={`userList[${index}]`} initialValue={{}}>
                        {({ state: innerState, mutators: innerMutator }) => {
                          return (
                            <React.Fragment>
                              {Object.keys(innerState.value).map(key => {
                                if (!innerMutator.exist(key)) return
                                return (
                                  <React.Fragment key={key}>
                                    <InputField
                                      name={`userList[${index}].${key}`}
                                    />
                                    <button
                                      onClick={() => {
                                        innerMutator.remove(key)
                                      }}
                                    >
                                      x
                                    </button>
                                  </React.Fragment>
                                )
                              })}
                              <button
                                onClick={() => {
                                  innerMutator.change({
                                    ...innerState.value,
                                    [new Date().getTime()]: new Date().getTime()
                                  })
                                }}
                              >
                                +
                              </button>
                            </React.Fragment>
                          )
                        }}
                      </Field>

                      <button onClick={() => mutators.remove(index)}>
                        Remove
                      </button>
                    </div>
                  )
                })}
                <button
                  onClick={() =>
                    mutators.push({
                      username: undefined,
                      age: undefined
                    })
                  }
                >
                  Add Item
                </button>
              </React.Fragment>
            )
          }}
        </Field>
      </div>
      <button
        onClick={() => console.log(actions.getFormState(state => state.values))}
      >
        print
      </button>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<VirtualField/>`

> VirtualField 组件属性定义

```typescript
interface IVirtualFieldProps {
  //节点路径
  path?: FormPathPattern
  //节点路径
  nodePath?: FormPathPattern
  //数据路径
  dataPath?: FormPathPattern
  //数据与样式是否可见
  visible?: boolean
  //样式是否可见
  display?: boolean
  //数据路径
  name?: string
  //字段扩展属性
  props?: FieldProps
  //字段是否走脏检查
  useDirty?: boolean
  //字段状态计算容器，主要用于扩展核心联动规则
  computeState?: (draft: IFieldState, prevState: IFieldState) => void
  children?: React.ReactElement | ((api: IFieldAPI) => React.ReactElement)
}
```

**用法**

例子：动态设置布局组件的属性

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, VirtualField } from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const Layout = ({ children, width = '100px', height = '100px' }) => {
  return (
    <div style={{ border: '1px solid #999', width, height }}>{children}</div>
  )
}

const App = () => {
  return (
    <Form actions={actions}>
      <Field name="user" initialValue={{}}>
        {({ state, mutator }) => {
          return (
            <VirtualField name="user.layout">
              {({ state: layoutState }) => {
                return (
                  <Layout
                    width={layoutState.props.width}
                    height={layoutState.props.height}
                  >
                    <label>username</label>
                    <InputField name="username" />
                    <label>age</label>
                    <InputField name="age" />
                  </Layout>
                )
              }}
            </VirtualField>
          )
        }}
      </Field>

      <button
        onClick={() => {
          // some where dynamic change layout's props
          actions.setFieldState('user.layout', state => {
            state.props.width = '200px'
            state.props.height = '200px'
          })
        }}
      >
        change layout
      </button>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormSpy/>`

> FormSpy 组件属性定义

```typescript
interface IFormSpyProps {
  // 选择器, 如：[ LifeCycleTypes.ON_FORM_SUBMIT_START, LifeCycleTypes.ON_FORM_SUBMIT_END ]
  selector?: string[] | string
  // reducer函数，状态叠加处理，action为当前命中的生命周期的数据
  reducer?: (
    state: any,
    action: { type: string; payload: any },
    form: IForm
  ) => any
  children?: React.ReactElement | ((api: IFormSpyAPI) => React.ReactElement)
}
```

**用法**

例子 1： 实现一个统计表单 values 改变的计数器

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  createFormActions,
  FormSpy,
  LifeCycleTypes
} from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
      <FormSpy
        selector={LifeCycleTypes.ON_FORM_VALUES_CHANGE}
        reducer={(state, action, form) => ({
          count: state.count ? state.count + 1 : 1
        })}
      >
        {({ state, type, form }) => {
          return <div>count: {state.count || 0}</div>
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

例子 2：实现常用 combo 组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormSpy } from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue('username')}
              <br />
              age: {form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormProvider/>`

> 与 FormSpy 搭配使用，常用与跨文件通信

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  createFormActions,
  FormSpy,
  FormProvider
} from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const CustomForm = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
    </Form>
  )
}

const App = () => {
  return (
    <FormProvider>
      <CustomForm />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue('username')}
              <br />
              age: {form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </FormProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormConsumer/>(即将废弃，请使用 <FormSpy/>)`

> FormConsumer 组件属性定义

```typescript
interface IFormConsumerProps {
  // 选择器, 如：[ LifeCycleTypes.ON_FORM_SUBMIT_START, LifeCycleTypes.ON_FORM_SUBMIT_END ]
  selector?: string[] | string
  children?:
    | React.ReactElement
    | ((api: IFormConsumerAPI) => React.ReactElement)
}
```

### Hook

#### `useFormEffects`

> 使用 useFormEffects 可以实现局部 effect 的表单组件，效果同：[简单联动](#简单联动)
> 注意：监听的生命周期是从 `ON_FORM_MOUNT` 开始

**签名**

```typescript
(effects: IFormEffect): void
```

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  createFormActions,
  useFormEffects,
  LifeCycleTypes
} from '@formily/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const CheckedField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              type="checkbox"
              onChange={() => {
                mutators.change(!state.value)
              }}
              checked={!!state.value}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const FormFragment = () => {
  useFormEffects(($, { setFieldState }) => {
    $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
      setFieldState('a~', state => (state.visible = false))
    })

    $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'trigger').subscribe(
      triggerState => {
        setFieldState('a~', state => {
          state.visible = triggerState.value
        })
      }
    )

    $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'a').subscribe(fieldState => {
      setFieldState('a-copy', state => {
        state.value = fieldState.value
      })
    })
  })

  return (
    <React.Fragment>
      <CheckedField name="trigger" label="show/hide" />
      <div>
        <InputField label="a" name="a" />
      </div>
      <div>
        <InputField label="a-copy" name="a-copy" />
      </div>
    </React.Fragment>
  )
}

const App = () => {
  return (
    <Form actions={actions}>
      <FormFragment />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `useFormState`

> 使用 useFormState 为自定义组件提供 FormState 扩展和管理能力

**签名**

```typescript
(defaultState: T): [state: IFormState, setFormState: (state?: IFormState) => void]
```

**用法**

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  VirtualField,
  createFormActions,
  createEffectHook,
  useForm,
  useFormState,
  useFormEffects,
  useFieldState,
  LifeCycleTypes
} from '@formily/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const actions = createFormActions()
const FormFragment = props => {
  const [formState, setFormState] = useFormState({ extendVar: 0 })
  const { extendVar } = formState

  return (
    <div>
      <button
        onClick={() => {
          setFormState({ extendVar: extendVar + 1 })
        }}
      >
        add
      </button>
      <div>count: {extendVar}</div>
    </div>
  )
}

const App = () => {
  return (
    <Form actions={actions}>
      <FormFragment />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `useFieldState`

> 使用 useFieldState 为自定义组件提供状态管理能力

**签名**

```typescript
(defaultState: T): [state: IFieldState, setFieldState: (state?: IFieldState) => void]
```

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  VirtualField,
  createFormActions,
  createEffectHook,
  useForm,
  useFormEffects,
  useFieldState,
  LifeCycleTypes
} from '@formily/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return (
        <React.Fragment>
          {props.label && <label>{props.label}</label>}
          {loading ? (
            ' loading... '
          ) : (
            <input
              disabled={!state.editable}
              value={state.value || ''}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
            />
          )}
          <span style={{ color: 'red' }}>{state.errors}</span>
          <span style={{ color: 'orange' }}>{state.warnings}</span>
        </React.Fragment>
      )
    }}
  </Field>
)

const changeTab$ = createEffectHook('changeTab')
const actions = createFormActions()
const TabFragment = props => {
  const [fieldState, setLocalFieldState] = useFieldState({ current: 0 })
  const { current } = fieldState
  const { children, dataSource, form } = props

  const update = cur => {
    form.notify('changeTab', cur)
    setLocalFieldState({
      current: cur
    })
  }

  useFormEffects(($, { setFieldState }) => {
    dataSource.forEach((item, itemIdx) => {
      setFieldState(item.name, state => {
        state.display = itemIdx === current
      })
    })

    changeTab$().subscribe(idx => {
      dataSource.forEach((item, itemIdx) => {
        setFieldState(item.name, state => {
          state.display = itemIdx === idx
        })
      })
    })
  })

  const btns = dataSource.map((item, idx) => {
    const focusStyle =
      idx === current ? { color: '#fff', background: 'blue' } : {}
    return (
      <button
        style={focusStyle}
        onClick={() => {
          update(idx)
        }}
      >
        {item.label}
      </button>
    )
  })

  return btns
}

const FormTab = props => {
  return (
    <VirtualField name="layout_tab">
      {({ form }) => {
        return <TabFragment {...props} form={form} />
      }}
    </VirtualField>
  )
}

const App = () => {
  return (
    <Form actions={actions}>
      <FormTab
        dataSource={[
          { label: 'tab-1', name: 'username' },
          { label: 'tab-2', name: 'age' }
        ]}
      />
      <div>
        <InputField name="username" label="username" />
        <InputField name="age" label="age" />
      </div>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### useForm

> 获取一个 [IForm](#IForm) 实例

**签名**

```typescript
type useForm = <
  Value = any,
  DefaultValue = any,
  EffectPayload = any,
  EffectAction = any
>(
  props: IFormProps<Value, DefaultValue, EffectPayload, EffectAction>
) => IForm
```

**用法**

```typescript
import { useForm } from '@formily/react'

const FormFragment = () => {
  const form = useForm()
  return <div>{form.getFieldValue('username')}</div>
}
```

#### useField

> 获取一个 [IFieldHook](#IFieldHook) 实例

**签名**

```typescript
type useField = (options: IFieldStateUIProps): IFieldHook
```

**用法**

```typescript
import { useField } from '@formily/react'

const FormFragment = props => {
  const { form, state, props: fieldProps, mutators } = useField({
    name: 'username'
  })

  return (
    <input
      {...fieldProps}
      {...props}
      value={state.value}
      onChange={mutators.change}
    />
  )
}
```

#### useVirtualField

> 获取一个 [IVirtualFieldHook](#IVirtualFieldHook) 实例

**签名**

```typescript
type UseVirtualField = (options: IVirtualFieldStateProps): IVirtualFieldHook
```

**用法**

```typescript
import { UseVirtualField } from '@formily/react'

const FormFragment = props => {
  const { form, state, props: fieldProps } = UseVirtualField({
    name: 'username'
  })

  return (
    <div style={{ width: fieldProps.width, height: fieldProps.height }}>
      {props.children}
    </div>
  )
}
```

#### useFormSpy

> 获取一个 [ISpyHook](#ISpyHook) 实例, 实现[FormSpy](#FormSpy) 第一个例子

**签名**

```typescript
type useFormSpy = (props: IFormSpyProps): ISpyHook
```

**用法**

```typescript
import { useFormSpy, LifeCycleTypes } from '@formily/react'
const FormFragment = props => {
  const { form, state, type } = useFormSpy({
    selector: LifeCycleTypes.ON_FORM_VALUES_CHANGE,
    reducer: (state, action, form) => ({
      count: state.count ? state.count + 1 : 1
    })
  })

  return (
    <div>
      <div>count: {state.count || 0}</div>
    </div>
  )
}
```

### API

> 整体完全继承@formily/core, 下面只列举@formily/react 的特有 API

---

#### `createFormActions`

> 创建一个 [IFormActions](#IFormActions) 实例

**签名**

```typescript
createFormActions(): IFormActions
```

**用法**

```typescript
import { createFormActions } from '@formily/react'

const actions = createFormActions()
console.log(actions.getFieldValue('username'))
```

#### `createAsyncFormActions`

> 创建一个 [IFormAsyncActions](#IFormAsyncActions) 实例，成员方法 同[IFormActions](#IFormActions),
> 但是调用 API 返回的结果是异步的(promise)。

**签名**

```typescript
createAsyncFormActions(): IFormAsyncActions
```

**用法**

```typescript
import { createAsyncFormActions } from '@formily/react'

const actions = createAsyncFormActions()
actions.getFieldValue('username').then(val => console.log(val))
```

#### `FormEffectHooks`

> 返回包含所有 Formily 生命周期的钩子函数，可以被监听消费

**用法**

```typescript
import { FormEffectHooks, Form } from '@formily/react'
const {
  /**
   * Form LifeCycle
   **/
  onFormWillInit$, // 表单预初始化触发
  onFormInit$, // 表单初始化触发
  onFormChange$, // 表单变化时触发
  onFormInputChange$, // 表单事件触发时触发，用于只监控人工操作
  onFormInitialValueChange$, // 表单初始值变化时触发
  onFormSubmitValidateStart$, // 表单提交时触发校验开始
  onFormSubmitValidateSuccess$, // 表单提交时触发校验成功
  onFormSubmitValidateFailed$, // 表单提交时触发校验失败
  onFormReset$, // 表单重置时触发
  onFormSubmit$, // 表单提交时触发
  onFormSubmitStart$, // 表单提交开始时触发
  onFormSubmitEnd$, // 表单提交结束时触发
  onFormMount$, // 表单挂载时触发
  onFormUnmount$, // 表单卸载时触发
  onFormValidateStart$, // 表单校验开始时触发
  onFormValidateEnd$, //表单校验结束时触发
  onFormValuesChange$, // 表单值变化时触发
  /**
   * FormGraph LifeCycle
   **/
  onFormGraphChange$, // 表单观察者树变化时触发
  /**
   * Field LifeCycle
   **/
  onFieldWillInit$, // 字段预初始化时触发
  onFieldInit$, // 字段初始化时触发
  onFieldChange$, // 字段变化时触发
  onFieldMount$, // 字段挂载时触发
  onFieldUnmount$, // 字段卸载时触发
  onFieldInputChange$, // 字段事件触发时触发，用于只监控人工操作
  onFieldValueChange$, // 字段值变化时触发
  onFieldInitialValueChange$ // 字段初始值变化时触发
} = FormEffectHooks

const App = () => {
  return (
    <Form
      effects={() => {
        onFormInit$().subscribe(() => {
          console.log('初始化')
        })
      }}
    >
      ...
    </Form>
  )
}
```

#### createEffectHook

> 自定义 hook

**签名**

```typescript
(type: string): Observable<TResult>
```

**用法**

```jsx
import { Form, createEffectHook, createFormActions } from '@formily/react'

const actions = createFormActions()
const diyHook1$ = createEffectHook('diy1')
const diyHook2$ = createEffectHook('diy2')

const App = () => {
  return (
    <Form
      actions={actions}
      effects={() => {
        diyHook1$().subscribe(payload => {
          console.log('diy1 hook triggered', payload)
        })

        diyHook2$().subscribe(payload => {
          console.log('diy2 hook triggered', payload)
        })
      }}
    >
      <button
        onClick={() => {
          actions.notify('diy1', { index: 1 })
        }}
      >
        notify diy1
      </button>
      <button
        onClick={() => {
          actions.notify('diy2', { index: 2 })
        }}
      >
        notify diy2
      </button>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Interfaces

> 整体完全继承@formily/core, 下面只列举@formily/react 的特有的 Interfaces

---

#### IForm

> 通过 createForm 创建出来的 Form 实例对象 API

```typescript
interface IForm {
  /*
   * 表单提交，如果回调参数返回Promise，
   * 那么整个提交流程会hold住，同时loading为true，
   * 等待Promise resolve才触发表单onFormSubmitEnd事件，同时loading为false
   */
  submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<{
    validated: IFormValidateResult
    payload: any //onSubmit回调函数返回值
  }>

  /*
   * 清空错误消息，可以通过传FormPathPattern来批量或精确控制要清空的字段，
   * 比如clearErrors("*(aa,bb,cc)")
   */
  clearErrors: (pattern?: FormPathPattern) => void

  /*
   * 获取状态变化情况，主要用于在表单生命周期钩子内判断当前生命周期中有哪些状态发生了变化，
   * 比如hasChanged(state,'value.aa')
   */
  hasChanged(
    target: IFormState | IFieldState | IVirtualFieldState,
    path: FormPathPattern
  ): boolean

  /*
   * 重置表单
   */
  reset(options?: {
    //强制清空
    forceClear?: boolean
    //强制校验
    validate?: boolean
    //重置范围，用于批量或者精确控制要重置的字段
    selector?: FormPathPattern
    //是否清空默认值
    clearInitialValue?: boolean
  }): Promise<void | IFormValidateResult>

  /*
   * 校验表单
   */
  validate(
    path?: FormPathPattern,
    options?: {
      //是否悲观校验，如果当前字段遇到第一个校验错误则停止后续校验流程
      first?: boolean
    }
  ): Promise<IFormValidateResult>

  /*
   * 设置表单状态
   */
  setFormState(
    //操作回调
    callback?: (state: IFormState) => any,
    //是否不触发事件
    silent?: boolean
  ): void

  /*
   * 获取表单状态
   */
  getFormState(
    //transformer
    callback?: (state: IFormState) => any
  ): any

  /*
   * 设置字段状态
   */
  setFieldState(
    //字段路径
    path: FormPathPattern,
    //操作回调
    callback?: (state: IFieldState) => void,
    //是否不触发事件
    silent?: boolean
  ): void

  /*
   * 获取字段状态
   */
  getFieldState(
    //字段路径
    path: FormPathPattern,
    //transformer
    callback?: (state: IFieldState) => any
  ): any

  /*
   * 注册字段
   */
  registerField(props: {
    //节点路径
    path?: FormPathPattern
    //数据路径
    name?: string
    //字段值
    value?: any
    //字段多参值
    values?: any[]
    //字段初始值
    initialValue?: any
    //字段扩展属性
    props?: any
    //字段校验规则
    rules?: ValidatePatternRules[]
    //字段是否必填
    required?: boolean
    //字段是否可编辑
    editable?: boolean
    //字段是否走脏检查
    useDirty?: boolean
    //字段状态计算容器，主要用于扩展核心联动规则
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IField

  /*
   * 注册虚拟字段
   */
  registerVirtualField(props: {
    //节点路径
    path?: FormPathPattern
    //数据路径
    name?: string
    //字段扩展属性
    props?: any
    //字段是否走脏检查
    useDirty?: boolean
    //字段状态计算容器，主要用于扩展核心联动规则
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IVirtualField

  /*
   * 创建字段数据操作器，后面会详细解释返回的API
   */
  createMutators(field: IField | FormPathPattern): IMutators

  /*
   * 获取表单观察者树
   */
  getFormGraph(): IFormGraph

  /*
   * 设置表单观察者树
   */
  setFormGraph(graph: IFormGraph): void

  /*
   * 监听表单生命周期
   */
  subscribe(
    callback?: ({ type, payload }: { type: string; payload: any }) => void
  ): number

  /*
   * 取消监听表单生命周期
   */
  unsubscribe(id: number): void

  /*
   * 触发表单自定义生命周期
   */
  notify: <T>(type: string, payload?: T) => void

  /*
   * 设置字段值
   */
  setFieldValue(path?: FormPathPattern, value?: any): void

  /*
   * 获取字段值
   */
  getFieldValue(path?: FormPathPattern): any

  /*
   * 设置字段初始值
   */
  setFieldInitialValue(path?: FormPathPattern, value?: any): void

  /*
   * 获取字段初始值
   */
  getFieldInitialValue(path?: FormPathPattern): any
}
```

#### Imutators

> 通过 createMutators 创建出来的实例 API，主要用于操作字段数据

```typescript
interface IMutators {
  //改变字段值，多参情况，会将所有参数存在values中
  change(...values: any[]): any
  //获取焦点，触发active状态改变
  focus(): void
  //失去焦点，触发active/visited状态改变
  blur(): void
  //触发当前字段校验器
  validate(): Promise<IFormValidateResult>
  //当前字段的值是否在Form的values属性中存在
  exist(index?: number | string): boolean

  /**数组操作方法**/

  //追加数据
  push(value?: any): any[]
  //弹出尾部数据
  pop(): any[]
  //插入数据
  insert(index: number, value: any): any[]
  //删除数据
  remove(index: number | string): any
  //头部插入
  unshift(value: any): any[]
  //头部弹出
  shift(): any[]
  //移动元素
  move($from: number, $to: number): any[]
  //下移
  moveDown(index: number): any[]
  //上移
  moveUp(index: number): any[]
}
```

#### IFormActions

```typescript
interface IFormActions {
  /*
   * 表单提交，如果回调参数返回Promise，
   * 那么整个提交流程会hold住，同时loading为true，
   * 等待Promise resolve才触发表单onFormSubmitEnd事件，同时loading为false
   */
  submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<{
    validated: IFormValidateResult
    payload: any //onSubmit回调函数返回值
  }>

  /*
   * 清空错误消息，可以通过传FormPathPattern来批量或精确控制要清空的字段，
   * 比如clearErrors("*(aa,bb,cc)")
   */
  clearErrors: (pattern?: FormPathPattern) => void

  /*
   * 获取状态变化情况，主要用于在表单生命周期钩子内判断当前生命周期中有哪些状态发生了变化，
   * 比如hasChanged(state,'value.aa')
   */
  hasChanged(
    target: IFormState | IFieldState | IVirtualFieldState,
    path: FormPathPattern
  ): boolean

  /*
   * 重置表单
   */
  reset(options?: {
    //强制清空
    forceClear?: boolean
    //强制校验
    validate?: boolean
    //重置范围，用于批量或者精确控制要重置的字段
    selector?: FormPathPattern
    //是否清空默认值
    clearInitialValue?: boolean
  }): Promise<void | IFormValidateResult>

  /*
   * 校验表单, 当校验失败时抛出异常
   */
  validate(
    path?: FormPathPattern,
    options?: {
      //是否悲观校验，如果当前字段遇到第一个校验错误则停止后续校验流程
      first?: boolean
    }
  ): Promise<IFormValidateResult>

  /*
   * 设置表单状态
   */
  setFormState(
    //操作回调
    callback?: (state: IFormState) => any,
    //是否不触发事件
    silent?: boolean
  ): void

  /*
   * 获取表单状态
   */
  getFormState(
    //transformer
    callback?: (state: IFormState) => any
  ): any

  /*
   * 设置字段状态
   */
  setFieldState(
    //字段路径
    path: FormPathPattern,
    //操作回调
    callback?: (state: IFieldState) => void,
    //是否不触发事件
    silent?: boolean
  ): void

  /*
   * 获取字段状态
   */
  getFieldState(
    //字段路径
    path: FormPathPattern,
    //transformer
    callback?: (state: IFieldState) => any
  ): any

  /*
   * 获取表单观察者树
   */
  getFormGraph(): IFormGraph

  /*
   * 设置表单观察者树
   */
  setFormGraph(graph: IFormGraph): void

  /*
   * 监听表单生命周期
   */
  subscribe(
    callback?: ({ type, payload }: { type: string; payload: any }) => void
  ): number

  /*
   * 取消监听表单生命周期
   */
  unsubscribe(id: number): void

  /*
   * 触发表单自定义生命周期
   */
  notify: <T>(type: string, payload?: T) => void
  dispatch: <T>(type: string, payload?: T) => void

  /*
   * 设置字段值
   */
  setFieldValue(path?: FormPathPattern, value?: any): void

  /*
   * 获取字段值
   */
  getFieldValue(path?: FormPathPattern): any

  /*
   * 设置字段初始值
   */
  setFieldInitialValue(path?: FormPathPattern, value?: any): void

  /*
   * 获取字段初始值
   */
  getFieldInitialValue(path?: FormPathPattern): any
}
```

#### IFormAsyncActions

```typescript
interface IFormAsyncActions {
  /*
   * 表单提交，如果回调参数返回Promise，
   * 那么整个提交流程会hold住，同时loading为true，
   * 等待Promise resolve才触发表单onFormSubmitEnd事件，同时loading为false
   */
  submit(
    onSubmit?: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  /*
   * 重置表单
   */
  reset(options?: {
    //强制清空
    forceClear?: boolean
    //强制校验
    validate?: boolean
    //重置范围，用于批量或者精确控制要重置的字段
    selector?: FormPathPattern
    //是否清空默认值
    clearInitialValue?: boolean
  }): Promise<void>
  /*
   * 获取状态变化情况，主要用于在表单生命周期钩子内判断当前生命周期中有哪些状态发生了变化，
   * 比如hasChanged(state,'value.aa')
   */
  hasChanged(target: any, path: FormPathPattern): Promise<boolean>
  /*
   * 清空错误消息，可以通过传FormPathPattern来批量或精确控制要清空的字段，
   * 比如clearErrors("*(aa,bb,cc)")
   */
  clearErrors: (pattern?: FormPathPattern) => Promise<void>
  /*
   * 校验表单, 当校验失败时抛出异常
   */
  validate(
    path?: FormPathPattern,
    options?: {
      //是否悲观校验，如果当前字段遇到第一个校验错误则停止后续校验流程
      first?: boolean
    }
  ): Promise<IFormValidateResult>
  /*
   * 设置表单状态
   */
  setFormState(
    //操作回调
    callback?: (state: IFormState) => any,
    //是否不触发事件
    silent?: boolean
  ): Promise<void>
  /*
   * 获取表单状态
   */
  getFormState(
    //transformer
    callback?: (state: IFormState) => any
  ): Promise<any>
  /*
   * 设置字段状态
   */
  setFieldState(
    //字段路径
    path: FormPathPattern,
    //操作回调
    callback?: (state: IFieldState) => void,
    //是否不触发事件
    silent?: boolean
  ): Promise<void>
  /*
   * 获取字段状态
   */
  getFieldState(
    //字段路径
    path: FormPathPattern,
    //transformer
    callback?: (state: IFieldState) => any
  ): Promise<void>
  getFormGraph(): Promise<IFormGraph>
  setFormGraph(graph: IFormGraph): Promise<void>
  subscribe(callback?: FormHeartSubscriber): Promise<number>
  unsubscribe(id: number): Promise<void>
  notify: <T>(type: string, payload?: T) => Promise<void>
  dispatch: <T>(type: string, payload?: T) => Promise<void>
  setFieldValue(path?: FormPathPattern, value?: any): Promise<void>
  getFieldValue(path?: FormPathPattern): Promise<any>
  setFieldInitialValue(path?: FormPathPattern, value?: any): Promise<void>
  getFieldInitialValue(path?: FormPathPattern): Promise<any>
}
```

#### IFieldState

```typescript
interface IFieldState<FieldProps = any> {
  /**只读属性**/

  //状态名称，FieldState
  displayName?: string
  //数据路径
  name: string
  //节点路径
  path: string
  //是否已经初始化
  initialized: boolean
  //是否处于原始态，只有value===intialValues时的时候该状态为true
  pristine: boolean
  //是否处于合法态，只要errors长度大于0的时候valid为false
  valid: boolean
  //是否处于非法态，只要errors长度大于0的时候valid为true
  invalid: boolean
  //是否处于校验态
  validating: boolean
  //是否被修改，如果值发生变化，该属性为true，同时在整个字段的生命周期内都会为true
  modified: boolean
  //是否被触碰
  touched: boolean
  //是否被激活，字段触发onFocus事件的时候，它会被触发为true，触发onBlur时，为false
  active: boolean
  //是否访问过，字段触发onBlur事件的时候，它会被触发为true
  visited: boolean

  /**可写属性**/

  //是否可见，注意：该状态如果为false，那么字段的值不会被提交，同时UI不会显示
  visible: boolean
  //是否展示，注意：该状态如果为false，那么字段的值会提交，UI不会展示，类似于表单隐藏域
  display: boolean
  //是否可编辑
  editable: boolean
  //是否处于loading状态，注意：如果字段处于异步校验时，loading为true
  loading: boolean
  //字段多参值，比如字段onChange触发时，给事件回调传了多参数据，那么这里会存储所有参数的值
  values: any[]
  //字段错误消息
  errors: string[]
  //字段告警消息
  warnings: string[]
  //字段值，与values[0]是恒定相等
  value: any
  //初始值
  initialValue: any
  //校验规则，具体类型描述参考后面文档
  rules: ValidatePatternRules[]
  //是否必填
  required: boolean
  //是否挂载
  mounted: boolean
  //是否卸载
  unmounted: boolean
  //字段扩展属性
  props: FieldProps
}
```

#### IVirtualFieldState

> 虚拟 Field 核心状态

```typescript
interface IVirtualFieldState<FieldProps = any> {
  /**只读状态**/

  //状态名称，VirtualFieldState
  displayName: string
  //字段数据路径
  name: string
  //字段节点路径
  path: string
  //是否已经初始化
  initialized: boolean

  /**可写状态**/

  //是否可见，注意：该状态如果为false，UI不会显示，数据也不会提交(因为它是VirtualField)
  visible: boolean
  //是否展示，注意：该状态如果为false，UI不会显示，数据也不会提交(因为它是VirtualField)
  display: boolean
  //是否已挂载
  mounted: boolean
  //是否已卸载
  unmounted: boolean
  //字段扩展属性
  props: FieldProps
}
```

### IFormSpyProps

```typescript
interface IFormSpyProps {
  selector?: string[] | string
  reducer?: (
    state: any,
    action: { type: string; payload: any },
    form: IForm
  ) => any
  children?: React.ReactElement | ((api: IFormSpyAPI) => React.ReactElement)
}
```

### IFieldHook

```typescript
interface IFieldHook {
  form: IForm
  state: IFieldState
  props: {}
  mutators: IMutators
}
```

### IVirtualFieldHook

```typescript
interface IVirtualFieldHook {
  form: IForm
  state: IFieldState
  props: {}
}
```

### ISpyHook

```typescript
interface ISpyHook {
  form: IForm
  state: any
  type: string
}
```

#### SyncValidateResponse

```typescript
declare type SyncValidateResponse =
  | null
  | string
  | boolean
  | {
      type?: 'error' | 'warning'
      message: string
    }
```

#### AsyncValidateResponse

```typescript
declare type AsyncValidateResponse = Promise<SyncValidateResponse>
```

#### ValidateResponse

```typescript
export declare type ValidateResponse =
  | SyncValidateResponse
  | AsyncValidateResponse
```

#### InternalFormats

```typescript
type InternalFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'idcard'
  | 'taodomain'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | string
```

#### CustomValidator

```typescript
declare type CustomValidator = (
  value: any,
  description?: ValidateDescription
) => ValidateResponse
```

#### ValidateDescription

```typescript
interface ValidateDescription {
  // 内置校验规则，参考string内置校验规则
  format?: InternalFormats
  // 自定义校验规则
  validator?: CustomValidator
  // 是否必填
  required?: boolean
  // 匹配规则
  pattern?: RegExp | string
  // 最大长度
  max?: number
  // 最大值（大于）
  maximum?: number
  // 最大值（大于等于）
  exclusiveMaximum?: number
  // 最小值（小于等于）
  exclusiveMinimum?: number
  // 最小值（小于）
  minimum?: number
  // 最小长度
  min?: number
  // 长度
  len?: number
  // 空格
  whitespace?: boolean
  // 是否包含在枚举列表中
  enum?: any[]
  // 错误信息
  message?: string
  [key: string]: any
}
```

#### ValidateArrayRules

```typescript
declare type ValidateArrayRules = Array<
  InternalFormats | CustomValidator | ValidateDescription
>
```

#### ValidatePatternRules

```typescript
declare type ValidatePatternRules =
  | InternalFormats
  | CustomValidator
  | ValidateDescription
  | ValidateArrayRules
```

#### IFieldAPI

```typescript
interface IFieldAPI {
  state: IFieldState
  form: IForm
  props: {}
  mutators: IMutators
}
```

#### IVirtualFieldAPI

```typescript
interface IVirtualFieldAPI {
  state: IFieldState
  form: IForm
  props: {}
}
```
