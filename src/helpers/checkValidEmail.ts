import validator from "validator";

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

export const checkValidEmail = (
  formValues: SignInFormType | SignUpFormType,
  errors: SignInFormType | SignUpFormType
) => {
  if (formValues.email) {
    if (!validator.isEmail(formValues.email)) {
      errors.email = "Please provide a valid email";
    }
  }
};
