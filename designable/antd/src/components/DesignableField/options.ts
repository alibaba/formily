import { IDesignableFieldFactoryProps } from './types'
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
} from '@formily/antd'
import { Card, Slider, Rate } from 'antd'
import { createDesignableContainer } from '../DesignableContainer'
import { DesignableFormTab } from '../DesignableFormTab'
import { DesignableFormCollapse } from '../DesignableFormCollapse'
import { DesignableArrayTable } from '../DesignableArrayTable'
import { DesignableArrayCards } from '../DesignableArrayCards'
import { DesignableText } from '../DesignableText'
import { TreeNode } from '@designable/core'

const isChildrenComponents =
  (parentName: string, names?: string[]) => (name: string) =>
    Array.isArray(names) && names.length > 0
      ? names.some((key) => {
          return `${parentName}.${key}` === name
        })
      : name.indexOf(`${parentName}.`) > -1

const InlineArrayChildren = [
  'Column',
  'Index',
  'SortHandle',
  'Remove',
  'MoveDown',
  'MoveUp',
]

const isFormTabChildren = isChildrenComponents('FormTab')
const isFormCollapseChildren = isChildrenComponents('FormCollapse')
const isArrayTableInlineChildren = isChildrenComponents(
  'ArrayTable',
  InlineArrayChildren
)
const isArrayCardsInlineChildren = isChildrenComponents(
  'ArrayCards',
  InlineArrayChildren
)
const isObjectNode = (name: string, node: TreeNode) => {
  return node.props['type'] === 'object'
}

const isNotArrayColumn = (name: string, node: TreeNode) => {
  return node.props['x-component'] !== 'ArrayTable.Column'
}

const allowDropWithEmpty = (name: string, node: TreeNode, target: TreeNode) => {
  if (target) return target.children.length === 0
  return false
}

const noChildren = () => false

export const createOptions = (
  options: IDesignableFieldFactoryProps
): IDesignableFieldFactoryProps => {
  return {
    ...options,
    dropFormItemComponents: [
      ...(options.dropFormItemComponents || []),
      isFormTabChildren,
      isFormCollapseChildren,
    ],
    dropReactionComponents: [
      ...(options.dropReactionComponents || []),
      isFormTabChildren,
      isFormCollapseChildren,
    ],
    selfRenderChildrenComponents: [
      ...(options.selfRenderChildrenComponents || []),
      'FormTab',
      'FormCollapse',
    ],
    inlineChildrenLayoutComponents: [
      ...(options.inlineChildrenLayoutComponents || []),
      'FormItem',
      'FormGrid',
      'Space',
    ],
    inlineLayoutComponents: [
      ...(options.inlineLayoutComponents || []),
      isArrayTableInlineChildren,
      isArrayCardsInlineChildren,
    ],
    restrictChildrenComponents: {
      FormTab: [allowDropWithEmpty, 'FormTab.TabPane'],
      FormCollapse: [allowDropWithEmpty, 'FormCollapse.CollapsePanel'],
      ArrayTable: [allowDropWithEmpty, isObjectNode, 'ArrayTable.Addition'],
      'ArrayTable.Column': [isNotArrayColumn],
      Text: [noChildren],
    },
    restrictSiblingComponents: {
      'FormTab.TabPane': ['FormTab.TabPane'],
      'FormCollapse.CollapsePanel': ['FormCollapse.CollapsePanel'],
      'ArrayTable.Column': ['ArrayTable.Column'],
    },
    componentsSourceIcon: {
      ...options.componentsSourceIcon,
      Space: 'SpaceSource',
      FormGrid: 'GridSource',
      FormTab: 'TabSource',
      FormCollapse: 'CollapseSource',
      ArrayTable: 'ArrayTableSource',
      ArrayCards: 'ArrayCardsSource',
      DatePicker: 'DatePickerSource',
      'DatePicker.RangePicker': 'DateRangePickerSource',
      'Checkbox.Group': 'CheckboxGroupSource',
      'Radio.Group': 'RadioGroupSource',
      Slider: 'SliderSource',
      Rate: 'RateSource',
      TimePicker: 'TimePickerSource',
      'TimePicker.RangePicker': 'TimeRangePickerSource',
      Cascader: 'CascaderSource',
      TreeSelect: 'TreeSelectSource',
      Select: 'SelectSource',
      'Input.TextArea': 'TextAreaSource',
      Input: 'InputSource',
      NumberPicker: 'NumberPickerSource',
      Password: 'PasswordSource',
      Transfer: 'TransferSource',
      Switch: 'SwitchSource',
      Upload: 'UploadSource',
      'Upload.Dragger': 'UploadDraggerSource',
      Card: 'CardSource',
      FormLayout: 'FormLayoutSource',
      Text: 'TextSource',
      Image: 'ImageSource',
      Button: 'ButtonSource',
      Video: 'MediaSource',
    },
    components: {
      ...options.components,
      Space: createDesignableContainer(Space),
      FormGrid: createDesignableContainer(FormGrid),
      FormLayout: createDesignableContainer(FormLayout),
      FormTab: DesignableFormTab,
      FormCollapse: DesignableFormCollapse,
      ArrayTable: DesignableArrayTable,
      ArrayCards: DesignableArrayCards,
      Text: DesignableText,
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
}
