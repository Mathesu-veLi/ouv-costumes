import { IUserForm, UserFormValidator } from './UserFormValidator';

export class LoginFormValidator extends UserFormValidator {
  constructor(form: IUserForm) {
    super(form);
  }

  protected email = this.form.email;
  protected password = this.form.password;
}
