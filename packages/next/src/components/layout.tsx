import React, { Component, useEffect, useRef } from 'react'
import { createVirtualBox, createControllerBox } from '@uform/react-schema-form'
import { toArr } from '@uform/shared'
import { Grid } from '@alifd/next'
import Card from '@alifd/next/lib/card'
import styled from 'styled-components'
import cls from 'classnames'
import { IFormItemGridProps, IFormItemProps } from '@uform/types'

import { FormLayoutConsumer, FormItem, FormLayoutProvider } from '../form'
import {
  IFormTextBox,
  IFormCardProps,
  IFormBlockProps,
  IFormLayoutProps,
  TFormCardOrFormBlockProps,
  IFormItemGridProps as IFormItemGridPropsAlias
} from '../type'

const { Row, Col } = Grid

const normalizeCol = (
  col: { span: number; offset?: number } | number,
  defaultValue: { span: number } = { span: 0 }
): { span: number; offset?: number } => {
  if (!col) {
    return defaultValue
  } else {
    return typeof col === 'object' ? col : { span: col }
  }
}

export const FormLayout = createVirtualBox<IFormLayoutProps>(
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

export const FormLayoutItem: React.FC<IFormItemProps> = props =>
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

export const FormItemGrid = createVirtualBox<IFormItemGridPropsAlias>(
  'grid',
  class extends Component<IFormItemGridProps> {
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
        } as IFormItemGridProps,
        children
      )
    }

    renderGrid() {
      const {
        children: rawChildren,
        cols: rawCols,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        title,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        description,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        help,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        extra,
        ...props
      } = this.props

      const children = toArr(rawChildren)
      const cols = toArr(rawCols).map(col => normalizeCol(col))
      const childNum = children.length

      if (cols.length < childNum) {
        let offset: number = childNum - cols.length
        let lastSpan: number =
          24 -
          cols.reduce((buf, col) => {
            return (
              buf +
              Number(col.span ? col.span : 0) +
              Number(col.offset ? col.offset : 0)
            )
          }, 0)
        for (let i = 0; i < offset; i++) {
          cols.push({ span: Math.floor(lastSpan / offset) })
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

export const FormCard = createVirtualBox<TFormCardOrFormBlockProps>(
  'card',
  styled(
    class extends Component<IFormCardProps> {
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

export const FormBlock = createVirtualBox<TFormCardOrFormBlockProps>(
  'block',
  styled(
    class extends Component<IFormBlockProps> {
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

export const FormTextBox = createControllerBox<IFormTextBox>(
  'text-box',
  styled(({ children, schema, className }) => {
    const { title, help, text, name, extra, ...props } = schema['x-props']
    const ref: React.RefObject<HTMLDivElement> = useRef()
    const arrChildren = toArr(children)
    const split = text.split('%s')
    let index = 0
    useEffect(() => {
      if (ref.current) {
        const eles = ref.current.querySelectorAll('.text-box-field')
        eles.forEach((el: HTMLElement) => {
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
        item ? (
          <span key={index++} className="text-box-words">
            {item}
          </span>
        ) : null,
        arrChildren[key] ? (
          <div key={index++} className="text-box-field">
            {arrChildren[key]}
          </div>
        ) : null
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
  })`
    display: flex;
    .text-box-words {
      font-size: 12px;
      line-height: 28px;
      color: #333;
      ${props => {
        const { editable, schema } = props
        const { gutter } = schema['x-props']
        if (!editable) {
          return {
            margin: 0
          }
        }
        return {
          margin: `0 ${gutter === 0 || gutter ? gutter : 10}px`
        }
      }}
    }
    .text-box-words:nth-child(1) {
      margin-left: 0;
    }
    .text-box-field {
      display: inline-block;
    }
  `
)
