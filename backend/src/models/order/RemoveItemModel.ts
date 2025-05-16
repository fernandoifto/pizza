import prismaClient from "../../tools/prisma";

interface IRemoveItem {
    item_id: string;
}

class RemoveItemModel {
    async execute({item_id}: IRemoveItem) {
        const item = await prismaClient.item.delete({
            where: {
                id: item_id
            }
        });
        return item;
    }
}

export default RemoveItemModel;
