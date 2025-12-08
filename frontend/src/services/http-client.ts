// http-client.ts
import type { ApiResponse } from '@shared/contracts/api-response';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const body = (await res.json()) as ApiResponse<T>;

  if (!body.success) {
    throw new Error(body.errors?.join(', ') ?? 'Unknown API error');
  }

  return body.data as T;
}
