import { Request, Response } from "express";
import { CreateProductService } from "../../models/product/CreateProductModel";

class CreateProductController {
    async handle(request: Request, response: Response) {
        
        const { name, price, description, category_id } = request.body;
        const createProductService = new CreateProductService();

        if(!request.file){
            return response.status(400).json({error: "Please upload a banner image"})
        }else{
            const {originalname, filename: banner} = request.file;
            const product = await createProductService.execute({
                name,
                price,
                description,
                banner,
                category_id
            });
            return response.json(product);
        }  
    }
}

export { CreateProductController }
