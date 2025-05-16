import { Request, Response } from "express";
import { ListOrderModel } from "../../models/order/ListOrderModel";

class ListOrderController {
    async handle(request: Request, response: Response) {
        const listOrder = new ListOrderModel();
        const order = await listOrder.execute();
        return response.json(order);
    }
}  

export { ListOrderController };
