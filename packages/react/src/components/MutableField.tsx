import React, { Fragment } from 'react'
import { isFn } from '@formily/shared'
import { observer } from 'mobx-react-lite'
interface IInternalFieldProps {
  field: FormilyCore.Field
  children?:
    | ((field: FormilyCore.Field, form: FormilyCore.Form) => React.ReactChild)
    | React.ReactNode
}

const MutableInnerField: React.FC<IInternalFieldProps> = ({
  field,
  children
}) => {
  if (!field) return null
  const state = field.getState()
  const results = isFn(children) ? children(field, field.form) : children
  if (!state) return null
  if (state.display !== 'visibility') return null
  if (state.decorator) {
    return React.createElement(
      state.decorator[0] || React.Fragment,
      state.decorator[0] ? state.decorator[1] : {},
      React.createElement(
        state.component[0] || React.Fragment,
        state.component[0] ? state.component[1] : {},
        results
      )
    )
  } else if (state.component) {
    return React.createElement(
      state.component[0] || React.Fragment,
      state.component[0] ? state.component[1] : {},
      results
    )
  }
  return <Fragment>{results}</Fragment>
}

export const MutableField = observer(MutableInnerField)

MutableField.displayName = 'MutableField'
