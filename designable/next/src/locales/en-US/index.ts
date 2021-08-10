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

const enUS: ISettingsLocale = {
  Components: {
    Root: 'Root',
    DesignableForm: 'Form',
    DesignableField: 'Field',
    Input: { title: 'Input', TextArea: 'TextArea' },
    Select: 'Select',
    Radio: { title: 'Radio', Group: 'Radio Group' },
    Checkbox: {
      title: 'Checkbox',
      Group: 'Checkbox Group',
    },
    Card: 'Card Layout',
    FormGrid: 'Grid Layout',
    FormLayout: 'Table Layout',
    Range: 'Range',
    Rating: 'Rating',
    Cascader: 'Cascader',
    Space: 'Space',
    DatePicker: { title: 'Date Picker', RangePicker: 'Date Range Picker' },
    TimePicker: { title: 'Time Picker', RangePicker: 'Time Range Picker' },
    NumberPicker: 'Number Picker',
    Password: 'Password',
    Transfer: 'Transfer',
    TreeSelect: 'Tree Select',
    Upload: { title: 'Upload', Dragger: 'Upload Dragger' },
    Switch: 'Switch',
    FormTab: { title: 'Tab Layout ', TabPane: 'Tab Panel' },
    FormCollapse: {
      title: 'Accordion Layout',
      CollapsePanel: 'Accordion Panel',
    },
    Object: 'Data Object',
    Void: 'Void Container',
    ...ArrayComponents,
    FormItem: 'Form Item',
  },
  Settings: {
    ...Form,
    ...Field,
    namespace: Components,
  },
  Common: {
    droppable: 'Components can be dragged in',
    addTabPane: 'Add tab ',
    addCollapsePanel: 'Add accordion card',
    addTableColumn: 'Add table columns',
    addTableSortHandle: 'Add sort',
    addIndex: 'Add index',
    addOperation: 'Add operation',
  },
}

export default enUS
