import React, { useContext } from 'react'
import { isFn, isEqual } from '@formily/shared'
import { IPreviewTextProps, PreviewTextConfigProps } from './types'
import { PreviewTextContext } from './context'

export const PreviewText: React.FC<IPreviewTextProps> & {
  ConfigProvider: React.Context<PreviewTextConfigProps>['Provider']
} = props => {
  const context = useContext(PreviewTextContext) || {}
  let value: any
  if (props.dataSource && props.dataSource.length) {
    if (Array.isArray(props.value)) {
      value = props.value.map((val, index) => {
        const finded = props.dataSource.find(item => isEqual(item.value, val))
        if (finded) {
          return (
            <span key={index}>
              {finded.label}
              {index < props.value.length - 1 ? ' ,' : ''}
            </span>
          )
        }
      })
    } else {
      const fined = props.dataSource.find(item =>
        isEqual(item.value, props.value)
      )
      if (fined) {
        value = fined.label
      }
    }
  } else {
    if (Array.isArray(props.value)) {
      value = props.value.map((val, index) => {
        return (
          <span key={index}>
            {val}
            {index < props.value.length - 1 ? '~' : ''}
          </span>
        )
      })
    } else {
      value = String(
        props.value === undefined || props.value === null ? '' : props.value
      )
    }
  }
  const placeholder = isFn(context.previewPlaceholder)
    ? context.previewPlaceholder(props)
    : context.previewPlaceholder
  return (
    <p
      style={{ padding: 0, margin: 0 }}
      className={`preview-text ${props.className || ''}`}
    >
      {props.addonBefore ? ' ' + props.addonBefore : ''}
      {props.innerBefore ? ' ' + props.innerBefore : ''}
      {props.addonTextBefore ? ' ' + props.addonTextBefore : ''}
      {value === '' ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
        ? placeholder || 'N/A'
        : value}
      {props.addonTextAfter ? ' ' + props.addonTextAfter : ''}
      {props.innerAfter ? ' ' + props.innerAfter : ''}
      {props.addonAfter ? ' ' + props.addonAfter : ''}
    </p>
  )
}

PreviewText.ConfigProvider = PreviewTextContext.Provider
