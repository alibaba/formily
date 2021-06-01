import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Designer,
  IconWidget,
  ToolbarWidget,
  Workspace,
  Viewport,
  OutlineTreeWidget,
  DragSourceWidget,
  MainPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  SettingsPanel,
} from '@designable/react'
import { Input, Select, Radio, Checkbox, FormItem } from '@formily/antd'
import { SettingsForm } from '@designable/react-settings-form'
import { createDesigner, registry } from '@designable/core'
import { Space, Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { SchemaRenderWidget } from '../src'
import 'antd/dist/antd.less'

registry.registerDesignerProps({
  Root: {
    title: '表单',
    defaultProps: {
      labelCol: 6,
      wrapperCol: 12,
    },
  },
  Field: {
    draggable: true,
    propsSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: '标题',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        'style.width': {
          type: 'string',
          title: '宽度',
          'x-decorator': 'FormItem',
          'x-component': 'SizeInput',
        },
        'style.height': {
          type: 'string',
          title: '高度',
          'x-decorator': 'FormItem',
          'x-component': 'SizeInput',
        },
        hidden: {
          type: 'string',
          title: '是否隐藏',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
        },
        default: {
          title: '默认值',
          'x-decorator': 'FormItem',
          'x-component': 'ValueInput',
        },
        'style.display': {
          title: '展示',
          'x-component': 'DisplayStyleSetter',
        },
        'style.background': {
          title: '背景',
          'x-component': 'BackgroundStyleSetter',
        },
        'style.boxShadow': {
          title: '阴影',
          'x-component': 'BoxShadowStyleSetter',
        },
        'style.font': {
          title: '字体',
          'x-component': 'FontStyleSetter',
        },
        'style.margin': {
          title: '外边距',
          'x-component': 'BoxStyleSetter',
        },
        'style.padding': {
          title: '内边距',
          'x-component': 'BoxStyleSetter',
        },
        'style.borderRadius': {
          title: '圆角',
          'x-component': 'BorderRadiusStyleSetter',
        },
        'style.border': {
          title: '边框',
          'x-component': 'BorderStyleSetter',
        },
      },
    },
  },
})

registry.registerSourcesByGroup('inputs', [
  {
    componentName: 'Field',
    props: {
      title: '输入框',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
  {
    componentName: 'Field',
    props: {
      title: '下拉框',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
  {
    componentName: 'Field',
    props: {
      title: '单选框',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
  },
  {
    componentName: 'Field',
    props: {
      title: '单选框',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
    },
  },
])

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
    <IconWidget
      infer="Logo"
      style={{ margin: 10, height: 24, width: 'auto' }}
    />
  </div>
)

const Actions = () => (
  <Space style={{ marginRight: 10 }}>
    <Button href="https://github.com/alibaba/designable" target="_blank">
      <GithubOutlined />
      Github
    </Button>
    <Button>保存</Button>
    <Button type="primary">发布</Button>
  </Space>
)

const App = () => {
  const [view, setView] = useState('design')
  const engine = useMemo(() => createDesigner(), [])

  return (
    <Designer engine={engine}>
      <MainPanel logo={<Logo />} actions={<Actions />}>
        <CompositePanel>
          <CompositePanel.Item
            title="组件"
            icon={<IconWidget infer="Component" />}
          >
            <DragSourceWidget title="输入组件" name="inputs" />
            <DragSourceWidget title="布局组件" name="layouts" />
          </CompositePanel.Item>
          <CompositePanel.Item
            title="大纲树"
            icon={<IconWidget infer="Outline" />}
          >
            <OutlineTreeWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <ToolbarWidget />
              <Button.Group>
                <Button
                  disabled={view === 'design'}
                  onClick={() => {
                    setView('design')
                  }}
                  size="small"
                >
                  <IconWidget infer="Design" />
                </Button>
                <Button
                  disabled={view === 'json'}
                  onClick={() => {
                    setView('json')
                  }}
                  size="small"
                >
                  <IconWidget infer="JSON" />
                </Button>
                <Button
                  disabled={view === 'code'}
                  onClick={() => {
                    setView('code')
                  }}
                  size="small"
                >
                  <IconWidget infer="Code" />
                </Button>
              </Button.Group>
            </ToolbarPanel>
            <ViewportPanel>
              {view === 'json' && <div>JSON 输入</div>}
              {view === 'design' && (
                <Viewport>
                  <SchemaRenderWidget
                    components={{
                      FormItem,
                      Input,
                      Select,
                      Radio,
                      Checkbox,
                    }}
                  />
                </Viewport>
              )}
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="属性配置">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </MainPanel>
    </Designer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
