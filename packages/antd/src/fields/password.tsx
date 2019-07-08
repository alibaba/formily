import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
import { connect, registerFormField } from '@uform/react'

var isNum = function(c) {
  return c >= 48 && c <= 57
}
var isLower = function(c) {
  return c >= 97 && c <= 122
}
var isUpper = function(c) {
  return c >= 65 && c <= 90
}
var isSymbol = function(c) {
  return !(isLower(c) || isUpper(c) || isNum(c))
}
var isLetter = function(c) {
  return isLower(c) || isUpper(c)
}

const getStrength = val => {
  if (!val) {
    return 0
  }
  let num = 0
  let lower = 0
  let upper = 0
  let symbol = 0
  let MNS = 0
  let rep = 0
  let repC = 0
  let consecutive = 0
  let sequential = 0
  const len = () => num + lower + upper + symbol
  const require = () => {
    var re = num > 0 ? 1 : 0
    re += lower > 0 ? 1 : 0
    re += upper > 0 ? 1 : 0
    re += symbol > 0 ? 1 : 0
    if (re > 2 && len() >= 8) {
      return re + 1
    } else {
      return 0
    }
  }
  for (var i = 0; i < val.length; i++) {
    var c = val.charCodeAt(i)
    if (isNum(c)) {
      num++
      if (i !== 0 && i !== val.length - 1) {
        MNS++
      }
      if (i > 0 && isNum(val.charCodeAt(i - 1))) {
        consecutive++
      }
    } else if (isLower(c)) {
      lower++
      if (i > 0 && isLower(val.charCodeAt(i - 1))) {
        consecutive++
      }
    } else if (isUpper(c)) {
      upper++
      if (i > 0 && isUpper(val.charCodeAt(i - 1))) {
        consecutive++
      }
    } else {
      symbol++
      if (i !== 0 && i !== val.length - 1) {
        MNS++
      }
    }
    var exists = false
    for (var j = 0; j < val.length; j++) {
      if (val[i] === val[j] && i !== j) {
        exists = true
        repC += Math.abs(val.length / (j - i))
      }
    }
    if (exists) {
      rep++
      var unique = val.length - rep
      repC = unique ? Math.ceil(repC / unique) : Math.ceil(repC)
    }
    if (i > 1) {
      var last1 = val.charCodeAt(i - 1)
      var last2 = val.charCodeAt(i - 2)
      if (isLetter(c)) {
        if (isLetter(last1) && isLetter(last2)) {
          var v = val.toLowerCase()
          var vi = v.charCodeAt(i)
          var vi1 = v.charCodeAt(i - 1)
          var vi2 = v.charCodeAt(i - 2)
          if (vi - vi1 === vi1 - vi2 && Math.abs(vi - vi1) === 1) {
            sequential++
          }
        }
      } else if (isNum(c)) {
        if (isNum(last1) && isNum(last2)) {
          if (c - last1 === last1 - last2 && Math.abs(c - last1) === 1) {
            sequential++
          }
        }
      } else {
        if (isSymbol(last1) && isSymbol(last2)) {
          if (c - last1 === last1 - last2 && Math.abs(c - last1) === 1) {
            sequential++
          }
        }
      }
    }
  }
  let sum = 0
  let length = len()
  sum += 4 * length
  if (lower > 0) {
    sum += 2 * (length - lower)
  }
  if (upper > 0) {
    sum += 2 * (length - upper)
  }
  if (num !== length) {
    sum += 4 * num
  }
  sum += 6 * symbol
  sum += 2 * MNS
  sum += 2 * require()
  if (length === lower + upper) {
    sum -= length
  }
  if (length === num) {
    sum -= num
  }
  sum -= repC
  sum -= 2 * consecutive
  sum -= 3 * sequential
  sum = sum < 0 ? 0 : sum
  sum = sum > 100 ? 100 : sum

  if (sum >= 80) {
    return 100
  } else if (sum >= 60) {
    return 80
  } else if (sum >= 40) {
    return 60
  } else if (sum >= 20) {
    return 40
  } else {
    return 20
  }
}

