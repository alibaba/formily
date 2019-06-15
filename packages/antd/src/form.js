import React from 'react'
import { registerFormWrapper, registerFieldMiddleware } from '@uform/react'
import classNames from 'classnames'
import { Popover, Icon, Row, Col } from 'antd'
import LOCALE from './locale'
import styled from 'styled-components'
import { isFn, moveTo } from './utils'
/**
 * 轻量级 Form，不包含任何数据管理能力
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
      prefix: 'ant-'
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
        [`${prefix}${labelTextAlign}`]: !!labelTextAlign
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

      return (
        <div className={cls}>
          {ele}
          {((extra && extra.length > 20) || React.isValidElement(extra)) &&
            this.renderHelper()}
        </div>
      )
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
        prefix,
        noMinHeight,
        size,
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
        <Popover closable={false} placement='top' content={this.props.extra}>
          <Icon type='question-circle' size='small' />
        </Popover>
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
  margin-bottom: 0 !important;
  .ant-form-item-control {
    display: block;
    line-height: 32px;
  }
  &.field-table {
    .ant-form-item-control {
      overflow: auto;
    }
  }
  .antd-uploader {
    display: block;
  }
  .ant-form-item-msg {
    &.ant-form-item-space {
      min-height: 24px;
      .ant-form-item-help,
      .ant-form-item-extra {
        margin-top: 0;
        line-height: 1.5;
      }
    }
  }
  .ant-form-item-extra {
    color: #888;
    font-size: 12px;
    line-height: 1.7;
  }
  &.ant-form-item.ant-row {
    display: flex;
  }
  .ant-col {
    padding-right: 0;
  }
  .ant-card-head {
    background: none;
  }
  .ant-form-item-label label:after {
    content: '';
  }
  .ant-form-item-label label {
    color: #666;
    font-size: 12px;
  }
  ul {
    padding: 0;
    li {
      margin: 0;
      & + li {
        margin: 0;
      }
    }
  }
  .ant-left {
    text-align: left;
  }
  .ant-right {
    text-align: right;
  }
  .ant-center {
    text-align: center;
  }
`

const toArr = val => (Array.isArray(val) ? val : val ? [val] : [])

registerFormWrapper(OriginForm => {
  OriginForm = styled(OriginForm)`
    &.ant-inline,
    .ant-inline {
      display: flex;
      .rs-uform-content {
        margin-right: 15px;
      }
      .ant-form-item {
        display: inline-block;
        vertical-align: top;
      }
      .ant-form-item:not(:last-child) {
        margin-right: 20px;
      }
      .ant-form-item.ant-left .ant-form-item-control {
        display: inline-block;
        display: table-cell\0;
        vertical-align: top;
        line-height: 0;
      }
    }
    .ant-form-item-label {
      line-height: 32px;
      padding-right: 12px;
      text-align: right;
    }
    .ant-small {
      .ant-form-item-label {
        line-height: 24px;
      }
      .ant-radio-group,
      .ant-checkbox-group {
        line-height: 24px;
        min-height: 24px;
      }
    }
    .ant-large {
      .ant-form-item-label {
        line-height: 40px;
      }
      .ant-radio-group,
      .ant-checkbox-group {
        line-height: 40px;
        min-height: 40px;
      }
    }
    .ant-form-item-label label[required]:before {
      margin-right: 4px;
      content: '*';
      color: #ff3000;
    }
    .ant-form-item-help {
      margin-top: 4px;
      font-size: 12px;
      line-height: 1.5;
      color: #999;
    }
    .ant-form-item.has-error .ant-form-item-help {
      color: #ff3000;
    }
    .ant-radio-group,
    .ant-checkbox-group {
      line-height: 32px;
      & > label {
        margin-right: 15px;
      }
    }
    .ant-range {
      margin-top: 10px;
    }
    .ant-number-picker-normal {
      min-width: 62px;
      width: 100px;
      .ant-number-picker-input-wrap {
        width: calc(100% - 22px);
        .ant-number-picker-input {
          width: 100%;
          input {
            text-align: left;
            padding: 0 8px;
          }
        }
      }
    }
    .ant-table {
      table {
        table-layout: auto;
      }
    }
    .ant-rating-default {
      min-height: 30px;
      line-height: 30px;
    }
    .ant-rating-small {
      min-height: 24px;
      line-height: 24px;
    }
    .ant-rating-large {
      min-height: 40px;
      line-height: 40px;
    }
  `

  class Form extends React.Component {
    static defaultProps = {
      component: 'form',
      prefix: 'ant-',
      size: 'default',
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
          const errors = container.querySelectorAll('.ant-form-item-help')
          if (errors && errors.length) {
            const node = getParentNode(errors[0], '.ant-form-item')
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
        [`${prefix}form-${labelAlign}`]: !!labelAlign,
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

  Form.LOCALE = LOCALE

  return Form
})

const isTableColItem = (path, getSchema) => {
  const schema = getSchema(path)
  return schema && schema.type === 'array' && schema['x-component'] === 'table'
}

registerFieldMiddleware(Field => {
  return props => {
    const {
      name,
      errors,
      editable,
      path,
      required,
      schema,
      schemaPath,
      getSchema
    } = props
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
            label: schema.title,
            noMinHeight: schema.type === 'object' && !schema['x-component'],
            isTableColItem: isTableColItem(
              schemaPath.slice(0, schemaPath.length - 2),
              getSchema
            ),
            type: schema['x-component'] || schema['type'],
            id: name,
            validateState: toArr(errors).length ? 'error' : undefined,
            required: editable === false ? false : required,
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
