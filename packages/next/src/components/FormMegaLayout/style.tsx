import { css } from 'styled-components'

const formatPx = num => (typeof num === 'string' ? num.replace('px', '') : num)
export const computeNextStyleBase = (props) => {
    const result: any = {}
    const {
        labelAlign,
        isLayout,
        inline,
        labelCol, grid, full, context = {}, contextColumns, columns, isRoot, autoRow,
        span, nested, size,
        // lg, m, s,
        responsive
    } = props
    const labelWidth = formatPx(props.labelWidth)
    const wrapperWidth = formatPx(props.wrapperWidth)
    const gutter = formatPx(props.gutter)
    const { lg, m, s } = responsive || {}

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
                margin-right: ${`${parseInt(gutter) / 2}px`};
                line-height: ${size === 'small' ? '20px' : ((size === 'middle' || !size) ? '28px' : '40px') };
                font-size: ${size === 'small' ? '12px' : ((size === 'middle' || !size) ? '14px' : '16px') };
            }

            > .mega-layout-container-after,
            > .formily-mega-item-after {
                flex: initial;
                margin-left: ${`${parseInt(gutter) / 2}px`};
                line-height: ${size === 'small' ? '20px' : ((size === 'middle' || !size) ? '28px' : '40px') };
                font-size: ${size === 'small' ? '12px' : ((size === 'middle' || !size) ? '14px' : '16px') };
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

    const gridContainerStyle = responsive ? `
        @media (max-width: 720px) {
            grid-template-columns: repeat(${autoRow ? s : 'auto-fit'}, minmax(100px, 1fr));
        }
        
        @media (min-width: 720px) and (max-width: 1200px) {
            grid-template-columns: repeat(${autoRow ? m : 'auto-fit'}, minmax(100px, 1fr));
        }
        @media (min-width: 1200px) {
            grid-template-columns: repeat(${autoRow ? lg : 'auto-fit'}, minmax(100px, 1fr));
        }
    ` : `
        grid-template-columns: repeat(${autoRow ? columns : 'auto-fit'}, minmax(100px, 1fr));
    `

    const minColumns = nested ? Math.min(columns, contextColumns) : columns
    const gridItemSpanStyle = responsive ? `
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
                        display: grid;
                        grid-column-gap: ${parseInt(gutter)}px;
                        grid-row-gap: ${parseInt(gutter)}px;

                        ${gridContainerStyle}
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
                ${gridItemSpanStyle}
            }
        `
    }

    // grid item
    if (!context.grid && grid && span) {
        result.gridItemStyle = `
        &.mega-layout-item-col { ${gridItemSpanStyle} }
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
                        display: grid;
                        grid-column-gap: ${parseInt(gutter)}px;
                        grid-row-gap: ${parseInt(gutter)}px;
                        
                        ${gridContainerStyle}
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
    `
}