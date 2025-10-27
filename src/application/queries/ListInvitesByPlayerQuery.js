export class ListInvitesByPlayerQuery {
    constructor(inviteRepository) {
        this.inviteRepository = inviteRepository;
    }

    execute(playerId, status) {
        if (status) {
            return this.inviteRepository.findByPlayerIdAndStatus(playerId, status);
        }
        return this.inviteRepository.findByPlayerId(playerId);
    }
}
