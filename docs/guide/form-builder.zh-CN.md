# 表单设计器开发指南

## 介绍

![](http://img.alicdn.com/imgextra/i2/O1CN01eI9FLz22tZek2jv7E_!!6000000007178-2-tps-3683-2272.png)

Formily 表单设计器是基于[designable](https://github.com/alibaba/designable)而扩展出来的扩展包，它在继承了 designable 的基础能力上，提供了 Formily 基础表单的搭建和配置能力。

## 核心理念

Designable 的核心理念是将设计器搭建变成模块化组合，一切可替换，Designable 本身提供了一系列开箱即用的组件给用户使用，但是如果用户对组件不满意，是可以直接替换组件，从而实现最大化灵活定制，也就是 Designable 本身是不会提供任何插槽 Plugin 相关的 API

## 安装

> 状态：未发布

Ant Design 用户

```bash
npm install --save @formily/designable-antd
```

Alibaba Fusion 用户

```bash
npm install --save @formily/designable-next
```

## 快速上手

[源代码](https://github.com/alibaba/formily/tree/formily_next/designable/antd/playground/widgets)

以下示例，我们将通过代码注释的方式帮助大家一行一行理解每个组件的使用方式

```tsx pure
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import {
  Designer, //设计器根组件，用于下发上下文
  IconWidget, //图标挂件，用于获取各种系统内置图标
  DesignerToolsWidget, //画板工具挂件
  ViewToolsWidget, //视图切换工具挂件
  Workspace, //工作区组件，核心组件，用于管理工作区内的拖拽行为，树节点数据等等...
  OutlineTreeWidget, //大纲树组件，它会自动识别当前工作区，展示出工作区内树节点
  DragSourceWidget, //拖拽源组件
  MainPanel, //主布局面板
  CompositePanel, //左侧组合布局面板
  WorkspacePanel, //工作区布局面板
  ToolbarPanel, //工具栏布局面板
  ViewportPanel, //视口布局面板
  ViewPanel, //视图布局面板
  SettingsPanel, //右侧配置表单布局面板
  ComponentTreeWidget, //组件树渲染器
} from '@designable/react'
import { SettingsForm } from '@designable/react-settings-form'
import { createDesigner, GlobalRegistry } from '@designable/core'
import {
  createDesignableField,
  createDesignableForm,
} from '@formily/designable-antd'
import {
  transformToSchema, //将组件树结构转换成Formily JSON Schema
  transformToTreeNode, //将Formily JSON Schema转换成组件树
} from '@designable/formily'
import {
  LogoWidget, //业务自定义Logo渲染组件
  PreviewWidget, //业务自定义预览组件
  SchemaEditorWidget, //业务自定义Schema编辑器
  MarkupSchemaWidget, //业务自定义源码预览器器
} from './widgets'
import { Button } from 'antd'
import 'antd/dist/antd.less'

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
    },
  },
})

const Root = createDesignableForm({
  registryName: 'Root',
})

const DesignableField = createDesignableField({
  registryName: 'DesignableField',
})

const App = () => {
  const engine = useMemo(() => createDesigner(), [])

  useEffect(() => {
    //业务层拿到schema用于回显数据
    fetchSchema().then((schema) => {
      engine.setCurrentTree(
        transformToTreeNode(schema, {
          designableFieldName: 'DesignableField',
          designableFormName: 'Root',
        })
      )
    })
  }, [])

  return (
    <Designer engine={engine} theme="dark">
      <MainPanel
        logo={<LogoWidget />}
        actions={
          <Button
            onClick={() => {
              submitSchema({
                schema: transformToSchema(engine.getCurrentTree(), {
                  designableFieldName: 'DesignableField',
                  designableFormName: 'Root',
                }),
              })
            }}
          >
            Save
          </Button>
        }
      >
        <CompositePanel>
          <CompositePanel.Item
            title="panels.Component"
            icon={<IconWidget infer="Component" />}
          >
            <DragSourceWidget title="sources.Inputs" name="inputs" />
            <DragSourceWidget title="sources.Layouts" name="layouts" />
            <DragSourceWidget title="sources.Arrays" name="arrays" />
          </CompositePanel.Item>
          <CompositePanel.Item
            title="panels.OutlinedTree"
            icon={<IconWidget infer="Outline" />}
          >
            <OutlineTreeWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget
                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
              />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Root,
                      DesignableField,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </MainPanel>
    </Designer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## API

> Designable API 文档目前暂时没有，敬请期待~

### createDesignableField

#### 描述

创建 DesignableField，给 ComponentTreeWidget 消费，用于搭建

#### 签名

```ts
interface IDesignableFieldFactoryProps {
  registryName: string //必填项，注册名称，标识DesignableField在组件树中的componentName
  components?: Record<string, React.JSXElementConstructor<unknown>> //自定义画布组件，用于传入x-component/x-decorator
  componentsPropsSchema?: Record<string, ISchema> //自定义画布组件属性schema配置
  dropFormItemComponents?: ComponentNameMatcher[] //标识哪些组件不需要支持FormItem
  dropReactionComponents?: ComponentNameMatcher[] //标识哪些组件不需要支持响应器配置
  selfRenderChildrenComponents?: ComponentNameMatcher[] //标识哪些画布组件是由组件自身渲染子树，目前内部ArrayTable/FormTab这类组件是默认标识了
  inlineChildrenLayoutComponents?: ComponentNameMatcher[] //标识哪些画布组件的子组件布局模式是内联模式
  inlineLayoutComponents?: ComponentNameMatcher[] //标识哪些画布组件本身是内联模式
  restrictChildrenComponents?: Record<string, ComponentNameMatcher[]> //节点约束，标识画布组件之间的上下级约束关系，比如A组件的子节点只能是B/C组件
}

interface createDesignableField {
  (props: IDesignableFieldFactoryProps): React.FC
}
```

### createDesignableForm

#### 描述

创建 DesignableForm，给 ComponentTreeWidget 消费

这里需要注意的是，如果是作为纯表单设计器，我们需要指定 registryName 为 Root，这样 Form 组件是无法拖拽的，如果指定为 DesignableForm 或者其它名称，那就是可以拖拽的，这种场景适用于页面级搭建，可以将整个表单嵌入到其他模块中

#### 签名

```ts
import { IDesignerProps } from '@designable/core'

interface IDesignableFormFactoryProps extends IDesignerProps {
  registryName: string //必填项，注册名称，标识DesignableForm在组件树中的componentName
  component?: React.JSXElementConstructor<unknown> //Form的画布组件，默认不需要指定
}

interface createDesignableForm {
  (props: IDesignableFormFactoryProps): React.FC
}
```
