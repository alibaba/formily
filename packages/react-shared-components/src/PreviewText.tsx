import React, { useContext, createContext } from 'react'
import { isFn } from '@uform/shared'
import { IPreviewTextProps } from './types'

export interface PreviewTextConfigProps {
  previewPlaceholder?: string | ((props: IPreviewTextProps) => string)
}

const PreviewTextContext = createContext<PreviewTextConfigProps>({})

export const PreviewText: React.FC<IPreviewTextProps> & {
  ConfigProvider: React.Context<PreviewTextConfigProps>['Provider']
} = props => {
  const context = useContext(PreviewTextContext) || {}
  let value: any
  if (props.dataSource && props.dataSource.length) {
    let find = props.dataSource.filter(({ value }) =>
      Array.isArray(props.value)
        ? props.value.some(val => val == value)
        : props.value == value
    )
    value = find.reduce((buf, item, index) => {
      return buf.concat(item.label, index < find.length - 1 ? ', ' : '')
    }, [])
  } else {
    value = Array.isArray(props.value)
      ? props.value.join(' ~ ')
      : String(
          props.value === undefined || props.value === null ? '' : props.value
        )
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
        : String(value)}
      {props.addonTextAfter ? ' ' + props.addonTextAfter : ''}
      {props.innerAfter ? ' ' + props.innerAfter : ''}
      {props.addonAfter ? ' ' + props.addonAfter : ''}
    </p>
  )
}

PreviewText.ConfigProvider = PreviewTextContext.Provider
