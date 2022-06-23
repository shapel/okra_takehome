import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProcessIdentityDto } from './dto/process-identity.dto';
import { IdentityService } from './identity.service';

@Controller('identity')
@UseGuards(JwtAuthGuard)
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('process')
  async process(@Body() processIdentityDto: ProcessIdentityDto) {
    return this.identityService.process(processIdentityDto);
  }
}
