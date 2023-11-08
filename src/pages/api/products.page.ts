import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function products(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    switch (req.method) {
        case 'GET': {
            const products = await prisma.products.findMany();
            return res.json(products)
        }

        default:
            return 
    }
}
