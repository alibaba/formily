export default `
  .schema-form-container .schema-form-content > .schema-form-field {
    &.option-item {
      padding: 10px !important;
      border: 1px solid transparent;
      white-space: nowrap;
      .option-item-row {
        &:last-child {
          margin-bottom: 0 !important;
        }
      }
      &.hover {
        border-color: #ccc;
      }
      &.active {
        border-color: #419bf9;
        background: rgba(16, 141, 233, 0.1);
      }
    }
    .option-action {
      position: relative;
      z-index: 1000;
      display: inline-block;
      padding: 3px 8px;
      vertical-align: middle;
      cursor: pointer;
      &.option-del {
        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate3d(0, -50%, 0);
          width: 1px;
          height: 15px;
          background: #ccc;
        }
      }
    }
  }

  .props-tips {
    padding-top: 60px;
    text-align: center;
    color: #999;
  }

  .schema-form-container
    .schema-form-field.schema-object
    .schema-object-item
    > .next-form-item-label {
    font-size: 14px !important;
    font-weight: normal !important;
    margin-top: 0 !important;
    border-bottom: none !important;
    padding-bottom: 0 !important;
  }
`
