import prismaClient from "../../tools/prisma";

interface IRemoveOrder {
    order_id: string;
}

class RemoveOrderModel {
    async execute({order_id}: IRemoveOrder) {
        const order = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        })  
        return order;
    }
}

export { RemoveOrderModel }