import { IDesignableFieldProps } from './types'
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

export const createOptions = (
  options: IDesignableFieldProps = {}
): IDesignableFieldProps => {
  return {
    name: 'DesignableField',
    ...options,
    notDraggableComponents: [
      ...(options.notDraggableComponents || []),
      'FormTab.TabPane',
      'FormCollapse.CollapsePanel',
    ],
    notDroppableComponents: [
      ...(options.notDroppableComponents || []),
      'ArrayTable.SortHandle',
      'ArrayTable.Index',
      'ArrayTable.Remove',
      'ArrayTable.MoveDown',
      'ArrayTable.MoveUp',
    ],
    dropFormItemComponents: [
      ...(options.dropFormItemComponents || []),
      'FormTab.TabPane',
      'FormCollapse.CollapsePanel',
    ],
    dropReactionComponents: [
      ...(options.dropReactionComponents || []),
      'FormTab.TabPane',
      'FormCollapse.CollapsePanel',
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
      'ArrayTable.Column',
      'ArrayTable.SortHandle',
      'ArrayTable.Index',
      'ArrayTable.Remove',
      'ArrayTable.MoveDown',
      'ArrayTable.MoveUp',
    ],

    restrictChildrenComponents: {
      FormTab: ['FormTab.TabPane'],
      FormCollapse: ['FormCollapse.CollapsePanel'],
      ArrayTable: ['ArrayTable.Column', 'ArrayTable.Addition'],
    },
    restrictParentComponents: {
      'FormTab.TabPane': ['FormTab'],
      'FormCollapse.CollapsePanel': ['FormCollapse'],
      'ArrayTable.Column': ['ArrayTable'],
      'ArrayTable.Addition': ['ArrayTable'],
    },
    components: {
      ...options.components,
      Space: createDesignableContainer(Space),
      FormGrid: createDesignableContainer(FormGrid),
      FormLayout: createDesignableContainer(FormLayout),
      FormTab: DesignableFormTab,
      FormCollapse: DesignableFormCollapse,
      ArrayTable: DesignableArrayTable,
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
