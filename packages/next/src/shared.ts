import React from 'react'
import { PreviewText } from '@formily/react-shared-components'
import {
  MergedFieldComponentProps,
  IConnectProps,
  getRegistry
} from '@formily/react-schema-renderer'
import { each, isArr } from '@formily/shared'
export * from '@formily/shared'

export const cloneChlildren = (children: any, props?: any) => {
  return React.isValidElement(children)
    ? React.cloneElement(children, {
        ...props,
        children: cloneChlildren(children.props['children'])
      })
    : isArr(children)
    ? children.map((child, key) => cloneChlildren(child, { key }))
    : children
}

export const autoScrollInValidateFailed = (formRef: any) => {
  if (formRef.current) {
    setTimeout(() => {
      const elements = formRef.current.querySelectorAll(
        '.next-form-item.has-error'
      )
      if (elements && elements.length) {
        if (!elements[0].scrollIntoView) return
        elements[0].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'center'
        })
      }
    }, 30)
  }
}

export const pickProps = (object: any, targets: string[]) => {
  const selected: any = {}
  const otherwise: any = {}
  each(object, (value: any, key: string) => {
    if (targets.includes(key)) {
      selected[key] = value
    } else {
      otherwise[key] = value
    }
  })
  return {
    selected,
    otherwise
  }
}

const NextFormItemProps = [
  'required',
  'prefix',
  'labelAlign',
  'hasFeedback',
  'labelCol',
  'wrapperCol',
  'label',
  'help',
  'labelTextAlign',
  'fullWidth',
  'extra',
  'size',
  'asterisk',
  'labelWidth',
  'device',
  'isPreview',
  'renderPreview',
  'validateState',
  'itemStyle',
  'itemClassName',
  'addonAfter'
]

export const pickFormItemProps = (props: any) => {
  const { selected } = pickProps(props, NextFormItemProps)
  if (!props.label && props.title) {
    selected.label = props.title
  }
  if (!props.help && props.description) {
    selected.help = props.description
  }
  if (selected.itemStyle) {
    selected.style = selected.itemStyle
    delete selected.itemStyle
  }
  if (selected.itemClassName) {
    selected.className = selected.itemClassName
    delete selected.itemClassName
  }
  return selected
}

export const pickNotFormItemProps = (props: any) => {
  return pickProps(props, NextFormItemProps).otherwise
}

export const mapTextComponent = (
  Target: React.JSXElementConstructor<any>,
  props: any,
  fieldProps: any = {}
): React.JSXElementConstructor<any> => {
  const { editable } = fieldProps
  if (editable !== undefined) {
    if (editable === false) {
      return getRegistry().previewText || PreviewText
    }
  }
  return Target
}

export const normalizeCol = (
  col: { span: number; offset?: number } | number,
  defaultValue?: { span: number }
): { span: number; offset?: number } => {
  if (!col) {
    return defaultValue
  } else {
    return typeof col === 'object' ? col : { span: Number(col) }
  }
}

export const mapStyledProps = (
  props: IConnectProps,
  fieldProps: MergedFieldComponentProps
) => {
  const { loading, errors, warnings } = fieldProps
  if (loading) {
    props.state = props.state || 'loading'
  } else if (errors && errors.length) {
    props.state = 'error'
  } else if (warnings && warnings.length) {
    props.state = 'warning'
  }
}
