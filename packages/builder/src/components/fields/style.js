import styled from 'styled-components'

export const indexStyle = styled.div`
  .field-list {
    font-size: 0;
    li {
      overflow: hidden;
      margin-bottom: 12px;
      padding: 0 8px;
      display: inline-block;
      width: 33.33%;
      height: 75px;
      font-size: 12px;
      text-align: center;
      color: ${props => props.theme.whiteColor};
      box-sizing: border-box;
      transition: all 0.1s ease;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme.compHoverBgColor};
      }
      span {
        display: block;
        margin: auto;
        max-width: 50px;
        height: 32px;
        word-break: break-all;
      }
    }
  }
  .field-icon {
    display: block;
    margin: 0 auto 12px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  @media screen and (max-width: 834px) {
    .field-list {
      li {
        width: 100%;
      }
    }
  }
`

export const layoutStyle = styled.div`
  .layout-list {
    margin-bottom: 15px;
    padding: 0 8px;
    font-size: 0;
    li {
      overflow: hidden;
      margin-right: 7px;
      width: 70px;
      height: 90px;
      line-height: 90px;
      border-radius: 4px;
      display: inline-block;
      font-size: 12px;
      text-align: center;
      background: ${props => props.theme.compHoverBgColor};
      color: ${props => props.theme.whiteColor};
      border: 1px solid ${props => props.theme.compHoverBgColor};
      box-sizing: border-box;
      transition: all 0.1s ease;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme.compHoverBgColor};
        border-color: ${props => props.theme.whiteColor};
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
      span {
        display: block;
        margin: auto;
        word-break: break-all;
      }
    }
  }
`

export default {
  indexStyle,
  layoutStyle
}
