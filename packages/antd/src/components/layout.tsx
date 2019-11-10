import React, { Component, useLayoutEffect, useRef } from 'react'
import { createVirtualBox, createControllerBox } from '@uform/react'
import { toArr } from '@uform/utils'
import { IFormItemGridProps, IFormItemProps } from '@uform/types'
import { Card, Row, Col } from 'antd'
import styled from 'styled-components'
import cls from 'classnames'

import { FormLayoutConsumer, FormItem, FormLayoutProvider } from '../form'
import {
  IFormTextBox,
  IFormCardProps,
  IFormBlockProps,
  IFormLayoutProps,
  TFormCardOrFormBlockProps,
  IFormItemGridProps as IFormItemGridPropsAlias
} from '../type'

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

export const FormLayoutItem: React.FC<IFormItemProps> = function(props) {
  return React.createElement(
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
}

export const FormLayout = createVirtualBox<IFormLayoutProps>(
  'layout',
  ({ children, ...props }) => {
    return (
      <FormLayoutConsumer>
        {value => {
          const newValue = { ...value, ...props }
          const child =
            newValue.inline || newValue.className || newValue.style ? (
              <div
                className={cls(newValue.className, {
                  'ant-form ant-form-inline': !!newValue.inline
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

export const FormItemGrid = createVirtualBox<IFormItemGridPropsAlias>(
  'grid',
  class extends Component<IFormItemGridProps> {
    public render() {
      const { title } = this.props
      if (title) {
        return this.renderFormItem(this.renderGrid())
      } else {
        return this.renderGrid()
      }
    }

    private renderFormItem(children) {
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

    private renderGrid() {
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
      const childNum = children.length
      const cols = toArr(rawCols).map(col => normalizeCol(col))

      if (cols.length < childNum) {
        const offset: number = childNum - cols.length
        const lastSpan: number =
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

      // cols = toArr(cols).map(col => normalizeCol(col))

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
  }
)

export const FormCard = createVirtualBox<TFormCardOrFormBlockProps>(
  'card',
  styled(
    class extends Component<IFormCardProps> {
      public static defaultProps = {
        // bodyHeight: 'auto'
      }
      public render() {
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

export const FormBlock = createVirtualBox<TFormCardOrFormBlockProps>(
  'block',
  styled(
    class extends Component<IFormBlockProps> {
      public static defaultProps = {
        // bodyHeight: 'auto'
      }

      public render() {
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

export const FormTextBox = createControllerBox<IFormTextBox>(
  'text-box',
  styled(({ children, schema, className }) => {
    const { title, help, text, name, extra, ...props } = schema['x-props']
    const ref: React.RefObject<HTMLDivElement> = useRef()
    const arrChildren = toArr(children)
    const split = String(text).split('%s')
    useLayoutEffect(() => {
      if (ref.current) {
        const elements = ref.current.querySelectorAll('.text-box-field')
        const syncLayouts = Array.prototype.map.call(
          elements,
          (el: HTMLElement) => {
            return [
              el,
              () => {
                const ctrl = el.querySelector(
                  '.ant-form-item-control:first-child'
                )
                if (ctrl) {
                  el.style.width = ctrl.getBoundingClientRect().width + 'px'
                }
              }
            ]
          }
        )
        syncLayouts.forEach(([el, handler]) => {
          el.addEventListener('DOMSubtreeModified', handler)
        })

        return () => {
          syncLayouts.forEach(([el, handler]) => {
            el.removeEventListener('DOMSubtreeModified', handler)
          })
        }
      }
    }, [])

    let index = 0
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

    if (!title) {
      return (
        <div className={className} ref={ref}>
          {newChildren}
        </div>
      )
    }

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
      font-size: 14px;
      line-height: 34px;
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
