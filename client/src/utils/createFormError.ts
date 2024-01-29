export function createFormError(input: HTMLInputElement, errorMessage: string) {
  let errorParagraph = document.querySelector(
    `#${input.name}Error`,
  ) as HTMLParagraphElement;

  if (!errorParagraph) {
    errorParagraph = document.createElement('p');

    errorParagraph.classList.add('text-red-800', 'text-sm');
    errorParagraph.id = `${input.name}Error`;

    input.after(errorParagraph);
  }

  errorParagraph.innerText = errorMessage;
}
