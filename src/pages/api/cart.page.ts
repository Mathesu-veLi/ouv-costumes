import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function products(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const body = JSON.parse(req.body);
    switch (req.method) {
        case 'POST': {
            await prisma.cart.create({
                data: {
                    userId: body.userId,
                    productId: body.productId,
                    quantity: body.quantity,
                },
            });
            return res.status(200).json({ data: 'success' });
        }

        default:
            return;
    }
}
