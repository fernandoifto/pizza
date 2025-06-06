import { Request, Response } from "express";
import { ListCategoryService } from "../../models/category/ListCategoryModel";

class ListCategoryController {
    async handle(request: Request, response: Response) {
        const listCategoryService = new ListCategoryService();
        const categories = await listCategoryService.execute();
        return response.json(categories);
    }
}

export { ListCategoryController }   