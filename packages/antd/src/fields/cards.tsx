import React, { Fragment, ReactElement } from 'react'
import styled from 'styled-components'
import { registerFormField } from '@uform/react'
import { Card } from 'antd'
import { toArr } from '@uform/utils'
import { ArrayField } from './array'

const FormCardsField = styled(
  class extends ArrayField {
    public renderOperations(item, index) {
      return (
        <Fragment>
          {this.renderRemove(index, item)}
          {this.renderMoveDown(index, item)}
          {this.renderMoveUp(index)}
          {this.renderExtraOperations(index)}
        </Fragment>
      )
    }

    public renderCardEmpty = (title: string | ReactElement) => {
      return (
        <Card
          style={this.getProps('style')}
          title={title}
          className="card-list"
        >
          {this.renderEmpty()}
        </Card>
      )
    }

    public render() {
      const { value, className, schema, renderField } = this.props
      const {
        title,
        style,
        className: cls,
        renderAddition,
        renderRemove,
        renderEmpty,
        renderMoveDown,
        renderMoveUp,
        renderOperations,
        ...others
      } = this.getProps() || ({} as any)

      return (
        <div
          className={`${className} ${cls}`}
          style={style}
          onClick={this.onClearErrorHandler()}
        >
          {toArr(value).map((item, index) => {
            return (
              <Card
                {...others}
                title={
                  <span>
                    {index + 1}. {title || schema.title}
                  </span>
                }
                className="card-list"
                key={index}
                extra={this.renderOperations(item, index)}
              >
                {renderField(index)}
              </Card>
            )
          })}
          {value.length === 0 && this.renderCardEmpty(title)}
          <div className="addition-wrapper">
            {value.length > 0 && this.renderAddition()}
          </div>
        </div>
      )
    }
  }
)`
  .ant-card-body {
    padding-top: 30px;
    padding-bottom: 0 !important;
  }
  .ant-card-head-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-card {
    display: block;
    margin-bottom: 0px;
    background: #fff;
    .array-empty-wrapper {
      display: flex;
      justify-content: center;
      cursor: pointer;
      margin-bottom: 0px;
      &.disabled {
        cursor: default;
      }
      .array-empty {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        align-items: center;
        img {
          margin-bottom: 16px;
          height: 85px;
        }
        .next-btn-text {
          color: #888;
        }
        .next-icon:before {
          width: 16px !important;
          font-size: 16px !important;
          margin-right: 5px;
        }
      }
    }

    .next-card {
      box-shadow: none;
    }
    .card-list {
      box-shadow: none;
      border: 1px solid #eee;
    }

    .array-item-addition {
      box-shadow: none;
      border: 1px solid #eee;
      transition: all 0.35s ease-in-out;
      &:hover {
        border: 1px solid #ccc;
      }
    }
  }
  .ant-card.card-list {
    margin-top: 20px;
  }

  .addition-wrapper .array-item-addition {
    margin-top: 20px;
    margin-bottom: 3px;
  }
  .cricle-btn {
    margin-bottom: 0;
  }
  .ant-card-extra {
    display: flex;
  }
  .array-item-addition {
    background: #fff;
    display: flex;
    cursor: pointer;
    padding: 10px 0;
    justify-content: center;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
    .next-btn-text {
      color: #888;
    }
    .next-icon:before {
      width: 16px !important;
      font-size: 16px !important;
      margin-right: 5px;
    }
  }
  .card-list:first-child {
    margin-top: 0 !important;
  }
`

registerFormField('cards', FormCardsField)
