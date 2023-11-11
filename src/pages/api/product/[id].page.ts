import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function product(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    switch (req.method) {
        case 'GET': {
            try {
                const id = Number(req.query.id);

                const product = await prisma.products.findUnique({
                    where: {
                        id,
                    },
                });
                return res.json(product);
            } catch (e) {
                return console.log(e);
            }
        }

        default:
            return;
    }
}
