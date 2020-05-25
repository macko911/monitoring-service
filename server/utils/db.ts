import faunadb from 'faunadb'

/**
 * shorthand to all database operations
 */
export const q = faunadb.query

/**
 * Crate FaunaDb client to operate on our database
 * Database secret is defined in .env file in root of project
 */
export const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET,
})
