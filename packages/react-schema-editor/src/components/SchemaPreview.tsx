import * as React from 'react'
import { ISchemaPreviewProps } from '../utils/types'
import { SchemaForm } from '@formily/antd'
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating
} from '@formily/antd-components';

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  NumberPicker,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  Upload,
  Range,
  Rating,
  Transfer
}

export const SchemaPreview: React.FC<ISchemaPreviewProps> = ({ schema }) => {
  return <SchemaForm schema={schema} labelCol={5} wrapperCol={14} components={components}></SchemaForm>
}

SchemaPreview.displayName = 'SchemaPreview';
