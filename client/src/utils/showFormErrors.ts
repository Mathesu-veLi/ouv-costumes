import { isEmail } from 'validator';
import { createFormError } from './createFormError';
import { IUserForm } from './UserFormValidator';

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

class ShowUserFormErrors