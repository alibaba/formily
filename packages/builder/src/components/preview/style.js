export default `
  position: relative;
  height: 100%;
  .preview-main {
    position: absolute;
    top: 75px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    padding: 20px;
    background: #fff;
    overflow-y: scroll;
    border-radius: 4px;
  }
  .next-card-head {
    margin-bottom: 10px;
  }
  .next-card-body {
    padding-top: 0 !important;
  }
  .preview-line {
    position: relative;
    overflow: hidden;
    margin-bottom: 0 !important;
    padding: 10px !important;
    border: 1px solid #e9e9e9;
    outline: 1px solid #outline;
    border-radius: 2px;
    transition: all 0.1s ease;
    user-select: none;
    &:hover {
      .preview-line-del {
        opacity: 1;
      }
    }
    .preview-line-del {
      cursor: pointer;
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      z-index: 101;
      opacity: 0;
      font-size: 12px;
      color: #333;
      width: 64px;
      text-align: center;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 2px;
        bottom: 2px;
        width: 1px;
        background: #eee;
      }
      &::before {
        content: '';
        display: block;
        margin: 0 auto 5px;
        background: url('https://gw.alicdn.com/tfs/TB1j5fABkvoK1RjSZFDXXXY3pXa-30-32.png')
          no-repeat center center;
        background-size: 15px 16px;
        height: 16px;
      }
    }
    .preview-line-layer {
      position: absolute;
      left: 0;
      top: 0;
      right: 40px;
      bottom: 0;
      z-index: 100;
      cursor: move;
    }
    .next-form-item-label {
      text-align: right;
    }
  }
  .preview-line-bar {
    height: 10px;
    &.active {
      overflow: hidden;
      height: 60px;
      &::after {
        content: '';
        display: block;
        border: 1px dashed #ddd;
        border-radius: 4px;
        margin: 6px 0;
        height: 40px;
      }
    }
    &:last-child {
      padding-bottom: 999px;
    }
  }
  .preview-line-enter {
    border-color: #419bf9;
  }
  .preview-line-active {
    cursor: pointer;
    border-color: #5a60ff;
    outline-color: #e6e7ff;
  }
  .preview-tips {
    margin-top: 0;
    padding-top: 72px;
    text-align: center;
    color: #999;
  }

  .comp-item,
  .comp-item-layout {
    width: 100%;
    .next-row {
      width: 100%;
    }
  }
  .comp-item-layout {
    position: relative;
    margin: 10px 0;
    padding: 20px 10px;
    min-height: 200px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    &.active {
      border-color: #3f486b;
    }
    .comp-item-layout-tool {
      position: absolute;
      top: 5px;
      right: 5px;
      > * {
        float: right;
        margin-left: 8px;
      }
    }
    .comp-item-layout-empty {
      margin-top: 0;
      padding-top: 20px;
      text-align: center;
      color: #999;
    }
  }
`
