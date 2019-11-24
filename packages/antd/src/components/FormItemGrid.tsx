import React, { Fragment } from 'react'
import { CompatAntdFormItem } from '../compat/FormItem'
import { createVirtualBox } from '@uform/react-schema-renderer'
import { toArr } from '@uform/shared'
import { Row, Col } from 'antd'
import { RowProps, ColProps } from 'antd/lib/grid'
import { FormItemProps as ItemProps } from 'antd/lib/form'
import { IFormItemGridProps, IItemProps } from '../types'
import { normalizeCol } from '../shared'

export const FormItemGrid = createVirtualBox<
  React.PropsWithChildren<IFormItemGridProps & ItemProps>
>('grid', props => {
  const {
    cols: rawCols,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    title,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    description,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    help,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extra,
    ...selfProps
  } = props
  const children = toArr(props.children)
  const cols = toArr(rawCols).map(col => normalizeCol(col))
  const childNum = children.length

  if (cols.length < childNum) {
    let offset: number = childNum - cols.length
    let lastSpan: number =
      24 -
      cols.reduce((buf, col) => {
        return (
          buf +
          Number(col.span ? col.span : 0) +
          Number(col.offset ? col.offset : 0)
        )
      }, 0)
    for (let i = 0; i < offset; i++) {
      cols.push({ span: Math.floor(lastSpan / offset) })
    }
  }
  const grids = (
    <Row {...selfProps}>
      {children.reduce((buf, child, key) => {
        return child
          ? buf.concat(
              <Col key={key} {...cols[key]}>
                {child}
              </Col>
            )
          : buf
      }, [])}
    </Row>
  )

  if (title) {
    return (
      <CompatAntdFormItem label={title} help={description} extra={extra}>
        {grids}
      </CompatAntdFormItem>
    )
  }
  return <Fragment>{grids}</Fragment>
})

export const FormGridRow = createVirtualBox<RowProps & ItemProps & IItemProps>(
  'grid-row',
  props => {
    const { title, description, extra } = props
    const grids = <Row {...props}>{props.children}</Row>
    if (title) {
      return (
        <CompatAntdFormItem label={title} help={description} extra={extra}>
          {grids}
        </CompatAntdFormItem>
      )
    }
    return grids
  }
)

export const FormGridCol = createVirtualBox<ColProps>('grid-col', props => {
  return <Col {...props}>{props.children}</Col>
})
