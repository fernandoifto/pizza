import { Request, Response } from "express";
import { DatailUserService } from "../../models/user/DatailUserModel";

class DetailUserController {
    async handle(request: Request, response: Response){
        //const user_id = request.user_id;
        const user_id = request.query.user_id as string;
        console.log(user_id);
        const detailUserService = new DatailUserService();
        const user = await detailUserService.execute({user_id});
        return response.json(user);
    }
}

export {DetailUserController}