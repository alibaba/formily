import React from 'react'
import ReactDragListView from 'react-drag-listview'
import { IDragListViewProps } from './types'

export const DragListView: React.FC<IDragListViewProps> = ({
  children,
  ...props
}) => {
  return (
    <ReactDragListView
      handlerSelector=".drag-handler"
      nodeSelector=".drag-item"
      {...props}
    >
      {children}
    </ReactDragListView>
  )
}
