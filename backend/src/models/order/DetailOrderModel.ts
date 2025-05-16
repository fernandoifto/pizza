import prismaClient from "../../tools/prisma";

interface IDetailOrder {
    order_id: string;
}

class DetailOrderModel {
    async execute({order_id}: IDetailOrder) {
        const orders = await prismaClient.item.findMany({
            where: {
                order_id: order_id
            },
            include: {  
                order: true,
                product: true
            }
        });
        return orders;
    }
}

export {DetailOrderModel};