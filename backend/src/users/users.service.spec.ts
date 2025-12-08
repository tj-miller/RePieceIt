import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get(PrismaService);
  });

  it('should return a list of users', async () => {
    // Arrange — mock Prisma response
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      { id: '1', email: 'demo@repieceit.app', name: 'Demo User' },
    ]);

    // Act
    const result = await service.findAll();

    // Assert
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe('demo@repieceit.app');
  });
});
