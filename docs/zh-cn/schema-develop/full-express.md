# 页面完全表达

得益于 `Formily` 完善的注册组件机制以及状态管理机制，使得开发者能够轻松描述表单场景。
实际上，基于这些的能力的延伸，甚至还能够覆盖到页面级别，下面以几个例子来说明。

## 描述页面

在表单场景下，描述非表单字段使用 `VirtualField` 我们已经非常熟悉了，常用的场景有 **布局容器** 或用来 **控制显示或隐藏** 的表单字段的容器。基于这样的实践，我们同样可以放大到页面：

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  createVirtualBox,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const Header = createVirtualBox('header', (props) => {
  const { color = '#333' } = props
  return <div style={{ marginBottom: '16px', color }}>{props.children}</div>
})

const Description = createVirtualBox('description', (props) => {
  return <div style={{ marginBottom: '16px', color: '#999' }}>{props.children}</div>
})

const Body = createVirtualBox('body', (props) => {
  return <div style={{ marginBottom: '16px', padding: '16px', background: '#f5f5f5' }}>{props.children}</div>
})
const SchemaFormButtonGroup = createVirtualBox('buttonGroup', FormButtonGroup)
const SchemaButton = createVirtualBox('button', Button)
const SchemaSubmit = createVirtualBox('submit', Submit)
const SchemaReset = createVirtualBox('reset', Reset)
const actions = createFormActions()

