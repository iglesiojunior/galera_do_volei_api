export class Match {
    constructor(id, local, data, categoria, tipo) {
        this.id = id;
        this.local = local;
        this.data = data;
        this.categoria = categoria;
        this.tipo = tipo;
    }

    static create(matchData) {
        return new Match(
            matchData.id,
            matchData.local,
            matchData.data,
            matchData.categoria,
            matchData.tipo
        );
    }
}