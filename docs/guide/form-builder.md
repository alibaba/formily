# Form designer development guide

## Introduction

![](http://img.alicdn.com/imgextra/i2/O1CN01eI9FLz22tZek2jv7E_!!6000000007178-2-tps-3683-2272.png)

Formily Form Designer is an extension package based on [designable](https://github.com/alibaba/designable). It inherits the basic capabilities of designable, and provides Formily basic form building and configuration capabilities.

## Core Concept

The core concept of Designable is to turn the designer into a modular combination, everything can be replaced. Designable itself provides a series of out-of-the-box components for users to use, but if users are not satisfied with the components, they can directly replace the components. To achieve maximum flexible customization, that is, Designable itself does not provide any plug-in related APIs

## Install

Ant Design users

```bash
npm install --save @formily/designable-antd
```

Alibaba Fusion users

```bash
npm install --save @formily/designable-next
```

## Get started quickly

[Source Code](https://github.com/alibaba/formily/tree/formily_next/designable/antd/playground/widgets)

In the following example, we will help you understand the usage of each component line by line through code comments.

```tsx pure
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import {
  Designer, //Designer root component, used to deliver context
  IconWidget, //Icon widget, used to obtain various system built-in icons
  DesignerToolsWidget, //Drawing board tool pendant
  ViewToolsWidget, //View switching tool pendant
  Workspace, //Workspace components, core components, used to manage drag and drop behavior in the workspace, tree node data, etc...
  OutlineTreeWidget, //Outline tree component, it will automatically identify the current workspace and display the tree nodes in the workspace
  DragSourceWidget, //Drag and drop the source component
  MainPanel, //Main layout panel
  CompositePanel, //Left combined layout panel
  WorkspacePanel, //Workspace layout panel
  ToolbarPanel, //Toolbar layout panel
  ViewportPanel, //Viewport layout panel
  ViewPanel, //View layout panel
  SettingsPanel, //Configure the form layout panel on the right
  ComponentTreeWidget, //Component tree renderer
} from '@designable/react'
import { SettingsForm } from '@designable/react-settings-form'
import { createDesigner, GlobalRegistry } from '@designable/core'
import {
  createDesignableField,
  createDesignableForm,
} from '@formily/designable-antd'
import {
  transformToSchema, //Convert the component tree structure into Formily JSON Schema
  transformToTreeNode, //Convert Formily JSON Schema into a component tree
} from '@designable/formily'
import {
  LogoWidget, //Business custom Logo rendering component
  PreviewWidget, //Business custom preview component
  SchemaEditorWidget, //Business custom Schema editor
  MarkupSchemaWidget, //Business custom source code previewer
} from './widgets'
import { Button } from 'antd'
import 'antd/dist/antd.less'

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: 'Input controls',
      Layouts: 'Layout components',
      Arrays: 'Self-incrementing components',
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
    //The business layer gets the schema to echo the data
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

> The Designable API document is currently unavailable, Yes, stay tuned~

### createDesignableField

#### Description

Create DesignableField and consume it for ComponentTreeWidget to build

#### Signature

```ts
interface IDesignableFieldFactoryProps {
  registryName: string //Required, registered name, componentName that identifies DesignableField in the component tree
  components?: Record<string, React.JSXElementConstructor<unknown>> //Custom canvas components, used to pass in x-component/x-decorator
  componentsPropsSchema?: Record<string, ISchema> //Custom canvas component property schema configuration
  componentsIcon?: Record<string, React.ReactNode> //Custom canvas component's icon
  componentsSourceIcon?: Record<string, React.ReactNode> //Custom canvas component's drag source icon
  dropFormItemComponents?: ComponentNameMatcher[] //Identify which components do not need to support FormItem
  dropReactionComponents?: ComponentNameMatcher[] //Identify which components do not need to support responder configuration
  selfRenderChildrenComponents?: ComponentNameMatcher[] //Identify which canvas components are rendered by the component itself, and currently internal components such as ArrayTable/FormTab are identified by default
  inlineChildrenLayoutComponents?: ComponentNameMatcher[] //Identify which canvas component's child component layout mode is inline mode
  inlineLayoutComponents?: ComponentNameMatcher[] //Identify which canvas components are in inline mode
  restrictChildrenComponents?: Record<string, ComponentNameMatcher[]> //Node constraints, identify the upper and lower constraints between canvas components, for example, the child nodes of A component can only be B/C components
  restrictSiblingComponents?: Record<string, ComponentNameMatcher[]> //Node constraint, identifies the adjacent constraint relationship of canvas components, for example, adjacent nodes of component A can only be B/C components
}

interface createDesignableField {
  (props: IDesignableFieldFactoryProps): React.FC
}
```

### createDesignableForm

#### Description

Create DesignableForm and consume it for ComponentTreeWidget

It should be noted here that if it is a pure form designer, we need to specify the registryName as Root, so that the Form component cannot be dragged. If it is specified as DesignableForm or other names, it can be dragged. This scenario is suitable for Page-level construction, you can embed the entire form into other modules

#### Signature

```ts
import { IDesignerProps } from '@designable/core'

interface IDesignableFormFactoryProps extends IDesignerProps {
  registryName: string //Required, registered name, componentName that identifies DesignableForm in the component tree
  component?: React.JSXElementConstructor<unknown> //The canvas component of the Form, no need to specify by default
}

interface createDesignableForm {
  (props: IDesignableFormFactoryProps): React.FC
}
```
