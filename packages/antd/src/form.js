import React from 'react'
import { registerFormWrapper, registerFieldMiddleware } from '@uform/react'
import classNames from 'classnames'
import { Popover, Icon, Row, Col } from 'antd'
import LOCALE from './locale'
import styled from 'styled-components'
import { isFn, moveTo, isStr } from './utils'
import stringLength from 'string-length'
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

const isPopDescription = description => {
  if (isStr(description)) {
    return stringLength(description) > 20
  } else {
    return React.isValidElement(description)
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
        <label
          htmlFor={id}
          required={required}
          key='label'
          className={classNames({
            'no-colon': !autoAddColon
          })}
        >
          {label}
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
            {isPopDescription(extra) && this.renderHelper()}
          </Col>
        )
      }

      return (
        <div className={cls}>
          {ele}
          {isPopDescription(extra) && this.renderHelper()}
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
          {!help && !isPopDescription(extra) && (
            <div className={`${prefix}form-item-extra`}>{extra}</div>
          )}
        </div>
      )
      const ele = (
        <div className={`${prefix}form-item-control`}>
          {React.cloneElement(children, { size })}
          {message}
        </div>
      )
      if (
        (wrapperCol || labelCol) &&
        labelAlign !== 'top' &&
        !isTableColItem &&
        label
      ) {
        return (
          <Col {...normalizeCol(wrapperCol)} key='item'>
            {ele}
          </Col>
        )
      }

      return <React.Fragment>{ele}</React.Fragment>
    }

    renderHelper() {
      return (
        <Popover closable={false} placement='top' content={this.props.extra}>
          <Icon
            type='question-circle'
            className={`${this.props.prefix}form-tips`}
            size='small'
          />
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
  .ant-form-item-control-wrapper {
    line-height: 32px;
  }
  .ant-form-item-control {
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
      min-height: 20px;
      .ant-form-item-help,
      .ant-form-item-extra {
        margin-top: 0;
        line-height: 1.5;
      }
    }
  }
  .ant-form-tips {
    margin-left: -5px;
    margin-right: 10px;
    transform: translateY(1px);
  }
  .ant-form-item-extra {
    color: #888;
    font-size: 12px;
    line-height: 1.7;
  }
  .ant-col {
    padding-right: 0;
  }
  .ant-card-head {
    background: none;
  }
  .ant-form-item-label label {
    color: #666;
    font-size: 12px;
    &.no-colon:after {
      content: '';
    }
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
`

const toArr = val => (Array.isArray(val) ? val : val ? [val] : [])

registerFormWrapper(OriginForm => {
  OriginForm = styled(OriginForm)`
    &.ant-form-inline,
    .ant-form-inline {
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

    .ant-table {
      table {
        table-layout: auto;
      }
    }
  `

  class Form extends React.Component {
    static defaultProps = {
      component: 'form',
      prefix: 'ant-',
      size: 'default',
      labelAlign: 'left',
      layout: 'horizontal',
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
        layout,
        wrapperCol,
        style,
        prefix,
        ...others
      } = this.props
      const isInline = inline || layout === 'line'
      const formClassName = classNames({
        [`${prefix}form`]: true,
        [`${prefix}form-${isInline ? 'inline' : layout}`]: true,
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
            inline: isInline,
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
