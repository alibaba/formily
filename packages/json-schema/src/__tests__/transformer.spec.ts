import { Schema } from '../schema'

test('transform field props', () => {
  const schema = new Schema({
    name: 'aaa',
    type: 'string',
  })
  const props = schema.toFieldProps()
  expect(props.name).not.toBeUndefined()
  expect(props.reactions).not.toBeUndefined()
})
