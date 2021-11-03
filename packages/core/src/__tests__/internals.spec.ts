import {
  getValuesFromEvent,
  matchFeedback,
  patchFieldStates,
  deserialize,
  isHTMLInputEvent,
} from '../shared/internals'

test('getValuesFromEvent', () => {
  expect(getValuesFromEvent([{ target: { value: 123 } }])).toEqual([123])
  expect(getValuesFromEvent([{ target: { checked: true } }])).toEqual([true])
  expect(getValuesFromEvent([{ target: {} }])).toEqual([undefined])
  expect(getValuesFromEvent([{ target: null }])).toEqual([{ target: null }])
  expect(getValuesFromEvent([123])).toEqual([123])
  expect(getValuesFromEvent([null])).toEqual([null])
})

test('empty', () => {
  expect(matchFeedback()).toBeFalsy()
})

test('patchFieldStates', () => {
  const fields = {}
  patchFieldStates(fields, [{ type: 'update', address: 'aaa', payload: null }])
  patchFieldStates(fields, [
    { type: 'update3' as any, address: 'aaa', payload: null },
  ])
  expect(fields).toEqual({})
})

test('deserialize', () => {
  expect(deserialize(null, null)).toBeUndefined()
  expect(
    deserialize(
      {},
      {
        parent: null,
      }
    )
  ).toEqual({})
})

test('isHTMLInputEvent', () => {
  expect(isHTMLInputEvent({ target: { checked: true } })).toBeTruthy()
  expect(isHTMLInputEvent({ target: { value: 123 } })).toBeTruthy()
  expect(isHTMLInputEvent({ target: { tagName: 'INPUT' } })).toBeTruthy()
  expect(isHTMLInputEvent({ target: { tagName: 'DIV' } })).toBeFalsy()
  expect(isHTMLInputEvent({ target: {}, stopPropagation() {} })).toBeTruthy()
  expect(isHTMLInputEvent({})).toBeFalsy()
})
