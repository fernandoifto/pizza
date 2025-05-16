import prismaClient from "../../tools/prisma";

class ListOrderModel {
    async execute() {
        const order = await prismaClient.order.findMany({
            where: {
                draft: false,
                status: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return order;
    }
}

export {ListOrderModel};