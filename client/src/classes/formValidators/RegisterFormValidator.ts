import { createFormError } from '@/utils/createFormError';

import { IUserForm, UserFormValidator } from './UserFormValidator';

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
      createFormError(this.confirmPassword, "Passwords don't match");
    else document.querySelector('#confirmPasswordError')?.remove();
  }
}
