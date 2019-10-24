import React, { useState } from 'react'
import { connect, registerFormField } from '@uform/react-schema-renderer'
import { Input } from 'antd'
import { PasswordProps } from 'antd/lib/input'
import { PasswordStrength } from '@uform/react-shared-components'
import styled from 'styled-components'
import { mapStyledProps } from '../shared'

export interface IPasswordProps extends PasswordProps {
  checkStrength: boolean
}

const Password: React.FC<IPasswordProps> = styled((props: IPasswordProps) => {
  const { className, checkStrength, onChange, ...others } = props
  const [value, setValue] = useState(props.value || props.defaultValue)
  return (
    <div className={className}>
      <Input.Password
        {...others}
        value={value}
        onChange={event => {
          setValue(event.target.value)
          if (onChange) {
            onChange(event)
          }
        }}
      />
      {checkStrength && (
        <PasswordStrength value={String(value)}>
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
      )}
    </div>
  )
})`
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

registerFormField(
  'password',
  connect({
    getProps: mapStyledProps
  })(Password)
)
