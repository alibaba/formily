import React, { createContext, useContext } from 'react'
import { isArr, isValid } from '@formily/shared'
import { useField } from '@formily/react'
import { InputProps } from 'antd/lib/input'
import { SelectProps } from 'antd/lib/select'
import { TreeSelectProps } from 'antd/lib/tree-select'
import { CascaderProps } from 'antd/lib/cascader'
import {
  DatePickerProps,
  RangePickerProps as DateRangePickerProps,
} from 'antd/lib/date-picker'
import { TimePickerProps, TimeRangePickerProps } from 'antd/lib/time-picker'
import { Tag } from 'antd'
import { formatMomentValue } from '../shared'

const PlaceholderContext = createContext<string>('N/A')

const Placeholder = PlaceholderContext.Provider

const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || 'N/A'
  return isValid(value) ? value : placeholder
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="ant-form-text">
      <span>{props.addonBefore}</span>
      <span>{props.prefix}</span>
      {usePlaceholder(props.value)}
      <span>{props.suffix}</span>
      <span>{props.addonAfter}</span>
    </div>
  )
}

const Select: React.FC<SelectProps<any>> = (props) => {
  const field = useField<Formily.Core.Models.Field>()
  const dataSource: any[] = field?.dataSource?.length
    ? field.dataSource
    : props?.options?.length
    ? props.options
    : []
  const placeholder = usePlaceholder()
  const getSelected = () => {
    const value = props.value
    if (props.mode === 'multiple' || props.mode === 'tags') {
      if (props.labelInValue) {
        return isArr(value) ? value : []
      } else {
        return isArr(value)
          ? value.map((val) => ({ label: val, value: val }))
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
    if (!selected.length) return <Tag>{placeholder}</Tag>
    return selected.map(({ value, label }, key) => {
      const text =
        dataSource?.find((item) => item.value == value)?.label || label
      return <Tag key={key}>{text || placeholder}</Tag>
    })
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const TreeSelect: React.FC<TreeSelectProps<any>> = (props) => {
  const field = useField<Formily.Core.Models.Field>()
  const placeholder = usePlaceholder()
  const dataSource = field?.dataSource?.length
    ? field.dataSource
    : props?.options?.length
    ? props.options
    : []
  const getSelected = () => {
    const value = props.value
    if (props.multiple) {
      if (props.labelInValue) {
        return isArr(value) ? value : []
      } else {
        return isArr(value)
          ? value.map((val) => ({ label: val, value: val }))
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
    if (!selected?.length) return <Tag>{placeholder}</Tag>
    return selected.map(({ value, label }, key) => {
      return (
        <Tag key={key}>
          {findLabel(value, dataSource) || label || placeholder}
        </Tag>
      )
    })
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const Cascader: React.FC<CascaderProps> = (props) => {
  const field = useField<Formily.Core.Models.Field>()
  const placeholder = usePlaceholder()
  const dataSource: any[] = field?.dataSource?.length
    ? field.dataSource
    : props?.options?.length
    ? props.options
    : []
  const getSelected = () => {
    return isArr(props.value) ? props.value : []
  }
  const getLabels = () => {
    const selected = getSelected()
    return selected
      .map((value) => {
        return (
          dataSource?.find((item) => item.value == value)?.label || placeholder
        )
      })
      .join('/')
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const placeholder = usePlaceholder()
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const placeholder = usePlaceholder()
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const placeholder = usePlaceholder()
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className="ant-form-text">{getLabels()}</div>
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = (props) => {
  const placeholder = usePlaceholder()
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
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
  TimeRangePicker,
  Placeholder,
  usePlaceholder,
}

export default PreviewText
