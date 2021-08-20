import { Common } from './Common'
import { Field } from './Field'
import { FormLayout } from './FormLayout'
import { Card } from './Card'
import { FormGrid } from './FormGrid'
import { Space } from './Space'
import { FormTab } from './FormTab'
import { FormCollapse } from './FormCollapse'
import { Input } from './Input'
import { Select } from './Select'
import { TreeSelect } from './TreeSelect'
import { Cascader } from './Cascader'
import { Radio } from './Radio'
import { Checkbox } from './Checkbox'
import { Range } from './Range'
import { Rating } from './Rating'
import { DatePicker } from './DatePicker'
import { TimePicker } from './TimePicker'
import { NumberPicker } from './NumberPicker'
import { Password } from './Password'
import { Transfer } from './Transfer'
import { Upload } from './Upload'
import { Switch } from './Switch'
import { Text } from './Text'
import { ArrayTable } from './ArrayTable'
import { ArrayCards } from './ArrayCards'
import * as ArrayComponents from './Array'
import type { ISettingsLocale } from '../types'

const Form: ISettingsLocale = { ...Common, ...FormLayout }

const Components: ISettingsLocale = {
  FormLayout,
  Card,
  FormGrid,
  Space,
  FormTab,
  FormCollapse,
  Input,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  Checkbox,
  Range,
  Rating,
  Text,
  DatePicker,
  TimePicker,
  NumberPicker,
  Password,
  Transfer,
  Upload,
  Switch,
  ArrayTable,
  ArrayCards,
}

const zhCN: ISettingsLocale = {
  Components: {
    Root: '根组件',
    DesignableForm: '表单',
    DesignableField: '字段',
    Input: { title: '输入框', TextArea: '多行文本' },
    Select: '选择框',
    Radio: { title: '单选框', Group: '单选框组' },
    Checkbox: {
      title: '复选框',
      Group: '复选框组',
    },
    Card: '卡片布局',
    FormGrid: '网格布局',
    FormLayout: '表单布局',
    Range: '滑动条',
    Rating: '评分器',
    Cascader: '联级选择',
    Space: '弹性间距',
    DatePicker: { title: '日期选择', RangePicker: '日期范围' },
    TimePicker: { title: '时间选择', RangePicker: '时间范围' },
    NumberPicker: '数字输入',
    Password: '密码输入',
    Transfer: '穿梭框',
    TreeSelect: '树选择',
    Upload: { title: '上传', Dragger: '拖拽上传' },
    Switch: '开关',
    FormTab: { title: '选项卡布局', TabPane: '选项卡面板' },
    FormCollapse: { title: '手风琴布局', CollapsePanel: '手风琴面板' },
    Object: '数据对象',
    Void: '虚拟容器',
    Text: '文本',
    ...ArrayComponents,
    FormItem: '表单项容器',
  },
  Settings: {
    ...Form,
    ...Field,
    namespace: Components,
  },
  Common: {
    droppable: '可以拖入组件',
    addTabPane: '添加选项卡',
    addCollapsePanel: '添加手风琴卡片',
    addTableColumn: '添加表格列',
    addTableSortHandle: '添加排序',
    addIndex: '添加索引',
    addOperation: '添加操作',
  },
}

export default zhCN
