import { createFormError } from '@/utils/createFormError';
import isEmail from 'validator/lib/isEmail';

export interface IUserForm {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword?: HTMLInputElement;
}

interface IUserFormErrors {
  email?: HTMLParagraphElement;
  password?: HTMLParagraphElement;
  confirmPassword?: HTMLParagraphElement;
}

abstract class UserFormValidator {
  constructor(protected form: IUserForm) {}

  protected abstract email: HTMLInputElement;
  protected abstract password: HTMLInputElement;

  public elementErrors: IUserFormErrors = {};

  public isValid() {
    return this.emailIsValid() && this.passwordIsValid();
  }

  protected emailIsValid(): boolean {
    return isEmail(this.email.value);
  }

  protected passwordIsValid(): boolean {
    return this.password.value.length < 5 && this.password.value.length > 25;
  }

  protected removeError(errorElement: HTMLParagraphElement): void {
    console.log(errorElement);
    errorElement.remove();
  }

  public showErrors(): void {
    if (!this.emailIsValid())
      this.elementErrors.email = createFormError(this.email, 'Email not valid');
    else document.querySelector('#emailError')?.remove();

    if (!this.passwordIsValid())
      this.elementErrors.password = createFormError(
        this.password,
        'The password must be between 5 and 25 characters long',
      );
    else document.querySelector('#passwordError')?.remove();
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
    return super.isValid() && this.confirmPasswordIsValid();
  }

  protected confirmPasswordIsValid(): boolean {
    return this.confirmPassword?.value === this.password.value;
  }

  public showErrors(): void {
    super.showErrors();

    if (this.confirmPassword && !this.confirmPasswordIsValid())
      this.elementErrors.confirmPassword = createFormError(
        this.confirmPassword,
        "Passwords don't match",
      );
    else document.querySelector('#confirmPasswordError')?.remove();
  }
}
