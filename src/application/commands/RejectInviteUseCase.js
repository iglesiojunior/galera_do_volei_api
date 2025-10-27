export class RejectInviteUseCase {
    constructor(inviteRepository) {
        this.inviteRepository = inviteRepository;
    }

    execute(inviteId) {
        const invite = this.inviteRepository.findById(inviteId);
        if (!invite) {
            throw new Error('Convite não encontrado');
        }
        invite.reject();
        return this.inviteRepository.update(invite);
    }
}
