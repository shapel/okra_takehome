import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMER_MODEL } from './constants';
import { CustomersService } from './customers.service';
import { Customer } from './interfaces/customer.interface';

const mockCustomer: Customer = {
  id: 'id',
  identity: 'identity',
  createdBy: 'createdBy',
};

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: CUSTOMER_MODEL,
          useValue: {
            new: jest.fn().mockResolvedValue(mockCustomer),
            constructor: jest.fn().mockResolvedValue(mockCustomer),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
