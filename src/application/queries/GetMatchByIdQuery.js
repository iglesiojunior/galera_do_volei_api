export class GetMatchByIdQuery {
    constructor(matchRepository) {
        this.matchRepository = matchRepository;
    }

    execute(matchId) {
        return this.matchRepository.findById(matchId);
    }
}
