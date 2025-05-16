import prismaClient from "../../tools/prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute(userRequest: UserRequest) {
        const { name, email, password } = userRequest;
        //Verificar se ele enviou um email
        if (!email) {
            throw new Error("Email is required");
        }
        //Verificar se ele enviou um nome
        if (!name) {
            throw new Error("Name is required");
        }
        //Verificar se ele enviou uma senha
        if (!password) {
            throw new Error("Password is required");
        }
        //Verificar se o email já esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }
        //criptografar a senha
        const passwordHash = await hash(password, 8);

        //Cadastrar o usuario
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true
            },
        });
        return user;
    }
}

export { CreateUserService };
