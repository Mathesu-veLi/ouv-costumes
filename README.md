
# OUV Trajes

A team shirt e-commerce

*Made for learning! You don't get anything if you buy!*




## Environment variables

To run this project, you will need to add the following environment variables to your .env

`SERVICE_KEY`: Service key (https://www.emailjs.com)

`EDIT_TEMPLATE_KEY`: Template code for contact messages (https://www.emailjs.com)

`PASSWORD_TEMPLATE_KEY`: Template code for password change confirmation email (https://www.emailjs.com)

`PUBLIC_KEY`: Public key (https://www.emailjs.com)

`API_URL`: URL where the backend is hosted
## Features

- Payment "functional" (payment API in test mode, so no purchase is charged)
- Possibility of contacting the seller
- Dashboard for sellers to add products easily
## Learnings

- Making payments using Stripe Checkout
- Permission validation (to know if the logged in user is an admin and then allow the addition of new products)
## Stack utilized

**Front-end:** React, Zustand, TailwindCSS, Shadcn/ui

**Back-end:** Node, NestJS, Prisma


## Demonstration

Website: https://ouv-trajes.vercel.app

API: https://ouv.onrender.com

