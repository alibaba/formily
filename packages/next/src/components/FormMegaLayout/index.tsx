import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import classnames from 'classnames'
import { normalizeCol, pickNotFormItemProps, pickFormItemProps } from '../../shared'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Layout } from '@formily/react'
import styled from 'styled-components'
import { Form, Grid } from '@alifd/next'
import { computeStyle } from './style'

const { Row, Col } = Grid

const StyledLayoutItem = styled((props) => {
    const { children, itemBefore, itemAfter,
      grid, span, columns, gutter, className, autoRow, ...others } = props

    const finalSpan = (24 / columns) * (span > columns ? columns : span)
    const cls = classnames({
      [className]: true,
      'mega-layout-item': true,
      'mega-layout-item-grid': grid
    });

    const finalFormItem = <Form.Item className={cls} {...others}>
      <div className="mega-layout-item-content">
        { itemBefore ? <p className="formily-mega-item-before">{itemBefore}</p> : null }
        {children}
        { itemAfter ? <p className="formily-mega-item-after">{itemAfter}</p> : null }
      </div>
    </Form.Item>    

    if (grid) {
      const gutterNumber = parseInt(gutter)
      const halfGutterString = `${gutterNumber / 2}px`
      const style = {
        paddingLeft: halfGutterString,
        paddingRight: halfGutterString,
      };

      return <Col className="mega-layout-item-col" span={finalSpan} style={style}>
        {finalFormItem}
      </Col>
    }
  
    return finalFormItem
})`${props => computeStyle(props)}`


const StyledLayoutWrapper = styled((props) => {
    const { gutter, ...others } = props
    return <Form.Item {...others} />
})`${props => computeStyle(props)}`

const Div = props => <div {...props} />
export const MegaLayout = styled(props => {
    const { responsive, children, ...others } = props

    return <Layout        
        defaultSettings={{
            gutter: 20,
        }}
        {...others}
        responsive={responsive}
        children={(layout) => {
            const { inline, required, span, columns, itemBefore, itemAfter, description, label, labelAlign,
                labelCol, wrapperCol, grid, gutter, autoRow,
                labelWidth, wrapperWidth,
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
              isLayout: true,       
            }
            const wrapperProps: any = {}
            if (grid) {
              Wrapper = Row
              wrapperProps.gutter = gutter
              wrapperProps.wrap = autoRow
            } else {
              Wrapper = Div
            }            

            if (label) {
                if (labelCol !== -1) itemProps.labelCol = normalizeCol(labelCol)
                if (wrapperCol !== -1) itemProps.wrapperCol = normalizeCol(wrapperCol)
                if (labelWidth !== -1) itemProps.labelWidth = labelWidth
                if (wrapperWidth !== -1) itemProps.wrapperWidth = wrapperWidth
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
                    { itemBefore ? <p className="mega-layout-container-before">{itemBefore}</p> : null }
                    <Wrapper {...wrapperProps} className="mega-layout-container-content">
                      {children}
                    </Wrapper>
                    { itemAfter ? <p className="mega-layout-container-after">{itemAfter}</p> : null }
                </div>
            </StyledLayoutWrapper>

            if (!props.grid && grid) {              
              const style = {
                paddingLeft: halfGutterString,
                paddingRight: halfGutterString,
              };

              const finalSpan = (24 / (context.columns || columns)) * (props.span || span)
        
              return <Col span={finalSpan} style={style}>
                {ele}
              </Col>
            }
     
            return ele
        }}
    />
})`

`;

const MegaLayoutItem = (props) => {
  const { children, schemaChildren, itemProps, ...others } = props;
  return <Layout.Item {...others}>
    {layoutProps => {
      const componentProps = pickNotFormItemProps(others)
      let schemaComponent = schemaChildren

      // 启用了MegaLayout
      if (layoutProps) {
        const { itemBefore, itemAfter } = others
        const { columns, span, gutter, grid, inline, labelWidth, wrapperWidth, labelAlign, labelCol, wrapperCol, full } = layoutProps;
        itemProps.labelAlign = labelAlign
        itemProps.inline = inline
        itemProps.grid = grid
        itemProps.gutter = gutter
        itemProps.span = span
        itemProps.columns = columns

        if (labelCol !== -1) itemProps.labelCol = normalizeCol(labelCol)
        if (wrapperCol !== -1) itemProps.wrapperCol = normalizeCol(wrapperCol)
        if (labelWidth !== -1) itemProps.labelWidth = labelWidth
        if (wrapperWidth !== -1) itemProps.wrapperWidth = wrapperWidth
        if (itemBefore) itemProps.itemBefore = itemBefore
        if (itemAfter) itemProps.itemAfter = itemAfter

        // 撑满即为组件宽度为100%
        if (full) {
          componentProps.style = {
            ...(componentProps.style || {}),
            width: '100%',
          }
          
          // 处理schema的组件，因为FormItem层面没法触及到真实的组件（schema-renderer控制真正的组件注入）
          // 因此这里改动的其实是Field
          if (schemaChildren) {
            schemaComponent = React.cloneElement(schemaChildren, {
              ...schemaChildren.props,
              props: {
                ...schemaChildren.props.props,
                ['x-component-props']: {
                  ...(schemaChildren.props.props['x-component-props'] || {}),
                  style: {
                    width: '100%',
                    ...(((schemaChildren.props.props['x-component-props'] || {}).style) || {}),                
                },
              }
            }})
          }          
        }
        
        return <StyledLayoutItem {...itemProps}>
          {schemaChildren ? children(schemaComponent) : children(componentProps)}
        </StyledLayoutItem>
      }

      // 没有启用MegaLayout, 保持和线上完全一致的功能。
      return children()
    }}
  </Layout.Item>
}

MegaLayout.Item = MegaLayoutItem;

export const FormMegaLayout = createVirtualBox('mega-layout', MegaLayout)

export default MegaLayout
