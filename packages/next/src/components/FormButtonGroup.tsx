import React, { useRef } from 'react'
import { Grid } from '@alifd/next'
import Sticky from 'react-stikky'
import cls from 'classnames'
import styled from 'styled-components'
import { useDeepFormItem } from '../context'
import { IFormButtonGroupProps } from '../types'
import { createVirtualBox } from '@formily/react-schema-renderer'

const { Row, Col } = Grid

export interface IOffset {
  top: number | string
  right: number | string
  bottom: number | string
  left: number | string
}

const getAlign = align => {
  if (align === 'start' || align === 'end') return align
  if (align === 'left' || align === 'top') return 'flex-start'
  if (align === 'right' || align === 'bottom') return 'flex-end'
  return align
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
): boolean => {
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
  (props: React.PropsWithChildren<IFormButtonGroupProps>) => {
    const {
      span,
      zIndex,
      sticky,
      style,
      offset,
      className,
      children,
      triggerDistance,
      itemStyle
    } = props
    const { inline } = useDeepFormItem()
    const selfRef = useRef<HTMLDivElement>()
    const renderChildren = () => {
      return (
        <div className="button-group">
          <Row>
            <Col span={span}>
              <Col offset={offset} className="inline">
                <div className="inline-view" style={itemStyle}>
                  {children}
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      )
    }
    const getStickyBoundaryHandler = () => {
      return () => {
        if (selfRef.current && selfRef.current.parentElement) {
          const container = selfRef.current.parentElement
          return isElementInViewport(container.getBoundingClientRect())
        }
        return true
      }
    }

    const content = (
      <div
        className={cls(className, {
          'is-inline': !!inline
        })}
        style={style}
      >
        {renderChildren()}
      </div>
    )

    if (sticky) {
      return (
        <div ref={selfRef}>
          <Sticky
            edge="bottom"
            triggerDistance={triggerDistance}
            zIndex={zIndex}
            getStickyBoundary={getStickyBoundaryHandler()}
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
        </div>
      )
    }

    return content
  }
)`
  ${(props: IFormButtonGroupProps) =>
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

createVirtualBox<React.PropsWithChildren<IFormButtonGroupProps>>(
  'button-group',
  FormButtonGroup
)
