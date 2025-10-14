import dadosMock from '../../infrastructure/mocks/users.json' with { type: 'json' } ;

export class UserRepository {
    constructor() {
        this.users = dadosMock;
    }
    findByEmail(email) {
        return this.users.find(user => user.email === email);
    };
    save(user) {
        this.users.push(user);
        return user;
    }
};
