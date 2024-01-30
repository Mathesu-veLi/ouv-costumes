import { createFormError } from '@/utils/createFormError';

import { IUserForm, UserFormValidator } from './UserFormValidator';

export class RegisterFormValidator extends UserFormValidator {
  constructor(form: IUserForm) {
    super(form);
  }

  protected name = this.form.name;
  protected email = this.form.email;
  protected password = this.form.password;
  protected confirmPassword = this.form.confirmPassword;

  public isValid(): boolean {
    return (
      super.isValid() && this.confirmPasswordIsValid() && this.nameIsValid()
    );
  }

  protected nameIsValid(): boolean {  
    return this.name?.value.length !== 0;
  }

  protected confirmPasswordIsValid(): boolean {
    return this.confirmPassword?.value === this.password.value;
  }

  public showErrors(): void {
    super.showErrors();
    
    if (this.name && !this.nameIsValid())
      createFormError(this.name, 'Name must not be empty');
    else document.querySelector('#nameError')?.remove();

    if (this.confirmPassword && !this.confirmPasswordIsValid())
      createFormError(this.confirmPassword, "Passwords don't match");
    else document.querySelector('#confirmPasswordError')?.remove();
  }
}
