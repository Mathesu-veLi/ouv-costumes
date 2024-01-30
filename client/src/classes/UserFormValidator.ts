import { createFormError } from '@/utils/createFormError';
import isEmail from 'validator/lib/isEmail';

export interface IUserForm {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword?: HTMLInputElement;
}

abstract class UserFormValidator {
  constructor(protected form: IUserForm) {}

  protected abstract email: HTMLInputElement;
  protected abstract password: HTMLInputElement;

  public elementErrors: HTMLParagraphElement[] = [];

  public isValid() {
    if (this.emailIsValid() && this.passwordIsValid()) {
      for (const inputName in this.form) {
        this.removeError(inputName);
      }
      return true;
    }

    return false;
  }

  protected emailIsValid(): boolean {
    return isEmail(this.email.value);
  }

  protected passwordIsValid(): boolean {
    return this.password.value.length < 5 && this.password.value.length > 25;
  }

  protected removeError(inputName: string) {
    const error = document.querySelector(`#${inputName}Error`);

    if (error) error.remove();
  }

  public showErrors(): void {
    if (!this.emailIsValid())
      this.elementErrors.push(createFormError(this.email, 'Email not valid'));

    if (!this.passwordIsValid())
      this.elementErrors.push(
        createFormError(
          this.password,
          'The password must be between 5 and 25 characters long',
        ),
      );
  }
}

export class RegisterFormValidator extends UserFormValidator {
  constructor(form: IUserForm) {
    super(form);
  }

  protected email = this.form.email;
  protected password = this.form.password;
  protected confirmPassword = this.form.confirmPassword;

  public isValid(): boolean {
    if (
      this.emailIsValid() &&
      this.passwordIsValid() &&
      this.confirmPasswordIsValid()
    ) {
      for (const inputName in this.form) {
        this.removeError(inputName);
      }

      return true;
    }

    return false;
  }

  protected confirmPasswordIsValid(): boolean {
    return this.confirmPassword?.value === this.password.value;
  }

  public showErrors(): void {
    super.showErrors();

    if (this.confirmPassword && !this.confirmPasswordIsValid()) {
      this.elementErrors.push(
        createFormError(this.confirmPassword, "Passwords don't match"),
      );
    }
  }
}
