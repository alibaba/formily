import { createForm } from '../index'

test('Increase lastValidateValue value processing during initialization', async () => {
  const inpueFieldValidate = jest.fn()
  const requriedFieldValidate = jest.fn()

  const form = createForm({
    initialValues: {
      requriedField: 'defaultValue'
    }
  })

  form.registerField('inpueField', {
    props: {
      requried: true,
      'x-rules': () =>
        new Promise(resolve => {
          inpueFieldValidate()

          resolve()
        })
    }
  })

  form.registerField('requriedField', {
    props: {
      requried: true,
      'x-rules': () =>
        new Promise(resolve => {
          requriedFieldValidate()

          resolve()
        })
    }
  })

  form.setValue('inpueField', 1111)
  await sleep(1000)
  expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
  expect(requriedFieldValidate).toHaveBeenCalledTimes(0)

  form.setValue('requriedField', 2222)
  await sleep(1000)
  expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
  expect(requriedFieldValidate).toHaveBeenCalledTimes(1)
})
