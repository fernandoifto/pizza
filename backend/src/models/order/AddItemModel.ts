import prismaClient from "../../tools/prisma";


interface IAddItem {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemModel {
    async execute({order_id, product_id, amount}: IAddItem) {
        const item = await prismaClient.item.create({
            data: {
                order_id: order_id  ,
                product_id: product_id,
                amount: amount
            }
        });
        return item;
    }
}

export default AddItemModel;
