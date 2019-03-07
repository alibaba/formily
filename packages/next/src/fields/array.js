import React from 'react'
import { registerFormField } from '@uform/react'
import { isFn, getIn, camelCase } from '@uform/utils'
import { Button, Icon } from '@alifd/next'
import styled from 'styled-components'

export const CircleButton = styled.div.attrs({ className: 'cricle-btn' })`
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

export class ArrayField extends React.Component {
  isActive = (key, value) => {
    const readOnly = this.getProps('readOnly')
    const disabled = this.getDisabled()
    if (isFn(disabled)) {
      return disabled(key, value)
    } else if (isFn(readOnly)) {
      return readOnly(key, value)
    } else {
      return !readOnly && !disabled
    }
  }

  getApi(index) {
    const { value } = this.props
    return {
      index,
      isActive: this.isActive,
      dataSource: value,
      record: value[index],
      add: this.onAddHandler(),
      remove: this.onRemoveHandler(index),
      moveDown: e => {
        return this.onMoveHandler(
          index,
          index + 1 > value.length - 1 ? 0 : index + 1
        )(e)
      },
      moveUp: e => {
        return this.onMoveHandler(
          index,
          index - 1 < 0 ? value.length - 1 : index - 1
        )(e)
      }
    }
  }

  getProps(path) {
    return getIn(this.props.schema, `x-props${path ? '.' + path : ''}`)
  }

  renderWith(name, index, defaultRender) {
    const render = this.getProps(camelCase(`render-${name}`))
    if (isFn(index)) {
      defaultRender = index
      index = 0
    }
    if (isFn(render)) {
      return render(this.getApi(index))
    } else {
      return defaultRender(this.getApi(index))
    }
  }

  renderAddition() {
    const { locale } = this.props
    const { value } = this.props
    return (
      this.isActive('addition', value) &&
      this.renderWith('addition', ({ add }) => {
        return (
          <div className='array-item-addition' onClick={add}>
            <Button shape='text' size='large'>
              <Icon type='add' />
              {locale.addItem || '添加'}
            </Button>
          </div>
        )
      })
    )
  }

  renderEmpty(disabled) {
    const { locale, value } = this.props
    return (
      value.length === 0 &&
      this.renderWith('empty', ({ add, isActive }) => {
        return (
          <div className='array-empty-wrapper' onClick={add}>
            <div className='array-empty'>
              <img
                style={{ backgroundColor: 'transparent' }}
                src='//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg'
              />
              {isActive('empty', value) && (
                <Button shape='text' size='large'>
                  <Icon type='add' />
                  {locale.addItem || '添加'}
                </Button>
              )}
            </div>
          </div>
        )
      })
    )
  }

  renderRemove(index, item) {
    return (
      this.isActive(`${index}.remove`, item) &&
      this.renderWith('remove', index, ({ remove }) => {
        return (
          <CircleButton onClick={remove}>
            <Icon size='xs' type='ashbin' />
          </CircleButton>
        )
      })
    )
  }

  renderMoveDown(index, item) {
    const { value } = this.props
    return (
      value.length > 1 &&
      this.isActive(`${index}.moveDown`, item) &&
      this.renderWith('moveDown', index, ({ moveDown }) => {
        return (
          <CircleButton onClick={moveDown}>
            <Icon size='xs' type='arrow-down' />
          </CircleButton>
        )
      })
    )
  }

  renderMoveUp(index, item) {
    const { value } = this.props
    return (
      value.length > 1 &&
      this.isActive(`${index}.moveUp`, value) &&
      this.renderWith('moveUp', index, ({ moveUp }) => {
        return (
          <CircleButton onClick={moveUp}>
            <Icon size='xs' type='arrow-up' />
          </CircleButton>
        )
      })
    )
  }

  getDisabled() {
    const { editable, name } = this.props
    const disabled = this.getProps('disabled')
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
                    {this.renderRemove(index, item)}
                    {this.renderMoveDown(index, item)}
                    {this.renderMoveUp(index, item)}
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
      }
    }
  `
)
