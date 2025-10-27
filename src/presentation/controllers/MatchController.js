export class MatchController {
    constructor(createMatchUseCase, listMatchesQuery, getMatchByIdQuery) {
        this.createMatchUseCase = createMatchUseCase;
        this.listMatchesQuery = listMatchesQuery;
        this.getMatchByIdQuery = getMatchByIdQuery;
    }

    async create(req, res) {
        try {
            const match = this.createMatchUseCase.execute(req.body);
            return res.status(201).json({ message: 'Partida criada com sucesso!', partida: match });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async list(req, res) {
        try {
            const { local, data, categoria, tipo } = req.query;
            const filters = { local, data, categoria, tipo };
            const matches = this.listMatchesQuery.execute(filters);
            return res.json({ partidas: matches });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const match = this.getMatchByIdQuery.execute(req.params.id);
            if (!match) {
                return res.status(404).json({ message: 'Partida não encontrada!' });
            }
            return res.json(match);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
