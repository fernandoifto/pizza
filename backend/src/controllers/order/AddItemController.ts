import { Request, Response } from "express";
import AddItemModel from "../../models/order/AddItemModel";

class AddItemController {
    async handle(request: Request, response: Response) {
        const { order_id, product_id, amount } = request.body;
        const addItem = new AddItemModel();
        const item = await addItem.execute({ order_id, product_id, amount });
        return response.json(item);
    }
}

export {AddItemController};
