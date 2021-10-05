import validator from "validator";

type SignUpFormType = {
  [name: string]: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export const checkStrongPassword = (formValues: SignUpFormType, errors: SignUpFormType) => {
  if (formValues.password) {
    if (
      !validator.isStrongPassword(formValues.password, {
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      errors.password = "Password must be a minimum of 6 characters";
    }
  }
};
