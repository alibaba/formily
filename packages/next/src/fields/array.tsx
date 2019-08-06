import React from 'react'
import { registerFormField, createArrayField } from '@uform/react'
import { Button, Icon } from '@alifd/next'
import styled from 'styled-components'

export const CircleButton = styled['div'].attrs({ className: 'cricle-btn' })`
  ${props =>
    !props.hasText
      ? `width:30px;
  height:30px;`
      : ''}
  margin-right:10px;
  border-radius: ${props => (!props.hasText ? '100px' : 'none')};
  border: ${props => (!props.hasText ? '1px solid #eee' : 'none')};
  margin-bottom:20px;
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.3;
  ${props =>
    !props.hasText
      ? `&:hover{
    background:#f7f4f4;
  }`
      : ''}
      .next-icon{
    display:flex;
    align-items:'center'
  }
  .op-name{
    margin-left:3px;
  }
}
`

export const ArrayField = createArrayField({
  CircleButton,
  TextButton: props => (
    <Button text size="large">
      {props.children}
    </Button>
  ),
  AddIcon: () => <Icon type="add" className="next-icon-first" />,
  RemoveIcon: () => (
    <Icon size="xs" type="ashbin" className="next-icon-first" />
  ),
  MoveDownIcon: () => (
    <Icon size="xs" type="arrow-down" className="next-icon-first" />
  ),
  MoveUpIcon: () => (
    <Icon size="xs" type="arrow-up" className="next-icon-first" />
  )
})

registerFormField(
  'array',
  styled(
    class extends ArrayField {
      render() {
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
          color: #fff;
          z-index: 1;
          font-size: 12px;
          top: 3px;
          left: 3px;
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
        .next-btn-text {
          color: #999;
          .next-icon:before {
            width: 16px !important;
            font-size: 16px !important;
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
      background: #fbfbfb;
      .next-btn-text {
        color: #888;
        .next-icon:before {
          width: 16px !important;
          font-size: 16px !important;
          margin-right: 3px;
        }
      }
    }
  `
)
