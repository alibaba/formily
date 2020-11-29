import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { isFn } from '@formily/shared'

interface IReactiveFieldProps {
  field: Formily.Core.Types.GeneralField
  children?:
    | ((
        field: Formily.Core.Types.GeneralField,
        form: Formily.Core.Models.Form
      ) => React.ReactChild)
    | React.ReactNode
}

const ReactiveInternal: React.FC<IReactiveFieldProps> = ({
  field,
  children
}) => {
  if (!field) return null
  const state = field.reduce()
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

ReactiveInternal.displayName = 'ReactiveField'

export const ReactiveField = observer(ReactiveInternal)
