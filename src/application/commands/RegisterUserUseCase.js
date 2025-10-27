import { UserRepository } from "../../infrastructure/repositories/user-repository.js";

export class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(user) {
        const existingUser = await this.userRepository.findByEmail(user.email);
        if (existingUser) {
            throw new Error('Email em uso!');
        }
        return await this.userRepository.save(user);
    }
}