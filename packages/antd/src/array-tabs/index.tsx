import React, { useState } from 'react'
import { Tabs, Badge } from 'antd'
import { ArrayField } from '@formily/core'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { TabsProps } from 'antd/lib/tabs'

export const ArrayTabs: React.FC<TabsProps> = observer((props) => {
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
      const index = targetKey.match(/-(\d+)/)?.[1]
      field.remove(Number(index))
      if (activeKey === targetKey) {
        setActiveKey(`tab-${index - 1}`)
      }
    }
  }
  const badgedTab = (index: number) => {
    const tab = `${field.title || 'Untitled'} ${index + 1}`
    const path = field.address.concat(index)
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `*(${path},${path}.*)`,
    })
    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {tab}
        </Badge>
      )
    }
    return tab
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
          <Tabs.TabPane key={key} closable={index !== 0} tab={badgedTab(index)}>
            <RecursionField schema={items} name={index} />
          </Tabs.TabPane>
        )
      })}
    </Tabs>
  )
})

export default ArrayTabs
