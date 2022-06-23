import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  findAll() {
    throw new Error('Not implemented');
  }

  findOne(id: string) {
    throw new Error('Not implemented');
  }
}
