import React, { createContext, useContext } from 'react'
import { isArr, isEmpty, isValid, toArr } from '@formily/shared'
import { Field } from '@formily/core'
import { useField, observer } from '@formily/react'
import { InputProps } from '@alifd/next/lib/input'
import { SelectProps } from '@alifd/next/lib/select'
import { TreeSelectProps } from '@alifd/next/lib/tree-select'
import { CascaderProps } from '@alifd/next/lib/cascader'
import {
  DatePickerProps,
  RangePickerProps as DateRangePickerProps,
} from '@alifd/next/lib/date-picker'
import { TimePickerProps } from '@alifd/next/lib/time-picker'
import {
  TimePickerProps as TimePicker2Props,
  RangePickerProps as TimeRangePicker2Props,
} from '@alifd/next/types/time-picker2'
import { Tag } from '@alifd/next'
import cls from 'classnames'
import { formatMomentValue, usePrefixCls } from '../__builtins__'

const PlaceholderContext = createContext<React.ReactNode>('N/A')

const Placeholder = PlaceholderContext.Provider

const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || 'N/A'
  return !isEmpty(value) ? value : placeholder
}

interface IGetValueByValue {
  (
    array: any[],
    inputValue: any,
    keyMap?: { inputKey?: string; outputKey?: string; childrenKey?: string },
    path?: any[]
  ): any
}
const getValueByValue: IGetValueByValue = (
  array,
  inputValue,
  keyMap,
  path = []
) => {
  const {
    inputKey = 'value',
    outputKey = 'label',
    childrenKey = 'children',
  } = keyMap || {}
  let outputValue: any
  if (isArr(array)) {
    if (isArr(inputValue)) {
      outputValue = inputValue.map((v) =>
        getValueByValue(array, v, keyMap, path)
      )
    } else {
      array.forEach((obj) => {
        if (outputValue === undefined) {
          const currentPath = [...path, obj?.[outputKey]]
          if (obj?.[inputKey] === inputValue) {
            outputValue = {
              leaf: obj?.[outputKey],
              whole: currentPath,
            }
          } else if (obj?.[childrenKey]?.length) {
            outputValue = getValueByValue(
              obj?.[childrenKey],
              inputValue,
              keyMap,
              currentPath
            )
          }
        }
      })
    }
    return outputValue
  }
  return undefined
}

const Input: React.FC<React.PropsWithChildren<InputProps>> = (props) => {
  const prefixCls = usePrefixCls('form-text', props)
  return (
    <div className={cls(prefixCls, props.className)}>
      {props.addonBefore}
      {props.innerBefore}
      {usePlaceholder(props.value)}
      {props.innerAfter}
      {props.addonAfter}
    </div>
  )
}

const Select: React.FC<React.PropsWithChildren<SelectProps>> = observer(
  (props) => {
    const field = useField<Field>()
    const prefixCls = usePrefixCls('form-text', props)
    const dataSource: any[] = field?.dataSource?.length
      ? field.dataSource
      : props?.dataSource?.length
      ? props.dataSource
      : []
    const placeholder = usePlaceholder()
    const getSelected = () => {
      const value = props.value
      if (props.mode === 'multiple' || props.mode === 'tag') {
        if (props.useDetailValue) {
          return isArr(value) ? value : []
        } else {
          return isArr(value)
            ? value.map((val) => ({ label: val, value: val }))
            : []
        }
      } else {
        if (props.useDetailValue) {
          return isValid(value) ? [value] : []
        } else {
          return isValid(value) ? [{ label: value, value }] : []
        }
      }
    }

    const getLabel = (target: any) => {
      return (
        dataSource?.find((item) => item.value == target?.value)?.label ||
        target.label ||
        placeholder
      )
    }

    const getLabels = () => {
      const selected = getSelected()
      if (!selected.length) return placeholder
      if (selected.length === 1) return getLabel(selected[0])
      return selected.map((item, key) => {
        return (
          <Tag type="primary" size="small" key={key}>
            {getLabel(item)}
          </Tag>
        )
      })
    }

    return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
  }
)

const TreeSelect: React.FC<React.PropsWithChildren<TreeSelectProps>> = observer(
  (props) => {
    const field = useField<Field>()
    const placeholder = usePlaceholder()
    const prefixCls = usePrefixCls('form-text', props)
    const dataSource = field?.dataSource?.length
      ? field.dataSource
      : props?.dataSource?.length
      ? props.dataSource
      : []
    const getSelected = () => {
      const value = props.value
      if (props.multiple) {
        if (props['useDetailValue']) {
          return isArr(value) ? value : []
        } else {
          return isArr(value)
            ? value.map((val) => ({ label: val, value: val }))
            : []
        }
      } else {
        if (props['useDetailValue']) {
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
      if (!selected?.length)
        return (
          <Tag type="primary" size="small">
            {placeholder}
          </Tag>
        )
      return selected.map(({ value, label }, key) => {
        return (
          <Tag type="primary" size="small" key={key}>
            {findLabel(value, dataSource) || label || placeholder}
          </Tag>
        )
      })
    }
    return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
  }
)

const Cascader: React.FC<React.PropsWithChildren<CascaderProps>> = observer(
  (props) => {
    const field = useField<Field>()
    const placeholder = usePlaceholder()
    const prefixCls = usePrefixCls('form-text', props)
    const dataSource: any[] = field?.dataSource?.length
      ? field.dataSource
      : props?.dataSource?.length
      ? props.dataSource
      : []
    const getSelected = () => {
      return props.multiple ? toArr(props.value) : [props.value]
    }
    const getLabels = () => {
      const selected = getSelected()
      const labels = getValueByValue(dataSource, selected)
        ?.filter((item) => isValid(item))
        ?.map((item) => item?.whole?.join('/'))
        .join(', ')
      return labels || placeholder
    }
    return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
  }
)

const DatePicker: React.FC<React.PropsWithChildren<DatePickerProps>> = (
  props
) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('form-text', props)
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
}

const DateRangePicker: React.FC<React.PropsWithChildren<DateRangePickerProps>> =
  (props) => {
    const placeholder = usePlaceholder()
    const prefixCls = usePrefixCls('form-text', props)
    const getLabels = () => {
      const labels = formatMomentValue(props.value, props.format, placeholder)
      return isArr(labels) ? labels.join('~') : labels
    }
    return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
  }

const TimePicker: React.FC<React.PropsWithChildren<TimePickerProps>> = (
  props
) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('form-text', props)
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
}

const TimePicker2: React.FC<React.PropsWithChildren<TimePicker2Props>> = (
  props
) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('form-text', props)
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
}

const TimeRangePicker2: React.FC<
  React.PropsWithChildren<TimeRangePicker2Props>
> = (props) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('form-text', props)
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
}

const Text = (props: React.PropsWithChildren<any>) => {
  const prefixCls = usePrefixCls('form-text', props)

  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {usePlaceholder(props.value)}
    </div>
  )
}

Text.Input = Input
Text.Select = Select
Text.TreeSelect = TreeSelect
Text.Cascader = Cascader
Text.DatePicker = DatePicker
Text.DateRangePicker = DateRangePicker
Text.TimePicker = TimePicker
Text.TimePicker2 = TimePicker2
Text.TimeRangePicker2 = TimeRangePicker2
Text.Placeholder = Placeholder
Text.usePlaceholder = usePlaceholder

export const PreviewText = Text

export default PreviewText
