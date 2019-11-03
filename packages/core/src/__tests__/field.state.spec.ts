import { FieldState } from '../state/field'

test('subscribe', () => {
  //todo
  const field = new FieldState({});
  expect(field.subscribe(() => {})).toEqual(1)
  expect(field.subscribe(() => {})).toEqual(2)
})
test('unsubscribe', () => {
  //todo
  const field = new FieldState({});
  expect(field.subscribe(() => {})).toEqual(1)
  field.unsubscribe(0)
  expect(field.subscribers[0]).toEqual(undefined)
})
test('batch', () => {
  //todo
  const field = new FieldState({});
  let a = 0
  const testBatchFunc = () => {
    a = a + 1
  }
  field.batch(testBatchFunc)
  expect(a).toEqual(1)
  expect(field.dirtys).toEqual({})
  expect(field.dirtyNum).toEqual(0)
  expect(field.batching).toEqual(false)
})
test('getState', () => {
  //todo
})
test('setState', () => {
  //todo
})
test('getSourceState', () => {
  //todo
})
test('setSourceState', () => {
  //todo
})
test('setState', () => {
  //todo
})
test('hasChanged', () => {
  //todo
})
test('getChanged', () => {
  //todo
})
