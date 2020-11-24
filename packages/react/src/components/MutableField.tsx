import React from 'react'
import { observer } from '../shared'

interface IInternalFieldProps {
  field: FormilyCore.Field
}

const InternalField: React.FC<IInternalFieldProps> = ({ field, children }) => {
  const state = field.getState()
  if (!state) return null
  if (state.display !== 'visibility') return null
  if (state.decorator) {
    return React.createElement(
      state.decorator?.[0] || React.Fragment,
      state.decorator?.[1],
      React.createElement(field.component?.[0], state.component?.[1], children)
    )
  } else {
    return React.createElement(
      state.component?.[0] || React.Fragment,
      state.component?.[1],
      children
    )
  }
}

export const MutableField = observer(InternalField)
