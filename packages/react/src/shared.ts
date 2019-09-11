import React from 'react'

export interface IEventTargetOption {
  selected: boolean
  value: any
}

const isEvent = (candidate: React.SyntheticEvent): boolean =>
  !!(candidate && candidate.stopPropagation && candidate.preventDefault)

const isReactNative =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.product &&
  window.navigator.product === 'ReactNative'

const getSelectedValues = (options?: IEventTargetOption[]) => {
  const result = []
  if (options) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (option.selected) {
        result.push(option.value)
      }
    }
  }
  return result
}

export const getValueFromEvent = (event: any) => {
  if (isEvent(event)) {
    if (
      !isReactNative &&
      event.nativeEvent &&
      event.nativeEvent.text !== undefined
    ) {
      return event.nativeEvent.text
    }
    if (isReactNative && event.nativeEvent !== undefined) {
      return event.nativeEvent.text
    }

    const detypedEvent = event
    const {
      target: { type, value, checked, files },
      dataTransfer
    } = detypedEvent

    if (type === 'checkbox') {
      return !!checked
    }

    if (type === 'file') {
      return files || (dataTransfer && dataTransfer.files)
    }

    if (type === 'select-multiple') {
      return getSelectedValues(event.target.options)
    }
    return value
  }
  return event
}

const compactScheduler = ([raf, caf, priority], fresh: boolean) => {
  return [fresh ? callback => raf(priority, callback) : raf, caf]
}

const getScheduler = () => {
  if (!self.requestAnimationFrame) {
    return [self.setTimeout, self.clearTimeout]
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const scheduler = require('scheduler') as any
    return compactScheduler(
      [
        scheduler.scheduleCallback || scheduler.unstable_scheduleCallback,
        scheduler.cancelCallback || scheduler.unstable_cancelCallback,
        scheduler.NormalPriority || scheduler.unstable_NormalPriority
      ],
      !!scheduler.unstable_requestPaint
    )
  } catch (err) {
    return [self.requestAnimationFrame, self.cancelAnimationFrame]
  }
}

export const [raf, caf] = getScheduler()
