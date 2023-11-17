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

        case 'POST': {
            const body = JSON.parse(req.body);
            await prisma.cart.create({
                data: {
                    userId,
                    productId: body.productId,
                    quantity: body.quantity,
                },
            });
            return res.status(200).json({ data: 'success' });
        }

        case 'PUT': {
            const body = JSON.parse(req.body);
            const product = body.productsArray.find(
                (product: { id: number; quantity: number }) =>
                    product.id === body.productId,
            );
            
            await prisma.cart.update({
                where: {
                    userId_productId: {
                        userId,
                        productId: body.productId,
                    },
                },
                data: {
                    quantity: Number(body.quantity + product.quantity),
                },
            });
            console.log('updated');
            return res.status(200).json({ data: 'updated' });
        }

        default:
            return;
    }
}
