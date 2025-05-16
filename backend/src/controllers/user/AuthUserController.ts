import { Request, Response } from "express";
import { AuthUserService } from "../../models/user/AuthUserModel";

class AuthUserController{
    async handle(request: Request, response: Response){
        const {email, password} = request.body;
        const authUserService = new AuthUserService();
        const auth = await authUserService.execute({email, password});

        return response.json(auth);
    }
}

export { AuthUserController }