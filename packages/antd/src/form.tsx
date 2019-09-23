import React from 'react'
import classNames from 'classnames'
import { Row, Col, Popover, Icon } from 'antd'
import styled from 'styled-components'
import { registerFormWrapper, registerFieldMiddleware } from '@uform/react'
import { IFormItemProps, IFormProps } from '@uform/types'

import LOCALE from './locale'
import { isFn, moveTo, isStr, stringLength } from './utils'

/**
 * 轻量级 Form，不包含任何数据管理能力
 */

export const {
  Provider: FormLayoutProvider,
  Consumer: FormLayoutConsumer
} = React.createContext(undefined)

const normalizeCol = col => {
  return typeof col === 'object' ? col : { span: col }
}

const getParentNode = (node, selector) => {
  if (!node || (node && !node.matches)) {
    return
  }
  if (node.matches(selector)) {
    return node
  } else {
    return getParentNode(node.parentNode || node.parentElement, selector)
  }
}

const isPopDescription = (description, maxTipsNum = 30) => {
  if (isStr(description)) {
    return stringLength(description) > maxTipsNum
  } else {
    return React.isValidElement(description)
  }
}

export const FormItem = styled(
  class FormItem extends React.Component<IFormItemProps> {
    public static defaultProps = {
      prefix: 'ant-'
    }

    public render() {
      /* eslint-disable @typescript-eslint/no-unused-vars */
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
        maxTipsNum,
        required,
        type,
        schema,
        ...others
      } = this.props
      /* eslint-enable @typescript-eslint/no-unused-vars */
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

    private getItemLabel() {
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
        isTableColItem,
        maxTipsNum
      } = this.props

      if (!label || isTableColItem) {
        return null
      }

      const ele = (
        // @ts-ignore
        <label
          htmlFor={id}
          required={required}
          key="label"
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
            {isPopDescription(extra, maxTipsNum) && this.renderHelper()}
          </Col>
        )
      }

      return (
        <div className={cls}>
          {ele}
          {isPopDescription(extra, maxTipsNum) && this.renderHelper()}
        </div>
      )
    }

    private getItemWrapper() {
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
        isTableColItem,
        maxTipsNum
      } = this.props

      const message = (
        <div
          className={`${prefix}form-item-msg ${
            !noMinHeight ? `${prefix}form-item-space` : ''
          }`}
        >
          {help && <div className={`${prefix}form-item-help`}>{help}</div>}
          {!help && !isPopDescription(extra, maxTipsNum) && (
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
          <Col {...normalizeCol(wrapperCol)} key="item">
            {ele}
          </Col>
        )
      }

      return <React.Fragment>{ele}</React.Fragment>
    }

    private renderHelper() {
      return (
        <Popover placement="top" content={this.props.extra}>
          {/* TODO antd 没有 size 属性 */}
          <Icon
            type="question-circle"
            className={`${this.props.prefix}form-tips`}
          />
        </Popover>
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
      min-height: 18px;
      margin-bottom: 2px;
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
    font-size: 14px;
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

  class Form extends React.Component<IFormProps> {
    public static defaultProps = {
      component: 'form',
      prefix: 'ant-',
      size: 'default',
      labelAlign: 'left',
      layout: 'horizontal',
      locale: LOCALE,
      autoAddColon: true
    }

    public static displayName = 'SchemaForm'
    public static LOCALE = LOCALE
    private FormRef = React.createRef()

    public render() {
      const {
        className,
        inline,
        size,
        labelAlign,
        labelTextAlign,
        autoAddColon,
        children,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        labelCol,
        layout,
        wrapperCol,
        maxTipsNum,
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
        <FormLayoutProvider
          value={{
            labelAlign,
            labelTextAlign,
            labelCol,
            wrapperCol,
            maxTipsNum,
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
        </FormLayoutProvider>
      )
    }

    private validateFailedHandler(onValidateFailed) {
      return (...args) => {
        if (isFn(onValidateFailed)) {
          onValidateFailed(...args)
        }
        const container = this.FormRef.current as HTMLElement
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
    if (path.length === 0) {
      // 根节点是不需要包FormItem的
      return React.createElement(Field, props)
    }
    return React.createElement(
      FormLayoutConsumer,
      {},
      ({
        labelAlign,
        labelTextAlign,
        labelCol,
        maxTipsNum,
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
            maxTipsNum,
            wrapperCol,
            autoAddColon,
            size,
            required: editable === false ? false : required,
            ...schema['x-item-props'],
            label: schema.title,
            noMinHeight: schema.type === 'object' && !schema['x-component'],
            isTableColItem: isTableColItem(
              schemaPath.slice(0, schemaPath.length - 2),
              getSchema
            ),
            type: schema['x-component'] || schema.type,
            id: name,
            validateState: toArr(errors).length ? 'error' : undefined,
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
