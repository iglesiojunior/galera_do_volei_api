import dadosMock from '../../infrastructure/mocks/users.json' with { type: 'json' };
import { User } from '../../domain/entities/user.js';

export class UserRepository {
    constructor() {
        this.users = [...dadosMock];
    }

    findByEmail(email) {
        const user = this.users.find(user => user.email === email);
        return user ? User.create(user) : null;
    }

    save(user) {
        const novoId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
        const novoUser = { ...user, id: novoId };
        this.users.push(novoUser);
        return User.create(novoUser);
    }

    async findAll(filters = {}) {
        let filtered = [...this.users];

        if (filters.sexo) {
            filtered = filtered.filter(u => u.sexo === filters.sexo);
        }
        if (filters.categoria) {
            filtered = filtered.filter(u => u.categoria === filters.categoria);
        }

        return filtered.map(u => User.create(u));
    }

    async findById(id) {
        const numericId = Number(id);
        const user = this.users.find(u => u.id === numericId);
        return user ? User.create(user) : null;
    }
}
