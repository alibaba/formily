import { css } from 'styled-components'
import { EComponentSize, EPxType, PxValue, ELineHeightPx, EFontSizePx } from './types'
import insetStyle from './inset'
import { getIEGridContainerStyle, getIEGridItemStyle } from './ie'

const formatPx = num => (typeof num === 'string' ? num.replace('px', '') : num)

const getPxFromSize = function (size: EComponentSize = EComponentSize.MEDIUM, type: EPxType): PxValue {
    let lineSize = {
        [EComponentSize.SMALL]: ELineHeightPx.small,
        [EComponentSize.MEDIUM]: ELineHeightPx.medium,
        [EComponentSize.MIDDLE]: ELineHeightPx.middle,
        [EComponentSize.LARGE]: ELineHeightPx.large,
    }
    let fontSize = {
        [EComponentSize.SMALL]: EFontSizePx.small,
        [EComponentSize.MEDIUM]: EFontSizePx.medium,
        [EComponentSize.MIDDLE]: EFontSizePx.middle,
        [EComponentSize.LARGE]: EFontSizePx.large,
    }
    let defaultSize: EComponentSize = EComponentSize.MEDIUM
    let thisSize: {
        [key in EComponentSize]: PxValue
    } = type === EPxType.Font ? fontSize : lineSize

    return thisSize[size] || thisSize[defaultSize]
}

