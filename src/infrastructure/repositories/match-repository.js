import { Match } from '../../domain/entities/matche.js';

const matchesMock = [
    {
        id: 1,
        local: 'parque ecologico sucupira',
        data: '2024-10-15T14:00:00Z',
        categoria: 'amador',
        tipo: 'mista'
    }
];

export class MatchRepository {
    constructor() {
        this.matches = [...matchesMock];
    }

    save(match) {
        const novoId = this.matches.length > 0 ? Math.max(...this.matches.map(m => m.id)) + 1 : 1;
        const novaMatch = { ...match, id: novoId };
        this.matches.push(novaMatch);
        return Match.create(novaMatch);
    }

    findById(id) {
        const match = this.matches.find(m => m.id === id);
        return match ? Match.create(match) : null;
    }

    findAll(filters = {}) {
        let filtered = [...this.matches];

        if (filters.categoria) {
            filtered = filtered.filter(m => m.categoria === filters.categoria);
        }
        if (filters.tipo) {
            filtered = filtered.filter(m => m.tipo === filters.tipo);
        }
        if (filters.local) {
            filtered = filtered.filter(m => m.local.toLowerCase().includes(filters.local.toLowerCase()));
        }
        if (filters.data) {
            filtered = filtered.filter(m => m.data.startsWith(filters.data));
        }

        return filtered.map(m => Match.create(m));
    }
}
