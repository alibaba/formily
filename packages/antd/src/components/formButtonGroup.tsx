import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from './grid'
import { FormLayoutConsumer } from '../form'
import { IFormButtonGroupProps } from '../type'
import Sticky from 'react-stikky'
import cls from 'classnames'
import styled from 'styled-components'

const getAlign = align => {
  if (align === 'start' || align === 'end') {
    return align
  }
  if (align === 'left' || align === 'top') {
    return 'flex-start'
  }
  if (align === 'right' || align === 'bottom') {
    return 'flex-end'
  }
  return align
}

export interface IOffset {
  top: number | string
  right: number | string
  bottom: number | string
  left: number | string
}

const isElementInViewport = (
  rect: ClientRect,
  {
    offset = 0,
    threshold = 0
  }: {
    offset?: IOffset | number
    threshold?: number
  } = {}
) => {
  const { top, right, bottom, left, width, height } = rect
  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  }

  const elementThreshold = {
    x: threshold * width,
    y: threshold * height
  }

  return (
    intersection.t >=
      ((offset as IOffset).top || (offset as number) + elementThreshold.y) &&
    intersection.r >=
      ((offset as IOffset).right || (offset as number) + elementThreshold.x) &&
    intersection.b >=
      ((offset as IOffset).bottom || (offset as number) + elementThreshold.y) &&
    intersection.l >=
      ((offset as IOffset).left || (offset as number) + elementThreshold.x)
  )
}

export const FormButtonGroup: React.FC<IFormButtonGroupProps> = styled(
  class FormButtonGroup extends Component<IFormButtonGroupProps> {
    public static defaultProps = {
      span: 24
    }

    private formNode: HTMLElement

    public render() {
      const { sticky, style, className } = this.props

      const content = (
        <FormLayoutConsumer>
          {({ inline } = {}) => (
            <div
              className={cls(className, {
                'is-inline': !!inline
              })}
              style={style}
            >
              {this.renderChildren()}
            </div>
          )}
        </FormLayoutConsumer>
      )

      if (sticky) {
        return (
          <div>
            <FormLayoutConsumer>
              {({ FormRef } = {}) => {
                if (!FormRef) {
                  return
                }
                return (
                  <Sticky
                    edge={'bottom'}
                    triggerDistance={this.props.triggerDistance}
                    zIndex={this.props.zIndex}
                    getStickyBoundary={this.getStickyBoundaryHandler(FormRef)}
                    style={{
                      borderTop: '1px solid #eee',
                      background: (style && style.background) || '#fff',
                      padding: (style && style.padding) || '8px 0'
                    }}
                  >
                    <div className={className} style={style}>
                      {content}
                    </div>
                  </Sticky>
                )
              }}
            </FormLayoutConsumer>
          </div>
        )
      }

      return content
    }

    private renderChildren() {
      const { children, itemStyle, offset, span } = this.props
      return (
        <div className={'button-group'}>
          <Row>
            <Col span={span}>
              <Col offset={offset} className={'inline'}>
                <div className={'inline-view'} style={itemStyle}>
                  {children}
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      )
    }

    private getStickyBoundaryHandler(ref) {
      return () => {
        // eslint-disable-next-line react/no-find-dom-node
        this.formNode = this.formNode || ReactDOM.findDOMNode(ref.current)
        if (this.formNode) {
          return isElementInViewport(this.formNode.getBoundingClientRect())
        }
        return true
      }
    }
  }
)`
  ${props =>
    props.align ? `display:flex;justify-content: ${getAlign(props.align)}` : ''}
  &.is-inline {
    display: inline-block;
    flex-grow: 3;
  }
  .button-group {
    .inline {
      display: inline-block;
      .inline-view {
        & > * {
          margin-right: 10px;
          margin-left: 0px;
          display: inline-block;
        }
        & > *:last-child {
          margin-right: 0 !important;
        }
      }
    }
  }
`
