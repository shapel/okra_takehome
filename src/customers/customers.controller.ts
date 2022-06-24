import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { User } from '../auth/decorators/user.decorator';
import { User as UserInterface } from '../users/interfaces/user.interface';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(@User() user: UserInterface) {
    return this.customersService.findAll({ createdBy: user.id });
  }

  @Get(':id')
  findOne(@User() user: UserInterface, @Param('id') id: string) {
    return this.customersService.findOne({ id, createdBy: user.id });
  }
}
