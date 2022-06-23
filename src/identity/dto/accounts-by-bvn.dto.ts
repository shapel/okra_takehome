export type AccountsByBVNDto = AccountsByBVNDtoSuccess | AccountsByBVNDtoError;

export type AccountsByBVNDtoSuccess = {
  status: 'success';
  message: string;
  data: {
    response: {
      account_no: string;
      bank: string;
    };
  };
};

export type AccountsByBVNDtoError = {
  status: 'error';
  message: string;
};
