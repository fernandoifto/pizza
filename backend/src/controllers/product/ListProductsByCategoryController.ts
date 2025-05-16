import { Request, Response } from "express";
import { ListProductsByCategoryModel } from "../../models/product/ListProductsByCategoryModel";

class ListProductsByCategoryController {
    async handle(request: Request, response: Response) {
        const category_id = request.query.category_id as string;
        const listByCategory = new ListProductsByCategoryModel();
        const products = await listByCategory.execute({ category_id });
        return response.json(products);
    }
}

export { ListProductsByCategoryController } 