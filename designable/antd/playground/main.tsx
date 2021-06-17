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
  ComponentTreeWidget,
} from '@designable/react'
import { SettingsForm } from '@designable/react-settings-form'
import { createDesigner } from '@designable/core'
import { Space, Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { createDesignableField, createDesignableForm } from '../src'
import 'antd/dist/antd.less'

const DesignableForm = createDesignableForm({
  name: 'Root',
})

const DesignableField = createDesignableField()

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
    <img
      src="//img.alicdn.com/imgextra/i2/O1CN01fLfasn23ZFgoqt7Id_!!6000000007269-55-tps-1141-150.svg"
      style={{ margin: '0 8px', height: 24, width: 'auto' }}
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
            <DragSourceWidget title="自增列表" name="arrays" />
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
              {view === 'json' && <div>JSON Schema</div>}
              {view === 'design' && (
                <Viewport>
                  <ComponentTreeWidget
                    components={{
                      Root: DesignableForm,
                      DesignableField,
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
