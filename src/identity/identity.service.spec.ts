import { Test, TestingModule } from '@nestjs/testing';
import { IDENTITY_MODEL } from './constants';
import { IdentityService } from './identity.service';
import { VerificationService } from './verification.service';

const mockIdentity = {} as any;

describe('IdentityService', () => {
  let service: IdentityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentityService,
        VerificationService,
        {
          provide: IDENTITY_MODEL,
          useValue: {
            new: jest.fn().mockResolvedValue(mockIdentity),
            constructor: jest.fn().mockResolvedValue(mockIdentity),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IdentityService>(IdentityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
