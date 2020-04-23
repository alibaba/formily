import { css } from 'styled-components'

const computeAntdStyleBase = (props) => {
    const result: any = {}
    const {
        labelAlign, gutter,
        isLayout,
        inline,
        labelWidth, wrapperWidth,
        labelCol, grid, full, context = {}, columns, isRoot, autoRow,
        span, seed, size,
        // lg, m, s,
        responsive
    } = props
    const { lg, m, s } = responsive

    // label对齐相关 labelAlign
    result.labelAlignStyle = `
        & > .ant-form-item-label {
            text-align: ${labelAlign !== 'top' ? labelAlign : 'left'};
        }
    `

    // 增量属性 addonBefore/addonAfter
    result.addonStyle = `
        & > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper,
        & > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-item-content {
            display: flex;
            line-height: ${size === 'small' ? '24px' : ((size === 'middle' || !size) ? '32px' : '40px') };
            > .mega-layout-container-content {
                margin-bottom: 0;
                flex: 1;
            }

            > .mega-layout-container-before,
            > .formily-mega-item-before {
                flex: initial;
                margin-right: ${`${parseInt(gutter) / 2}px`};
                margin-bottom: 0;
                display: inline-flex;
                align-items: center;
                height: ${size === 'small' ? '24px' : ((size === 'middle' || !size) ? '32px' : '40px') };
            }

            > .mega-layout-container-after,
            > .formily-mega-item-after {
                flex: initial;
                margin-left: ${`${parseInt(gutter) / 2}px`};
                margin-bottom: 0;
                display: inline-flex;
                align-items: center;
                height: ${size === 'small' ? '24px' : ((size === 'middle' || !size) ? '32px' : '40px') };
            }
        }
    `

    // 默认为flex布局
    if (labelAlign !== 'top' && !labelWidth && !labelCol) {
        result.defaultStyle = `
            display: flex;
            box-sizing: border-box;
        
            & > .ant-form-item-label {
                flex: initial;
            }
            & > .ant-form-item-control {
                flex: 1;
            }
        `
    }

    if (labelAlign === 'top') {
        result.defaultStyle = `
            &.ant-form-item {
                display: block;
            }
        `
    }

    // 宽度模式
    if (labelWidth || wrapperWidth) {
        result.widthStyle = `
            display: flex;
            box-sizing: border-box;
            flex-direction: ${props.labelAlign !== 'top' ? 'row' : 'column'};
            
            & > .ant-form-item-label{
                ${labelWidth ? `
                    width: ${labelWidth}px;
                    max-width: ${labelWidth}px;
                    flex: ${labelAlign !== 'top' ? `0 0 ${labelWidth}px` : 'initial'};
                    ` : 
                    ''
                }
            }

            & > .ant-form-item-control {
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
            & {
                display: inline-block;
                vertical-align: top;

                > .ant-form-item-label {
                    display: inline-block;
                    vertical-align: top;
                }
                > .ant-form-item-control {
                    display: ${labelAlign !== 'top' ? 'inline-block' : 'block'};
                }
            }                  
        `

        if (!isLayout) {
            result.inlineStyle += `
                &.ant-form-item {
                    display: inline-block;
                    vertical-align: top;
                }
                &:not(:last-child) {
                    margin-right: ${gutter}px;
                }
            `
        }
    }

    // grid栅格模式
    if (!context.grid && grid) {
        result.gridStyle = `
            & > .ant-form-item {
                width: 100%;
            }
            & > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper,
            & > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-item-content {
                display: flex;
                > .mega-layout-container-content {
                    &.grid {
                        display: grid;
                        grid-column-gap: ${parseInt(gutter)}px;
                        grid-row-gap: ${parseInt(gutter)}px;

                        @media (max-width: 720px) {
                            grid-template-columns: repeat(${autoRow ? s : 'auto-fit'}, minmax(100px, ${full ? '1fr' : '200px'} ));
                        }
                        
                        @media (min-width: 720px ) and (max-width: 1200px ) {
                            grid-template-columns: repeat(${autoRow ? m : 'auto-fit'}, minmax(100px, ${full ? '1fr' : '200px'} ));
                        }
                        @media (min-width: 1200px ) {
                            grid-template-columns: repeat(${autoRow ? lg : 'auto-fit'}, minmax(100px, ${full ? '1fr' : '200px'} ));
                        }
                    }
                }
            }
        `
    }

    if (seed) {
        result.nestLayoutItemStyle = `
            &.mega-layout-nest-container.${seed} {
                .mega-layout-container {
                    width: 100%;
                    margin-bottom: 0;
                }

                @media (max-width: 720px) {
                    grid-column-start: span ${responsive.s > span ? span : responsive.s};
                }
                @media (min-width: 720px ) and (max-width: 1200px ) {
                    grid-column-start: span ${responsive.m > span ? span : responsive.m};
                }
                @media (min-width: 1200px ) {
                    grid-column-start: span ${responsive.lg > span ? span : responsive.lg};
                }
            }
        `
    }

    // grid item
    if (!context.grid && grid && span) {
        result.gridItemStyle = `
        &.mega-layout-item-col {
            @media (max-width: 720px) {
                grid-column-start: span ${s > span ? span : s};
            }
            @media (min-width: 720px ) and (max-width: 1200px ) {
                grid-column-start: span ${m > span ? span : m};
            }
            @media (min-width: 1200px ) {
                grid-column-start: span ${lg > span ? span : lg};
            }
        }
        `
    }

    // 嵌套grid布局
    if (context.grid && grid) {
        result.gridStyle = `
            & > .ant-form-item {
                width: 100%;
            }
            & > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper,
            & > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-item-content {
                display: flex;
                > .mega-layout-container-content {
                    &.grid {
                        display: grid;
                        // grid-template-columns: repeat(${columns}, 1fr);
                        grid-column-gap: ${parseInt(gutter)}px;
                        grid-row-gap: ${parseInt(gutter)}px;
                        @media (max-width: 720px) {
                            grid-template-columns: repeat(${s}, 1fr);
                        }
                        
                        @media (min-width: 720px ) and (max-width: 1200px ) {
                            grid-template-columns: repeat(${m}, 1fr);
                        }
                        @media (min-width: 1200px ) {
                            grid-template-columns: repeat(${lg}, 1fr);
                        }
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
                > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item-col > .mega-layout-item,
                > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item {
                    margin-bottom: 0;
                }
            `
        }

        // 常规布局
        if (!grid && !inline) {
            result.layoutMarginStyle = `
                > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item:last-child {
                    margin-bottom: 0;
                }
            `
        }

        if (isLayout) {
            result.layoutMarginStyle += `
                > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-container:last-child{
                    margin-bottom: 0;
                }
            `
        }
    }

    return result
}

export const computeStyle = (props) => {
    const styleResult = computeAntdStyleBase(props)
    
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