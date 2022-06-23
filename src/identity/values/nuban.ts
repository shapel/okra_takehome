export type NUBAN = string & Brand<'NUBAN'>;

export function toNUBAN(string: string): NUBAN {
  // TODO: validate
  return string as NUBAN;
}
