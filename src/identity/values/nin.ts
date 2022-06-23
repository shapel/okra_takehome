export type NIN = string & Brand<'NIN'>;

export function toNIN(string: string): NIN {
  // TODO: validate
  return string as NIN;
}
