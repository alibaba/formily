import React from 'react'
import PropTypes from 'prop-types'

class ColsDetail extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.any),
    onChange: PropTypes.func
  }

  handleChange = (idx, val) => {
    const { UI } = this.props
    if (!val) {
      UI.Toast.error('请确保列宽是有效整数')
      return false
    }
    const { onChange, value } = this.props
    let newValue = [...value]
    const diff = val - newValue[idx]

    if (diff >= newValue[newValue.length - 1]) {
      UI.Toast.error('请确保4列宽度加起来等于24')
      return false
    }

    newValue = newValue.map((_val, i) => {
      if (i === idx) {
        return val
      }
      if (i === newValue.length - 1) {
        return _val - diff
      }
      if (i < idx) {
        return _val
      }
      return _val
    })

    onChange(newValue)
  }

  render() {
    const { value = [], UI } = this.props
    return value.map((item, idx) => (
      <UI.NumberPicker
        key={idx}
        value={item}
        onChange={val => this.handleChange(idx, val)}
      />
    ))
  }
}

export default ColsDetail
