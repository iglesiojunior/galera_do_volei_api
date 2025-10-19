import { RegisterUserUseCase } from "../../application/comands/RegisterUserUseCase.js";
import { UserRepository } from "../../infrastructure/repositories/user-repository.js";


export class RegisterController {
    constructor(registerUserUseCase, loginUserUseCase) {
        this.registerUserUseCase = RegisterUserUseCase;
        this.loginUserUseCase = LoginUserUseCase;
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