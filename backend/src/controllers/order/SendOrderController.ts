import { Request, Response } from "express";
import { SendOrderModel } from "../../models/order/SendOrderModel";

class SendOrderController {
    async handle(request: Request, response: Response) {
        const {order_id} = request.body;
        const sendOrder = new SendOrderModel();
        const order = await sendOrder.execute({order_id});
        return response.json(order);
    }
}

export {SendOrderController};   