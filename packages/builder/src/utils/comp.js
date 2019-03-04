import React from 'react'
import styled from 'styled-components'

/**
 * 分割线
 */
export const Divider = styled.div`
  height: 1px;
  background: #1e2336;
  box-shadow: 0 1px 0 0 #313853;
`

/**
 * 头部title
 */
export const Header = styled(props => (
  <div className={props.className}>{props.children}</div>
))`
  padding-left: 16px;
  height: 74px;
  h2 {
    margin: 0;
    padding: 0;
    font-size: 14px;
    height: 40px;
    line-height: 45px;
    color: ${props => props.theme.whiteColor};
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #9096ad;
  }
`

export const CustomIcon = styled(props => (
  <i
    className={props.className}
    style={{ backgroundImage: `url(${props.iconUrl})` }}
  />
))`
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  width: ${props => props.width || '15'}px;
  height: ${props => props.height || '15'}px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: ${props => props.width || '15'}px
    ${props => props.height || '15'}px;
`

export default {
  Divider,
  Header,
  CustomIcon
}
