import React, { Component, useContext, useMemo, useState } from 'react'
import { IBroadcast } from '@uform/utils'
import { Broadcast, isFn } from '../utils'
import { BroadcastContext } from './context'

type ChildrenFunction = (broadcast: IBroadcast) => React.ReactNode

interface IFormProviderProps {
  children?: React.ReactNode | ChildrenFunction
}

export class FormProvider extends Component<IFormProviderProps> {
  public static displayName = 'FormProvider'

  public broadcast = new Broadcast()

  public componentWillUnmount() {
    this.broadcast.unsubscribe()
  }

  public render() {
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

export interface IOption {
  testingAct?(callback): void
}

export interface IFormState {
  status?: any
  state?: object
  schema?: object
}

export const useForm = (options: IOption = {}) => {
  const [value, setState] = useState({})
  const broadcast = useContext(BroadcastContext)
  let initialized = false
  let finalValue = value

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
            finalValue = {
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

  const { status, state, schema } = finalValue as IFormState

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

export const FormConsumer = ({
  children,
  testingAct
}: {
// TODO formApi
children: React.ReactElement | ((formApi: any) => React.ReactElement)
testingAct?: IOption['testingAct']
}): React.ReactElement => {
  const formApi = useForm({ testingAct })
  if (!formApi) {
    return <React.Fragment />
  }
  if (isFn(children)) {
    return children(formApi)
  } else {
    return children || <React.Fragment />
  }
}
