import React from 'react'
import { useVField } from '../hooks/useVField'
import { isFn } from '@uform/shared'
import { IVFieldProps } from '../types'

export const Field = (props: IVFieldProps) => {
  const { state, props: innerProps } = useVField(props)
  if (!state.visible || !state.display) return <React.Fragment />
  if (isFn(props.children)) {
    return props.children({
      state,
      props: innerProps
    })
  } else {
    return props.children
  }
}

Field.defaultProps = {
  path: ''
}
