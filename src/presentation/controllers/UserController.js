export class UserController {
    constructor(listUsersQuery, getUserByIdQuery) {
        this.listUsersQuery = listUsersQuery;
        this.getUserByIdQuery = getUserByIdQuery;
    }

    async list(req, res) {
        try {
            const { sexo, categoria } = req.query;
            const filters = { sexo, categoria };
            const users = await this.listUsersQuery.execute(filters);
            return res.json({ jogadores: users });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const user = await this.getUserByIdQuery.execute(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Jogador não encontrado' });
            }
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
