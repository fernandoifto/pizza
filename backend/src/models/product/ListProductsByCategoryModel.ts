import prismaClient from "../../tools/prisma";

interface IProduct {
    category_id: string;
}

class ListProductsByCategoryModel {
    async execute({category_id}: IProduct) {
        const findByCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true
            }
        });

        return findByCategory;
    }
}

export { ListProductsByCategoryModel }