export const computeNextStyleBase = (props) => {
    const result: any = {}
    const {
        labelAlign,
        isLayout,
        isSecondary,
        inline,
        labelCol, grid, inset, context = {}, contextColumns, columns, hasBorder, autoRow,
        span, nested,
        // lg, m, s,
        responsive,
        enableSafeWidth,
    } = props
    const size: EComponentSize = props.size
    const labelWidth = formatPx(props.labelWidth)
    const wrapperWidth = formatPx(props.wrapperWidth)
    const gutter = formatPx(props.gutter)
    const { lg, m, s } = responsive || {}

    if (inset) {
        result.insetStyle = insetStyle({ hasBorder, isLayout })
    }
  
    // 嵌套不需要执行响应
    const disabledResponsive = context.grid && grid && context.responsive

    // label对齐相关 labelAlign
    result.labelAlignStyle = `
        & > .next-form-item-label {
            text-align: ${labelAlign !== 'top' ? labelAlign : 'left'};
        }        
    `

    if (labelAlign === 'top') {
        result.labelAlignStyle += `
            &.mega-layout-item {
                display: ${inline ? 'inline-block' : 'block'};
            }
        `
    }

    // 增量属性 addonBefore/addonAfter
    result.addonStyle = `
        & > .next-form-item-control > .mega-layout-container-wrapper,
        & > .next-form-item-control > .mega-layout-item-content {
            display: flex;
            > .mega-layout-container-content {
                margin-bottom: 0;
                flex: 1;
            }

            > .mega-layout-container-before,
            > .formily-mega-item-before {
                flex: initial;
                margin-right: ${parseInt(gutter) / 2}px;
                line-height: ${getPxFromSize(size, EPxType.Line)}px;
                font-size: ${getPxFromSize(size, EPxType.Font)}px;
            }

            > .mega-layout-container-after,
            > .formily-mega-item-after {
                flex: initial;
                margin-left: ${parseInt(gutter) / 2}px;
                line-height: ${getPxFromSize(size, EPxType.Line)}px;
                font-size: ${getPxFromSize(size, EPxType.Font)}px;
            }
        }
    `

    // 默认为flex布局
    if (labelAlign !== 'top' && !labelWidth && !labelCol) {
        result.defaultStyle = `
            display: flex;
            box-sizing: border-box;
        
            & > .next-form-item-label {
                flex: initial;
            }
            & > .next-form-item-control {
                flex: 1;
            }
        `
    }

    // 宽度模式
    if (labelWidth || wrapperWidth) {
        result.widthStyle = `
            display: flex;
            box-sizing: border-box;
            flex-direction: ${props.labelAlign !== 'top' ? 'row' : 'column'};
            
            & > .next-form-item-label{
                ${labelWidth ? `
                    width: ${labelWidth}px;
                    max-width: ${labelWidth}px;
                    flex: ${labelAlign !== 'top' ? `0 0 ${labelWidth}px` : 'initial'};
                    ` :
                ''
            }
            }

            & > .next-form-item-control {
                ${wrapperWidth ? `
                    width: ${wrapperWidth}px;
                    max-width: ${wrapperWidth}px;
                    flex: ${labelAlign !== 'top' ? `0 0 ${wrapperWidth}px` : 'initial'};
                    ` :
                `flex: 1;`
            }
            }
        `
    }

    // 行内模式
    if (inline) {
        result.inlineStyle = `
            display: inline-block;
            vertical-align: top;            
        
            & > .next-form-item-label {
                display: inline-block;
                vertical-align: top;
            }
            & > .next-form-item-control {
                display: ${labelAlign !== 'top' ? 'inline-block' : 'block'};
            }
        `

        if (!isLayout) {
            result.inlineStyle += `
                &:not(:last-child) {
                    margin-right: ${gutter}px;
                }
            `
        }
    }

    const gridContainerStyle = (nested?: boolean) => {
        // 保护宽度机制，即列数过多时，内容挤压严重，此时使用保底的100px作为最小宽度保护
        const frStyle = (!enableSafeWidth || nested) ? '1fr' : 'minmax(100px, 1fr)';
        const containerStyle = !disabledResponsive && responsive ? `
            @media (max-width: 720px) {
                grid-template-columns: repeat(${(!enableSafeWidth || autoRow) ? s : 'auto-fit'}, ${frStyle});
            }
            
            @media (min-width: 720px) and (max-width: 1200px) {
                grid-template-columns: repeat(${(!enableSafeWidth || autoRow) ? m : 'auto-fit'}, ${frStyle});
            }
            @media (min-width: 1200px) {
                grid-template-columns: repeat(${(!enableSafeWidth || autoRow) ? lg : 'auto-fit'}, ${frStyle});
            }
        ` : `
            grid-template-columns: repeat(${(!enableSafeWidth || autoRow) ? columns : 'auto-fit'}, ${frStyle});
        `

        return `
            display: grid;
            grid-column-gap: ${parseInt(gutter)}px;
            grid-row-gap: ${parseInt(gutter)}px;
            ${containerStyle}
            ${getIEGridContainerStyle({ gutter, autoRow })}
        `
    }

    const minColumns = nested ? Math.min(columns, contextColumns) : columns
    const gridItemSpanStyle = () => {
        const itemStyle = !disabledResponsive && responsive ? `
            @media (max-width: 720px) {
                grid-column-start: span ${s > span ? span : s};
            }
            @media (min-width: 720px) and (max-width: 1200px) {
                grid-column-start: span ${m > span ? span : m};
            }
            @media (min-width: 1200px) {
                grid-column-start: span ${lg > span ? span : lg};
            }
        `: `
            grid-column-start: span ${minColumns > span ? span : minColumns};
        `

        return `
            ${itemStyle}
            ${getIEGridItemStyle({
                nested,
                isSecondary,
                gutter,
                enableResponsive: !disabledResponsive && responsive,
                responsive,
                span,
                autoRow,
                columns: contextColumns || columns,
            })}
        `
    }

    // grid栅格模式
    if (!context.grid && grid) {
        result.gridStyle = `
            & > .next-form-item {
                width: 100%;
            }
            & > .next-form-item-control > .mega-layout-container-wrapper,
            & > .next-form-item-control > .mega-layout-item-content {
                display: flex;
                > .mega-layout-container-content {
                    &.grid {
                        ${gridContainerStyle()}
                    }
                }
            }
        `
    }

    if (nested) {
        result.nestLayoutItemStyle = `
            &.mega-layout-nest-container {
                > .mega-layout-container {
                    width: 100%;
                    margin-bottom: 0;
                }
                ${gridItemSpanStyle()}
            }
        `
    }

    // grid item
    if (!context.grid && grid && span) {
        result.gridItemStyle = `
        &.mega-layout-item-col { ${gridItemSpanStyle()} }
        `
    }

    // 嵌套grid布局
    if (context.grid && grid) {
        result.gridStyle = `
            & > .next-form-item {
                width: 100%;
            }
            & > .next-form-item-control > .mega-layout-container-wrapper,
            & > .next-form-item-control > .mega-layout-item-content {
                display: flex;
                > .mega-layout-container-content {
                    &.grid {
                        ${gridContainerStyle(true)}
                    }
                }
            }
        `
    }
    // 处理嵌套边距
    if (isLayout) {
        result.layoutMarginStyle = ''
        // 内容都在同一行
        if (inline || grid) {
            result.layoutMarginStyle = `
                > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item-col > .next-form-item,
                > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item-col > .mega-layout-item,
                > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item {
                    margin-bottom: 0;
                }
            `
        }

        // 常规布局
        if (!grid && !inline) {
            result.layoutMarginStyle = `
                > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item:last-child {
                    margin-bottom: 0;
                }
            `
        }

        if (isLayout) {
            result.layoutMarginStyle += `
                > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-container:last-child{
                    margin-bottom: 0;
                }
            `
        }
    }

    return result
}

export const computeStyle = (props) => {
    const styleResult = computeNextStyleBase(props)

    // labelAlign, addon 是任何布局模式都可以用到
    // inline 和 grid 是互斥关系, 优先级: inline > grid
    // 最终调用一次css计算方法，会自动筛去同位置不生效的代码

    return css`
        ${styleResult.labelAlignStyle}
        ${styleResult.addonStyle}
        ${styleResult.defaultStyle}
        ${styleResult.widthStyle}
        ${styleResult.inlineStyle}
        ${styleResult.gridStyle}
        ${styleResult.gridItemStyle}
        ${styleResult.nestLayoutItemStyle}
        ${styleResult.layoutMarginStyle}
        ${styleResult.insetStyle}
    `
}