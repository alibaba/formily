import React, { useMemo } from 'react'
import { BroadcastContext } from '../context'
import { Broadcast } from '../shared'

const { Provider } = BroadcastContext

export const FormProvider: React.FunctionComponent = props => {
  const broadcast = useMemo<Broadcast>(() => {
    return new Broadcast()
  }, [])
  return <Provider value={broadcast}>{props.children}</Provider>
}
