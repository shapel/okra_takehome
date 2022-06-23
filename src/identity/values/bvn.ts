export type BVN = string & Brand<'BVN'>;

export function toBVN(string: string): BVN {
  // TODO: validate
  return string as BVN;
}
