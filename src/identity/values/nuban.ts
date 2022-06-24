export type NUBAN = string & Brand<'NUBAN'>;

export const toNUBAN = (string: string): NUBAN => {
  // TODO: validate
  return string as NUBAN;
};
