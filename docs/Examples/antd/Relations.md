# 联动场景

> 数据联动，归根结底是字段间的相互依赖关系，同时附加了依赖动作，同时依赖动作的执
> 行是存在时序的，所以，为了管理好字段间的依赖关系与依赖动作，
>
> 我们引入 [rxjs](http://reactivex.io/rxjs)，可以轻松的解决各种时序型联动，
>
> 同时，我们也借鉴了 [redux](https://github.com/reduxjs/redux) 的思路，将 Form
> 内部的
>
> action 汇总起来(onInit/onMount/onChange/onSubmit/onChangeEvent)，最终在一个统
> 一的 effects 回调函数内做 reducer 处理，但是，为了提升 reducer 体验，我们还在
>
> 内部借鉴了 [immer.js](https://github.com/mweststrate/immer)的数据编辑模式，最终达到真正
> 通用化的表单联动解决方案

### 简单数据联动

> #### 当前例子集合了几种联动场景
>
> - 1. 联动控制显示隐藏元素
> - 2. 批量控制元素属性
> - 3. 从组件原始事件中获取额外信息做联动，比如 Select 数据的内部联动
> - 4. 外部通过全局状态控制表单元素的显示隐藏，当然，这种方式并不是推荐的方式，
>      因为会导致全量表单的渲染

#### Demo 示例

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
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

const App = () => {
  const [state, setState] = useState({ visible: false })
  return (
    <Printer>
      <SchemaForm
        effects={($, { setFieldState, getFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState(FormPath.match('*(gg,hh)'), state => {
              state.props['x-props'] = state.props['x-props'] || {}
              state.props['x-props'].style = {
                width: 200
              }
              if (state.name == 'hh') {
                state.visible = false
              }
            })
          })
          $('onFieldChange', 'aa').subscribe(fieldState => {
            setFieldState('bb', state => {
              state.visible = !fieldState.value
            })
          })
          
          $('onFieldChange', 'cc').subscribe(fieldState => {
            setFieldState('dd', state => {
              state.visible = !fieldState.value
            })
            setFieldState('gg', state => {
              if (fieldState.value) {
                state.value = 'aaaa'
                state.props.enum = [
                  { label: 'aaaa', value: 'aaaa', extra: ['x1', 'x2', 'x3'] },
                  { label: 'bbbb', value: 'bbbb', extra: ['x4', 'x5', 'x6'] },
                  { label: 'cccc', value: 'cccc', extra: ['x7', 'x8', 'x9'] }
                ]
              } else {
                state.value = '123333'
                state.props.enum = ['123333', '333333']
              }
            })
          })
          $('onFieldChange', 'mm').subscribe(fieldState => {
            setFieldState('ff', state => {
              state.visible = !fieldState.value
            })
          })
          $('onFieldChange', 'gg')
            .pipe(
              withLatestFrom($('onChangeOption')),
              map(([fieldState, { payload: option }]) => {
                return {
                  state: fieldState,
                  option
                }
              })
            )
            .subscribe(({ state, option }) => {
              setFieldState('hh', state => {
                if (option && option.extra && option.extra.length) {
                  state.visible = true
                  state.props.enum = option.extra
                } else {
                  state.visible = false
                }
              })
            })
          $('onSearch', 'gg')
            .pipe(
              map(fieldState => {
                setFieldState('gg', state => {
                  state.loading = true
                })
                return fieldState
              }),
              debounceTime(400)
            )
            .subscribe(({ payload }) => {
              fetch('//dip.taobao.net/api/v2/services/schema/mock/94047')
                .then(res => res.json())
                .then(data => {
                  setFieldState('gg', state => {
                    state.loading = false
                    state.props.enum = data
                  })
                })
            })
        }}
        labelCol={6}
        wrapperCol={4}
        onSubmit={v => console.log(v)}
      >
        <FormBlock title="Block1">
          <Field
            name="aa"
            type="boolean"
            x-component="radio"
            default={true}
            enum={[{ label: '是', value: true }, { label: '否', value: false }]}
            title="是否隐藏AA"
          />
          <Field name="bb" type="string" title="AA" />
          <Field
            name="cc"
            type="boolean"
            title="是否隐藏DD"
            default={true}
            x-component="radio"
            enum={[{ label: '是', value: true }, { label: '否', value: false }]}
          />
        </FormBlock>
        <FormBlock name="dd" title="Block2">
          <Field name="ee" type="date" title="EE" />
          <Field
            name="mm"
            type="boolean"
            x-component="radio"
            default={true}
            enum={[{ label: '是', value: true }, { label: '否', value: false }]}
            title="是否隐藏FF"
          />
          <Field name="ff" type="number" title="FF" />
        </FormBlock>
        <FormBlock name="kk" title="Block3">
          <Field
            name="gg"
            type="string"
            x-effect={dispatch => ({
              onChange(value, option) {
                dispatch('onChangeOption', option)
              },
              onSearch(value) {
                dispatch('onSearch', value)
              }
            })}
            title="GG"
            x-props={{ showSearch: true, filterLocal: false }}
          />
          <Field name="hh" type="string" title="HH" enum={[]} x-props={{ style: { maxWidth: 300 } }} />
          {state.visible && <Field name="MM" type="string" title="MM" />}
        </FormBlock>
        <FormButtonGroup offset={6}>
          <Submit />
          <Reset />
          <Button onClick={() => setState({ visible: !state.visible })}>
            {!state.visible ? '显示MM' : '隐藏MM'}
          </Button>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

### 异步数据联动

> 当前例子主要演示了从某个字段的变化，引起某些异步操作，然后再去更新某些字段的状
> 态，同时还存在一个间接联动控制

#### Demo 示例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
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
    <SchemaForm
      effects={($, { setFieldState, getFieldState }) => {
        const loading = name => {
          setFieldState(name, state => {
            state.loading = true
          })
        }
        const loaded = name => {
          setFieldState(name, state => {
            state.loading = false
          })
        }
        const hide = name => {
          setFieldState(name, state => {
            state.visible = false
          })
        }
        const show = name => {
          setFieldState(name, state => {
            state.visible = true
          })
        }
        const setEnum = (name, value) => {
          setFieldState(name, state => {
            state.props.enum = value
          })
        }
        const setValue = (name, value) => {
          setFieldState(name, state => {
            state.value = value
          })
        }
        $('onFormInit').subscribe(() => {
          hide('bb')
        })
        $('onFieldChange', 'aa').subscribe(fieldState => {
          if (!fieldState.value) return
          show('bb')
          loading('bb')
          setTimeout(() => {
            loaded('bb')
            setEnum('bb', ['1111', '2222'])
            setValue('bb', '1111')
          }, 1000)
        })
        $('onFieldChange', 'bb').subscribe(fieldState => {
          console.log(fieldState.loading)
          if (!fieldState.value) return hide('cc')
          show('cc')
        })
      }}
      onChange={v => console.log(v)}
      labelCol={6}
      wrapperCol={4}
      onSubmit={v => console.log(v)}
    >
      <FormBlock title="Block1">
        <Field
          name="aa"
          type="string"
          enum={['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee']}
          title="AA"
        />
        <Field type="string" name="bb" title="BB" enum={[]} />
        <Field type="string" name="cc" title="CC" />
      </FormBlock>
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 联动触发重新校验

> 如果 AA 校验失败存在必填错误消息，选择 BB 任意一项可以给 AA 设置值，同时重新触
> 发校验

#### Demo 示例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
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
    <SchemaForm
      effects={($, { setFieldState }) => {
        $('onFieldChange', 'bb').subscribe(state => {
          if (state.value) {
            setFieldState('aa', state => {
              state.value = '123'
            })
          }
        })
      }}
      onChange={v => console.log(v)}
      labelCol={6}
      wrapperCol={4}
      onSubmit={v => console.log(v)}
    >
      <Field name="aa" type="string" required title="AA" />
      <Field type="string" name="bb" title="BB" enum={['111', '222']} />
      <FormButtonGroup offset={6}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 多维数据(异步)联动

> 多维数据联动场景主要是在 Array 数组场景，在动态添加的表单内容中存在各种联动关
> 系，我们可以结合一下上面异步联动的场景，在数组内实现

> 目前这个例子可以说是非常非常复杂了，它同时涉及到了相邻元素之间的异步联动，也涉
> 及到了子到父，父到子之间的多维联动，同时在数组重排序的时候还会涉及间接联动

#### Demo 示例

```jsx
import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import { filter, withLatestFrom, map, debounceTime } from 'rxjs/operators'
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


const App = () => {
  const [values,setValues] = useState({})
  useEffect(()=>{
    setTimeout(()=>{
      setValues({
        aa: [
          {
            bb: 'aaaaa',
            dd: [{ ee: '是', ff: '是' }]
          },
          {
            bb: 'ccccc',
            dd: [{ ee: '否', ff: '是' }]
          }
        ]
      })
    },1000)
  },[])
  return (
  <Printer>
    <SchemaForm
      effects={($, { setFieldState, getFieldState }) => {
        const loading = name => {
          setFieldState(name, state => {
            state.loading = true
          })
        }
        const loaded = name => {
          setFieldState(name, state => {
            state.loading = false
          })
        }
        const hide = name => {
          setFieldState(name, state => {
            state.visible = false
          })
        }
        const show = name => {
          setFieldState(name, state => {
            state.visible = true
          })
        }
        const setEnum = (name, value) => {
          setFieldState(name, state => {
            state.props.enum = value
          })
        }
        const setValue = (name, value) => {
          setFieldState(name, state => {
            state.value = value
          })
        }
        $('onFormInit').subscribe(() => {
          hide(FormPath.match('aa.*.*(cc,gg,dd.*.ee)'))
        })
        $('onFieldChange', 'aa.*.bb').subscribe(fieldState => {
          const cc = FormPath.transform(
            fieldState.name,
            /\d+/,
            i => `aa.${i}.cc`
          )
          if (!fieldState.value) {
            hide(cc)
            return
          }
          show(cc)
          loading(cc)
          setTimeout(() => {
            loaded(cc)
            setEnum(cc, ['1111', '2222'])
            setValue(cc, '1111')
          }, 1000)
        })
        $('onFieldChange', 'aa.*.dd.*.ee').subscribe(fieldState => {
          const gg = FormPath.transform(
            fieldState.name,
            /\d+/,
            (i, j) => `aa.${i}.gg`
          )
          setFieldState(gg, state => {
            if (fieldState.value) {
              state.visible = fieldState.value == '是'
            }
          })
        })
        $('onFieldChange', 'aa.*.dd.*.ff').subscribe(fieldState => {
          const ee = FormPath.transform(
            fieldState.name,
            /\d+/,
            (i, j) => `aa.${i}.dd.${j}.ee`
          )
          setFieldState(ee, state => {
            state.visible = fieldState.value == '是'
          })
        })
      }}
      onSubmit={v => console.log(v)}
      initialValues={values}
    >
      <FormBlock title="Block1">
        <Field type="array" name="aa">
          <Field type="object">
            <FormBlock title="基本信息">
              <FormLayout inline>
                <Field
                  type="string"
                  name="bb"
                  enum={['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee']}
                  x-props={{ style: { maxWidth: 300 } }}
                  title="BB"
                />
                <Field type="string" name="cc" enum={[]} x-props={{ style: { maxWidth: 300 } }} title="CC" />
                <Field
                  type="string"
                  name="gg"
                  title="GG"
                  x-props={{ style: { width: 200 } }}
                />
              </FormLayout>
            </FormBlock>
            <FormBlock title="嵌套Array">
              <Field type="array" name="dd">
                <Field type="object">
                  <FormLayout inline style={{ marginLeft: 20 }}>
                    <Field
                      type="string"
                      name="ee"
                      enum={['是', '否']}
                      x-props={{ style: { maxWidth: 300 } }}
                      title="EE"
                      description="是否显示GG"
                    />
                    <Field
                      type="string"
                      name="ff"
                      default="是"
                      enum={['是', '否']}
                      x-props={{ style: { maxWidth: 300 } }}
                      title="FF"
                      description="是否显示EE"
                    />
                  </FormLayout>
                </Field>
              </Field>
            </FormBlock>
          </Field>
        </Field>
      </FormBlock>
      <FormButtonGroup style={{ marginLeft: 15 }}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
}
ReactDOM.render(<App />, document.getElementById('root'))
```
