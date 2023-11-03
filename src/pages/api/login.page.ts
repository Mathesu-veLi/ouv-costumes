import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcryptjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('@/utils/jwt');

const prisma = new PrismaClient();

export default function login(req: NextApiRequest, res: NextApiResponse) {
    const user: unknown = main(JSON.parse(req.body))
        .then(async (user) => {
            await prisma.$disconnect();
            res.status(201).json({ user });
        })
        .catch(async (e) => {
            console.log(e);
            await prisma.$disconnect();

            res.status(400).json({ errors: String(e) });

        });

    return user;
}

const main = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    validate(user, password);

    delete user.password;
    const accessToken = await jwt.signAccessToken(user);

    return { ...user, accessToken };
};

const validate = (user: { password: string }, password: string) => {
    if (!user) throw 'Usuário não registrado';

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
        throw 'Senha inválida';
};
