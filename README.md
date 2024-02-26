
# OUV Trajes

Um e-commerce de camisas de time

*Feito para aprendizado! Você não receberá nada caso compre!*




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SERVICE_KEY`: Chave de serviço (https://www.emailjs.com)

`EDIT_TEMPLATE_KEY`: Código de template para mensagens de contato (https://www.emailjs.com)

`PASSWORD_TEMPLATE_KEY`: Código de template para email de confirmção de troca de senha (https://www.emailjs.com)

`PUBLIC_KEY`: Chave pública (https://www.emailjs.com)

`API_URL`: URL que está hospedado o backend
## Funcionalidades

- Pagamento "funcional" (API de pagamento em modo teste, então nenhuma compra é cobrada)
- Possibilidade de contato com o vendedor
- Dashboard para vendendor adicionar produtos facilmente

## Aprendizados

- Fazer pagamentos usando o Stripe Checkout
- Validação de permissão (para saber se o usuário logado é um admin e então permitir a adição de novos produtos)




## Stack utilizada

**Front-end:** React, Zustand, TailwindCSS, Shadcn/ui

**Back-end:** Node, NestJS, Prisma


## Demonstração

Website: https://ouv-trajes.vercel.app

API: https://ouv.onrender.com

