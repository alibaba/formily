import React from 'react'
import { Slider } from 'antd'
import { connect, registerFormField } from '@uform/react'
import { mapStyledProps } from '../utils'

export interface ISliderMarks {
  [key: number]:
    | React.ReactNode
    | {
        style: React.CSSProperties
        label: React.ReactNode
      }
}

export declare type SliderValue = number | [number, number]

// TODO 并不是方法，最好能引用组件的 typescript 接口定义
export interface ISliderProps {
  min?: number
  max?: number
  marks?: ISliderMarks
  value?: SliderValue
  defaultValue?: SliderValue
  onChange?: (value: SliderValue) => void
}

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
    class Component extends React.Component<ISliderProps> {
      public render() {
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
