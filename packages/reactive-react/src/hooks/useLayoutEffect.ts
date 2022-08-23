import { useEffect, useLayoutEffect as _useLayoutEffect } from 'react'

export const useLayoutEffect =
  typeof document !== 'undefined' ? _useLayoutEffect : useEffect
