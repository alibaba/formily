import React from 'react'
import { ILayoutProps } from '../types'
import { LayoutContext } from '../context'
import { useLayout, useLayoutItem } from '../hooks/useLayout'

// case1: form -> layout(inline/lablCol/wrappreCol)
// case2: layout -> layout
// case3: layout -> nested formitem
// case4: layout -> array nested formitem
export const Layout: React.FC<ILayoutProps> = ({
  children,
  required, label, addonBefore, addonAfter, description,
  ...props
}) => {
  const layout = useLayout({ ...props, isLayout: true })
  return <LayoutContext.Provider value={layout}>
    {children({
      ...layout,
      label,
      required,
      addonBefore,
      addonAfter,
      description,
    })}
  </LayoutContext.Provider>
}

// 1. labelAlign
// 2. inset
// 3. full
// 4. labelWidth/wrapperWidth
// 5. labelCol/wrapperCol
export const LayoutItem = ({ children, ...props }) => {
  const layoutItem = useLayoutItem(props)
  return children(layoutItem)
}