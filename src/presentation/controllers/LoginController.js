import { LoginUserUseCase } from "../../application/comands/LoginUserUseCase";
import { UserRepository } from "../../infrastructure/repositories/user-repository";

export class LoginController {
    constructor(loginController){
        this.loginUserUseCase = loginController;
    }

    async login(request, reply){
        try{
            const { email, senha } = request.body;
            const result = await this.loginUserUseCase.execute(email, senha);
            return reply.code(200).send(result);
        }catch(error){
            return reply.code(401).send({ message: error.message });
        }
    }
}