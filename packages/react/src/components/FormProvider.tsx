import React from 'react'
import { useAttach } from '../hooks/useAttach'
import { FormContext } from '../shared'
import { IProviderProps } from '../types'

export const FormProvider: React.FC<IProviderProps> = props => {
  const form = useAttach(props.form)
  return (
    <FormContext.Provider value={form}>{props.children}</FormContext.Provider>
  )
}

FormProvider.displayName = 'FormProvider'
