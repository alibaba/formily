import React, { Fragment } from 'react'
import {
  NextSchemaFieldAdaptor,
  pickFormItemProps,
  pickNotFormItemProps
} from '@formily/next'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { toArr } from '@formily/shared'
import { Grid } from '@alifd/next'
import { ItemProps } from '@alifd/next/types/form'
import { IFormItemGridProps, IItemProps } from '../types'
import { normalizeCol } from '../shared'
const { Row, Col } = Grid

export const FormItemGrid = createVirtualBox<
  IFormItemGridProps & ItemProps & IItemProps
>('grid', props => {
  const {
    cols: rawCols,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    title,
    label
  } = props
  const formItemProps = pickFormItemProps(props)
  const gridProps = pickNotFormItemProps(props)
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
    <Row {...gridProps}>
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

  if (title || label) {
    return (
      <NextSchemaFieldAdaptor {...formItemProps}>
        {grids}
      </NextSchemaFieldAdaptor>
    )
  }
  return <Fragment>{grids}</Fragment>
})

export default FormItemGrid
