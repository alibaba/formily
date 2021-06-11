import React from 'react'
import { FormPath } from '@formily/core'
import { GlobalRegistry, TreeNode } from '@designable/core'
import { useDesigner, useTreeNode } from '@designable/react'
import {
  ArrayField,
  Field,
  ObjectField,
  VoidField,
  observer,
  Schema,
  ISchema,
} from '@formily/react'
import {
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
} from '@formily/antd'
import { clone } from '@formily/shared'
import * as defaultSchema from '../../schemas'
import { Card, Slider, Rate } from 'antd'
import { createFormContainer } from '../FormContainer'
import { FormItemSwitcher } from '../FormItemSwitcher'
import { FormTab as DesignableFormTab } from '../FormTab'

Schema.silent()

const transformPath = (path = '') => {
  return String(path).replace(/\./g, '_o_')
}

export interface IDesignableFieldProps {
  name?: string
  components?: Record<string, React.JSXElementConstructor<unknown>>
  propsSchemas?: Record<string, ISchema>
}

export const createDesignableField = (options: IDesignableFieldProps = {}) => {
  const realOptions: IDesignableFieldProps = {
    name: 'DesignableField',
    ...options,
    components: {
      ...options.components,
      Space: createFormContainer(Space, true),
      FormGrid: createFormContainer(FormGrid, true),
      FormLayout: createFormContainer(FormLayout),
      FormTab: DesignableFormTab,
      FormItem,
      DatePicker,
      Checkbox,
      Cascader,
      Editable,
      Input,
      NumberPicker,
      Switch,
      Password,
      PreviewText,
      Radio,
      Reset,
      Select,
      Submit,
      TimePicker,
      Transfer,
      TreeSelect,
      Upload,
      Card,
      Slider,
      Rate,
    },
  }

  const tabs = {}

  const DesignableField: React.FC<ISchema> = observer((props) => {
    const designer = useDesigner()
    const node = useTreeNode()
    if (!node) return null

    const getFieldProps = () => {
      const base = new Schema(clone(props)).compile()
      const fieldProps = base.toFieldProps({
        components: realOptions.components,
      })
      if (fieldProps.decorator?.[0]) {
        fieldProps.decorator[1] = fieldProps.decorator[1] || {}
        FormPath.setIn(
          fieldProps.decorator[1],
          designer.props.nodeIdAttrName,
          node.id
        )
      } else if (fieldProps.component?.[0]) {
        fieldProps.component[1] = fieldProps.component[1] || {}
        FormPath.setIn(
          fieldProps.component[1],
          designer.props.nodeIdAttrName,
          node.id
        )
      }
      fieldProps.value = fieldProps.initialValue
      return fieldProps as any
    }

    const fieldProps = getFieldProps()
    if (props.type === 'object') {
      return (
        <ObjectField {...fieldProps} name={node.id}>
          {props.children}
        </ObjectField>
      )
    } else if (props.type === 'array') {
      return <ArrayField {...fieldProps} name={node.id} />
    } else if (node.props.type === 'void') {
      return (
        <VoidField {...fieldProps} name={node.id}>
          {props.children}
        </VoidField>
      )
    }
    return <Field {...fieldProps} name={node.id} />
  })

  const createFieldSchema = (node: TreeNode): ISchema => {
    const decorator = transformPath(node.props['x-decorator'])
    const component = transformPath(node.props['x-component'])
    const decoratorSchema =
      realOptions.propsSchemas?.[decorator] || defaultSchema[decorator]
    const componentSchema =
      realOptions.propsSchemas?.[component] || defaultSchema[component]
    const TabSchema = (key: string, schema: ISchema) => {
      tabs[key] = tabs[key] || FormTab.createFormTab()
      return {
        type: 'object',
        properties: {
          propsTab: {
            type: 'void',
            'x-component': 'FormTab',
            'x-component-props': {
              formTab: tabs[key],
              style: {
                overflow: 'visible',
              },
            },
            properties: {
              propsPane: {
                type: 'void',
                'x-component': 'FormTab.TabPane',
                'x-component-props': {
                  tab: GlobalRegistry.getDesignerMessage(
                    `settings.${key}.tab_property`
                  ),
                },
                properties: schema.properties,
              },
              stylePane: {
                type: 'void',
                'x-component': 'FormTab.TabPane',
                'x-component-props': {
                  tab: GlobalRegistry.getDesignerMessage(
                    `settings.${key}.tab_style`
                  ),
                },
                properties: {
                  style: defaultSchema.CSSStyle,
                },
              },
            },
          },
        },
      }
    }
    const base = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-index': 0,
        },
        title: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-index': 1,
        },
        description: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-index': 2,
        },
        'x-display': {
          type: 'string',
          enum: ['visible', 'hidden', 'none'],
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            defaultValue: 'visible',
          },
          'x-index': 3,
        },
        'x-pattern': {
          type: 'string',
          enum: ['editable', 'disabled', 'readOnly', 'readPretty'],
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            defaultValue: 'editable',
          },
          'x-index': 4,
        },
        'x-component-props':
          componentSchema && TabSchema('x-component-props', componentSchema),
        'x-decorator-props':
          decoratorSchema && TabSchema('x-decorator-props', decoratorSchema),
      },
    }

    if (node.props.type === 'void') {
      Object.assign(base.properties, {
        'x-decorator': {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': FormItemSwitcher,
          'x-index': 10,
          'x-reactions': {
            target: '*(title,description)',
            fulfill: {
              state: {
                hidden: '{{$self.value !== "FormItem"}}',
              },
            },
          },
        },
      })
    } else {
      Object.assign(base.properties, {
        default: {
          'x-decorator': 'FormItem',
          'x-component': 'ValueInput',
          'x-index': 5,
        },
        enum: {
          type: 'array',
          'x-decorator': 'FormItem',
          //  'x-component': 'DataSourceSetter',
          'x-index': 6,
        },
        'x-validator': {
          'x-decorator': 'FormItem',
          // 'x-component': 'ValidatorSetter',
          'x-index': 7,
        },
        'x-reactions': {
          'x-decorator': 'FormItem',
          // 'x-component': 'ReactionsSetter',
          'x-index': 8,
        },
        required: {
          type: 'boolean',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          'x-index': 9,
        },
      })
    }

    return base
  }

  GlobalRegistry.registerDesignerProps({
    [realOptions.name]: (node) => {
      const componentName = node.props?.['x-component']
      const message = GlobalRegistry.getDesignerMessage(
        `components.${componentName}`
      )
      return {
        title: typeof message === 'string' ? message : message?.title,
        draggable: true,
        droppable: true,
        selfRenderChildren:
          node.props.type === 'array' ||
          componentName === 'FormTab' ||
          componentName === 'FormCollapse',
        inlineChildrenLayout:
          componentName === 'FormGrid' || componentName === 'Space',
        allowAppend(node) {
          return (
            node.props.type === 'void' ||
            node.props.type === 'array' ||
            node.props.type === 'object'
          )
        },
        propsSchema: createFieldSchema(node),
      }
    },
  })

  return DesignableField
}
