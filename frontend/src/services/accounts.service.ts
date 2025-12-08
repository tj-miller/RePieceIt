import { get } from './http-client';
import type { AccountResponse } from '@shared/contracts/accounts';

export async function listAccounts() {
  return get<AccountResponse[]>('/accounts');
}
