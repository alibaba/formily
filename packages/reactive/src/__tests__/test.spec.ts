import { observable, hasCollected, autorun } from '../'

test('hasCollected', () => {
  const obs = observable({ value: '' })
  autorun(() => {
    expect(
      hasCollected(() => {
        obs.value
      })
    ).toBeTruthy()
    expect(hasCollected(() => {})).toBeFalsy()
    expect(hasCollected()).toBeFalsy()
  })
})
