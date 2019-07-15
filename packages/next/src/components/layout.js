import React, { Component, useEffect, useRef } from 'react'
import { createVirtualBox } from '@uform/react'
import { toArr } from '@uform/utils'
import { Row, Col } from '@alifd/next/lib/grid'
import Card from '@alifd/next/lib/card'
import { FormLayoutConsumer, FormItem, FormLayoutProvider } from '../form'
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
      <FormLayoutConsumer>
        {value => {
          let newValue = { ...value, ...props }
          let child =
            newValue.inline || newValue.className || newValue.style ? (
              <div
                className={cls(newValue.className, {
                  'next-form next-inline': !!newValue.inline
                })}
                style={newValue.style}
              >
                {children}
              </div>
            ) : (
              children
            )
          return (
            <FormLayoutProvider value={newValue}>{child}</FormLayoutProvider>
          )
        }}
      </FormLayoutConsumer>
    )
  }
)

export const FormLayoutItem = props =>
  React.createElement(
    FormLayoutConsumer,
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
          ...props
        },
        props.children
      )
    }
  )

export const FormItemGrid = createVirtualBox(
  'grid',
  class extends Component {
    renderFormItem(children) {
      const { title, help, name, extra, ...props } = this.props
      return React.createElement(
        FormLayoutItem,
        {
          label: title,
          noMinHeight: true,
          id: name,
          extra,
          help,
          ...props
        },
        children
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
          cols.push(parseInt(offset / lastSpan))
        }
      }

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
        contentHeight: 'auto'
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
    .next-card-body {
      padding-top: 30px;
      padding-bottom: 0 !important;
    }
  `
)

export const FormBlock = createVirtualBox(
  'block',
  styled(
    class extends Component {
      static defaultProps = {
        contentHeight: 'auto'
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
    .next-card-body {
      padding-top: 20px;
      padding-bottom: 0 !important;
    }
    &.next-card {
      border: none;
      padding: 0 15px;
      padding-bottom: 15px;
    }
  `
)

export const FormTextBox = createVirtualBox(
  'text-box',
  styled(
    ({
      title,
      help,
      gutter,
      className,
      text,
      name,
      extra,
      children,
      ...props
    }) => {
      const ref = useRef()
      const arrChildren = toArr(children)
      const split = text.split('%s')
      let index = 0
      useEffect(() => {
        if (ref.current) {
          const eles = ref.current.querySelectorAll('.text-box-field')
          eles.forEach(el => {
            const ctrl = el.querySelector(
              '.next-form-item-control>*:not(.next-form-item-space)'
            )
            if (ctrl) {
              el.style.width = getComputedStyle(ctrl).width
            }
          })
        }
      }, [])
      const newChildren = split.reduce((buf, item, key) => {
        return buf.concat(
          <span key={index++} className="text-box-words">
            {item}
          </span>,
          <div key={index++} className="text-box-field">
            {arrChildren[key]}
          </div>
        )
      }, [])

      if (!title)
        return (
          <div className={className} ref={ref}>
            {newChildren}
          </div>
        )

      return React.createElement(
        FormLayoutItem,
        {
          label: title,
          noMinHeight: true,
          id: name,
          extra,
          help,
          ...props
        },
        <div className={className} ref={ref}>
          {newChildren}
        </div>
      )
    }
  )`
    display: flex;
    .text-box-words {
      font-size: 12px;
      line-height: 28px;
      color: #333;
    }
    .text-box-field {
      display: inline-block;
      margin: 0 ${props => props.gutter || 10}px;
    }
  `
)
