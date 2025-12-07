import { useEffect, useState } from 'react'
import { listUsers } from '../services/users.service'
import type { UserResponse } from '@shared/contracts/users'

export function UsersList() {
  const [users, setUsers] = useState<UserResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchUsers() {
      try {
        setLoading(true)
        setError(null)

        const data = await listUsers()

        if (isMounted) {
          setUsers(data)
        }
      } catch (err) {
        console.error(err)
        if (isMounted) {
          setError('Failed to load users')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchUsers()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) return <p>Loading users...</p>
  if (error) return <p>{error}</p>
  if (users.length === 0) return <p>No users found.</p>

  return (
    <div>
      <h2>Users (from Nest + Prisma)</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.email}</strong>
            {u.name ? ` — ${u.name}` : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
