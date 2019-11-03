import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  // FormPath,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  // createVirtualBox,
  registerFieldMiddleware
} from '../index'
import { toArr } from '@uform/shared'
import { render, wait, /* fireEvent, act */ } from '@testing-library/react'

registerFieldMiddleware(Field => {
  return props => {
    if (typeof props.editable === 'boolean' && props.name !== '') {
      if (!props.editable) return <div>empty</div>
    }
    return (
      <div>
        {props.schema.title}
        <Field {...props} />
        {props.errors && props.errors.length ? (
          <div data-testid={'test-errors'}>{props.errors}</div>
        ) : (
          ''
        )}
      </div>
    )
  }
})

beforeEach(() => {
  jest.setTimeout(10000)
  registerFormField(
    'string',
    connect()(props => <input {...props} value={props.value || ''} />)
  )
  registerFormField('array', props => {
    const { value, mutators, renderField } = props
    return (
      <Fragment>
        {toArr(value).map((item, index) => {
          return (
            <div data-testid="item" key={index}>
              {renderField(index)}
            </div>
          )
        })}
        <button
          type="button"
          onClick={() => {
            mutators.push({aa: ""})
          }}
        >
          Add Field
        </button>
      </Fragment>
    )
  })
})

// test('update editable by setFieldState', async () => {
//   const actions = createFormActions()
//   const TestComponent = () => (
//     <SchemaForm
//       actions={actions}
//       effects={($, { setFieldState }) => {
//         $('onFormInit').subscribe(() => {
//           setFieldState('aaa', state => {
//             state.props.title = 'text'
//             state.rules = [
//               {
//                 required: true,
//                 message: 'field is required'
//               }
//             ]
//             state.props.editable = false
//           })
//         })
//       }}
//     >
//       <Fragment>
//         <Field name="aaa" type="string" />
//         <button type="submit" data-testid="btn">
//           Submit
//         </button>
//       </Fragment>
//     </SchemaForm>
//   )

//   const { queryByText } = render(<TestComponent />)
//   await wait(() => {
//     expect(queryByText('text')).toBeNull()
//   })
//   await actions.setFieldState('aaa', state => {
//     state.editable = true
//   })
//   await wait(() => {
//     expect(queryByText('text')).toBeVisible()
//   })
// })
