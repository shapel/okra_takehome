import { Test, TestingModule } from '@nestjs/testing';
import { USER_MODEL } from './constants';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

const mockUser: User = {
  id: '1',
  email: 'email@email.com',
  firstName: 'firstName',
  lastName: 'lastName',
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_MODEL,
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
