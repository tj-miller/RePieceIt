import { Controller, Get } from '@nestjs/common';
import type { AccountResponse } from '@shared/contracts/accounts';

@Controller('api/accounts')
export class AccountsController {
  @Get()
  findAll(): AccountResponse[] {
    return [{ id: 1, username: 'demo-user', email: 'demo@example.com' }];
  }
}
