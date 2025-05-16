import { Request, Response } from "express";
import { RemoveOrderModel } from "../../models/order/RemoveOrderModel";     

class RemoveOrderController {
    async handle(request: Request, response: Response) {
        const order_id = request.query.order_id as string;
        const removeOrder = new RemoveOrderModel();
        const order = await removeOrder.execute({order_id});
        return response.json(order);
    }
}

export { RemoveOrderController }    