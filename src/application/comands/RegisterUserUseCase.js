import { UserRepository } from "../../infrastructure/repositories/user-repository.js";

export class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(user) {
        const existingUser = this.userRepository.findByEmail(user.email);
        if (existingUser) {
            throw new Error('Email em uso!');
        }
        return this.userRepository.save(user);

        }    
    }