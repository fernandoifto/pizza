import { Request, Response } from "express";
import { CreateCategoryService } from "../../models/category/CreateCategoryModel";

class CreateCategoryController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;
        const createCategoryService = new CreateCategoryService();
        const category = await createCategoryService.execute({name});
        return response.json(category);
    }
}

export { CreateCategoryController };