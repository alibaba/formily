import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { Form } from '@formily/antd'
import { observer } from '@formily/react'
import { useTree, usePrefix } from '@designable/react'
import { SchemaRenderContext } from './context'
import { SchemaNode } from './SchemaNode'
import './styles.less'

export interface ISchemaRenderWidgetProps {
  components?: {
    [key: string]: React.JSXElementConstructor<unknown>
  }
}

export const SchemaRenderWidget: React.FC<ISchemaRenderWidgetProps> = observer(
  (props) => {
    const tree = useTree()
    const prefix = usePrefix('schema-render')
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    if (!tree?.children?.length) return null
    return (
      <Form
        {...tree.props}
        feedbackLayout="terse"
        className={prefix}
        form={form}
      >
        <SchemaRenderContext.Provider value={props}>
          {tree.children.map((node) => {
            return <SchemaNode node={node} key={node.id} />
          })}
        </SchemaRenderContext.Provider>
      </Form>
    )
  }
)
