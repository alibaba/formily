import React from 'react'
import { isArr } from '@formily/shared'
import { InputProps } from 'antd/lib/input'
import { SelectProps } from 'antd/lib/select'
import { TreeSelectProps } from 'antd/lib/tree-select'
import { CascaderProps } from 'antd/lib/cascader'
import {
  DatePickerProps,
  RangePickerProps as DateRangePickerProps
} from 'antd/lib/date-picker'
import { TimePickerProps, TimeRangePickerProps } from 'antd/lib/time-picker'
import { formatMomentValue } from '../shared'

const Input: React.FC<InputProps> = props => {
  return (
    <div className="ant-form-text">
      <span>{props.addonBefore}</span>
      <span>{props.prefix}</span>
      {props.value}
      <span>{props.suffix}</span>
      <span>{props.addonAfter}</span>
    </div>
  )
}

const Select: React.FC<SelectProps<any>> = props => {
  const getSelected = () => {
    const value = props.value
    if (props.mode === 'multiple' || props.mode === 'tags') {
      if (props.labelInValue) {
        return isArr(value) ? value : []
      } else {
        return isArr(value)
          ? value.map(val => ({ label: val, value: val }))
          : []
      }
    } else {
      if (props.labelInValue) {
        return value ? [value] : []
      } else {
        return value ? [{ label: value, value }] : []
      }
    }
  }

  const getLabels = () => {
    const selected = getSelected()
    return selected
      .map(({ value, label }) => {
        return props?.options?.find(item => item.value == value)?.label || label
      })
      .join(', ')
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const TreeSelect: React.FC<TreeSelectProps<any>> = props => {
  const getSelected = () => {
    const value = props.value
    if (props.multiple) {
      if (props.labelInValue) {
        return isArr(value) ? value : []
      } else {
        return isArr(value)
          ? value.map(val => ({ label: val, value: val }))
          : []
      }
    } else {
      if (props.labelInValue) {
        return value ? [value] : []
      } else {
        return value ? [{ label: value, value }] : []
      }
    }
  }

  const findLabel = (value: any, dataSource: any[]) => {
    for (let i = 0; i < dataSource?.length; i++) {
      const item = dataSource[i]
      if (item?.value === value) {
        return item?.label
      } else {
        const childLabel = findLabel(value, item?.children)
        if (childLabel) return childLabel
      }
    }
  }

  const getLabels = () => {
    const selected = getSelected()
    return selected
      .map(({ value, label }) => {
        return findLabel(props?.treeData, value) || label
      })
      .join(', ')
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const Cascader: React.FC<CascaderProps> = props => {
  const getSelected = () => {
    return isArr(props.value) ? props.value : []
  }
  const getLabels = () => {
    const selected = getSelected()
    return selected
      .map(value => {
        return props?.options?.find(item => item.value == value)?.label
      })
      .join('/')
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const DatePicker: React.FC<DatePickerProps> = props => {
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const DateRangePicker: React.FC<DateRangePickerProps> = props => {
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const TimePicker: React.FC<TimePickerProps> = props => {
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = props => {
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

export const PreviewText = {
  Input,
  Select,
  TreeSelect,
  Cascader,
  DatePicker,
  DateRangePicker,
  TimePicker,
  TimeRangePicker
}

export default PreviewText
