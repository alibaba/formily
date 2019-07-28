import React from 'react'
import { Select } from '@alifd/next'
import styled from 'styled-components'
import { isFn } from '@uform/utils'
import MoveTo from 'moveto'
import { IConnectProps, IFieldProps } from '@uform/react'

export * from '@uform/utils'

const Text = styled(props => {
  let value
  if (props.dataSource && props.dataSource.length) {
    let find = props.dataSource.filter(({ value }) =>
      Array.isArray(props.value)
        ? props.value.indexOf(value) > -1
        : props.value === value
    )
    value = find.map(item => item.label).join(' , ')
  } else {
    value = Array.isArray(props.value)
      ? props.value.join(' ~ ')
      : String(
          props.value === undefined || props.value === null ? '' : props.value
        )
  }
  return (
    <div className={`${props.className} ${props.size || ''} text-field`}>
      {!value ? 'N/A' : value}
      {props.addonTextAfter ? ' ' + props.addonTextAfter : ''}
      {props.addonAfter ? ' ' + props.addonAfter : ''}
    </div>
  )
})`
  height: 28px;
  line-height: 28px;
  vertical-align: middle;
  font-size: 13px;
  color: #333;
  &.small {
    height: 20px;
    line-height: 20px;
  }
  &.large {
    height: 40px;
    line-height: 40px;
  }
`

export const acceptEnum = component => {
  return ({ dataSource, ...others }) => {
    if (dataSource) {
      return React.createElement(Select, { dataSource, ...others })
    } else {
      return React.createElement(component, others)
    }
  }
}

export const mapStyledProps = (
  props: IConnectProps,
  { loading, size, errors }: IFieldProps
) => {
  if (loading) {
    props.state = props.state || 'loading'
  } else if (errors && errors.length) {
    props.state = 'error'
  }
  if (size) {
    props.size = size
  }
}

export const mapTextComponent = (
  Target: React.ComponentClass,
  props,
  {
    editable,
    name
  }: { editable: boolean | ((name: string) => boolean); name: string }
): React.ComponentClass => {
  if (editable !== undefined) {
    if (isFn(editable)) {
      if (!editable(name)) {
        return Text
      }
    } else if (editable === false) {
      return Text
    }
  }
  return Target
}

export const compose = (...args) => {
  return (payload, ...extra) => {
    return args.reduce((buf, fn) => {
      return buf !== undefined ? fn(buf, ...extra) : fn(payload, ...extra)
    }, payload)
  }
}

export const moveTo = element => {
  if (!element) return
  if (element.scrollIntoView) {
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'start'
    })
  } else {
    new MoveTo().move(element.getBoundingClientRect().top)
  }
}
