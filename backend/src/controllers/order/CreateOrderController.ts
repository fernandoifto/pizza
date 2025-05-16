import { Request, Response } from "express";
import { CreateOrderModel } from "../../models/order/CreateOrderModel";

class CreateOrderController {
    async handle(request: Request, response: Response) {
        const { table, name } = request.body;
        const createOrder = new CreateOrderModel();
        const order = await createOrder.execute({ table, name });
        return response.json(order);
    }
}

export { CreateOrderController }