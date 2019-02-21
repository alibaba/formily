import React from 'react'
import { registerFormField } from '@uform/react'
import { isFn } from '@uform/utils'
import { Icon } from 'antd'
import styled, { css } from 'styled-components'

export const CircleButton = styled.div`
  width:30px;
  height:30px;
  margin-right:10px;
  border-radius: 100px;
  border: 1px solid #eee;
  margin-bottom:20px;
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    background:#f7f4f4;
  }
}
`

export const TextButton = styled.div`
  width: 100%;
  height: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${props =>
    props.inline &&
    css`
      display: inline-block;
      width: auto;
    `}
`

export class ArrayField extends React.Component {
  renderEmpty(disabled) {
    const { locale, mutators } = this.props
    return (
      <div
        className='array-empty-wrapper'
        onClick={() => {
          mutators.push()
        }}
      >
        <div className='array-empty'>
          <img src='//img.alicdn.com/tfs/TB1y2nwp_tYBeNjy1XdXXXXyVXa-200-200.png' />
          {!disabled && (
            <TextButton>
              <Icon type='plus' />
              {locale.addItem || '添加'}
            </TextButton>
          )}
        </div>
      </div>
    )
  }

  renderAddition() {
    const { locale } = this.props
    return (
      <div className='array-item-addition'>
        <TextButton inline={true} onClick={this.onAddHandler()}>
          <Icon type='plus' />
          {locale.addItem || '添加'}
        </TextButton>
      </div>
    )
  }

  getDisabled() {
    const { schema, editable, name } = this.props
    const disabled = schema['x-props'] && schema['x-props'].disabled
    if (editable !== undefined) {
      if (isFn(editable)) {
        if (!editable(name)) {
          return true
        }
      } else if (editable === false) {
        return true
      }
    }
    return disabled
  }

  controllable(key, value) {
    const { schema } = this.props
    const readOnly = schema['x-props'] && schema['x-props'].readOnly
    const disabled = this.getDisabled()
    if (isFn(disabled)) {
      return disabled(key, value)
    } else if (isFn(readOnly)) {
      return readOnly(key, value)
    } else {
      return !readOnly && !disabled
    }
  }

  onRemoveHandler(index) {
    const { value, mutators, schema, locale } = this.props
    const { minItems } = schema
    return e => {
      e.stopPropagation()
      if (minItems >= 0 && value.length - 1 < minItems) {
        mutators.errors(locale.array_invalid_minItems, minItems)
      } else {
        mutators.remove(index)
      }
    }
  }

  onMoveHandler(_from, to) {
    const { mutators } = this.props
    return e => {
      e.stopPropagation()
      mutators.move(_from, to)
    }
  }

  onAddHandler() {
    const { value, mutators, schema, locale } = this.props
    const { maxItems } = schema
    return e => {
      e.stopPropagation()
      if (maxItems >= 0 && value.length + 1 > maxItems) {
        mutators.errors(locale.array_invalid_maxItems, maxItems)
      } else {
        mutators.push()
      }
    }
  }

  onClearErrorHandler() {
    return () => {
      const { value, mutators, schema } = this.props
      const { maxItems, minItems } = schema
      if (
        (maxItems >= 0 && value.length <= maxItems) ||
        (minItems >= 0 && value.length >= minItems)
      ) {
        mutators.errors()
      }
    }
  }

  componentDidMount() {
    const { value, mutators, schema, locale } = this.props
    const { maxItems, minItems } = schema
    if (value.length > maxItems) {
      mutators.errors(locale.array_invalid_maxItems, maxItems)
    } else if (value.length < minItems) {
      mutators.errors(locale.array_invalid_minItems, minItems)
    }
  }
}

registerFormField(
  'array',
  styled(
    class extends ArrayField {
      render() {
        const { className, name, schema, value, renderField } = this.props
        const style = (schema['x-props'] && schema['x-props'].style) || {}
        return (
          <div
            className={className}
            style={style}
            onClick={this.onClearErrorHandler()}
          >
            {value.map((item, index) => {
              return (
                <div className='array-item' key={`${name}.${index}`}>
                  <div className='array-index'>
                    <span>{index + 1}</span>
                  </div>
                  <div className='array-item-wrapper'>{renderField(index)}</div>
                  <div className='array-item-operator'>
                    {this.controllable(`${index}.remove`, item) && (
                      <CircleButton onClick={this.onRemoveHandler(index)}>
                        <Icon size='xs' type='delete' />
                      </CircleButton>
                    )}
                    {value.length > 1 &&
                      this.controllable(`${index}.moveDown`, item) && (
                      <CircleButton
                        onClick={this.onMoveHandler(
                          index,
                          index + 1 > value.length - 1 ? 0 : index + 1
                        )}
                      >
                        <Icon size='xs' type='down' />
                      </CircleButton>
                    )}
                    {value.length > 1 &&
                      this.controllable(`${index}.moveUp`, item) && (
                      <CircleButton
                        onClick={this.onMoveHandler(
                          index,
                          index - 1 < 0 ? value.length - 1 : index - 1
                        )}
                      >
                        <Icon size='xs' type='up' />
                      </CircleButton>
                    )}
                  </div>
                </div>
              )
            })}
            {value.length === 0 && this.renderEmpty()}
            {value.length > 0 &&
              this.controllable('addition', value) &&
              this.renderAddition()}
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
      }
    }
  `
)
