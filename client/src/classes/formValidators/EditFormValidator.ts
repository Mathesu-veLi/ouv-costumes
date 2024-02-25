import { createFormError } from '@/utils/createFormError';
import { IUserForm, UserFormValidator } from './UserFormValidator';
import { api } from '@/lib/axios';

export class EditFormValidator extends UserFormValidator {
  constructor(
    form: IUserForm,
    protected id: number,
    protected actualEmail: string,
  ) {
    super(form);
  }

  protected email = this.form.email as HTMLInputElement;
  protected password = this.form.password as HTMLInputElement;

  public async isValid(): Promise<boolean> {
    return (
      (super.emailIsValid() && !(await this.emailIsRegistered())) ||
      (await this.emailIsOfTheSameUser())
    );
  }

  protected async emailIsOfTheSameUser(): Promise<boolean> {
    const user = await api.get(`/users/${this.id}`);

    return user.data.email === this.email.value;
  }

  public async showErrors(): Promise<void> {
    if (await this.emailIsRegistered())
      createFormError(this.email, 'Email already registered');
    else document.querySelector('#emailError')?.remove();
  }
}
