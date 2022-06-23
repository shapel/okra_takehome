import { IsString, Length } from 'class-validator';
import { BVN } from '../values/bvn';

export class ProcessIdentityDto {
  @Length(11)
  @IsString()
  readonly bvn: BVN;
}
