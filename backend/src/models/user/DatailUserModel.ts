import prismaClient from "../../tools/prisma";

interface IDetailUser {
    user_id: string;
}

class DatailUserService {
    async execute({user_id}: IDetailUser){
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },select: {
                id: true,
                name: true,
                email: true,
            }
        })
        return user
    }
}

export {DatailUserService}