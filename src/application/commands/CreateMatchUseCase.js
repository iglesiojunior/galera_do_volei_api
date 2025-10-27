export class CreateMatchUseCase {
    constructor(matchRepository) {
        this.matchRepository = matchRepository;
    }

    execute(matchData) {
        return this.matchRepository.save(matchData);
    }
}
