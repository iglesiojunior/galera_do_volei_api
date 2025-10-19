import { JsonWebTokenError } from "jsonwebtoken";
import { UserRepository } from "../../infrastructure/repositories/user-repository";
import * as jwt from 'jsonwebtoken' ;

// const jwt = require('jsonwebtoken');

export class LoginUserUseCase {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute(email, senha){
        const user = await this.userRepository.findByEmail(email);
        
        const payload = { email: user.email, id: user.id };
        
        if(user && user.senha === senha){
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});
            
            return { token };
        }
        throw new Error('Credenciais inválidas!');
    }
}