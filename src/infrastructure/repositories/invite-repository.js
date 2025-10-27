import { Invite } from '../../domain/entities/invite.js';

const invitesMock = [
    { id: 1, partidaId: 1, jogadorConvidadoId: 2, paiId: 1, status: 'pendente' }
];

export class InviteRepository {
    constructor() {
        this.invites = [...invitesMock];
    }

    save(invite) {
        const novoId = this.invites.length > 0 ? Math.max(...this.invites.map(i => i.id)) + 1 : 1;
        const novoInvite = { ...invite, id: novoId };
        this.invites.push(novoInvite);
        return Invite.create(novoInvite);
    }

    findById(id) {
        const invite = this.invites.find(i => i.id === id);
        return invite ? Invite.create(invite) : null;
    }

    findByPlayerId(playerId) {
        const invites = this.invites.filter(i => i.jogadorConvidadoId === playerId);
        return invites.map(i => Invite.create(i));
    }

    findByPlayerIdAndStatus(playerId, status) {
        const invites = this.invites.filter(i => 
            i.jogadorConvidadoId === playerId && i.status === status
        );
        return invites.map(i => Invite.create(i));
    }

    update(invite) {
        const index = this.invites.findIndex(i => i.id === invite.id);
        if (index !== -1) {
            this.invites[index] = {
                id: invite.id,
                partidaId: invite.partidaId,
                jogadorConvidadoId: invite.jogadorConvidadoId,
                paiId: invite.paiId,
                status: invite.status
            };
            return Invite.create(this.invites[index]);
        }
        return null;
    }
}
