import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default function register(req: NextApiRequest, res: NextApiResponse) {
    const user = main(JSON.parse(req.body))
        .then(async () => {
            await prisma.$disconnect();
            res.status(201)
        })
        .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
        });

    res.status(200).json(user);
}

const main = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    const data = { name, email, password };
    return await prisma.user.create({ data });
};
