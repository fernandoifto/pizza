import { Request, Response } from "express";
import { DetailOrderModel } from "../../models/order/DetailOrderModel";

class DetailOrderController {
    async handle(request: Request, response: Response) {
        const order_id = request.query.order_id as string;
        const detailOrder = new DetailOrderModel();
        const orders = await detailOrder.execute({order_id});
        return response.json(orders);
    }
}  

export { DetailOrderController };