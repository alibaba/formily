import React from 'react'
import { useForm, useField } from '../hooks'
import { useAutoRecycle } from '../hooks/useAutoRecycle'
import { ReactiveField } from './ReactiveField'
import { VirtualFieldContext } from '../shared'
import { JSXComponent, IVirtualFieldProps } from '../types'

export const VirtualField = <D extends JSXComponent, C extends JSXComponent>(
  props: IVirtualFieldProps<D, C>
) => {
  const form = useForm()
  const parent = useField()
  const field = useAutoRecycle(
    form.createVirtualField({ basePath: parent?.path, ...props })
  )
  return (
    <VirtualFieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children}</ReactiveField>
    </VirtualFieldContext.Provider>
  )
}

VirtualField.displayName = 'VirtualField'
