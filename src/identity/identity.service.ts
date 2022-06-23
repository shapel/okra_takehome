import { Injectable } from '@nestjs/common';
import { ProcessIdentityDto } from './dto/process-identity.dto';

@Injectable()
export class IdentityService {
  async process(processIdentityDto: ProcessIdentityDto) {
    throw new Error('Method not implemented.');
  }
}
