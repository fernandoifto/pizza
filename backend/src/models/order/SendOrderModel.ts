import prismaClient from "../../tools/prisma";

interface ISendOrder {
    order_id: string;
}

class SendOrderModel {
    async execute({order_id}: ISendOrder) {
        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                draft: false
            }
        });
        return order;
    }
}

export {SendOrderModel};
