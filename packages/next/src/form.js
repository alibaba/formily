import React from 'react'
import { registerFormWrapper, registerFieldMiddleware } from '@uform/react'
import classNames from 'classnames'
import { ConfigProvider, Balloon, Icon } from '@alifd/next'
import { Row, Col } from '@alifd/next/lib/grid'
import LOCALE from './locale'
import styled from 'styled-components'
import { isFn, moveTo } from './utils'
/**
 * 轻量级Next Form，不包含任何数据管理能力
 *
 */

export const {
  Provider: FormProvider,
  Consumer: FormConsumer
} = React.createContext()

const normalizeCol = col => {
  return typeof col === 'object' ? col : { span: col }
}

const getParentNode = (node, selector) => {
  if (!node || (node && !node.matches)) return
  if (node.matches(selector)) return node
  else {
    return getParentNode(node.parentNode || node.parentElement, selector)
  }
}

export const FormItem = styled(
  class FormItem extends React.Component {
    static defaultProps = {
      prefix: 'next-'
    }

    getItemLabel() {
      const {
        id,
        required,
        label,
        labelCol,
        wrapperCol,
        prefix,
        extra,
        labelAlign,
        labelTextAlign,
        autoAddColon,
        isTableColItem
      } = this.props

      if (!label || isTableColItem) {
        return null
      }

      const ele = (
        <label htmlFor={id} required={required} key='label'>
          {label}
          {label === ' ' ? '' : autoAddColon ? '：' : ''}
        </label>
      )

      const cls = classNames({
        [`${prefix}form-item-label`]: true,
        [`${prefix}left`]: labelTextAlign === 'left'
      })

      if ((wrapperCol || labelCol) && labelAlign !== 'top') {
        return (
          <Col {...normalizeCol(labelCol)} className={cls}>
            {ele}
            {((extra && extra.length > 20) || React.isValidElement(extra)) &&
              this.renderHelper()}
          </Col>
        )
      }

      return <div className={cls}>{ele}</div>
    }

    getItemWrapper() {
      const {
        labelCol,
        wrapperCol,
        children,
        extra,
        label,
        labelAlign,
        help,
        size,
        prefix,
        noMinHeight,
        isTableColItem
      } = this.props

      const message = (
        <div
          className={`${prefix}form-item-msg ${
            !noMinHeight ? `${prefix}form-item-space` : ''
          }`}
        >
          {help && <div className={`${prefix}form-item-help`}>{help}</div>}
          {!help && extra && extra.length <= 20 && (
            <div className={`${prefix}form-item-extra`}>{extra}</div>
          )}
        </div>
      )
      if (
        (wrapperCol || labelCol) &&
        labelAlign !== 'top' &&
        !isTableColItem &&
        label
      ) {
        return (
          <Col
            {...normalizeCol(wrapperCol)}
            className={`${prefix}form-item-control`}
            key='item'
          >
            {React.cloneElement(children, { size })}
            {message}
          </Col>
        )
      }

      return (
        <div className={`${prefix}form-item-control`}>
          {React.cloneElement(children, { size })}
          {message}
        </div>
      )
    }

    renderHelper() {
      return (
        <Balloon
          closable={false}
          align='t'
          trigger={<Icon type='help' size='small' />}
        >
          {this.props.extra}
        </Balloon>
      )
    }

    render() {
      const {
        className,
        labelAlign,
        labelTextAlign,
        style,
        prefix,
        wrapperCol,
        labelCol,
        size,
        help,
        extra,
        noMinHeight,
        isTableColItem,
        validateState,
        autoAddColon,
        required,
        type,
        schema,
        ...others
      } = this.props

      const itemClassName = classNames({
        [`${prefix}form-item`]: true,
        [`${prefix}${labelAlign}`]: labelAlign,
        [`has-${validateState}`]: !!validateState,
        [`${prefix}${size}`]: !!size,
        [`${className}`]: !!className,
        [`field-${type}`]: !!type
      })

      // 垂直模式并且左对齐才用到
      const Tag = (wrapperCol || labelCol) && labelAlign !== 'top' ? Row : 'div'
      const label = labelAlign === 'inset' ? null : this.getItemLabel()

      return (
        <Tag {...others} gutter={0} className={itemClassName} style={style}>
          {label}
          {this.getItemWrapper()}
        </Tag>
      )
    }
  }
)`
  margin-bottom: 6px;
  &.field-table {
    .next-form-item-control {
      overflow: auto;
    }
  }
  .next-form-item-msg {
    &.next-form-item-space {
      min-height: 20px;
      .next-form-item-help,
      .next-form-item-extra {
        margin-top: 0;
      }
    }
  }
  .next-form-item-extra {
    color: #888;
    font-size: 12px;
    line-height: 1.7;
  }
`

