import { Request, Response } from "express";
import { CreateUserService } from "../../models/user/CreateUserModel";

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({ name, email, password });
        return response.json(user);
    }
}

export { CreateUserController };
