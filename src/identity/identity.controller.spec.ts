import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../customers/customers.service';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { VerificationService } from './verification.service';

describe('IdentityController', () => {
  let controller: IdentityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdentityController],
      providers: [
        { provide: IdentityService, useValue: {} },
        { provide: CustomersService, useValue: {} },
        VerificationService,
      ],
    }).compile();

    controller = module.get<IdentityController>(IdentityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
