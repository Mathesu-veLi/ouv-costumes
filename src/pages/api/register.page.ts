import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('@/utils/jwt');

const prisma = new PrismaClient();

export default function register(req: NextApiRequest, res: NextApiResponse) {
    const user: unknown = main(JSON.parse(req.body))
        .then(async (user) => {
            await prisma.$disconnect();
            res.status(201).json({ user });
        })
        .catch(async (e) => {
            console.log(e);
            await prisma.$disconnect();

            res.status(400).json({ errors: 'Usuário já cadastrado' });
        });

    return user;
}

const main = async (data: { [key: string]: unknown }) => {
    let user = await prisma.user.create({ data });
    data.accessToken = await jwt.signAccessToken(user);

    return data;
};
