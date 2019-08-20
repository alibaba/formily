import React from 'react'
import { registerFormField, createArrayField } from '@uform/react'
import { Icon } from 'antd'
import styled, { css } from 'styled-components'

export const CircleButton = styled['div'].attrs({ className: 'cricle-btn' })`
  ${props => (!props.hasText ? 'width:30px; height:30px;' : '')}
  margin-right:10px;
  border-radius: ${props => (!props.hasText ? '100px' : 'none')};
  border: ${props => (!props.hasText ? '1px solid #eee' : 'none')};
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props =>
    !props.hasText
      ? `&:hover{
        background:#f7f4f4;
      }`
      : ''}
  .op-name {
    margin-left: 3px;
  }
`

export const TextButton = styled['div'].attrs({
  className: 'ant-btn-text'
})`
  display: inline-block;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  .op-name {
    margin-left: 4px;
  }
  ${props =>
    props.inline &&
    css`
      display: inline-block;
      width: auto;
    `}
`

export const ArrayField = createArrayField({
  CircleButton,
  TextButton,
  AddIcon: () => <Icon type="plus" />,
  RemoveIcon: () => <Icon type="delete" />,
  MoveDownIcon: () => <Icon type="down" />,
  MoveUpIcon: () => <Icon type="up" />
})

registerFormField(
  'array',
  styled(
    class extends ArrayField {
      public render() {
        const { className, name, value, renderField } = this.props
        const cls = this.getProps('className')
        const style = this.getProps('style')
        return (
          <div
            className={`${className} ${cls}`}
            style={style}
            onClick={this.onClearErrorHandler()}
          >
            {value.map((item, index) => {
              return (
                <div className="array-item" key={`${name}.${index}`}>
                  <div className="array-index">
                    <span>{index + 1}</span>
                  </div>
                  <div className="array-item-wrapper">{renderField(index)}</div>
                  <div className="array-item-operator">
                    {this.renderRemove(index, item)}
                    {this.renderMoveDown(index, item)}
                    {this.renderMoveUp(index)}
                    {this.renderExtraOperations(index)}
                  </div>
                </div>
              )
            })}
            {this.renderEmpty()}
            {value.length > 0 && this.renderAddition()}
          </div>
        )
      }
    }
  )`
    border: 1px solid #eee;
    min-width: 400px;
    .array-item {
      padding: 20px;
      padding-bottom: 0;
      padding-top: 30px;
      border-bottom: 1px solid #eee;
      position: relative;
      &:nth-child(even) {
        background: #fafafa;
      }
      .array-index {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        span {
          position: absolute;
          color: rgb(255, 255, 255);
          z-index: 1;
          font-size: 12px;
          top: 3px;
          left: 3px;
          line-height: initial;
        }
        &::after {
          content: '';
          display: block;
          border-top: 20px solid transparent;
          border-left: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-right: 20px solid #888;
          transform: rotate(45deg);
          position: absolute;
          z-index: 0;
          top: -20px;
          left: -20px;
        }
      }
      .array-item-operator {
        display: flex;
        border-top: 1px solid #eee;
        padding-top: 20px;
      }
    }
    .array-empty-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.disabled {
        cursor: default;
      }
      .array-empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px;
        img {
          display: block;
          height: 80px;
        }
        .ant-btn-text {
          color: #999;
          i {
            margin-right: 3px;
          }
        }
      }
    }
    .array-item-wrapper {
      margin: 0 -20px;
    }
    .array-item-addition {
      padding: 10px 20px;
      line-height: normal !important;
      background: #fbfbfb;
      .ant-btn-text {
        color: #888;
        i {
          margin-right: 3px;
        }
      }
    }
  `
)
