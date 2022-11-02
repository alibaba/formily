import { Path } from '../'

const { isPathPattern, match } = Path

test('isPathPattern', () => {
  expect(isPathPattern('obj')).toBeTruthy()
  expect(isPathPattern(['obj', 'aa'])).toBeTruthy()
  expect(isPathPattern(/^obj/)).toBeTruthy()

  const matcher = match('obj.aa')
  expect(isPathPattern(matcher)).toBeTruthy()
})
