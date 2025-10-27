export class ListMatchesQuery {
    constructor(matchRepository) {
        this.matchRepository = matchRepository;
    }

    execute(filters = {}) {
        return this.matchRepository.findAll(filters);
    }
}
