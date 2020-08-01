import React from 'react'
import classnames from 'classnames'
import { Form } from 'antd'
import { createVirtualBox, Layout, LayoutItem, ILayoutProps } from '@formily/react-schema-renderer'
import styled from 'styled-components'
import { useDeepFormItem } from '../../context'
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

    let finalHelpInfo = null
    if (props.inset && formItemProps.validateStatus) {      
      finalHelpInfo = <div className="mega-layout-item-inset-help">
        {formItemProps.help[0]}
      </div>
    }

    const finalFormItem = (cls) => (<Form.Item className={cls} {...formItemProps}>
      <div className="mega-layout-item-content">
        { addonBefore ? <p className="formily-mega-item-before">{addonBefore}</p> : null }
        {children}
        { addonAfter ? <p className="formily-mega-item-after">{addonAfter}</p> : null }
      </div>
    </Form.Item>)

    if (grid) {
      return <div className={classnames({
        [cls]: true,
        'mega-layout-item-inset': props.inset,
        'mega-layout-item-inset-has-error': formItemProps.validateStatus === 'error',
        'mega-layout-item-inset-has-warning': formItemProps.validateStatus === 'warning',
      })}>
        {finalFormItem(className)}
        {finalHelpInfo}
      </div>
    }

    return finalFormItem(cls)
})`${props => computeStyle(props)}`


const StyledLayoutWrapper = styled((props) => {
    const formItemProps = pickFormItemProps(props);
    const { labelAlign, addonAfter, addonBefore, ...others } = formItemProps
    others.children = props.children
    others.className = props.className

    return <Form.Item {...others} />
})`${props => computeStyle(props)}`

const StyledLayoutNestWrapper = styled(props => {
  const { children, style, className } = props;
  return <div style={style} className={classnames('mega-layout-nest-container', className)}>{children}</div>
})`${props => computeStyle(props, true)}`


const MegaLayout = (props: ILayoutProps) => {
    const { children, addonBefore, addonAfter, description, className: megaLayoutClassName, ...others } = props
    const layoutProps = props.layoutProps || {}
    const { size } = useDeepFormItem()

    // 注意, labelCol/wrapperCol, labelWidth/wrapperWidth Layout只能透传下去
    // 自身的 labelCol/wrapperCol, labelWidth/wrapperWidth 必须通过其layoutProps来控制
    
    return <Layout        
        defaultSettings={{
            gutter: 20,
        }}
        {...others}
        size={size}
        children={(layout) => {
            const { inline, required, columns, label, labelAlign,
                grid, gutter, autoRow, span, contextColumns,
                full, context, isRoot, responsive, inset, hasBorder,
                enableSafeWidth,
            } = layout
            const isSecondary = context.isRoot
            const itemProps: any = {
              enableSafeWidth,
              isSecondary,
              inline,
              grid,
              autoRow,
              gutter,
              full,
              context,
              columns,
              contextColumns,
              isRoot,
              isLayout: true,    
              responsive,
              size,
              inset,
              hasBorder,
            }
            if (label) {
                // 只能通过layoutProps来改动当前MegaLayout的label/wrapper相关配置
                const labelWidth = computeAttr(layoutProps.labelWidth, context.labelWidth, -1)
                const wrapperWidth = computeAttr(layoutProps.wrapperWidth, context.wrapperWidth, -1)
                const labelCol = computeAttr(layoutProps.labelCol, context.labelCol, -1)
                const wrapperCol = computeAttr(layoutProps.wrapperCol, context.wrapperCol, -1)
                const labelAlign = computeAttr(layoutProps.labelAlign, context.labelAlign, -1)

                if (labelAlign) itemProps.labelAlign = labelAlign
                if (labelCol !== -1) itemProps.labelCol = normalizeCol(labelCol)
                if (wrapperCol !== -1) itemProps.wrapperCol = normalizeCol(wrapperCol)
                if (labelWidth !== -1) itemProps.labelWidth = labelWidth
                if (wrapperWidth !== -1) itemProps.wrapperWidth = wrapperWidth
            }
            let ele = <StyledLayoutWrapper
                className={classnames("mega-layout-container", megaLayoutClassName || '')}
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

            // 嵌套布局
            if (!props.grid && grid) {   
              return <StyledLayoutNestWrapper nested {...{span, columns, contextColumns, gutter, isSecondary, context, responsive}}>
                {ele}
              </StyledLayoutNestWrapper>
            }
     
            return ele
        }}
    />
};

const MegaLayoutItem = (props) => {
  const { children, schemaChildren, itemProps, ...others } = props
  const megaProps = (schemaChildren ? others['x-mega-props'] : others['mega-props']) || {}
  const isObjectField = others.type === 'object'

  return React.createElement(LayoutItem, megaProps, layoutProps => {
    const componentProps = pickNotFormItemProps(others)
    let schemaComponent = schemaChildren
    // 启用了MegaLayout
    if (layoutProps) {
      const { addonBefore, addonAfter } = megaProps
      const { columns, span, gutter, grid, inline, labelWidth, wrapperWidth, labelAlign, labelCol, wrapperCol, full,
        responsive, size, inset, hasBorder, context, enableSafeWidth
      } = layoutProps;

      const isSecondary = context.isRoot
      itemProps.isSecondary = isSecondary
      itemProps.hasBorder = hasBorder
      itemProps.inset = inset
      itemProps.labelAlign = labelAlign
      itemProps.inline = inline
      itemProps.grid = grid
      itemProps.gutter = gutter
      itemProps.span = span
      itemProps.columns = columns
      itemProps.full = full
      itemProps.enableSafeWidth = enableSafeWidth
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
          flex: '1 1 0%',
        }
      }

      if (size) {
        componentProps.size = size 
      }

      if (isObjectField) {
        const objectFieldProps = {...megaProps}
        objectFieldProps.label = itemProps.label
        return React.createElement(MegaLayout, objectFieldProps, 
          (schemaChildren ? children(schemaComponent) : children(componentProps)))
      }

      return React.createElement(StyledLayoutItem, itemProps, 
        (schemaChildren ? children(schemaComponent) : children(componentProps)))
    }

    // 没有启用MegaLayout, 保持和线上完全一致的功能。
    return children()
  })
}

const FormMegaLayout = createVirtualBox<Omit<ILayoutProps, 'children'> & { children: React.ReactNode }>('mega-layout', MegaLayout)

export {
    MegaLayout,
    MegaLayoutItem,
    FormMegaLayout,
}