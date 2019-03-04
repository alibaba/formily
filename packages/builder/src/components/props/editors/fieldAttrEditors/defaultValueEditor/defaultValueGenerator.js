import React, { Component } from 'react'

class DefaultValueGenerator extends Component {
  static defaultProps = {
    customEditor: {}
  }

  constructor(props) {
    super(props)
    const value = props.value || {}
    this.state = {
      type: value.type || '',
      value: value.value || '',
      flag: value.flag || props.flag
    }
  }

  handleValueTypeChange = v => {
    const { store } = this.props
    const { name } = store

    this.setState(
      {
        type: v,
        value: v === 'url' ? name : ''
      },
      () => {
        this.props.onChange({
          ...this.state
        })
      }
    )
  }

  handleValueChange = v => {
    this.setState(
      {
        value: v
      },
      () => {
        this.props.onChange({
          ...this.state
        })
      }
    )
  }

  getValueEditor = (type, value) => {
    if (this.props.customEditor[type]) {
      return React.cloneElement(this.props.customEditor[type], {
        onChange: this.handleValueChange,
        value
      })
    }

    if (type === 'url') {
      return (
        <span
          style={{
            color: '#fff',
            marginLeft: 20,
            display: 'inline-block',
            verticalAlign: 'top'
          }}
        >
          <this.props.UI.Input
            value={value}
            onChange={this.handleValueChange}
            placeholder='url上的key'
            style={{
              verticalAlign: 'top'
            }}
          />
        </span>
      )
    } else {
      return null
    }
  }

  render() {
    const { type, value, flag } = this.state
    return (
      <div>
        <this.props.UI.Select
          value={type}
          dataSource={this.props.ds}
          onChange={this.handleValueTypeChange}
        />
        {this.getValueEditor(type, value, flag)}
      </div>
    )
  }
}

export default DefaultValueGenerator
