const insetStyle = (props) => {
    const result: any = {};
    
    result.borderStyle = `
        .ant-form-item.ant-row {
            display: flex;

            .ant-form-item-children {
                position: relative;
                display: flex;
                align-items: center;
                min-height: 32px;

                .mega-layout-item-content {
                    flex: auto;
                    max-width: 100%;
                }
            }
        }
        ${props.hasBorder ? `
            .ant-form-item.ant-row {
                padding-left: 12px;
                border: 1px solid #D8D8D8;
                border-radius: 4px;
            }
        ` : `
            &.mega-layout-item .ant-form-item.ant-row {
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

                .ant-form-item {
                    border-color: red;
                }
            }

            .mega-layout-item-inset-has-warning {
                .mega-layout-item-inset-help {
                    color: #FF6A00;
                }

                .ant-form-item {
                    border-color: #FF6A00;
                }
            }

            .ant-form-item-explain {
                display: none;
            }
        `

        result.componentStyle = `
            .ant-form-item.ant-row .mega-layout-item-content {
                .ant-picker,
                .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
                .ant-select-selector,
                .ant-picker-input input,
                .ant-input-number,
                .ant-time-picker-input,
                .ant-select-selection,
                .ant-input {
                    border: none;
                    box-shadow: none;
                }

                .ant-picker {
                    width: 100%;
                    padding-right: 0;
                }

                .ant-checkbox-group {
                    padding-left: 0;
                }

                .ant-picker-range {
                    display: flex;
                    padding-right: 11px;
                    .ant-picker-input {
                        flex: 1;
                    }
                }

                .ant-picker-input {
                    display: flex;
                    padding: 0 11px;
                    > input {
                        flex: 1;
                    }

                    .ant-picker-suffix {
                        flex: initial;
                    }
                }
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
