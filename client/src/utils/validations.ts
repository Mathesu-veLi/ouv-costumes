import { isEmail } from 'validator';
import { createFormError } from './createFormError';

export function registerFormValidation(form: HTMLFormElement): void {
  const email = form.querySelector('#email') as HTMLInputElement;
  const password = form.querySelector('#password') as HTMLInputElement;
  const confirmPassword = form.querySelector(
    '#confirmPassword',
  ) as HTMLInputElement;

  [email, password, confirmPassword].forEach((input) => {
    removeError(input);

    if (!input.value) {
      createFormError(input, 'Field not specified');
    }
  });

  if (password.value !== confirmPassword.value) {
    createFormError(password, "Password fields don't match");
    createFormError(confirmPassword, "Password fields don't match");
  }

  if (!isEmail(email.value)) {
    createFormError(email, 'Email not valid');
  }
}

function removeError(input: HTMLInputElement) {
  const error = document.querySelector(`#${input.name}Error`);

  if (error) error.remove();
}