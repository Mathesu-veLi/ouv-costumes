import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function products(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const userId = Number(req.query.userId);
    switch (req.method) {
        case 'GET': {
            const products = await prisma.cart.findMany({
                where: {
                    userId,
                },
            });
            return res.status(200).json({ products });
        }

        default:
            return;
    }
}
