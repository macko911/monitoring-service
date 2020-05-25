import { object, string } from 'yup'

import { validateSchema } from './validation'

const testSchema = object().shape({
  id: string().required(),
})

describe('utils/validation', () => {
  test('validateSchema passes on valid data', async () => {
    const validData = {
      id: 'testId',
    }
    await expect(validateSchema(testSchema, validData))
      .resolves
      .toBeTruthy()
  })

  test('validateSchema throws error on invalid data', async () => {
    const invalidData = {}
    await expect(validateSchema(testSchema, invalidData))
      .rejects
      .toThrow('ValidationError')
  })
})
