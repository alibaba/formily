import React from 'react'
import { connect, registerFormField } from '@uform/react'
import { Slider } from 'antd'
import { mapStyledProps } from '../utils'

registerFormField(
  'range',
  connect({
    defaultProps: {
      style: {
        width: 320
      }
    },
    getProps: mapStyledProps
  })(
    class Component extends React.Component {
      render() {
        const { onChange, value, min, max, marks } = this.props
        let newMarks = {}
        if (Array.isArray(marks)) {
          marks.forEach(mark => {
            newMarks[mark] = mark
          })
        } else {
          newMarks = marks
        }
        return (
          <Slider
            onChange={onChange}
            value={value}
            min={min}
            max={max}
            marks={newMarks}
          />
        )
      }
    }
  )
)
