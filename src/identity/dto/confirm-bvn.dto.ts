export type ConfirmBVNDto = ConfirmBVNDtoSuccess | ConfirmBVNDtoError;

export type ConfirmBVNDtoSuccess = {
  status: 'success';
  message: string;
  data: {
    response: {
      FirstName: string;
      MiddleName: string;
      LastName: string;
      DateOfBirth: string;
      Address: string;
      Gender: string;
      PhotoId: string;
      Enrollment_Date: string;
      Enrollment_Bank: string;
      Phone: string;
      Email: string;
      FullName: string;
      Bvn: string;
      Nin: string;
      LGAOrigin: string;
      LGAOfResidence: string;
      nationality: string;
      State_of_residence: string;
      State_of_origin: string;
      EnnrollmentBbank: string;
      RegistrationDate: string;
      Watchlist: boolean;
      MaritalStatus: string;
      AccountLevel: string;
      VerificationCountry: string;
    };
  };
};

export type ConfirmBVNDtoError = {
  status: 'error';
  message: string;
};
