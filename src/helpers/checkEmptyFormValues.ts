type SignInFormType = {
  [name: string]: string;
  email: string;
  password: string;
};

type SignUpFormType = {
  [name: string]: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export const checkEmptyFormValues = (
  formValues: SignInFormType | SignUpFormType,
  errors: SignInFormType | SignUpFormType
): void => {
  for (const name in formValues) {
    if (!formValues[name]) {
      errors[name] = "Please fill out field";
    }
  }
};
