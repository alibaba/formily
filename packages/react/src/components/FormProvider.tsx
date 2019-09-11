import React, { useMemo } from 'react'
import { BroadcastContext } from '../context'
import { Broadcast } from '@uform/shared'

const { Provider } = BroadcastContext

export const FormProvider = (props: { children?: React.ReactChildren }) => {
  const broadcast = useMemo<Broadcast>(() => {
    return new Broadcast()
  }, [])
  return <Provider value={broadcast}>{props.children}</Provider>
}
