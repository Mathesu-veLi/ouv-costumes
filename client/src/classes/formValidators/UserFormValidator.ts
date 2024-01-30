import { api } from '@/lib/axios';
import { createFormError } from '@/utils/createFormError';
import isEmail from 'validator/lib/isEmail';

export interface IUserForm {
  name?: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword?: HTMLInputElement;
}

export abstract class UserFormValidator {
  constructor(protected form: IUserForm) {}

  protected abstract email: HTMLInputElement;
  protected abstract password: HTMLInputElement;

  public isValid(): Promise<boolean> | boolean {
    return this.emailIsValid() && this.passwordIsValid();
  }

  protected emailIsValid(): boolean {
    return isEmail(this.email.value);
  }

  protected async emailIsRegistered(): Promise<boolean> {
    const user = await api.get('/users', {
      params: {
        email: this.email.value,
      },
    });

    return user ? true : false;
  }

  protected passwordIsValid(): boolean {
    return this.password.value.length >= 5 && this.password.value.length <= 25;
  }

  public showErrors(): void {
    if (!this.emailIsValid()) createFormError(this.email, 'Email not valid');
    else document.querySelector('#emailError')?.remove();

    if (!this.passwordIsValid())
      createFormError(
        this.password,
        'The password must be between 5 and 25 characters long',
      );
    else document.querySelector('#passwordError')?.remove();
  }
}

//FIXME: The last error message not disappearing