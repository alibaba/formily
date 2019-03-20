import React, { Component } from 'react'
import DateDefaultEditor from './dateDefaultEditor'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
  }

  handleStartDateChange = v => {
    this.props.onChange([v, this.props.value[1]])
  }

  handleEndDateChange = v => {
    this.props.onChange([this.props.value[0], v])
  }

  render() {
    const { store = {}, value = [], UI } = this.props
    const style = {
      fontSize: 12,
      marginBottom: 5
    }

    return (
      <div>
        <div style={style}>开始日期</div>
        <DateDefaultEditor
          onChange={this.handleStartDateChange}
          value={value[0]}
          store={store}
          UI={UI}
        />
        <div style={style}>结束日期</div>
        <DateDefaultEditor
          onChange={this.handleEndDateChange}
          value={value[1]}
          store={store}
          UI={UI}
        />
      </div>
    )
  }
}

export default Editor
