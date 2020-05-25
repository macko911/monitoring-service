import { client, q } from './db'
import { User } from '../models'

type UserResponse = {
  data: User;
}

/**
 * Fetch user from DB according to specified email.
 * @param email user email
 */
export async function getUserByEmail (email: string): Promise<User | void> {
  try {
    const res = await client.query<UserResponse>(
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

/**
 * Fetch user from DB according to specified user id.
 * @param email user email
 */
export async function getUserById (userId: string): Promise<User | void> {
  try {
    const res = await client.query<UserResponse>(
      q.Get(
        q.Match(
          q.Index('User_by_id'),
          userId,
        )
      )
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}
