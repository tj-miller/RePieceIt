import { get } from './http-client'
import type { UserResponse } from '@shared/contracts/users'

export async function listUsers() {
  return get<UserResponse[]>('/users')
}
