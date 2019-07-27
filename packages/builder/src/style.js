import styled from 'styled-components'

export default styled.div`
  position: relative;
  min-width: 600px;
  overflow: hidden;
  .next-form-item {
    margin-bottom: 0;
  }
  .next-checkbox-label {
    color: ${props => props.theme.whiteColor};
  }
  .preview-main .next-checkbox-label {
    color: #333;
  }
  .schemaform-header {
    position: relative;
    height: 64px;
    background: ${props => props.theme.headerBgColor};
    overflow: hidden;
    &::after {
      content: "";
      clear: both;
      display: table;
    }
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 0 16px 0 rgba(0, 0, 0, 0.15);
    z-index: 2;

  }
  .schemaform-back {
    position: absolute;
    left: 0;
    top: 0;
    width: 64px;
    height: 100%;
    text-indent: -999em;
    &::before {
      content: "";
      position: absolute;
      left: 27px;
      top: 24px;
      width: 9px;
      height: 17px;
      background: url('${props =>
        props.theme.backIconUrl}') no-repeat center center;
      background-size: 9px 17px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 20px;
      right: 0;
      height: 24px;
      width: 1px;
      background: ${props => props.theme.backDividerBgColor};
      box-shadow: ${props => props.theme.backDividerShadow};
    }
  }
  h1 {
    position: absolute;
    left: 88px;
    top: 0;
    margin: 0;
    font-size: 24px;
    font-weight: normal;
    line-height: 64px;
    color: ${props => props.theme.whiteColor};
  }
  .schemaform-header-btns {
    float: right;
    margin: 14px 24px 0 0;
    button {
      margin-left: 24px;
      height: 36px;
      line-height: 36px;
      background: ${props => props.theme.btnNormalBgColor};
      color: ${props => props.theme.whiteColor};
      border: none;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
      &.next-btn-primary {
        background: ${props => props.theme.btnPrimaryBgColor};
        color: ${props => props.theme.btnPrimaryTxtColor};
      }
    }
  }
  .schamaform-content {
    position: relative;
    overflow: hidden;
    padding: 0 340px 0 240px;

    &::after {
      content: "";
      clear: both;
      display: table;      
    }
    .content-col-left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 240px;
      overflow-y: scroll;
      background: ${props => props.theme.leftColBgColor};
    }
    .content-col-right {
      position: absolute;
      top: 0;
      right: 0;
      width: 340px;
      bottom: 0;
      background: ${props => props.theme.rightColBgColor};
      overflow-y: scroll;
    }
    .content-col-main {  
      position: relative;
      height: 100%;
      background: ${props => props.theme.mainColBgColor};
      overflow-y: scroll;
    }
  }
  // 复写文件上传组件宽度
  .next-upload-list-text .next-upload-list-item {
    max-width: 200px;
  }  
  .schema-form-container .next-form-top .next-form-item-label {
    margin-bottom: 0 !important;
  }
  .next-accordion, .next-collapse {
    border: none;
  }
  .next-accordion-section-title, .next-collapse-panel-title {
    background: none;
    user-select: none;
    color: ${props => props.theme.whiteColor};
    border: none;
    &:hover {
      background: none;
    }
  }
  .next-collapse-panel:not(:first-child) {
    border-top: none;
  }
  .next-accordion-section, .next-collapse-panel {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: ${props => props.theme.dividerBgColor};
      box-shadow: ${props => props.theme.dividerShadow};
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
  .next-accordion-section-content, .next-collapse-panel-content {
    background: none;
    .next-form .next-form-item-label, .next-radio-group .next-radio-label {
      color: ${props => props.theme.whiteColor};
      font-size: 12px;
    }
  }
  .next-collapse .next-collapse-panel-icon {
    color: ${props => props.theme.whiteColor};
  }
  .next-accordion .next-accordion-icon:before {
    color: ${props => props.theme.whiteColor};
  }
`
