import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { ProcessIdentityDto } from './dto/process-identity.dto';
import { IdentityService } from './identity.service';
import { User } from '../auth/decorators/user.decorator';
import { User as UserInterface } from '../users/interfaces/user.interface';

@Controller('identity')
export class IdentityController {
  constructor(
    private readonly identityService: IdentityService,
    private readonly customerService: CustomersService,
  ) {}

  @Post('process')
  async process(
    @User() user: UserInterface,
    @Body() processIdentityDto: ProcessIdentityDto,
  ) {
    const identity = await this.identityService.verifyIdentity(
      processIdentityDto,
    );
    if (!identity) {
      throw new BadRequestException('Invalid BVN');
    }
    const customer = await this.customerService.ensureCustomer({
      identity: identity.id,
      createdBy: user.id,
    });
    // TODO: use serializer
    const { id, ...identityWithoutId } = JSON.parse(JSON.stringify(identity));
    return { ...identityWithoutId, identity: id, customer: customer.id };
  }
}
