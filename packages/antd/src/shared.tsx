import { useRef, useEffect, MutableRefObject } from 'react'
import { isArr, isFn } from '@formily/shared'
import moment from 'moment'

export const momentable = (value: any) => {
  return Array.isArray(value) ? value.map((val) => moment(val)) : moment(value)
}

export const formatMomentValue = (
  value: any,
  format: any,
  placeholder?: string
): string | string[] => {
  const formatDate = (date: any, format: any, i = 0) => {
    if (!date) return placeholder
    if (isArr(format)) {
      const _format = format[i]
      if (isFn(_format)) {
        return _format(date)
      }
      return date?.format ? date.format(_format) : date
    } else {
      if (isFn(format)) {
        return format(date)
      }
      return date?.format ? date.format(format) : date
    }
  }
  if (isArr(value)) {
    return value.map((val, index) => {
      return formatDate(val, format, index)
    })
  } else {
    return formatDate(value, format)
  }
}

const defaultEvent = 'click'

type EventType = MouseEvent | TouchEvent

type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>

type TargetElement = HTMLElement | Element | Document | Window

function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement
  }

  let targetElement: TargetElement | undefined | null

  if (typeof target === 'function') {
    targetElement = target()
  } else if ('current' in target) {
    targetElement = target.current
  } else {
    targetElement = target
  }

  return targetElement
}

export const useClickAway = (
  onClickAway: (event: EventType) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string = defaultEvent
) => {
  const onClickAwayRef = useRef(onClickAway)
  onClickAwayRef.current = onClickAway

  useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(target) ? target : [target]
      if (
        targets.some((targetItem) => {
          const targetElement = getTargetElement(targetItem) as HTMLElement
          return !targetElement || targetElement?.contains(event.target)
        })
      ) {
        return
      }
      onClickAwayRef.current(event)
    }

    document.addEventListener(eventName, handler)

    return () => {
      document.removeEventListener(eventName, handler)
    }
  }, [target, eventName])
}
