import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  FormProvider,
  createForm,
  ArrayField,
  ObjectField,
  VoidField,
  Field,
  useField,
} from '../'
import { ReactiveField } from '../components/ReactiveField'
import { expectThrowError } from './shared'
type InputProps = {
  value?: string
  onChange?: (...args: any) => void
}

const Decorator: React.FC = (props) => <div>{props.children}</div>
const Input: React.FC<InputProps> = (props) => (
  <input
    {...props}
    value={props.value || ''}
    data-testid={useField().path.toString()}
  />
)

const Normal = () => <div></div>

test('render field', async () => {
  const form = createForm()
  const onChange = jest.fn()
  const { getByTestId, queryByTestId, unmount } = render(
    <FormProvider form={form}>
      <Field
        name="aa"
        decorator={[Decorator]}
        component={[Input, { onChange }]}
      />
      <ArrayField name="bb" decorator={[Decorator]}>
        <div data-testid="bb-children"></div>
      </ArrayField>
      <ObjectField name="cc" decorator={[Decorator]}>
        <Field name="mm" decorator={[Decorator]} component={[Input]} />
        <ObjectField name="pp" decorator={[Decorator]} />
        <ArrayField name="tt" decorator={[Decorator]} />
        <VoidField name="ww" />
      </ObjectField>
      <VoidField name="dd" decorator={[Decorator]}>
        {() => (
          <div data-testid="dd-children">
            <Field name="oo" decorator={[Decorator]} component={[Input]} />
          </div>
        )}
      </VoidField>
      <VoidField name="xx" decorator={[Decorator]} component={[Normal]} />
      <Field
        name="ee"
        visible={false}
        decorator={[Decorator]}
        component={[Input]}
      />
      <Field name="ff" decorator={[]} component={[]} />
      <Field name="gg" decorator={null} component={null} />
      <Field name="hh" decorator={[null]} component={[null, null]} />
      <Field
        name="kk"
        decorator={[Decorator]}
        component={[Input, { onChange: null }]}
      />
    </FormProvider>
  )
  expect(form.mounted).toBeTruthy()
  expect(form.query('aa').get().mounted).toBeTruthy()
  expect(form.query('bb').get().mounted).toBeTruthy()
  expect(form.query('cc').get().mounted).toBeTruthy()
  expect(form.query('dd').void.get().mounted).toBeTruthy()
  fireEvent.change(getByTestId('aa'), {
    target: {
      value: '123',
    },
  })
  fireEvent.change(getByTestId('kk'), {
    target: {
      value: '123',
    },
  })
  expect(onChange).toBeCalledTimes(1)
  expect(getByTestId('bb-children')).not.toBeUndefined()
  expect(getByTestId('dd-children')).not.toBeUndefined()
  expect(queryByTestId('ee')).toBeNull()
  expect(form.query('aa').value).toEqual('123')
  expect(form.query('kk').value).toEqual('123')
  unmount()
})

test('render field no context', () => {
  expectThrowError(() => {
    return (
      <>
        <Field name="aa">{() => <div></div>}</Field>
        <ArrayField name="bb">
          <div></div>
        </ArrayField>
        <ObjectField name="cc" />
        <VoidField name="dd" />
      </>
    )
  })
})

test('ReactiveField', () => {
  render(<ReactiveField field={null} />)
  render(<ReactiveField field={null}>{() => <div></div>}</ReactiveField>)
})
