import React from 'react'
import { useAutoRecycle } from '../hooks/useAutoRecycle'
import { FormContext } from '../shared'
import { IProviderProps } from '../types'

export const FormProvider: React.FC<IProviderProps> = props => {
  useAutoRecycle(props.form)
  return (
    <FormContext.Provider value={props.form}>
      {props.children}
    </FormContext.Provider>
  )
}

FormProvider.displayName = 'FormProvider'
