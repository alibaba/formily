import React from 'react'
import classnames from 'classnames'
import { normalizeCol } from '../shared'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Layout } from '@formily/react'
import styled, { css } from 'styled-components'
import { Form, Grid } from '@alifd/next'

const { Row, Col } = Grid

const StyledLayoutItem = styled((props) => {
    const { grid, span, cols, gutter, className, autoRow, ...others } = props
    const finalSpan = (24 / cols) * span
    const cls = classnames({
      [className]: true,
      'mega-layout-item': true,
      'mega-layout-item-grid': grid
    });

    if (grid) {
      const gutterNumber = parseInt(gutter)
      const halfGutterString = `${gutterNumber / 2}px`
      const style = {
        paddingLeft: halfGutterString,
        paddingRight: halfGutterString,
      };

      return <Col className="mega-layout-item-col" span={finalSpan} style={style}>
        <Form.Item className={cls} {...others} />
      </Col>
    }
  
    return <Form.Item className={cls} {...others} />
  })`    
    & > .next-form-item-label {
      text-align: ${props => props.labelAlign !== 'top' ? props.labelAlign : 'left'};
    }
  
    ${props => (props.labelAlign !== 'top' && !props.labelWidth && !props.labelCol) && css`
      display: flex;
      box-sizing: border-box;
  
      & > .next-form-item-label {
        flex: initial;
      }
      & > .next-form-item-control {
        flex: 1;
      }
    `}
  
    ${props => (props.labelWidth || props.wrapperWidth) && css`
      display: flex;
      box-sizing: border-box;
      flex-direction: ${props.labelAlign !== 'top' ? 'row' : 'column'};
      
      & > .next-form-item-label,
      & > .next-form-item-control {
        flex: 1;
      }
    `}
  
    ${props => props.inline && css`
      display: inline-block;
      vertical-align: top;    
      &:not(:last-child) {
        margin-right: ${props.gutter}px;
      }
  
      & > .next-form-item-label {
        display: inline-block;
      }
      & > .next-form-item-control {
        display: ${props.labelAlign !== 'top' ? 'inline-block' : 'block'};
      }
    `}
  
    ${props => props.labelWidth && css`
      & > .next-form-item-label {
        width: ${props.labelWidth}px;
        max-width: ${props.labelWidth}px;
        flex: ${props.labelAlign !== 'top' ? `0 0 ${props.labelWidth}px` : 'initial'};
      }
    `}
  
    ${props => props.wrapperWidth && css`
      & > .next-form-item-control {
        width: ${props.wrapperWidth}px;
        max-width: ${props.wrapperWidth}px;
        flex: ${props.labelAlign !== 'top' ? `0 0 ${props.wrapperWidth}px` : 'initial'};
      }
    `}

    ${props => props.grid && css`
      & > .next-form-item {
        width: 100%;
      }
    `}
  `

// & > .next-form-item-control > .formily-mega-layout-content {
//   display: flex;
//   > .mega-layout-item {
//     margin-bottom: 0;
//     flex: 1;
//   }
// }
const StyledLayoutWrapper = styled((props) => {
    const { gutter, ...others } = props
    return <Form.Item {...others} />
})`
    & > .next-form-item-label {
        text-align: ${props => props.labelAlign !== 'top' ? props.labelAlign : 'left'};
    }

    ${props => (props.labelAlign !== 'top' && !props.labelWidth && !props.labelCol) && css`
      display: flex;
      box-sizing: border-box;
  
      & > .next-form-item-label {
        flex: initial;
      }
      & > .next-form-item-control {
        flex: 1;
      }
    `}

    ${props => (props.inline || (props.grid && !props.autoRow)) && css`
      > .next-form-item-control > .formily-mega-layout-content > .mega-layout-item-col > .mega-layout-item,
      > .next-form-item-control > .formily-mega-layout-content > .mega-layout-item {
        margin-bottom: 0;
      }
    `}

    ${props => props.grid && props.autoRow && css`
      &.formily-mega-layout {
        margin-bottom: 0;
      }
    `}
`

const Div = props => <div {...props} />
const MegaLayout = styled(props => {
    const { children, ...others } = props
    return <Layout
        defaultSettings={{
            gutter: 20,
        }}
        {...others}
        children={(layout) => {
            const { inline, required, span, cols, addonBefore, addonAfter, description, label, labelAlign,
                labelCol, wrapperCol, grid, gutter, autoRow,
                context,
            } = layout

            let Wrapper
            const itemProps: any = {
              inline,
              grid,
              autoRow,
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
            }

            let ele = <StyledLayoutWrapper
                className={classnames(props.className, 'formily-mega-layout')}
                label={label}
                required={required}
                help={description}
                labelAlign={label ? labelAlign : undefined}
                {...itemProps}
            >
                <Wrapper {...wrapperProps} className="formily-mega-layout-content">
                    {addonBefore}
                    {children}
                    {addonAfter}
                </Wrapper>
            </StyledLayoutWrapper>

            if (!props.grid && grid) {
              const gutterNumber = parseInt(gutter)
              const halfGutterString = `${gutterNumber / 2}px`
              const style = {
                paddingLeft: halfGutterString,
                paddingRight: halfGutterString,
              };

              const finalSpan = (24 / (context.cols || cols)) * (props.span || span)
              const cls = classnames({
                // 'mega-layout-item': true,
                // 'mega-layout-item-grid': grid
              });
        
              return <Col className={cls} span={finalSpan} style={style}>
                {ele}
              </Col>
            }
     
            return ele
        }}
    />
})`

`;

MegaLayout.Item = Layout.Item;
export {
    MegaLayout,
    StyledLayoutItem,
    MegaLayout as default,
}
