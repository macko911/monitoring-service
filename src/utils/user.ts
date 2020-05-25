import { client, q } from "./db"
import { User } from '../models'

/**
 * Fetch user from DB according to specified email.
 * @param email user email
 */
export async function getUser (email: string) {
  try {
    const res = await client.query<{data: User}>(
      q.Get(
        q.Match(
          q.Index('User_by_email'),
          email,
        )
      )
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}
