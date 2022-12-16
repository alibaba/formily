import React, { Fragment, useState } from 'react'
import { Tabs, Badge } from 'antd'
import { ArrayField } from '@formily/core'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
  ReactFC,
} from '@formily/react'
import { TabsProps } from 'antd/lib/tabs'

interface IFeedbackBadgeProps {
  index: number
}

const FeedbackBadge: ReactFC<IFeedbackBadgeProps> = observer(
  (props) => {
    const field = useField<ArrayField>()
    const tab = `${field.title || 'Untitled'} ${props.index + 1}`
    const errors = field.errors.filter((error) =>
      error.address.includes(`${field.address}.${props.index}`)
    )
    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {tab}
        </Badge>
      )
    }
    return <Fragment>{tab}</Fragment>
  },
  {
    scheduler(request) {
      requestAnimationFrame(request)
    },
  }
)

export const ArrayTabs: React.FC<React.PropsWithChildren<TabsProps>> = observer(
  (props) => {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()
    const [activeKey, setActiveKey] = useState('tab-0')
    const value = Array.isArray(field.value) ? field.value : []
    const dataSource = value?.length ? value : [{}]
    const onEdit = (targetKey: any, type: 'add' | 'remove') => {
      if (type == 'add') {
        const id = dataSource.length
        if (field?.value?.length) {
          field.push(null)
        } else {
          field.push(null, null)
        }
        setActiveKey(`tab-${id}`)
      } else if (type == 'remove') {
        const index = Number(targetKey.match(/-(\d+)/)?.[1])
        if (index - 1 > -1) {
          setActiveKey(`tab-${index - 1}`)
        }
        field.remove(index)
      }
    }
    return (
      <Tabs
        {...props}
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key)
        }}
        type="editable-card"
        onEdit={onEdit}
      >
        {dataSource?.map((item, index) => {
          const items = Array.isArray(schema.items)
            ? schema.items[index]
            : schema.items
          const key = `tab-${index}`
          return (
            <Tabs.TabPane
              key={key}
              forceRender
              closable={index !== 0}
              tab={<FeedbackBadge index={index} />}
            >
              <RecursionField schema={items} name={index} />
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    )
  },
  {
    scheduler(request) {
      requestAnimationFrame(request)
    },
  }
)

export default ArrayTabs
