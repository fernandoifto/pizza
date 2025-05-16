import prismaClient from "../../tools/prisma";

class ListCategoryService {
    async execute() {
        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            }
        });
        return categories;
    }
}

export { ListCategoryService }