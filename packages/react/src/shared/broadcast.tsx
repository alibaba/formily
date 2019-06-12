import React, { Component, useContext, useMemo, useState } from 'react'
import { IBroadcast } from '@uform/utils'
import { Broadcast, isFn } from '../utils'
import { BroadcastContext } from './context'

interface ChildrenFunction {
  (broadcast: IBroadcast): React.ReactNode
}

interface FormProviderProps {
  children?: React.ReactNode | ChildrenFunction
}

export class FormProvider extends Component<FormProviderProps> {
  static displayName = 'FormProvider'

  broadcast = new Broadcast()

  componentWillUnmount() {
    this.broadcast.unsubscribe()
  }

  render() {
    const { children } = this.props
    return (
      <BroadcastContext.Provider value={this.broadcast}>
        {isFn(children) ? children(this.broadcast) : children}
      </BroadcastContext.Provider>
    )
  }
}

export const FormBridge = () => (Target: React.ComponentType) => {
  const Broadcast = props => {
    const broadcast = useContext(BroadcastContext)
    if (!broadcast) {
      return <FormProvider>{broadcast => <Target {...props} broadcast={broadcast} />}</FormProvider>
    }
    return <Target {...props} broadcast={broadcast} />
  }

  Broadcast.displayName = 'FormBroadcast'

  return Broadcast
}

export interface Option {
  testingAct?(callback): void
}

export interface FormState {
  status?: any
  state?: Object
  schema?: Object
}

export const useForm = (options: Option = {}) => {
  let [value, setState] = useState({})
  let broadcast = useContext(BroadcastContext)
  let initialized = false
  useMemo(() => {
    if (broadcast) {
      broadcast.subscribe(({ type, state, schema }) => {
        if (type !== 'submit' && type !== 'reset') {
          if (initialized) {
            if (options.testingAct) {
              // just for test
              options.testingAct(() =>
                setState({
                  status: type,
                  state,
                  schema
                })
              )
            } else {
              setState({
                status: type,
                state,
                schema
              })
            }
          } else {
            value = {
              status: type,
              state,
              schema
            }
          }
        }
      })
      initialized = true
    }
  }, [broadcast])

  const { status, state, schema } = value as FormState

  return {
    status,
    state,
    schema,
    submit: () => {
      if (broadcast) {
        broadcast.notify({ type: 'submit' })
      }
    },
    reset: () => {
      if (broadcast) {
        broadcast.notify({ type: 'reset' })
      }
    },
    dispatch: (name, payload) => {
      if (broadcast) {
        broadcast.notify({ type: 'dispatch', name, payload })
      }
    }
  }
}

export const FormConsumer = ({ children, testingAct }) => {
  const formApi = useForm({ testingAct })
  if (!formApi) return <React.Fragment />
  if (isFn(children)) {
    return children(formApi)
  } else {
    return children || <React.Fragment />
  }
}
