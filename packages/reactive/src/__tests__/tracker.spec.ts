import { Tracker, observable } from '../'

test('base tracker', () => {
  const obs = observable<any>({})
  const fn = jest.fn()
  const view = () => {
    fn(obs.value)
  }
  const scheduler = () => {
    tracker.track(view)
  }
  const tracker = new Tracker(scheduler)

  tracker.track(view)
  obs.value = 123
  expect(fn).nthCalledWith(1, undefined)
  expect(fn).nthCalledWith(2, 123)
  tracker.dispose()
})

test('nested tracker', () => {
  const obs = observable<any>({})
  const fn = jest.fn()
  const view = () => {
    obs.value = obs.value || 321
    fn(obs.value)
  }
  const scheduler = () => {
    tracker.track(view)
  }
  const tracker = new Tracker(scheduler)

  tracker.track(view)
  expect(fn).toBeCalledTimes(1)
  expect(fn).nthCalledWith(1, 321)
  obs.value = 123
  expect(fn).toBeCalledTimes(2)
  expect(fn).nthCalledWith(2, 123)
  tracker.dispose()
})

test('tracker recollect dependencies', () => {
  const obs = observable<any>({
    aa: 'aaa',
    bb: 'bbb',
    cc: 'ccc',
  })
  const fn = jest.fn()
  const view = () => {
    fn()
    if (obs.aa === 'aaa') {
      return obs.bb
    }
    return obs.cc
  }
  const scheduler = () => {
    tracker.track(view)
  }
  const tracker = new Tracker(scheduler)

  tracker.track(view)
  obs.aa = '111'
  obs.bb = '222'
  expect(fn).toBeCalledTimes(2)
  tracker.dispose()
})
