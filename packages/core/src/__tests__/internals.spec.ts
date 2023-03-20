import {
  getValuesFromEvent,
  matchFeedback,
  patchFieldStates,
  deserialize,
  isHTMLInputEvent,
} from '../shared/internals'
import { createForm } from '../'
import { attach } from './shared'

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

test('patchFieldStates should be sequence', () => {
  const form = attach(createForm())
  attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createField({
      name: 'input',
      basePath: 'array.0',
    })
  )
  attach(
    form.createField({
      name: 'input',
      basePath: 'array.1',
    })
  )
  const before = Object.keys(form.fields)
  form.fields['array'].move(1, 0)
  const after = Object.keys(form.fields)
  expect(after).toEqual(before)

  const form2 = attach(createForm())
  attach(
    form2.createField({
      name: 'field1',
      title: 'Field 1',
    })
  )
  attach(
    form2.createField({
      name: 'field2',
      title: 'Field 1',
    })
  )

  patchFieldStates(form2.fields, [
    {
      type: 'update',
      address: 'field2',
      oldAddress: 'field1',
      payload: form2.field1,
    },
    {
      type: 'update',
      address: 'field1',
      oldAddress: 'field2',
      payload: form2.field2,
    },
  ])

  expect(Object.keys(form2.fields)).toEqual(['field1', 'field2'])
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
  expect(
    isHTMLInputEvent({ target: { tagName: 'INPUT', value: null } })
  ).toBeTruthy()
  expect(isHTMLInputEvent({ target: { tagName: 'INPUT' } })).toBeFalsy()
  expect(isHTMLInputEvent({ target: { tagName: 'DIV' } })).toBeFalsy()
  expect(isHTMLInputEvent({ target: {}, stopPropagation() {} })).toBeFalsy()
  expect(isHTMLInputEvent({})).toBeFalsy()
})
