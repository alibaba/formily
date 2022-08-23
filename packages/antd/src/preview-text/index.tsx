import React, { createContext, useContext } from 'react'
import { isArr, toArr, isValid } from '@formily/shared'
import { Field } from '@formily/core'
import { observer, useField } from '@formily/react'
import { InputProps } from 'antd/lib/input'
import { InputNumberProps } from 'antd/lib/input-number'
import { SelectProps } from 'antd/lib/select'
import { TreeSelectProps } from 'antd/lib/tree-select'
import { CascaderProps, DefaultOptionType } from 'antd/lib/cascader'
import {
  DatePickerProps,
  RangePickerProps as DateRangePickerProps,
} from 'antd/lib/date-picker'
import { TimePickerProps, TimeRangePickerProps } from 'antd/lib/time-picker'
import { Tag, Space } from 'antd'
import cls from 'classnames'
import { formatMomentValue, usePrefixCls } from '../__builtins__'

const PlaceholderContext = createContext<React.ReactNode>('N/A')

const Placeholder = PlaceholderContext.Provider

const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || 'N/A'
  return isValid(value) && value !== '' ? value : placeholder
}

const Input: React.FC<React.PropsWithChildren<InputProps>> = (props) => {
  const prefixCls = usePrefixCls('form-text', props)
  return (
    <Space className={cls(prefixCls, props.className)} style={props.style}>
      {props.addonBefore}
      {props.prefix}
      {usePlaceholder(props.value)}
      {props.suffix}
      {props.addonAfter}
    </Space>
  )
}

const NumberPicker: React.FC<React.PropsWithChildren<InputNumberProps>> = (
  props
) => {
  const prefixCls = usePrefixCls('form-text', props)
  return (
    <Space className={cls(prefixCls, props.className)} style={props.style}>
      {props.addonBefore}
      {props.prefix}
      {usePlaceholder(
        props.formatter
          ? props.formatter(String(props.value), {
              userTyping: false,
              input: '',
            })
          : props.value
      )}
      {props['suffix']}
      {props.addonAfter}
    </Space>
  )
}

const Select: React.FC<React.PropsWithChildren<SelectProps<any>>> = observer(
  (props) => {
    const field = useField<Field>()
    const prefixCls = usePrefixCls('form-text', props)
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
          return isValid(value) ? [value] : []
        } else {
          return isValid(value) ? [{ label: value, value }] : []
        }
      }
    }

    const getLabel = (target: any) => {
      const labelKey = props.fieldNames?.label || 'label'
      return (
        dataSource?.find((item) => {
          const valueKey = props.fieldNames?.value || 'value'
          return item[valueKey] == target?.value
        })?.[labelKey] ||
        target.label ||
        placeholder
      )
    }

    const getLabels = () => {
      const selected = getSelected()
      if (!selected.length) return placeholder
      if (selected.length === 1) return getLabel(selected[0])
      return selected.map((item, key) => {
        return <Tag key={key}>{getLabel(item)}</Tag>
      })
    }
    return (
      <div className={cls(prefixCls, props.className)} style={props.style}>
        {getLabels()}
      </div>
    )
  }
)

const TreeSelect: React.FC<React.PropsWithChildren<TreeSelectProps<any>>> =
  observer((props) => {
    const field = useField<Field>()
    const placeholder = usePlaceholder()
    const prefixCls = usePrefixCls('form-text', props)
    const dataSource = field?.dataSource?.length
      ? field.dataSource
      : props?.treeData?.length
      ? props.treeData
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

    const findLabel = (
      value: any,
      dataSource: any[],
      treeNodeLabelProp?: string
    ) => {
      for (let i = 0; i < dataSource?.length; i++) {
        const item = dataSource[i]
        if (item?.value === value) {
          return item?.label ?? item[treeNodeLabelProp]
        } else {
          const childLabel = findLabel(value, item?.children, treeNodeLabelProp)
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
            {findLabel(value, dataSource, props.treeNodeLabelProp) ||
              label ||
              placeholder}
          </Tag>
        )
      })
    }
    return (
      <div className={cls(prefixCls, props.className)} style={props.style}>
        {getLabels()}
      </div>
    )
  })

const Cascader: React.FC<React.PropsWithChildren<CascaderProps<any>>> =
  observer((props) => {
    const field = useField<Field>()
    const placeholder = usePlaceholder()
    const prefixCls = usePrefixCls('form-text', props)
    const dataSource: any[] = field?.dataSource?.length
      ? field.dataSource
      : props?.options?.length
      ? props.options
      : []
    const findSelectedItem = (
      items: DefaultOptionType[],
      val: string | number
    ) => {
      return items.find((item) => item.value == val)
    }
    const findSelectedItems = (
      sources: DefaultOptionType[],
      selectedValues: Array<string[] | number[]>
    ): Array<any[]> => {
      return selectedValues.map((value) => {
        const result: Array<DefaultOptionType> = []
        let items = sources
        value.forEach((val) => {
          const selectedItem = findSelectedItem(items, val)
          result.push({
            label: selectedItem?.label ?? '',
            value: selectedItem?.value,
          })
          items = selectedItem?.children ?? []
        })
        return result
      })
    }
    const getSelected = () => {
      const val = toArr(props.value)
      // unified conversion to multi selection mode
      return props.multiple ? val : [val]
    }
    const getLabels = () => {
      const selected = getSelected()
      const values = findSelectedItems(dataSource, selected)
      const labels = values
        .map((val: Array<DefaultOptionType>) => {
          return val.map((item) => item.label).join('/')
        })
        .join(' ')
      return labels || placeholder
    }
    return (
      <div className={cls(prefixCls, props.className)} style={props.style}>
        {getLabels()}
      </div>
    )
  })

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

const DateRangePicker: React.FC<
  React.PropsWithChildren<DateRangePickerProps>
> = (props) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('form-text', props)
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  )
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
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  )
}

const TimeRangePicker: React.FC<
  React.PropsWithChildren<TimeRangePickerProps>
> = (props) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('form-text', props)
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  )
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
Text.TimeRangePicker = TimeRangePicker
Text.Placeholder = Placeholder
Text.usePlaceholder = usePlaceholder
Text.NumberPicker = NumberPicker

export const PreviewText = Text

export default PreviewText
