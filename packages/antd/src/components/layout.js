import React, { Component } from 'react'
import { createVirtualBox } from '@uform/react'
import { toArr } from '@uform/utils'
import { Row, Col } from './grid'
import { Card } from 'antd'
import { FormConsumer, FormItem, FormProvider } from '../form'
import styled from 'styled-components'
import cls from 'classnames'

const normalizeCol = (col, _default = 0) => {
  if (!col) return _default
  return typeof col === 'object' ? col : { span: col }
}

export const FormLayout = createVirtualBox(
  'layout',
  ({ children, ...props }) => {
    return (
      <FormConsumer>
        {value => {
          let newValue = { ...value, ...props }
          let child =
            newValue.inline || newValue.className || newValue.style ? (
              <div
                className={cls(newValue.className, {
                  'ant-form ant-inline': !!newValue.inline
                })}
                style={newValue.style}
              >
                {children}
              </div>
            ) : (
              children
            )
          return <FormProvider value={newValue}>{child}</FormProvider>
        }}
      </FormConsumer>
    )
  }
)

export const FormItemGrid = createVirtualBox(
  'grid',
  class extends Component {
    renderFormItem(children) {
      const { title, description, name, help, extra, ...others } = this.props
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
              ...others,
              label: title,
              noMinHeight: true,
              id: name,
              extra: description,
              help
            },
            children
          )
        }
      )
    }

    renderGrid() {
      let {
        children,
        cols,
        title,
        description,
        help,
        extra,
        ...props
      } = this.props
      children = toArr(children)
      cols = toArr(cols).map(col => normalizeCol(col))
      const childNum = children.length

      if (cols.length < childNum) {
        let offset = childNum - cols.length
        let lastSpan =
          24 -
          cols.reduce((buf, col) => {
            return (
              buf +
              Number(col.span ? col.span : 0) +
              Number(col.offset ? col.offset : 0)
            )
          }, 0)
        for (let i = 0; i < offset; i++) {
          cols.push(parseInt(lastSpan / offset))
        }
      }
      cols = toArr(cols).map(col => normalizeCol(col))
      return (
        <Row {...props}>
          {children.reduce((buf, child, key) => {
            return child
              ? buf.concat(
                <Col key={key} {...cols[key]}>
                  {child}
                </Col>
              )
              : buf
          }, [])}
        </Row>
      )
    }

    render() {
      const { title } = this.props
      if (title) {
        return this.renderFormItem(this.renderGrid())
      } else {
        return this.renderGrid()
      }
    }
  }
)

export const FormCard = createVirtualBox(
  'card',
  styled(
    class extends Component {
      static defaultProps = {
        // bodyHeight: 'auto'
      }
      render() {
        const { children, className, ...props } = this.props
        return (
          <Card className={className} {...props}>
            {children}
          </Card>
        )
      }
    }
  )`
    margin-bottom: 30px;
    .ant-card-body {
      padding-top: 30px;
      padding-bottom: 0 !important;
    }
    &.ant-card {
      display: block;
      margin-bottom: 30px;
    }
  `
)

export const FormBlock = createVirtualBox(
  'block',
  styled(
    class extends Component {
      static defaultProps = {
        // bodyHeight: 'auto'
      }
      render() {
        const { children, className, ...props } = this.props
        return (
          <Card className={className} {...props}>
            {children}
          </Card>
        )
      }
    }
  )`
    margin-bottom: 0px;
    .ant-card-body {
      padding-top: 20px;
      padding-bottom: 0 !important;
    }
    &.ant-card {
      border: none;
      padding: 0 15px;
      padding-bottom: 15px;
      display: block;
      box-shadow: none;
    }
    .ant-card-head {
      padding: 0 !important;
      min-height: 24px;
      font-weight: normal;
    }
    .ant-card-head-title {
      padding: 0;
    }
  `
)
