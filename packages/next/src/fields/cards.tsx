import React, { Fragment } from 'react'
import { Icon } from '@alifd/next'
import {
  registerFormField,
  ISchemaFieldComponentProps,
  SchemaField
} from '@uform/react-schema-renderer'
import { toArr, isFn } from '@uform/shared'
import { ArrayList } from '@uform/react-shared-components'
import { CircleButton, TextButton } from '../components/Button'
import { Card } from '@alifd/next'
import styled from 'styled-components'

const ArrayComponents = {
  CircleButton,
  TextButton,
  AdditionIcon: () => <Icon type="add" className="next-icon-first" />,
  RemoveIcon: () => (
    <Icon size="xs" type="ashbin" className="next-icon-first" />
  ),
  MoveDownIcon: () => (
    <Icon size="xs" type="arrow-down" className="next-icon-first" />
  ),
  MoveUpIcon: () => (
    <Icon size="xs" type="arrow-up" className="next-icon-first" />
  )
}

const FormCardsField = styled(
  (props: ISchemaFieldComponentProps & { className: string }) => {
    const { value, schema, className, editable, path, mutators } = props
    const {
      renderAddition,
      renderRemove,
      renderMoveDown,
      renderMoveUp,
      renderEmpty,
      renderExtraOperations,
      ...componentProps
    } = schema.getExtendsComponentProps() || {}
    const onAdd = () => {
      const items = Array.isArray(schema.items)
        ? schema.items[schema.items.length - 1]
        : schema.items
      mutators.push(items.getEmptyValue())
    }
    return (
      <div className={className}>
        <ArrayList
          value={value}
          minItems={schema.minItems}
          maxItems={schema.maxItems}
          editable={editable}
          components={ArrayComponents}
          renders={{
            renderAddition,
            renderRemove,
            renderMoveDown,
            renderMoveUp,
            renderEmpty
          }}
        >
          {toArr(value).map((item, index) => {
            return (
              <Card
                {...componentProps}
                className={`card-list-item`}
                key={index}
                contentHeight="auto"
                title={
                  <span>
                    {index + 1}. {componentProps.title || schema.title}
                  </span>
                }
                extra={
                  <Fragment>
                    <ArrayList.Remove
                      index={index}
                      onClick={() => mutators.remove(index)}
                    />
                    <ArrayList.MoveDown
                      index={index}
                      onClick={() => mutators.moveDown(index)}
                    />
                    <ArrayList.MoveUp
                      index={index}
                      onClick={() => mutators.moveUp(index)}
                    />
                    {isFn(renderExtraOperations)
                      ? renderExtraOperations(index)
                      : renderExtraOperations}
                  </Fragment>
                }
              >
                <SchemaField path={path.concat(index)} />
              </Card>
            )
          })}
          <ArrayList.Empty>
            {({ children }) => {
              return (
                <Card
                  {...componentProps}
                  className={`card-list-item card-list-empty`}
                  contentHeight="auto"
                  onClick={onAdd}
                >
                  <div className="empty-wrapper">{children}</div>
                </Card>
              )
            }}
          </ArrayList.Empty>
          <ArrayList.Addition>
            {({ children, isEmpty }) => {
              if (!isEmpty) {
                return (
                  <div className="array-cards-addition" onClick={onAdd}>
                    {children}
                  </div>
                )
              }
            }}
          </ArrayList.Addition>
        </ArrayList>
      </div>
    )
  }
)<ISchemaFieldComponentProps>`
  .next-card-body {
    padding-top: 30px;
    padding-bottom: 0 !important;
  }
  .next-card-head-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .next-card {
    display: block;
    margin-bottom: 0px;
    background: #fff;

    .next-card {
      box-shadow: none;
    }
    .card-list-item {
      box-shadow: none;
      border: 1px solid #eee;
    }
    .array-cards-addition {
      box-shadow: none;
      border: 1px solid #eee;
      transition: all 0.35s ease-in-out;
      &:hover {
        border: 1px solid #ccc;
      }
    }
    .empty-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
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
  .card-list-empty.card-list-item {
    cursor: pointer;
  }
  .next-card.card-list-item {
    margin-top: 20px;
  }

  .next-card-extra {
    display: flex;
    button {
      margin-right: 8px;
    }
  }
  .array-cards-addition {
    margin-top: 20px;
    margin-bottom: 3px;
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
  .card-list-item:first-child {
    margin-top: 0 !important;
  }
`

registerFormField('cards', FormCardsField)
registerFormField('array', FormCardsField)
