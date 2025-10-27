export class GetUserByIdQuery {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        const user = await this.userRepository.findById(userId);
        return user ? user.toJSON() : null;
    }
}
