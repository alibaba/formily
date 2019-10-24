import React from 'react'
import { useField } from '../hooks/useField'
import { isFn } from '@uform/shared'
import { IMutators, IFieldState } from '@uform/core'
import { IFieldProps } from '../types'
import { getValueFromEvent } from '../shared'

const createFieldMutators = (
  mutators: IMutators,
  props: IFieldProps,
  state: IFieldState
): IMutators => {
  return {
    ...mutators,
    change: (...args) => {
      args[0] = isFn(props.getValueFromEvent)
        ? props.getValueFromEvent(...args)
        : args[0]
      mutators.change(...args.map(event => getValueFromEvent(event)))
      if (props.triggerType === 'onChange') {
        mutators.validate()
      }
    },
    blur: () => {
      mutators.blur()
      if (props.triggerType === 'onBlur') {
        mutators.validate()
      }
    }
  }
}

export const Field: React.FC<IFieldProps> = props => {
  const { state, props: innerProps, mutators, form } = useField(props)
  if (!state.visible || !state.display) return <React.Fragment />
  if (isFn(props.children)) {
    return props.children({
      form,
      state,
      props: innerProps,
      mutators: createFieldMutators(mutators, props, state)
    })
  } else {
    return <React.Fragment>{props.children}</React.Fragment>
  }
}

Field.displayName = 'ReactInternalField'

Field.defaultProps = {
  path: '',
  triggerType: 'onChange'
}
