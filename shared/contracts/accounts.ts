/**
 * The shape the frontend sends *to* the backend
 * e.g. POST /api/accounts or PUT /api/accounts/:id
 */
export interface AccountRequest {
  username: string;
  email: string;
  password?: string; // optional depending on your flow
}

/**
 * The shape the backend returns *to* the frontend
 * e.g. GET /api/accounts
 */
export interface AccountResponse {
  id: number;
  username: string;
  email: string;
}
