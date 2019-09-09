import React from 'react'
import { useVirtualField } from '../hooks/useVirtualField'
import { isFn } from '@uform/shared'
import { IVirtualFieldProps } from '../types'

export const VirtualField = (props: IVirtualFieldProps) => {
  const { state, props: innerProps } = useVirtualField(props)
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

VirtualField.displayName = 'ReactInternalVirtualField'

VirtualField.defaultProps = {
  path: ''
}
