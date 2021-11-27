import { observable, hasCollected, autorun } from '../'

test('hasCollected', () => {
  const obs = observable({ value: '' })
  autorun(() => {
    expect(
      hasCollected(() => {
        obs.value
      })
    ).toBe(true)
    expect(hasCollected(() => {})).toBe(false)
    expect(hasCollected()).toBe(false)
  })
})
