import prismaClient from "../../tools/prisma";
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService {
    async execute({email, password}: AuthRequest){
        //Verificar se o e-mail existe.
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user){
            throw new Error("User/password incorrect");
        }
        
        //Preciso verificar se a senha que ele mandou está correta.
        const passwordMath = await compare(password, user.password);

        if(!passwordMath){
            throw new Error("User/password incorrect");
        }

        //Gerar o token
        const token = sign({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '30d'
        })
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    
    }
    
}

export { AuthUserService };