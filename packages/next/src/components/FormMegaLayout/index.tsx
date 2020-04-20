import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import classnames from 'classnames'
import { normalizeCol } from '../../shared'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Layout } from '@formily/react'
import styled from 'styled-components'
import { Form, Grid } from '@alifd/next'
import { computeStyle } from './style'

const { Row, Col } = Grid

const StyledLayoutItem = styled((props) => {

    const { children, addonBefore, addonAfter,
      grid, span, columns, gutter, className, autoRow, ...others } = props
    // const finalSpan = (24 / columns) * (span > columns ? columns : span)
    const cls = classnames({
      [className]: true,
      'mega-layout-item': true,
      'mega-layout-item-grid': grid
    });

    const finalFormItem = <Form.Item className={cls} {...others}>
      <div className="mega-layout-item-content">
        { addonBefore ? <p className="formily-mega-item-before">{addonBefore}</p> : null }
        {children}
        { addonAfter ? <p className="formily-mega-item-after">{addonAfter}</p> : null }
      </div>
    </Form.Item>

    if (grid) {
      const gutterNumber = parseInt(gutter)
      const halfGutterString = `${gutterNumber / 2}px`
      const style = {
        gridColumnStart: `span ${span}`
      };

      return <div className="mega-layout-item-col" style={style}>
        {finalFormItem}
      </div>
    }

    return finalFormItem
})`${props => computeStyle(props)}`


const StyledLayoutWrapper = styled((props) => {
    const { gutter, ...others } = props
    return <Form.Item {...others} />
})`${props => computeStyle(props)}`

const Div = props => <div {...props} />
const MegaLayout = styled(props => {
    const { responsive, children, ...others } = props

    return <Layout        
        defaultSettings={{
            gutter: 20,
        }}
        {...others}
        responsive={responsive}
        children={(layout) => {
            const { inline, required, span, columns, addonBefore, addonAfter, description, label, labelAlign,
                labelCol, wrapperCol, grid, gutter, autoRow,
                labelWidth, wrapperWidth, full,
                context,
            } = layout
            let Wrapper            
            const gutterNumber = parseInt(gutter)
            const halfGutterString = `${gutterNumber / 2}px`
            const itemProps: any = {
              inline,
              grid,
              autoRow,
              gutter,
              full,
              context,
              columns
            }
            const wrapperProps: any = {}
            if (grid) {
              Wrapper = Div // 一行
              wrapperProps.gutter = gutter // gutter
            } else {
              Wrapper = Div
            }            

            if (label) {
                if (labelCol !== -1) itemProps.labelCol = normalizeCol(labelCol)
                if (wrapperCol !== -1) itemProps.wrapperCol = normalizeCol(wrapperCol)
                if (labelWidth !== -1) itemProps.labelWidth = labelWidth
                if (wrapperWidth !== -1) itemProps.wrapperWidth = wrapperWidth
            }
            
            if (context.grid && grid) {
              itemProps.style = {
                gridColumnStart: `span ${span}`,
              }
            }

            let ele = <StyledLayoutWrapper
                className={classnames(props.className, 'mega-layout-container')}
                label={label}
                required={required}
                help={description}
                labelAlign={label ? labelAlign : undefined}
                {...itemProps}
            >
                <div className="mega-layout-container-wrapper">
                    { addonBefore ? <p className="mega-layout-container-before">{addonBefore}</p> : null }
                    <Wrapper {...wrapperProps} className={classnames('mega-layout-container-content', { grid })}>
                      {children}
                    </Wrapper>
                    { addonAfter ? <p className="mega-layout-container-after">{addonAfter}</p> : null }
                </div>
            </StyledLayoutWrapper>

            if (!props.grid && grid) {              
              const style = {
                paddingLeft: halfGutterString,
                paddingRight: halfGutterString,
              };
        
              return <div style={style}>
                {ele}
              </div>
            }
     
            return ele
        }}
    />
})`

`;

MegaLayout.Item = Layout.Item;

// TODO1: 把formItem里面的内容给收拢到这里
// TODO2: 把schema模式下的formItem里面的内容给收拢到这里
const MegaLayoutItem = (props) => {
  
}

export {
    MegaLayout,
    StyledLayoutItem,
    MegaLayout as default,
}
