import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CUSTOMER_MODEL } from './constants';
import { Customer } from './interfaces/customer.interface';
import { CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_MODEL)
    private customerModel: Model<CustomerDocument>,
  ) {}

  findAll(params: { createdBy: string }) {
    return this.customerModel.find(params);
  }

  findOne(params: { id: string; createdBy: string }) {
    return this.customerModel.findOne(params);
  }

  async ensureCustomer(payload: {
    identity: string;
    createdBy: string;
  }): Promise<Customer> {
    // TODO: add index on createdBy and identity
    const customer = await this.customerModel.findOne(payload);
    if (customer) {
      return customer;
    }
    return await this.customerModel.create(payload);
  }
}