const App = () => {
  return (
    <Printer>
      <SchemaForm
        actions={actions}
        components={{ Input }}
        expressionScope={{
          renderHeader: <div>页面标题 <a href="#" >返回</a></div>,
          renderDesc: '页面描述',
          toggleHeaderColor: () => {
            actions.setFieldState('header', state => {
              state.props['x-component-props'].color = state.props['x-component-props'].color === 'red' ? '#333' : 'red'
            })
          },
          toggleShowHeader: () => {
            actions.setFieldState('header', state => state.visible = !state.visible)
          },
          toggleShowBody: () => {
            actions.setFieldState('body', state => state.visible = !state.visible)
          },
          setDesc: () => {
            actions.setFieldState('desc', state => {
              state.props['x-component-props'].children = <div>随机数:{`${Math.random()}`.slice(2)}</div>
            })
          }
        }}
      >
        <Header name="header" children="{{renderHeader}}" />
        <Description name="desc" children="{{renderDesc}}" />

        <Body name="body">
          <FormMegaLayout labelCol={4}>
            <Field name="username" title="姓名" x-component="Input" />
            <Field name="age" title="年龄" x-component="Input" />
          </FormMegaLayout>

          <SchemaFormButtonGroup align="center">
            <SchemaSubmit>提交</SchemaSubmit>
            <SchemaReset>重置</SchemaReset>
          </SchemaFormButtonGroup>
        </Body>

        <SchemaFormButtonGroup>
          <SchemaButton onClick="{{toggleHeaderColor}}">改变Header字体颜色</SchemaButton>
          <SchemaButton onClick="{{toggleShowHeader}}">显示或隐藏Header</SchemaButton>
          <SchemaButton onClick="{{toggleShowBody}}">显示或隐藏Body</SchemaButton>
          <SchemaButton onClick="{{setDesc}}">动态修改页面描述</SchemaButton>
        </SchemaFormButtonGroup>
      </SchemaForm>      
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 完全基于Schema描述页面

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  createVirtualBox,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const Header = createVirtualBox('header', (props) => {
  const { color = '#333' } = props
  return <div style={{ marginBottom: '16px', color }}>{props.children}</div>
})

const Description = createVirtualBox('description', (props) => {
  return <div style={{ marginBottom: '16px', color: '#999' }}>{props.children}</div>
})

const Body = createVirtualBox('body', (props) => {
  return <div style={{ marginBottom: '16px', padding: '16px', background: '#f5f5f5' }}>{props.children}</div>
})
const SchemaFormButtonGroup = createVirtualBox('buttonGroup', FormButtonGroup)
const SchemaButton = createVirtualBox('button', Button)
const SchemaSubmit = createVirtualBox('submit', Submit)
const SchemaReset = createVirtualBox('reset', Reset)
const actions = createFormActions()

const App = () => {
  return (
    <Printer>
      <SchemaForm
        actions={actions}
        components={{ Input }}
        expressionScope={{
          renderHeader: <div>页面标题 <a href="#" >返回</a></div>,
          renderDesc: '页面描述',
          toggleHeaderColor: () => {
            actions.setFieldState('header', state => {
              state.props['x-component-props'].color = state.props['x-component-props'].color === 'red' ? '#333' : 'red'
            })
          },
          toggleShowHeader: () => {
            actions.setFieldState('header', state => state.visible = !state.visible)
          },
          toggleShowBody: () => {
            actions.setFieldState('body', state => state.visible = !state.visible)
          },
          setDesc: () => {
            actions.setFieldState('desc', state => {
              state.props['x-component-props'].children = <div>随机数:{`${Math.random()}`.slice(2)}</div>
            })
          }
        }}
        schema={{
          "type": "object",
          "properties": {
            "header": {
              "key": "header",
              "type": "object",
              "name": "header",
              "x-component": "header",
              "x-component-props": {
                "children": "{{renderHeader}}"
              }
            },
            "desc": {
              "key": "desc",
              "type": "object",
              "name": "desc",
              "x-component": "description",
              "x-component-props": {
                "children": "{{renderDesc}}"
              }
            },
            "body": {
              "key": "body",
              "type": "object",
              "name": "body",
              "x-component": "body",
              "x-component-props": {},
              "properties": {
                "NO_NAME_FIELD_$0": {
                  "key": "NO_NAME_FIELD_$0",
                  "type": "object",
                  "name": "NO_NAME_FIELD_$0",
                  "x-component": "mega-layout",
                  "x-component-props": {
                    "labelCol": 4
                  },
                  "properties": {
                    "username": {
                      "key": "username",
                      "name": "username",
                      "title": "姓名",
                      "x-component": "input"
                    },
                    "age": {
                      "key": "age",
                      "name": "age",
                      "title": "年龄",
                      "x-component": "input"
                    }
                  }
                },
                "NO_NAME_FIELD_$1": {
                  "key": "NO_NAME_FIELD_$1",
                  "type": "object",
                  "name": "NO_NAME_FIELD_$1",
                  "x-component": "buttongroup",
                  "x-component-props": {
                    "align": "center"
                  },
                  "properties": {
                    "NO_NAME_FIELD_$2": {
                      "key": "NO_NAME_FIELD_$2",
                      "type": "object",
                      "name": "NO_NAME_FIELD_$2",
                      "x-component": "submit",
                      "x-component-props": {
                        "children": "提交"
                      }
                    },
                    "NO_NAME_FIELD_$3": {
                      "key": "NO_NAME_FIELD_$3",
                      "type": "object",
                      "name": "NO_NAME_FIELD_$3",
                      "x-component": "reset",
                      "x-component-props": {
                        "children": "重置"
                      }
                    }
                  }
                }
              }
            },
            "NO_NAME_FIELD_$4": {
              "key": "NO_NAME_FIELD_$4",
              "type": "object",
              "name": "NO_NAME_FIELD_$4",
              "x-component": "buttongroup",
              "x-component-props": {},
              "properties": {
                "NO_NAME_FIELD_$5": {
                  "key": "NO_NAME_FIELD_$5",
                  "type": "object",
                  "name": "NO_NAME_FIELD_$5",
                  "x-component": "button",
                  "x-component-props": {
                    "onClick": "{{toggleHeaderColor}}",
                    "children": "改变Header字体颜色"
                  }
                },
                "NO_NAME_FIELD_$6": {
                  "key": "NO_NAME_FIELD_$6",
                  "type": "object",
                  "name": "NO_NAME_FIELD_$6",
                  "x-component": "button",
                  "x-component-props": {
                    "onClick": "{{toggleShowHeader}}",
                    "children": "显示或隐藏Header"
                  }
                },
                "NO_NAME_FIELD_$7": {
                  "key": "NO_NAME_FIELD_$7",
                  "type": "object",
                  "name": "NO_NAME_FIELD_$7",
                  "x-component": "button",
                  "x-component-props": {
                    "onClick": "{{toggleShowBody}}",
                    "children": "显示或隐藏Body"
                  }
                },
                "NO_NAME_FIELD_$8": {
                  "key": "NO_NAME_FIELD_$8",
                  "type": "object",
                  "name": "NO_NAME_FIELD_$8",
                  "x-component": "button",
                  "x-component-props": {
                    "onClick": "{{setDesc}}",
                    "children": "动态修改页面描述"
                  }
                }
              }
            }
          }
        }}
      />
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 页面元素如 `Header`, `Body`, `Button` 等都可以作为 `VirtualField` 存在，并且可以通过 **actions** 来进行状态管理
- `VirtualField` 所有属性都可以托管在 **expressionScope**，甚至还可以动态设置 `children`
- 页面完全表达的方式可以将页面的所有内容通过 `schema` 来描述

## 弹窗场景

基于上面的实践，我们可以拓展到常见的弹窗表单场景。弹窗场景稍微会复杂一些：
* 首先 `schema` 描述上可以一眼看清楚页面上一共有几个弹窗，触发这些弹窗的是哪些元素
* 其次弹窗的子表单应该和主表单是隔离的


```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import {
  SchemaField,  
  SchemaForm,
  Schema,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  createVirtualBox,
  createControllerBox,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { message, Modal } from 'antd'
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const SchemaDialog = createControllerBox("Modal", props => {
  const { schema } = props;
  const componentProps = schema.getExtendsComponentProps();
  const { properties } = schema.toJSON();
  const nestedSchema = new Schema({
    type: "object",
    properties
  });

  const { visible, title, onCancel, footer, ...others } = componentProps;
  return (
    <Modal visible={visible} title={title} onCancel={onCancel} footer={footer}>
      <SchemaForm {...others}>
        <SchemaField schema={nestedSchema} />
      </SchemaForm>
    </Modal>
  );
});
const SchemaFormButtonGroup = createVirtualBox('buttonGroup', FormButtonGroup)
const SchemaButton = createVirtualBox('button', Button)
const SchemaSubmit = createVirtualBox('submit', Submit)
const SchemaReset = createVirtualBox('reset', Reset)

const actions = createFormActions()
const actions2 = createFormActions()
const actions3 = createFormActions()

const toggleDialog1Show = () => {
  const dialogVisible = actions.getFieldState('dialog1', state => state.props['x-component-props'].visible)
  if (dialogVisible) {
    actions2.reset()
  }

  actions.setFieldState('dialog1', state => {    
    state.props['x-component-props'].visible = !state.props['x-component-props'].visible
  })
}

const toggleDialog2Show = () => {
  const dialogVisible = actions.getFieldState('dialog2', state => state.props['x-component-props'].visible)
  if (dialogVisible) {
    actions3.reset()
  }

  actions.setFieldState('dialog2', state => {    
    state.props['x-component-props'].visible = !state.props['x-component-props'].visible
  })
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const components = { Input }

const App = () => {
  return (
    <Printer>
    <SchemaForm
      actions={actions}
      components={components}
      expressionScope={{
        components,
        actions3,
        actions2,
        toggleDialog1Show,
        toggleDialog2Show,
        onDialog1Submit: async (values) => {
          console.log('====弹窗表单1 values===', values)
          await sleep(500)
          message.success('弹窗1提交成功')
          toggleDialog1Show()
        },
        onDialog2Submit: async (values) => {
          console.log('====弹窗表单2 values===', values)
          await sleep(500)
          message.success('弹窗2提交成功')
          toggleDialog2Show()
        }
      }}
    >
      <FormMegaLayout labelCol={4}>
        <Field name="username" title="姓名" x-component="Input" />
        <Field name="age" title="年龄" x-component="Input" />
        <Field name="inputBox" title="输入框" x-component="Input" />
      </FormMegaLayout>

      <SchemaFormButtonGroup align="center">
        <SchemaSubmit>提交</SchemaSubmit>
        <SchemaReset>重置</SchemaReset>
      </SchemaFormButtonGroup>

      {/* 弹窗表单1 */}
      <SchemaDialog
        name="dialog1"
        title="弹窗1"
        onCancel="{{toggleDialog1Show}}"
        footer={null}        
        components="{{components}}"
        onSubmit="{{onDialog1Submit}}"
        actions="{{actions2}}"
      >
        <FormMegaLayout labelCol={4}>
          <Field name="username" title="姓名" x-component="Input" />
          <Field name="age" title="年龄" x-component="Input" />            
        </FormMegaLayout>

        <SchemaFormButtonGroup align="center">
          <SchemaSubmit>提交</SchemaSubmit>
          <SchemaReset>重置</SchemaReset>
        </SchemaFormButtonGroup>
      </SchemaDialog>

      {/* 弹窗表单2 */}
      <SchemaDialog
        name="dialog2"
        title="弹窗2"
        onCancel="{{toggleDialog2Show}}"
        footer={null}        
        components="{{components}}"
        onSubmit="{{onDialog2Submit}}"
        actions="{{actions3}}"
      >
        <FormMegaLayout labelCol={4}>
          <Field name="inputBox" title="输入框" x-component="Input" />
        </FormMegaLayout>

        <SchemaFormButtonGroup align="center">
          <SchemaSubmit>提交</SchemaSubmit>
          <SchemaReset>重置</SchemaReset>
        </SchemaFormButtonGroup>
      </SchemaDialog>

      <SchemaFormButtonGroup>
        <SchemaButton onClick="{{toggleDialog1Show}}">显示或隐藏弹窗1</SchemaButton>
        <SchemaButton onClick="{{toggleDialog2Show}}">显示或隐藏弹窗2</SchemaButton>
      </SchemaFormButtonGroup>
    </SchemaForm> 
    </Printer>   
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 完全基于Schema实现弹窗场景

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import {
  SchemaField,  
  SchemaForm,
  Schema,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  createVirtualBox,
  createControllerBox,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { message, Modal } from 'antd'
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const SchemaDialog = createControllerBox("Modal", props => {
  const { schema } = props;
  const componentProps = schema.getExtendsComponentProps();
  const { properties } = schema.toJSON();
  const nestedSchema = new Schema({
    type: "object",
    properties
  });

  const { visible, title, onCancel, footer, ...others } = componentProps;
  return (
    <Modal visible={visible} title={title} onCancel={onCancel} footer={footer}>
      <SchemaForm {...others}>
        <SchemaField schema={nestedSchema} />
      </SchemaForm>
    </Modal>
  );
});
const SchemaFormButtonGroup = createVirtualBox('buttonGroup', FormButtonGroup)
const SchemaButton = createVirtualBox('button', Button)
const SchemaSubmit = createVirtualBox('submit', Submit)
const SchemaReset = createVirtualBox('reset', Reset)

const actions = createFormActions()
const actions2 = createFormActions()
const actions3 = createFormActions()

const toggleDialog1Show = () => {
  const dialogVisible = actions.getFieldState('dialog1', state => state.props['x-component-props'].visible)
  if (dialogVisible) {
    actions2.reset()
  }

  actions.setFieldState('dialog1', state => {    
    state.props['x-component-props'].visible = !state.props['x-component-props'].visible
  })
}

const toggleDialog2Show = () => {
  const dialogVisible = actions.getFieldState('dialog2', state => state.props['x-component-props'].visible)
  if (dialogVisible) {
    actions3.reset()
  }

  actions.setFieldState('dialog2', state => {    
    state.props['x-component-props'].visible = !state.props['x-component-props'].visible
  })
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const components = { Input }

const App = () => {
  return (
    <Printer>
    <SchemaForm
      actions={actions}
      components={components}
      expressionScope={{
        components,
        actions3,
        actions2,
        toggleDialog1Show,
        toggleDialog2Show,
        onDialog1Submit: async (values) => {
          console.log('====弹窗表单1 values===', values)
          await sleep(500)
          message.success('弹窗1提交成功')
          toggleDialog1Show()
        },
        onDialog2Submit: async (values) => {
          console.log('====弹窗表单2 values===', values)
          await sleep(500)
          message.success('弹窗2提交成功')
          toggleDialog2Show()
        }
      }}
      schema={{
        "type": "object",
        "properties": {
          "NO_NAME_FIELD_$0": {
            "key": "NO_NAME_FIELD_$0",
            "type": "object",
            "name": "NO_NAME_FIELD_$0",
            "x-component": "mega-layout",
            "x-component-props": {
              "labelCol": 4
            },
            "properties": {
              "username": {
                "key": "username",
                "name": "username",
                "title": "姓名",
                "x-component": "input"
              },
              "age": {
                "key": "age",
                "name": "age",
                "title": "年龄",
                "x-component": "input"
              },
              "inputBox": {
                "key": "inputBox",
                "name": "inputBox",
                "title": "输入框",
                "x-component": "input"
              }
            }
          },
          "NO_NAME_FIELD_$1": {
            "key": "NO_NAME_FIELD_$1",
            "type": "object",
            "name": "NO_NAME_FIELD_$1",
            "x-component": "buttongroup",
            "x-component-props": {
              "align": "center"
            },
            "properties": {
              "NO_NAME_FIELD_$2": {
                "key": "NO_NAME_FIELD_$2",
                "type": "object",
                "name": "NO_NAME_FIELD_$2",
                "x-component": "submit",
                "x-component-props": {
                  "children": "提交"
                }
              },
              "NO_NAME_FIELD_$3": {
                "key": "NO_NAME_FIELD_$3",
                "type": "object",
                "name": "NO_NAME_FIELD_$3",
                "x-component": "reset",
                "x-component-props": {
                  "children": "重置"
                }
              }
            }
          },
          "dialog1": {
            "key": "dialog1",
            "type": "object",
            "name": "dialog1",
            "x-component": "modal",
            "x-component-props": {
              "title": "弹窗1",
              "onCancel": "{{toggleDialog1Show}}",
              "footer": null,
              "components": "{{components}}",
              "onSubmit": "{{onDialog1Submit}}",
              "actions": "{{actions2}}"
            },
            "properties": {
              "NO_NAME_FIELD_$4": {
                "key": "NO_NAME_FIELD_$4",
                "type": "object",
                "name": "NO_NAME_FIELD_$4",
                "x-component": "mega-layout",
                "x-component-props": {
                  "labelCol": 4
                },
                "properties": {
                  "username": {
                    "key": "username",
                    "name": "username",
                    "title": "姓名",
                    "x-component": "input"
                  },
                  "age": {
                    "key": "age",
                    "name": "age",
                    "title": "年龄",
                    "x-component": "input"
                  }
                }
              },
              "NO_NAME_FIELD_$5": {
                "key": "NO_NAME_FIELD_$5",
                "type": "object",
                "name": "NO_NAME_FIELD_$5",
                "x-component": "buttongroup",
                "x-component-props": {
                  "align": "center"
                },
                "properties": {
                  "NO_NAME_FIELD_$6": {
                    "key": "NO_NAME_FIELD_$6",
                    "type": "object",
                    "name": "NO_NAME_FIELD_$6",
                    "x-component": "submit",
                    "x-component-props": {
                      "children": "提交"
                    }
                  },
                  "NO_NAME_FIELD_$7": {
                    "key": "NO_NAME_FIELD_$7",
                    "type": "object",
                    "name": "NO_NAME_FIELD_$7",
                    "x-component": "reset",
                    "x-component-props": {
                      "children": "重置"
                    }
                  }
                }
              }
            }
          },
          "dialog2": {
            "key": "dialog2",
            "type": "object",
            "name": "dialog2",
            "x-component": "modal",
            "x-component-props": {
              "title": "弹窗2",
              "onCancel": "{{toggleDialog2Show}}",
              "footer": null,
              "components": "{{components}}",
              "onSubmit": "{{onDialog2Submit}}",
              "actions": "{{actions3}}"
            },
            "properties": {
              "NO_NAME_FIELD_$8": {
                "key": "NO_NAME_FIELD_$8",
                "type": "object",
                "name": "NO_NAME_FIELD_$8",
                "x-component": "mega-layout",
                "x-component-props": {
                  "labelCol": 4
                },
                "properties": {
                  "inputBox": {
                    "key": "inputBox",
                    "name": "inputBox",
                    "title": "输入框",
                    "x-component": "input"
                  }
                }
              },
              "NO_NAME_FIELD_$9": {
                "key": "NO_NAME_FIELD_$9",
                "type": "object",
                "name": "NO_NAME_FIELD_$9",
                "x-component": "buttongroup",
                "x-component-props": {
                  "align": "center"
                },
                "properties": {
                  "NO_NAME_FIELD_$10": {
                    "key": "NO_NAME_FIELD_$10",
                    "type": "object",
                    "name": "NO_NAME_FIELD_$10",
                    "x-component": "submit",
                    "x-component-props": {
                      "children": "提交"
                    }
                  },
                  "NO_NAME_FIELD_$11": {
                    "key": "NO_NAME_FIELD_$11",
                    "type": "object",
                    "name": "NO_NAME_FIELD_$11",
                    "x-component": "reset",
                    "x-component-props": {
                      "children": "重置"
                    }
                  }
                }
              }
            }
          },
          "NO_NAME_FIELD_$12": {
            "key": "NO_NAME_FIELD_$12",
            "type": "object",
            "name": "NO_NAME_FIELD_$12",
            "x-component": "buttongroup",
            "x-component-props": {},
            "properties": {
              "NO_NAME_FIELD_$13": {
                "key": "NO_NAME_FIELD_$13",
                "type": "object",
                "name": "NO_NAME_FIELD_$13",
                "x-component": "button",
                "x-component-props": {
                  "onClick": "{{toggleDialog1Show}}",
                  "children": "显示或隐藏弹窗1"
                }
              },
              "NO_NAME_FIELD_$14": {
                "key": "NO_NAME_FIELD_$14",
                "type": "object",
                "name": "NO_NAME_FIELD_$14",
                "x-component": "button",
                "x-component-props": {
                  "onClick": "{{toggleDialog2Show}}",
                  "children": "显示或隐藏弹窗2"
                }
              }
            }
          }
        }
      }}
    />
    </Printer>   
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 当描述页面的内容涉及嵌套表单时，需要使用 `SchemaField` 来调整渲染内容，保证JSX与Schema之间的互转
- 弹窗也是 `VirtualField`，可以通过 `actions` 管理显示或隐藏


## CRUD 场景

接下里把完全描述页面的能力应用在更加通用的日常中后台开发场景（CRUD），以 **Table** + **弹窗** 举例

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import {
  SchemaField,  
  SchemaForm,
  Schema,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  createVirtualBox,
  createControllerBox,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { message, Modal, Table } from 'antd'
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const SchemaDialog = createControllerBox("Modal", props => {
  const { schema } = props;
  const componentProps = schema.getExtendsComponentProps();
  const { properties } = schema.toJSON();
  const nestedSchema = new Schema({
    type: "object",
    properties
  });

  const { visible, title, onCancel, footer, ...others } = componentProps;
  return (
    <Modal visible={visible} title={title} onCancel={onCancel} footer={footer}>
      <SchemaForm {...others}>
        <SchemaField schema={nestedSchema} />
      </SchemaForm>
    </Modal>
  );
});
const SchemaFormButtonGroup = createVirtualBox('buttonGroup', FormButtonGroup)
const SchemaButton = createVirtualBox('button', Button)
const SchemaSubmit = createVirtualBox('submit', Submit)
const SchemaReset = createVirtualBox('reset', Reset)
const SchemaTable = createVirtualBox('table', Table)

const actions = createFormActions()
const actions2 = createFormActions()

const toggleDialogShow = (values) => {
  const targetValues = values && 'target' in values ? {} : values
  actions.setFieldState('dialog', state => {    
    state.props['x-component-props'].visible = !state.props['x-component-props'].visible
    state.props['x-component-props'].value = targetValues
  })
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const components = { Input }

const App = () => {
  return (
    <Printer>
    <SchemaForm
      actions={actions}
      components={components}
      expressionScope={{
        components,
        actions2,
        toggleDialogShow,
        renderOperation: (val, record) => {
          return <Button onClick={() => {
            toggleDialogShow(record)
          }}>编辑</Button>
        },
        onDialogSubmit: async (values) => {
          console.log('====弹窗表单 values===', values)
          await sleep(500)
          message.success('弹窗提交成功')
          toggleDialogShow()
        },
      }}
    >
      <FormMegaLayout grid columns={4} autoRow>
        <Field name="username" title="姓名" x-component="Input" />
        <Field name="age" title="年龄" x-component="Input" />
        <Field name="inputBox" title="输入框" x-component="Input" />

        <FormSlot>
          <div>
            <Button type="primary">搜索</Button>
          </div>
        </FormSlot>
      </FormMegaLayout>

      <SchemaButton type="primary" onClick="{{toggleDialogShow}}" style={{ marginBottom: '12px' }}>新建</SchemaButton>

      <SchemaTable
        dataSource={[
          { key: '1', username: 'billy', age: 23 },
          { key: '2', username: 'joe', age: 21 }
        ]}
        columns={[
          {
            title: '姓名',
            dataIndex: 'username',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '操作',
            render: "{{renderOperation}}"
          },
        ]}
      />

      {/* 弹窗表单 */}
      <SchemaDialog
        name="dialog"
        title="弹窗"
        onCancel="{{toggleDialogShow}}"
        footer={null}        
        components="{{components}}"
        onSubmit="{{onDialogSubmit}}"
        actions="{{actions2}}"
      >
        <FormMegaLayout labelCol={4}>
          <Field name="username" title="姓名" x-component="Input" />
          <Field name="age" title="年龄" x-component="Input" />            
        </FormMegaLayout>

        <SchemaFormButtonGroup align="center">
          <SchemaSubmit>提交</SchemaSubmit>
          <SchemaReset>重置</SchemaReset>
        </SchemaFormButtonGroup>
      </SchemaDialog>
    </SchemaForm>    
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 完全基于Schema描述CRUD场景

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import {
  SchemaField,  
  SchemaForm,
  Schema,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  createVirtualBox,
  createControllerBox,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { message, Modal, Table } from 'antd'
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const SchemaDialog = createControllerBox("Modal", props => {
  const { schema } = props;
  const componentProps = schema.getExtendsComponentProps();
  const { properties } = schema.toJSON();
  const nestedSchema = new Schema({
    type: "object",
    properties
  });

  const { visible, title, onCancel, footer, ...others } = componentProps;
  return (
    <Modal visible={visible} title={title} onCancel={onCancel} footer={footer}>
      <SchemaForm {...others}>
        <SchemaField schema={nestedSchema} />
      </SchemaForm>
    </Modal>
  );
});
const SchemaFormButtonGroup = createVirtualBox('buttonGroup', FormButtonGroup)
const SchemaButton = createVirtualBox('button', Button)
const SchemaSubmit = createVirtualBox('submit', Submit)
const SchemaReset = createVirtualBox('reset', Reset)
const SchemaTable = createVirtualBox('table', Table)

const actions = createFormActions()
const actions2 = createFormActions()

const toggleDialogShow = (values) => {
  const targetValues = values && 'target' in values ? {} : values
  actions.setFieldState('dialog', state => {    
    state.props['x-component-props'].visible = !state.props['x-component-props'].visible
    state.props['x-component-props'].value = targetValues
  })
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const components = { Input }

const App = () => {
  return (
    <Printer>
    <SchemaForm
      actions={actions}
      components={components}
      expressionScope={{
        components,
        actions2,
        toggleDialogShow,
        renderOperation: (val, record) => {
          return <Button onClick={() => {
            toggleDialogShow(record)
          }}>编辑</Button>
        },
        onDialogSubmit: async (values) => {
          console.log('====弹窗表单 values===', values)
          await sleep(500)
          message.success('弹窗提交成功')
          toggleDialogShow()
        },
      }}
      schema={{
        "type": "object",
        "properties": {
          "NO_NAME_FIELD_$0": {
            "key": "NO_NAME_FIELD_$0",
            "type": "object",
            "name": "NO_NAME_FIELD_$0",
            "x-component": "mega-layout",
            "x-component-props": {
              "grid": true,
              "columns": 4,
              "autoRow": true
            },
            "properties": {
              "username": {
                "key": "username",
                "name": "username",
                "title": "姓名",
                "x-component": "input"
              },
              "age": {
                "key": "age",
                "name": "age",
                "title": "年龄",
                "x-component": "input"
              },
              "inputBox": {
                "key": "inputBox",
                "name": "inputBox",
                "title": "输入框",
                "x-component": "input"
              },
              "NO_NAME_FIELD_$1": {
                "key": "NO_NAME_FIELD_$1",
                "type": "object",
                "name": "NO_NAME_FIELD_$1"
              }
            }
          },
          "NO_NAME_FIELD_$2": {
            "key": "NO_NAME_FIELD_$2",
            "type": "object",
            "name": "NO_NAME_FIELD_$2",
            "x-component": "button",
            "x-component-props": {
              "type": "primary",
              "onClick": "{{toggleDialogShow}}",
              "style": {
                "marginBottom": "12px"
              },
              "children": "新建"
            }
          },
          "NO_NAME_FIELD_$3": {
            "key": "NO_NAME_FIELD_$3",
            "type": "object",
            "name": "NO_NAME_FIELD_$3",
            "x-component": "table",
            "x-component-props": {
              "dataSource": [
                {
                  "key": "1",
                  "username": "billy",
                  "age": 23
                },
                {
                  "key": "2",
                  "username": "joe",
                  "age": 21
                }
              ],
              "columns": [
                {
                  "title": "姓名",
                  "dataIndex": "username",
                  "key": "name"
                },
                {
                  "title": "年龄",
                  "dataIndex": "age",
                  "key": "age"
                },
                {
                  "title": "操作",
                  "render": "{{renderOperation}}"
                }
              ]
            }
          },
          "dialog": {
            "key": "dialog",
            "type": "object",
            "name": "dialog",
            "x-component": "modal",
            "x-component-props": {
              "title": "弹窗",
              "onCancel": "{{toggleDialogShow}}",
              "footer": null,
              "components": "{{components}}",
              "onSubmit": "{{onDialogSubmit}}",
              "actions": "{{actions2}}"
            },
            "properties": {
              "NO_NAME_FIELD_$4": {
                "key": "NO_NAME_FIELD_$4",
                "type": "object",
                "name": "NO_NAME_FIELD_$4",
                "x-component": "mega-layout",
                "x-component-props": {
                  "labelCol": 4
                },
                "properties": {
                  "username": {
                    "key": "username",
                    "name": "username",
                    "title": "姓名",
                    "x-component": "input"
                  },
                  "age": {
                    "key": "age",
                    "name": "age",
                    "title": "年龄",
                    "x-component": "input"
                  }
                }
              },
              "NO_NAME_FIELD_$5": {
                "key": "NO_NAME_FIELD_$5",
                "type": "object",
                "name": "NO_NAME_FIELD_$5",
                "x-component": "buttongroup",
                "x-component-props": {
                  "align": "center"
                },
                "properties": {
                  "NO_NAME_FIELD_$6": {
                    "key": "NO_NAME_FIELD_$6",
                    "type": "object",
                    "name": "NO_NAME_FIELD_$6",
                    "x-component": "submit",
                    "x-component-props": {
                      "children": "提交"
                    }
                  },
                  "NO_NAME_FIELD_$7": {
                    "key": "NO_NAME_FIELD_$7",
                    "type": "object",
                    "name": "NO_NAME_FIELD_$7",
                    "x-component": "reset",
                    "x-component-props": {
                      "children": "重置"
                    }
                  }
                }
              }
            }
          }
        }
      }}
    /> 
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 弹窗和基于 `VirtualField` 的 **Table** 实现列表 + 弹窗表单的 CRUD 场景