import { Reaction as MobxReaction, configure } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom'
import { useForceUpdate } from './useForceUpdate'

const Reaction: typeof MobxReaction = window['Mobx']?.Reaction || MobxReaction

if (window['Mobx']) {
  window['Mobx']?.configure({
    reactionScheduler: ReactDOM.unstable_batchedUpdates
  })
} else {
  configure({
    reactionScheduler: ReactDOM.unstable_batchedUpdates
  })
}

interface IReactionTracking {
  /** The Reaction created during first render, which may be leaked */
  reaction: MobxReaction
  /**
   * The time (in ticks) at which point we should dispose of the reaction
   * if this component hasn't yet been fully mounted.
   */
  cleanAt: number

  /**
   * Whether the component has yet completed mounting (for us, whether
   * its useEffect has run)
   */
  mounted?: boolean

  /**
   * Whether the observables that the component is tracking changed between
   * the first render and the first useEffect.
   */
  changedBeforeMount?: boolean
}

export interface UpdateScheduler {
  (update: () => void): void
}

export interface UpdateValidator {
  (): boolean
}

function createTrackingData(reaction: MobxReaction) {
  const trackingData: IReactionTracking = {
    cleanAt: Date.now() + CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS,
    reaction
  }
  return trackingData
}

/**
 * The minimum time before we'll clean up a Reaction created in a render
 * for a component that hasn't managed to run its effects. This needs to
 * be big enough to ensure that a component won't turn up and have its
 * effects run without being re-rendered.
 */
const CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS = 10_000

/**
 * The frequency with which we'll check for leaked reactions.
 */
const CLEANUP_TIMER_LOOP_MILLIS = 10_000

/**
 * Reactions created by components that have yet to be fully mounted.
 */
const uncommittedReactionRefs: Set<React.MutableRefObject<IReactionTracking | null>> = new Set()

/**
 * Latest 'uncommitted reactions' cleanup timer handle.
 */
let reactionCleanupHandle: ReturnType<typeof setTimeout> | undefined

function ensureCleanupTimerRunning() {
  if (reactionCleanupHandle === undefined) {
    reactionCleanupHandle = setTimeout(
      cleanUncommittedReactions,
      CLEANUP_TIMER_LOOP_MILLIS
    )
  }
}

function scheduleCleanupOfReactionIfLeaked(
  ref: React.MutableRefObject<IReactionTracking | null>
) {
  uncommittedReactionRefs.add(ref)

  ensureCleanupTimerRunning()
}

function recordReactionAsCommitted(
  reactionRef: React.MutableRefObject<IReactionTracking | null>
) {
  uncommittedReactionRefs.delete(reactionRef)
}

/**
 * Run by the cleanup timer to dispose any outstanding reactions
 */
function cleanUncommittedReactions() {
  reactionCleanupHandle = undefined

  // Loop through all the candidate leaked reactions; those older
  // than CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS get tidied.

  const now = Date.now()
  uncommittedReactionRefs.forEach(ref => {
    const tracking = ref.current
    if (tracking) {
      if (now >= tracking.cleanAt) {
        // It's time to tidy up this leaked reaction.
        tracking.reaction.dispose()
        ref.current = null
        uncommittedReactionRefs.delete(ref)
      }
    }
  })

  if (uncommittedReactionRefs.size > 0) {
    // We've just finished a round of cleanups but there are still
    // some leak candidates outstanding.
    ensureCleanupTimerRunning()
  }
}

function observerComponentNameFor(baseComponentName: string) {
  return `observer${baseComponentName}`
}

type ObserverOptions = {
  baseComponentName: string
  scheduler?: UpdateScheduler
  validator?: UpdateValidator
}

export function useObserver<T>(fn: () => T, options: ObserverOptions): T {
  const { validator, scheduler, baseComponentName } = {
    baseComponentName: 'observed',
    ...options
  }
  const forceUpdate = useForceUpdate()
  const unmountRef = React.useRef(false)
  // StrictMode/ConcurrentMode/Suspense may mean that our component is
  // rendered and abandoned multiple times, so we need to track leaked
  // Reactions.
  const reactionTrackingRef = React.useRef<IReactionTracking | null>(null)

  const scheduleUpdate = () => {
    if (typeof validator === 'function') {
      if (validator() === false) {
        return
      }
    }
    if (unmountRef.current) {
      return
    }
    if (typeof scheduler === 'function') {
      scheduler(() => {
        if (unmountRef.current) return
        forceUpdate()
      })
    } else {
      forceUpdate()
    }
  }

  if (!reactionTrackingRef.current) {
    // First render for this component (or first time since a previous
    // reaction from an abandoned render was disposed).

    const newReaction = new Reaction(
      observerComponentNameFor(baseComponentName),
      () => {
        // Observable has changed, meaning we want to re-render
        // BUT if we're a component that hasn't yet got to the useEffect()
        // stage, we might be a component that _started_ to render, but
        // got dropped, and we don't want to make state changes then.
        // (It triggers warnings in StrictMode, for a start.)
        if (trackingData.mounted) {
          // We have reached useEffect(), so we're mounted, and can trigger an update
          scheduleUpdate()
        } else {
          // We haven't yet reached useEffect(), so we'll need to trigger a re-render
          // when (and if) useEffect() arrives.  The easiest way to do that is just to
          // drop our current reaction and allow useEffect() to recreate it.
          newReaction.dispose()
          reactionTrackingRef.current = null
        }
      }
    )

    const trackingData = createTrackingData(newReaction)
    reactionTrackingRef.current = trackingData
    scheduleCleanupOfReactionIfLeaked(reactionTrackingRef)
  }

  const { reaction } = reactionTrackingRef.current!

  React.useEffect(() => {
    // Called on first mount only
    recordReactionAsCommitted(reactionTrackingRef)

    if (reactionTrackingRef.current) {
      // Great. We've already got our reaction from our render;
      // all we need to do is to record that it's now mounted,
      // to allow future observable changes to trigger re-renders
      reactionTrackingRef.current.mounted = true
    } else {
      // The reaction we set up in our render has been disposed.
      // This is either due to bad timings of renderings, e.g. our
      // component was paused for a _very_ long time, and our
      // reaction got cleaned up, or we got a observable change
      // between render and useEffect

      // Re-create the reaction
      reactionTrackingRef.current = {
        reaction: new Reaction(
          observerComponentNameFor(baseComponentName),
          () => {
            scheduleUpdate()
          }
        ),
        cleanAt: Infinity
      }
      scheduleUpdate()
    }

    return () => {
      unmountRef.current = true
      reactionTrackingRef.current!.reaction.dispose()
      reactionTrackingRef.current = null
    }
  }, [])

  // render the original component, but have the
  // reaction track the observables, so that rendering
  // can be invalidated (see above) once a dependency changes
  let rendering!: T
  let exception: any
  reaction.track(() => {
    try {
      rendering = fn()
    } catch (e) {
      exception = e
    }
  })

  if (exception) {
    throw exception // re-throw any exceptions caught during rendering
  }
  return rendering
}
