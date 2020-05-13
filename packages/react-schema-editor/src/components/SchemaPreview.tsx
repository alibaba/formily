import * as React from 'react'
import { ISchemaPreviewProps } from '../utils/types'
import { SchemaForm } from '@formily/antd'
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  InputNumber,
  TimePicker,
  Upload,
  Switch,
  Slider,
  Transfer,
  Rate
} from 'antd';

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  InputNumber,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  Upload,
  Dragger: Upload.Dragger,
  Slider,
  Rate,
  Transfer
}

export const SchemaPreview: React.FC<ISchemaPreviewProps> = ({ schema }) => {
  return <SchemaForm schema={schema} labelCol={5} wrapperCol={14} components={components}></SchemaForm>
}

SchemaPreview.displayName = 'SchemaPreview';
