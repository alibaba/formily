import { useContext } from 'react'
import { LayoutContext } from '../context'
import { ILayoutProps, ILayoutItemProps } from '../types'

// 优先级：当前属性 > context 传递的属性 > 默认值
const computeAttr = (propAttr, layoutAttr, defaultValue) => {
    if (typeof propAttr !== 'undefined') return propAttr
    if (typeof layoutAttr !== 'undefined') return layoutAttr
    return defaultValue
};

export const useLayout = (props: ILayoutProps) => {
    const isLayout = props.isLayout || false
    const defaultSettings = props.defaultSettings || {}
    const context = useContext(LayoutContext)
    const enableLayout = Object.keys(context).length > 0
    const isRoot = isLayout && !enableLayout
    const autoRow = computeAttr(props.autoRow, context.autoRow, false)
    const flex = computeAttr(props.flex, context.flex, false)
    let columns = computeAttr(props.columns, context.columns, 3)
    const responsive = (props.responsive || context.contextResponsive) && {
        lg: computeAttr((props.responsive || {}).lg, (context.contextResponsive || {}).lg, columns),
        m: computeAttr((props.responsive || {}).m, (context.contextResponsive || {}).m, columns),
        s: computeAttr((props.responsive || {}).s, (context.contextResponsive || {}).s, columns)
    }
    const contextResponsive = responsive ? responsive : context.contextResponsive
    const size = computeAttr(props.size, context.size, undefined)
    const gutter = computeAttr(props.gutter, context.gutter, defaultSettings.gutter || 0)
    const hasBorder = computeAttr(props.hasBorder, context.hasBorder, true)
    const inset = computeAttr(props.inset, context.inset, false)
    const full = computeAttr(props.full, context.full, false)
    const labelAlign = computeAttr(props.labelAlign, context.labelAlign, 'right')
    const labelWidth = computeAttr(props.labelWidth, context.labelWidth, -1)
    const wrapperWidth = computeAttr(props.wrapperWidth, context.wrapperWidth, -1)
    const enableSafeWidth = computeAttr(props.enableSafeWidth, context.enableSafeWidth, true)
    let labelCol = computeAttr(props.labelCol, context.labelCol, -1)
    let wrapperCol = computeAttr(props.wrapperCol, context.wrapperCol, -1)
    const span = computeAttr(props.span, 1, 1)
    let grid = computeAttr(props.grid, context.grid, false)
    let inline = computeAttr(props.inline, context.inline, false)
    // inline 和 grid 是互斥关系，如果同时存在，需要根据props的优先级来判断, inline > grid
    if (grid && inline) {
        if (props.grid) {
            inline = false
            grid = true
        }
        if (props.inline) {
            grid = false
            inline = true
        }
    }

    // inline 和 labelCol 是互斥关系，如果inline存在，则labelCol和wrapperCol不生效
    if (inline && !isLayout) {
        labelCol = -1
        wrapperCol = -1
    }


    return {
        enableLayout,
        isRoot,
        isLayout,
        grid,
        inline,
        autoRow,
        flex,
        inset,
        hasBorder,
        columns,
        contextColumns: context.columns,
        full,
        labelWidth,
        wrapperWidth,
        labelCol,
        wrapperCol,
        labelAlign,
        gutter,
        span,
        context,
        responsive,
        contextResponsive,
        enableSafeWidth,
        size,
    }
}

export const useLayoutItem = (props: ILayoutItemProps) => {  
    // 如果外层有MegaLayou容器，则返回计算后的结构，反之则返回null代表不在MegaLayout模式下
    const layout = useLayout(props)
    const { enableLayout } = layout
    return enableLayout ? layout : null
}