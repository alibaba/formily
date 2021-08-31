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
import { Text } from './Text'
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
  Text,
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
    Card: 'Card',
    FormGrid: 'Form Grid',
    FormLayout: 'Form Layout',
    Range: 'Range',
    Rating: 'Rating',
    Cascader: 'Cascader',
    Space: 'Space',
    DatePicker: { title: 'Date', RangePicker: 'Date Range' },
    TimePicker: { title: 'Time', RangePicker: 'Time Range' },
    NumberPicker: 'Number',
    Password: 'Password',
    Transfer: 'Transfer',
    TreeSelect: 'TreeSelect',
    Upload: { title: 'Upload', Dragger: 'Dragger Upload' },
    Switch: 'Switch',
    FormTab: { title: 'Form Tab', TabPane: 'Tab Panel' },
    FormCollapse: { title: 'Form Collapse', CollapsePanel: 'Collapse Panel' },
    Object: 'Object',
    Void: 'Void Element',
    Text: 'Text',
    ...ArrayComponents,
    FormItem: 'Form Item',
  },
  Settings: {
    ...Form,
    ...Field,
    namespace: Components,
  },
  Common: {
    droppable: 'Droppable',
    addTabPane: 'Add Panel',
    addCollapsePanel: 'Add Panel',
    addTableColumn: 'Add Column',
    addTableSortHandle: 'Add Sort Handle',
    addIndex: 'Add Index',
    addOperation: 'Add Operations',
  },
}

export default enUS
