import {
  useContext,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useState
} from 'react'
import { FormHeartSubscriber, LifeCycleTypes } from '@uform/core'
import { isFn, isStr, FormPath, isArr } from '@uform/shared'
import { IFormSpyProps } from '../types'
import FormContext, { BroadcastContext } from '../context'

export const FormSpy = (props: IFormSpyProps) => {
  const broadcast = useContext(BroadcastContext)
  const form = useContext(FormContext)
  const initializedRef = useRef(false)
  const [type, setType] = useState<string>(LifeCycleTypes.ON_FORM_INIT)
  const subscriber = useCallback<FormHeartSubscriber>(({ type }) => {
    if (initializedRef.current) return
    if (isStr(props.selector) && FormPath.parse(props.selector).match(type)) {
      setType(type)
    } else if (isArr(props.selector) && props.selector.indexOf(type) > -1) {
      setType(type)
    }
  }, [])
  useMemo(() => {
    initializedRef.current = true
    if (form) {
      form.subscribe(subscriber)
    } else if (broadcast) {
      broadcast.subscribe(subscriber)
    }
    initializedRef.current = false
  }, [])
  useEffect(() => {
    return () => {
      if (form) {
        form.unsubscribe(subscriber)
      } else if (broadcast) {
        broadcast.unsubscribe(subscriber)
      }
    }
  }, [])
  if (isFn(props.children)) {
    return props.children(
      form ? form : broadcast && broadcast.getContext(),
      type
    )
  } else {
    return props.children
  }
}

FormSpy.displayName = 'ReactInternalFormSpy'

FormSpy.defaultProps = {
  selector: `*`
}
