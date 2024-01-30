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

export class RegisterFormValidator extends UserFormValidator {
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
