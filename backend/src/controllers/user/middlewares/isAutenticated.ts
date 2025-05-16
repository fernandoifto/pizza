import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
//importando o typeUserId para que o typescript entenda que o request tem um user_id
//import './@types/typeUserId';

interface IPayload {
    sub: string;
} 

export function isAuthenticated(request: Request, response: Response, next: NextFunction){
    const authtoken = request.headers.authorization;

    if(!authtoken){
        return response.status(401).end();
    }

    const [, token] = authtoken.split(" ");

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
        //Adicionando o user_id no request
        request.query.user_id = sub;  
        return next();
    } catch (error) {
        return response.status(401).end();
    }
}