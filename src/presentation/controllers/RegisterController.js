import { RegisterUserUseCase } from "../../application/commands/RegisterUserUseCase.js";
import { UserRepository } from "../../infrastructure/repositories/user-repository.js";


export class RegisterController {
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    } 

    async register(req, res){
        try{
            const novoUsuario = await this.registerUserUseCase.execute(req.body);
            return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: novoUsuario });
        }catch(error){
        return res.status(409).json({ message: error.message });
    }

}
}