import { Form } from 'antd'
import { normalizeCol, pickFormItemProps, pickNotFormItemProps } from '@formily/antd'
import { getMegaLayout, getAntdComputeStyle } from '@formily/react-shared-components'
import { createVirtualBox } from '@formily/react-schema-renderer'
import styled, { css } from 'styled-components'

const { MegaLayout } = getMegaLayout({
    FormItem: Form.Item,
    computeStyle: getAntdComputeStyle({ css }),
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