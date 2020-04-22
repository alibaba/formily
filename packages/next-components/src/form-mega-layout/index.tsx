import { Form } from '@alifd/next'
import { normalizeCol, pickFormItemProps, pickNotFormItemProps } from '@formily/next'
import { getMegaLayout, getNextComputeStyle } from '@formily/react-shared-components'
import { createVirtualBox } from '@formily/react-schema-renderer'
import styled, { css } from 'styled-components'

const { MegaLayout } = getMegaLayout({
    FormItem: Form.Item,
    computeStyle: getNextComputeStyle({ css }),
    styled,
    util: {
      normalizeCol,
      pickFormItemProps,
      pickNotFormItemProps
    }
})

const FormMegaLayout = createVirtualBox('mega-layout', MegaLayout)

export {
    MegaLayout,
    FormMegaLayout,
}