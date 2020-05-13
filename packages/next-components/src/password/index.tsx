import React from 'react'
import { connect } from '@formily/react-schema-renderer'
import { Input } from '@alifd/next'
import { InputProps } from '@alifd/next/types/input'
import { PasswordStrength } from '@formily/react-shared-components'
import styled from 'styled-components'
import { mapStyledProps } from '../shared'

export interface IPasswordProps extends InputProps {
  checkStrength: boolean
}

export const Password = connect({
  getProps: mapStyledProps
})(styled(
  class Password extends React.Component<IPasswordProps> {
    state = {
      value: this.props.value || this.props.defaultValue,
      eye: false
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps.value !== this.props.value &&
        this.props.value !== this.state.value
      ) {
        this.setState({
          value: this.props.value
        })
      }
    }

    onChangeHandler = value => {
      this.setState(
        {
          value
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(value, value)
          }
        }
      )
    }

    renderStrength() {
      return (
        <PasswordStrength value={this.state.value}>
          {score => {
            return (
              <div className="password-strength-wrapper">
                <div className="div-1 div" />
                <div className="div-2 div" />
                <div className="div-3 div" />
                <div className="div-4 div" />
                <div
                  className="password-strength-bar"
                  style={{
                    clipPath: `polygon(0 0,${score}% 0,${score}% 100%,0 100%)`
                  }}
                />
              </div>
            )
          }}
        </PasswordStrength>
      )
    }

    switchEye() {
      return () => {
        this.setState({
          eye: !this.state.eye
        })
      }
    }

    renderEye() {
      if (!this.state.eye) {
        return (
          <img
            className="eye"
            onClick={this.switchEye()}
            src="//img.alicdn.com/tfs/TB1wyXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"
          />
        )
      } else {
        return (
          <img
            className="eye"
            onClick={this.switchEye()}
            src="//img.alicdn.com/tfs/TB1xiXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"
          />
        )
      }
    }

    render() {
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
            htmlType={this.state.eye ? 'text' : 'password'}
            className={`input-${this.state.eye ? 'text' : 'password'}`}
            value={this.state.value}
            onChange={this.onChangeHandler}
            innerAfter={this.renderEye()}
            {...others}
          />
          {checkStrength && this.renderStrength()}
        </div>
      )
    }
  }
)`
  .next-input {
    width: 100%;
    position: relative;
    &.input-password input {
      font-size: 16px;
      letter-spacing: 2px;
    }
    input {
      padding-right: 25px;
    }
    .eye {
      position: absolute;
      height: 20px;
      right: 5px;
      top: 50%;
      transform: translate(0, -50%);
      opacity: 0.3;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      &:hover {
        opacity: 0.6;
      }
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
`)

export default Password
