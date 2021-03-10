import { useCallback, useState } from 'react'

const EMPTY_ARRAY: any[] = []

export function useForceUpdate() {
  const [, setTick] = useState(0)

  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, EMPTY_ARRAY)

  return update
}
