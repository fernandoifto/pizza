import { Request, Response } from "express";
import { FinishOrderModel } from "../../models/order/FinishOrderModel";

 class FinishOrderController {
    async handle(request: Request, response: Response) {
        const { order_id } = request.body;
        const finishOrder = new FinishOrderModel();
        const order = await finishOrder.execute({ order_id });
        return response.json(order);
    }
}

export { FinishOrderController };

