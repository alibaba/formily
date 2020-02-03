import React, { useMemo, useContext, Fragment } from 'react'
import { isFn } from '@formily/shared'
import { ArrayContext } from '../context'

export const useComponent = (name: string) => {
  const { components } = useContext(ArrayContext)
  return useMemo(() => {
    if (isFn(components[name]) || components[name].styledComponentId)
      return components[name]
    return (props: {}) => {
      return React.isValidElement(components[name]) ? (
        React.cloneElement(components[name], props)
      ) : (
        <Fragment />
      )
    }
  }, [])
}
