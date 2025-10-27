export class ListUsersQuery {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(filters = {}) {
        const users = await this.userRepository.findAll(filters);
        return users.map(user => user.toJSON());
    }
}
