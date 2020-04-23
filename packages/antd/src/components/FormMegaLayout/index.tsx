import React from 'react'
import classnames from 'classnames'
import { Form } from 'antd'
import { Layout, LayoutItem } from '@formily/react-shared-components'
import { createVirtualBox } from '@formily/react-schema-renderer'
import styled from 'styled-components'
import { normalizeCol, pickFormItemProps, pickNotFormItemProps } from '../../shared'
import { computeStyle } from './style'

// 优先级：当前属性 > context 传递的属性 > 默认值
const computeAttr = (propAttr, layoutAttr, defaultValue) => {
  if (typeof propAttr !== 'undefined') return propAttr
  if (typeof layoutAttr !== 'undefined') return layoutAttr
  return defaultValue
};

const StyledLayoutItem = styled((props) => {
    const { className, grid, children, addonBefore, addonAfter, labelAlign, ...others } = props
    const formItemProps = pickFormItemProps(others)
    const cls = classnames({
      [className]: true,
      'mega-layout-item': true,
      'mega-layout-item-col': grid,
    });

    const finalFormItem = <Form.Item className={cls} {...formItemProps}>
      <div className="mega-layout-item-content">
        { addonBefore ? <p className="formily-mega-item-before">{addonBefore}</p> : null }
        {children}
        { addonAfter ? <p className="formily-mega-item-after">{addonAfter}</p> : null }
      </div>
    </Form.Item>

    if (grid) {
      return <div className={cls}>
        {finalFormItem}
      </div>
    }

    return finalFormItem
})`${props => computeStyle(props)}`


const StyledLayoutWrapper = styled((props) => {
    const formItemProps = pickFormItemProps(props);
    const { labelAlign, addonAfter, addonBefore, ...others } = formItemProps
    others.children = props.children
    others.className = props.className

    return <Form.Item {...others} />
})`${props => computeStyle(props)}`

const StyledLayoutNestWrapper = styled(props => {
  const { children, seed, style, className } = props;
return <div style={style} className={classnames('mega-layout-nest-container', className, seed)}>{children}</div>
})`${props => computeStyle(props)}`

const MegaLayout = (props => {
    const { children, addonBefore, addonAfter, description, ...others } = props
    const layoutProps = props.layoutProps || {}

    // 注意, labelCol/wrapperCol, labelWidth/wrapperWidth Layout只能透传下去
    // 自身的 labelCol/wrapperCol, labelWidth/wrapperWidth 必须通过其layoutProps来控制
    
    return <Layout        
        defaultSettings={{
            gutter: 20,
        }}
        {...others}
        children={(layout) => {
            const { inline, required, columns, label, labelAlign,
                grid, gutter, autoRow, span,
                full, context, isRoot, responsive
            } = layout
            const itemProps: any = {
              inline,
              grid,
              autoRow,
              gutter,
              full,
              context,
              columns,   
              isRoot,
              isLayout: true,    
              responsive
            }

            if (label) {
                // 只能通过layoutProps来改动当前MegaLayout的label/wrapper相关配置
                const labelWidth = computeAttr(layoutProps.labelWidth, context.labelWidth, -1)
                const wrapperWidth = computeAttr(layoutProps.wrapperWidth, context.wrapperWidth, -1)
                const labelCol = computeAttr(layoutProps.labelCol, context.labelCol, -1)
                const wrapperCol = computeAttr(layoutProps.wrapperCol, context.wrapperCol, -1)

                if (labelCol !== -1) itemProps.labelCol = normalizeCol(labelCol)
                if (wrapperCol !== -1) itemProps.wrapperCol = normalizeCol(wrapperCol)
                if (labelWidth !== -1) itemProps.labelWidth = labelWidth
                if (wrapperWidth !== -1) itemProps.wrapperWidth = wrapperWidth
            }

            let ele = <StyledLayoutWrapper
                className="mega-layout-container"
                label={label}
                required={required}
                help={description}
                labelAlign={label ? labelAlign : undefined}
                {...itemProps}
            >
                <div className="mega-layout-container-wrapper">
                    { addonBefore ? <p className="mega-layout-container-before">{addonBefore}</p> : null }
                    <div className={classnames('mega-layout-container-content', { grid })}>
                      {children}
                    </div>
                    { addonAfter ? <p className="mega-layout-container-after">{addonAfter}</p> : null }
                </div>
            </StyledLayoutWrapper>

            if (!props.grid && grid) {   
              const seed = `nest-${Date.now()}`;
              return <StyledLayoutNestWrapper seed={seed} {...{span, columns, context, responsive}}>
                {ele}
              </StyledLayoutNestWrapper>
            }
     
            return ele
        }}
    />
});

const MegaLayoutItem = (props) => {
  const { children, schemaChildren, itemProps, ...others } = props;
  const megaProps = (schemaChildren ? others['x-mega-props'] : others['mega-props']) || {}
  return <LayoutItem {...megaProps}>
    {layoutProps => {
      const componentProps = pickNotFormItemProps(others)
      let schemaComponent = schemaChildren
      // 启用了MegaLayout
      if (layoutProps) {
        const { addonBefore, addonAfter } = megaProps
        const { columns, span, gutter, grid, inline, labelWidth, wrapperWidth, labelAlign, labelCol, wrapperCol, full,
         responsive
        } = layoutProps;
        itemProps.labelAlign = labelAlign
        itemProps.inline = inline
        itemProps.grid = grid
        itemProps.gutter = gutter
        itemProps.span = span
        itemProps.columns = columns
        itemProps.full = full
        itemProps.responsive = responsive

        if (labelCol !== -1) itemProps.labelCol = normalizeCol(labelCol)
        if (wrapperCol !== -1) itemProps.wrapperCol = normalizeCol(wrapperCol)
        if (labelWidth !== -1) itemProps.labelWidth = labelWidth
        if (wrapperWidth !== -1) itemProps.wrapperWidth = wrapperWidth
        if (addonBefore) itemProps.addonBefore = addonBefore
        if (addonAfter) itemProps.addonAfter = addonAfter

        // 撑满即为组件宽度为100%, flex: 1
        if (full) {
          componentProps.style = {
            ...(componentProps.style || {}),
            width: '100%',
            flex: 1,
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
                    ...componentProps.style,
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
  </LayoutItem>
}

const FormMegaLayout = createVirtualBox('mega-layout', MegaLayout)

export {
    MegaLayout,
    MegaLayoutItem,
    FormMegaLayout,
}