type SignUpFormType = {
  [name: string]: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export const checkPasswordsMatch = (formValues: SignUpFormType, errors: SignUpFormType) => {
  if (formValues.password && formValues.confirm_password) {
    if (formValues.password !== formValues.confirm_password) {
      errors.password = "Passwords don't match";
      errors.confirm_password = "Passwords don't match";
    }
  }
};
