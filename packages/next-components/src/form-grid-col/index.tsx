import React from 'react'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Grid } from '@alifd/next'
import { ColProps } from '@alifd/next/types/grid'
const { Col } = Grid

export const FormGridCol = createVirtualBox<ColProps>('grid-col', props => {
  return <Col {...props}>{props.children}</Col>
})

export default FormGridCol
