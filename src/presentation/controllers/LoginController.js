import { LoginUserUseCase } from "../../application/commands/LoginUserUseCase.js";
import { UserRepository } from "../../infrastructure/repositories/user-repository.js";

export class LoginController {
    constructor(loginController){
        this.loginUserUseCase = loginController;
    }

    async login(req, res){
        try{
            const { email, senha } = req.body;
            const result = await this.loginUserUseCase.execute(email, senha);
            return res.status(200).json(result);
        }catch(error){
            return res.status(401).json({ message: error.message });
        }
    }
}