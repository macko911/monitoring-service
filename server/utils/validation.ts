import { Schema } from 'yup'

export async function validateSchema (schema: Schema<object>, data: object) {
  try {
    await schema.validate(data)
    return true
  } catch (err) {
    throw Error(`ValidationError: ${err.message}`)
  }
}
