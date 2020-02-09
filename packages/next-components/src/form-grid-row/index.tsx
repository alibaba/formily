import React from 'react'
import { NextSchemaFieldAdaptor } from '@formily/next'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Grid } from '@alifd/next'
import { RowProps } from '@alifd/next/types/grid'
import { ItemProps } from '@alifd/next/types/form'
import { IItemProps } from '../types'
const { Row } = Grid

export const FormGridRow = createVirtualBox<RowProps & ItemProps & IItemProps>(
  'grid-row',
  props => {
    const { title, description, extra } = props
    const grids = <Row {...props}>{props.children}</Row>
    if (title) {
      return (
        <NextSchemaFieldAdaptor label={title} help={description} extra={extra}>
          {grids}
        </NextSchemaFieldAdaptor>
      )
    }
    return grids
  }
)

export default FormGridRow
