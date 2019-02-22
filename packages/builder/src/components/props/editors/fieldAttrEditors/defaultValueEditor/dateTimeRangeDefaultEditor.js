import React, { Component } from 'react'
import DateTimeDefaultEditor from './dateTimeDefaultEditor'

class Editor extends Component {
  handleStartDateChange = (v, vStr) => {
    this.props.onChange([vStr, this.props.value[1]])
  }

  handleEndDateChange = (v, vStr) => {
    this.props.onChange([this.props.value[0], vStr])
  }

  render() {
    return (
      <div>
        <div style={{ color: '#fff', fontSize: 12, marginBottom: 5 }}>
          开始时间
        </div>
        <DateTimeDefaultEditor
          onChange={this.handleStartDateChange}
          value={this.props.value[0]}
        />
        <div style={{ color: '#fff', fontSize: 12, marginBottom: 5 }}>
          结束时间
        </div>
        <DateTimeDefaultEditor
          onChange={this.handleEndDateChange}
          value={this.props.value[1]}
        />
      </div>
    )
  }
}

export default Editor
