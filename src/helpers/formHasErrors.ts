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

export const formHasErrors = (errors: SignInFormType | SignUpFormType): boolean => {
  const formErrorValues = Object.values(errors).filter((val) => val.length > 0);

  return formErrorValues.length > 0;
};
