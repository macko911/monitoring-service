import faunadb from 'faunadb'

export const q = faunadb.query

export const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET,
})

export async function getCollection (name: string) {
  const res = await client.query(
    q.Query(q.Collection(name))
  )
  return res
}

export async function createDocument (name: string, data: object) {
  const res = await client.query(
    q.Create(q.Collection(name), { data })
  )
  console.log(res)
  return res
}
