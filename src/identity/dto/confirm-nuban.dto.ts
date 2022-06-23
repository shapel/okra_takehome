export type ConfirmNUBANDto = ConfirmNUBANDtoSuccess | ConfirmNUBANDtoError;

export type ConfirmNUBANDtoSuccess = {
  status: 'success';
  message: string;
  data: {
    response: {
      birthdate: string;
      account_number: string;
      bank: string;
      full_name: string;
      Email: string;
      phone_number: string;
      bvn: string;
    };
  };
};

export type ConfirmNUBANDtoError = {
  status: 'error';
  message: string;
};
