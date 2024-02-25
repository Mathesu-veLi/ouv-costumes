import { createFormError } from '@/utils/createFormError';
import { IUserForm, UserFormValidator } from './UserFormValidator';

export class ChangePasswordFormValidator extends UserFormValidator {
  constructor(form: IUserForm, protected id: number) {
    super(form);
  }

  protected email = this.form.email as HTMLInputElement;
  protected password = this.form.password as HTMLInputElement;
  protected confirmPassword = this.form.confirmPassword;

  public async isValid(): Promise<boolean> {
    return super.passwordIsValid();
  }

  protected confirmPasswordIsValid(): boolean {
    return this.confirmPassword?.value === this.password.value;
  }

  public async showErrors(): Promise<void> {
    if (!this.passwordIsValid())
      createFormError(
        this.password,
        'The password must be between 5 and 25 characters long',
      );
    else document.querySelector('#passwordError')?.remove();
    if (this.confirmPassword && !this.confirmPasswordIsValid())
      createFormError(this.confirmPassword, "Passwords don't match");
    else document.querySelector('#confirmPasswordError')?.remove();
  }
}
