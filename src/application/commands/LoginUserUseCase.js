import * as jwt from 'jsonwebtoken';

export class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(email, senha) {
        const user = await this.userRepository.findByEmail(email);
        
        if (!user) {
            throw new Error('Credenciais inválidas!');
        }
        
        if (user && user.senha === senha) {
            const payload = { email: user.email, id: user.id };
            const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
            
            return { token };
        }
        
        throw new Error('Credenciais inválidas!');
    }
}