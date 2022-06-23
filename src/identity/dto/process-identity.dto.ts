import { Length } from 'class-validator';

export class ProcessIdentityDto {
  @Length(11)
  readonly bvn: string;
}
