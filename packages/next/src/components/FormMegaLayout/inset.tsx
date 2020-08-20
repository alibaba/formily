const insetStyle = (props) => {
    const result: any = {};


    result.borderStyle = `
        .next-form-item {
            display: flex;
        }
        ${props.hasBorder ? `
            .next-form-item {
                padding-left: 12px;
                border: 1px solid #D8D8D8;
                border-radius: 4px;
            }
        ` : `
            &.mega-layout-item .next-form-item {
                padding-left: 0;
                border: none;
            }
        `}
    `
    if (props.isLayout) {
        result.itemStyle = `
            .mega-layout-item-inset {
                flex-direction: column;
            }

            .mega-layout-item-inset-has-error {
                .mega-layout-item-inset-help {
                    color: red;
                }

                .next-form-item {
                    border-color: red;
                }
            }

            .mega-layout-item-inset-has-warning {
                .mega-layout-item-inset-help {
                    color: #FF6A00;
                }

                .next-form-item {
                    border-color: #FF6A00;
                }
            }

            .next-form-item-help {
                display: none;
            }
        `
        result.componentStyle = `
            .next-range-picker-trigger,
            .next-input {
                border: none;
            }
        `
    }    

    return `
        ${result.itemStyle || ''}
        ${result.componentStyle || ''}
        ${result.borderStyle || ''}
    `
}

export default insetStyle
