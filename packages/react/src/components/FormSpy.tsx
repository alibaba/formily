import { useContext, useMemo, useRef, useEffect, useCallback } from 'react'
import { IForm, FormHeartSubscriber } from '@uform/core'
import { isFn, isStr, FormPath, isArr } from '@uform/shared'
import { IFormSpyProps } from '../types'
import { useForceUpdate } from '../hooks/useForceUpdate'
import FormContext from '../context'

export const FormSpy = (props: IFormSpyProps) => {
  const form = useContext<IForm>(FormContext)
  const initializedRef = useRef(false)
  const forceUpdate = useForceUpdate()
  const subscriber = useCallback<FormHeartSubscriber>(({ type }) => {
    if (initializedRef.current) return
    if (isStr(props.selector) && FormPath.parse(props.selector).match(type)) {
      forceUpdate()
    } else if (isArr(props.selector) && props.selector.indexOf(type) > -1) {
      forceUpdate()
    }
  }, [])
  useMemo(() => {
    if (form) {
      initializedRef.current = true
      form.subscribe(subscriber)
      initializedRef.current = false
    }
  }, [])
  useEffect(() => {
    if (form) {
      form.subscribe(subscriber)
    }
    return () => {
      if (form) {
        form.unsubscribe(subscriber)
      }
    }
  }, [])
  if (isFn(props.children)) {
    return props.children(form)
  } else {
    return props.children
  }
}

FormSpy.displayName = 'ReactInternalFormSpy'

FormSpy.defaultProps = {
  selector: '*'
}
