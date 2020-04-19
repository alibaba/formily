import { css } from 'styled-components'

export const baseComputeStyle = (props) => {
    const result: any = {}
    const {
        labelAlign, gutter,
        isLayout,
        inline, autoRow,
        labelWidth, wrapperWidth,
        labelCol, grid
    } = props

    // label对齐相关 labelAlign
    result.labelAlignStyle = `
        & > .next-form-item-label {
            text-align: ${labelAlign !== 'top' ? labelAlign : 'left'};
        }
    `

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
                margin-right: ${`${parseInt(gutter) / 2}px`}
            }

            > .mega-layout-container-after,
            > .formily-mega-item-after {
                flex: initial;
                margin-left: ${`${parseInt(gutter) / 2}px`}
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
                    `flex: 1;`
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
            &:not(:last-child) {
                margin-right: ${gutter}px;
            }
        
            & > .next-form-item-label {
                display: inline-block;
            }
            & > .next-form-item-control {
                display: ${labelAlign !== 'top' ? 'inline-block' : 'block'};
            }
        `
    }

    // grid栅格模式
    if (grid) {
        result.gridStyle = `
            & > .next-form-item {
                width: 100%;
            }
        `
    }

    // 处理嵌套边距
    if (isLayout) {
        result.layoutMarginStyle = ''
        // 内容都在同一行
        if (inline || (grid && !autoRow)) {
            result.layoutMargin = `
                > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item-col > .mega-layout-item,
                > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item {
                    margin-bottom: 0;
                }
            `
        }

        // 栅格布局，自动换行
        if (grid && autoRow) {
            result.layoutMargin = `
                &.mega-layout-container {
                    margin-bottom: 0;
                }
            `
        }

        // 常规布局
        if (!grid && !inline) {
            result.layoutMargin = `
                > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item:last-child {
                    margin-bottom: 0;
                }
            `
        }
    }

    return result
}

export const computeStyle = (props) => {
    const styleResult = baseComputeStyle(props)
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
        ${styleResult.layoutMarginStyle}
    `
}

export default computeStyle