import prismaClient from "../../tools/prisma";

interface IOrder {
    table: number;
    name: string; 
}

class CreateOrderModel {
    async execute({table, name}: IOrder) {
        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name
            }
        })
        return order;
    }
}

export { CreateOrderModel }     