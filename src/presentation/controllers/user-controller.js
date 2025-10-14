import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase.js";
import { UserRepository } from "../../infrastructure/repositories/user-repository.js";


export class UserController {
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }
    async register(request, reply){
        try{
            const novoUsuario = await this.registerUserUseCase.execute(request.body);
            return reply.code(201).send({ message: 'Usuário registrado com sucesso!', user: novoUsuario });
        }catch(error){
        return reply.code(409).send({ message: error.message });
    }
}
}