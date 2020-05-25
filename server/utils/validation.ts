import { Schema } from 'yup'

/**
 * Validates data against schema
 * Throws validation error if they don't match
 * @param schema yup schema
 * @param data data to validate against schema
 */
export async function validateSchema (schema: Schema<object>, data: object) {
  try {
    await schema.validate(data)
    return true
  } catch (err) {
    throw Error(`ValidationError: ${err.message}`)
  }
}
