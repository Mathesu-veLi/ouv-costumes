import { isEmail } from 'validator';
import { createFormError } from './createFormError';

export function registerFormValidation(formElements: IUserForm): void {
  if (!formElements.confirmPassword) return;

  [
    formElements.email,
    formElements.password,
    formElements.confirmPassword,
  ].forEach((input) => {
    removeError(input);

    if (!input.value) {
      createFormError(input, 'Field not specified');
    }
  });

  if (formElements.password.value !== formElements.confirmPassword.value) {
    createFormError(formElements.password, "Password fields don't match");
    createFormError(
      formElements.confirmPassword,
      "Password fields don't match",
    );
  }

  if (!isEmail(formElements.email.value)) {
    createFormError(formElements.email, 'Email not valid');
  }
}

function removeError(input: HTMLInputElement) {
  const error = document.querySelector(`#${input.name}Error`);

  if (error) error.remove();
}

interface IUserForm {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword?: HTMLInputElement;
}

abstract class UserFormIsValid {
  constructor(protected form: IUserForm) {}

  protected abstract email: HTMLInputElement;
  protected abstract password: HTMLInputElement;

  get isValid() {
    return this.emailIsValid() && this.passwordIsValid();
  }

  protected emailIsValid(): boolean {
    return isEmail(this.email.value);
  }

  protected passwordIsValid(): boolean {
    return this.password.value.length >= 5 && this.password.value.length <= 25;
  }
}

export class RegisterFormIsValid extends UserFormIsValid {
  constructor(form: IUserForm) {
    super(form);
  }

  protected email = this.form.email;
  protected password = this.form.password;
  protected confirmPassword = this.form.confirmPassword;

  get isValid(): boolean {
    return super.isValid && this.confirmPasswordIsValid();
  }

  protected confirmPasswordIsValid(): boolean {
    return this.confirmPassword?.value === this.password.value;
  }
}