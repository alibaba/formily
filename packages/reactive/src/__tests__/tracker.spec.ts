import { Tracker, observable } from '../'

test('base tracker', () => {
  const obs = observable<any>({})
  const fn = jest.fn()
  const view = () => {
    fn(obs.value)
  }
  const handler = () => {
    tracker.track(view)
  }
  const tracker = new Tracker(handler)

  tracker.track(view)
  obs.value = 123
  expect(fn).toBeCalledWith(undefined)
  expect(fn).toBeCalledWith(123)
  tracker.dispose()
})

test('nested tracker', () => {
  const obs = observable<any>({})
  const fn = jest.fn()
  const view = () => {
    obs.value = obs.value || 321
    fn(obs.value)
  }
  const handler = () => {
    tracker.track(view)
  }
  const tracker = new Tracker(handler)

  tracker.track(view)
  obs.value = 123
  expect(fn).toBeCalledWith(321)
  expect(fn).toBeCalledWith(123)
  expect(fn).toBeCalledTimes(2)
  tracker.dispose()
})
