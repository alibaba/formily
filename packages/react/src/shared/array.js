import React from 'react'
import { isFn, getIn, camelCase } from '../utils'

export const createArrayField = options => {
  const {
    TextButton,
    CircleButton,
    AddIcon,
    RemoveIcon,
    MoveDownIcon,
    MoveUpIcon
  } = {
    TextButton: () => <div>You Should Pass The TextButton.</div>,
    CircleButton: () => <div>You Should Pass The CircleButton.</div>,
    AddIcon: () => <div>You Should Pass The AddIcon.</div>,
    RemoveIcon: () => <div>You Should Pass The RemoveIcon.</div>,
    MoveDownIcon: () => <div>You Should Pass The MoveDownIcon.</div>,
    MoveUpIcon: () => <div>You Should Pass The MoveUpIcon.</div>,
    ...options
  }

  return class ArrayField extends React.Component {
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
      } else if (defaultRender) {
        return isFn(defaultRender)
          ? defaultRender(this.getApi(index), render)
          : defaultRender
      }
    }

    renderAddition() {
      const { locale } = this.props
      const { value } = this.props
      return (
        this.isActive('addition', value) &&
        this.renderWith('addition', ({ add }, text) => {
          return (
            <div className='array-item-addition' onClick={add}>
              <TextButton>
                <AddIcon />
                {text || locale.addItem || '添加'}
              </TextButton>
            </div>
          )
        })
      )
    }

    renderEmpty(disabled) {
      const { locale, value } = this.props
      return (
        value.length === 0 &&
        this.renderWith('empty', ({ add, isActive }, text) => {
          return (
            <div className='array-empty-wrapper' onClick={add}>
              <div className='array-empty'>
                <img
                  style={{ backgroundColor: 'transparent' }}
                  src='//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg'
                />
                {isActive('empty', value) && (
                  <TextButton>
                    <AddIcon />
                    {text || locale.addItem || '添加'}
                  </TextButton>
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
        this.renderWith('remove', index, ({ remove }, text) => {
          return (
            <CircleButton onClick={remove} hasText={!!text}>
              <RemoveIcon />
              <span className='op-name'>{text}</span>
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
        this.renderWith('moveDown', index, ({ moveDown }, text) => {
          return (
            <CircleButton onClick={moveDown} hasText={!!text}>
              <MoveDownIcon />
              <span className='op-name'>{text}</span>
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
        this.renderWith('moveUp', index, ({ moveUp }, text) => {
          return (
            <CircleButton onClick={moveUp} hasText={!!text}>
              <MoveUpIcon />
              <span className='op-name'>{text}</span>
            </CircleButton>
          )
        })
      )
    }

    renderExtraOperations(index) {
      return this.renderWith('extraOperations', index)
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
}