export interface IPasswordProps {
  value: any
  defaultValue: any
  className: string
  // TODO 不知道下面三个是什么东西
  checkStrength: any
  htmlType: any
  innerAfter: any
  onChange: (value: any) => void
}

export interface IPasswordState {
  value: any
  strength: number
  eye: boolean
}

const Password = styled(
  class Password extends React.Component<IPasswordProps, IPasswordState> {
    public state = {
      value: this.props.value || this.props.defaultValue,
      strength: 0,
      eye: false
    }

    public componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value && this.props.value !== this.state.value) {
        this.setState({
          value: this.props.value,
          strength: getStrength(this.props.value)
        })
      }
    }

    public onChangeHandler = e => {
      const value = e.target.value
      this.setState(
        {
          value,
          strength: getStrength(value)
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(value)
          }
        }
      )
    }

    public renderStrength() {
      const { strength } = this.state
      return (
        <div className={'password-strength-wrapper'}>
          <div className={'div-1 div'} />
          <div className={'div-2 div'} />
          <div className={'div-3 div'} />
          <div className={'div-4 div'} />
          <div
            className={'password-strength-bar'}
            style={{
              clipPath: `polygon(0 0,${strength}% 0,${strength}% 100%,0 100%)`
            }}
          />
        </div>
      )
    }

    public switchEye() {
      return () => {
        this.setState({
          eye: !this.state.eye
        })
      }
    }

    public renderEye() {
      if (!this.state.eye) {
        return (
          <img
            className={'eye'}
            onClick={this.switchEye()}
            src={'//img.alicdn.com/tfs/TB1wyXlsVzqK1RjSZFvXXcB7VXa-200-200.svg'}
          />
        )
      } else {
        return (
          <img
            className={'eye'}
            onClick={this.switchEye()}
            src={'//img.alicdn.com/tfs/TB1xiXlsVzqK1RjSZFvXXcB7VXa-200-200.svg'}
          />
        )
      }
    }

    public render() {
      const {
        className,
        checkStrength,
        value,
        onChange,
        htmlType,
        innerAfter,
        ...others
      } = this.props

      return (
        <div className={className}>
          <Input
            type={this.state.eye ? 'text' : 'password'}
            className={`input-${this.state.eye ? 'text' : 'password'}`}
            value={this.state.value}
            onChange={this.onChangeHandler}
            suffix={this.renderEye()}
            {...others}
          />
          {checkStrength && this.renderStrength()}
        </div>
      )
    }
  }
)`
  .ant-input-prefix,
  .ant-input-suffix {
    z-index: 10;
    right: 20px !important;
    .eye {
      position: absolute;
      max-width: initial;
      width: 20px;
      height: 20px;
      top: 50%;
      left: -5px;
      transform: translate(0, -50%);
      opacity: 0.3;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .ant-input {
    width: 100%;
    position: relative;
    &.input-password input {
      font-size: 16px;
      letter-spacing: 2px;
    }
    input {
      padding-right: 25px;
    }
  }
  .password-strength-wrapper {
    background: #e0e0e0;
    margin-bottom: 3px;
    position: relative;
    .div {
      position: absolute;
      z-index: 1;
      height: 8px;
      top: 0;
      background: #fff;
      width: 1px;
      transform: translate(-50%, 0);
    }
    .div-1 {
      left: 20%;
    }
    .div-2 {
      left: 40%;
    }
    .div-3 {
      left: 60%;
    }
    .div-4 {
      left: 80%;
    }
    .password-strength-bar {
      position: relative;
      background-image: -webkit-linear-gradient(left, #ff5500, #ff9300);
      transition: all 0.35s ease-in-out;
      height: 8px;
      width: 100%;
      margin-top: 5px;
    }
  }
`

registerFormField('password', connect()(Password))
