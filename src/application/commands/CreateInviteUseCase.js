export class CreateInviteUseCase {
    constructor(inviteRepository) {
        this.inviteRepository = inviteRepository;
    }

    execute(inviteData) {
        return this.inviteRepository.save(inviteData);
    }
}