const toArr = val => (Array.isArray(val) ? val : val ? [val] : [])

const hasRequired = schema => {
  if (schema.required) return true
  if (schema['x-rules'] && schema['x-rules'].required) return true
  return toArr(schema['x-rules']).some(v => v && v.required)
}

registerFormWrapper(OriginForm => {
  OriginForm = styled(OriginForm)`
    &.next-inline {
      display: flex;
      .rs-uform-content {
        margin-right: 15px;
      }
    }
    .next-radio-group,
    .next-checkbox-group {
      line-height: 28px;
      & > label {
        margin-right: 8px;
      }
    }
    .next-small {
      .next-radio-group,
      .next-checkbox-group {
        line-height: 20px;
      }
    }
    .next-small {
      .next-radio-group,
      .next-checkbox-group {
        line-height: 40px;
      }
    }
    .next-card-head {
      background: none;
    }
    .next-rating-medium {
      min-height: 28px;
      line-height: 28px;
    }
    .next-rating-small {
      min-height: 20px;
      line-height: 20px;
    }
    .next-rating-large {
      min-height: 40px;
      line-height: 40px;
    }
  `

  return ConfigProvider.config(
    class Form extends React.Component {
      static defaultProps = {
        component: 'form',
        prefix: 'next-',
        size: 'medium',
        labelAlign: 'left',
        locale: LOCALE,
        autoAddColon: true
      }

      static displayName = 'SchemaForm'

      FormRef = React.createRef()

      validateFailedHandler(onValidateFailed) {
        return (...args) => {
          if (isFn(onValidateFailed)) {
            onValidateFailed(...args)
          }
          const container = this.FormRef.current
          if (container) {
            const errors = container.querySelectorAll('.next-form-item-help')
            if (errors && errors.length) {
              const node = getParentNode(errors[0], '.next-form-item')
              if (node) {
                moveTo(node)
              }
            }
          }
        }
      }

      render() {
        const {
          className,
          inline,
          size,
          labelAlign,
          labelTextAlign,
          autoAddColon,
          children,
          component,
          labelCol,
          wrapperCol,
          style,
          prefix,
          ...others
        } = this.props
        const formClassName = classNames({
          [`${prefix}form`]: true,
          [`${prefix}inline`]: inline, // 内联
          [`${prefix}${size}`]: size,
          [className]: !!className
        })
        return (
          <FormProvider
            value={{
              labelAlign,
              labelTextAlign,
              labelCol,
              wrapperCol,
              inline,
              size,
              autoAddColon,
              FormRef: this.FormRef
            }}
          >
            <OriginForm
              {...others}
              formRef={this.FormRef}
              onValidateFailed={this.validateFailedHandler(
                others.onValidateFailed
              )}
              className={formClassName}
              style={style}
            >
              {children}
            </OriginForm>
          </FormProvider>
        )
      }
    }
  )
})

const isTableColItem = (path, getSchema) => {
  const schema = getSchema(path)
  return schema && schema.type === 'array' && schema['x-component'] === 'table'
}

registerFieldMiddleware(Field => {
  return props => {
    const { name, editable, errors, path, schema, getSchema } = props
    if (path.length === 0) return React.createElement(Field, props) // 根节点是不需要包FormItem的
    return React.createElement(
      FormConsumer,
      {},
      ({
        labelAlign,
        labelTextAlign,
        labelCol,
        wrapperCol,
        size,
        autoAddColon
      }) => {
        return React.createElement(
          FormItem,
          {
            labelAlign,
            labelTextAlign,
            labelCol,
            wrapperCol,
            autoAddColon,
            size,
            ...schema['x-item-props'],
            label:
              schema.title || (schema['x-props'] && schema['x-props'].title),
            noMinHeight: schema.type === 'object',
            isTableColItem: isTableColItem(
              path.slice(0, path.length - 2),
              getSchema
            ),
            type: schema['x-component'] || schema['type'],
            id: name,
            validateState: toArr(errors).length ? 'error' : undefined,
            required: editable === false ? false : hasRequired(schema),
            extra: schema.description,
            help:
              toArr(errors).join(' , ') ||
              (schema['x-item-props'] && schema['x-item-props'].help)
          },
          React.createElement(Field, props)
        )
      }
    )
  }
})
