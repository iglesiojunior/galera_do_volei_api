export class Invite {
    constructor(id, partidaId, jogadorConvidadoId, paiId, status) {
        this.id = id;
        this.partidaId = partidaId;
        this.jogadorConvidadoId = jogadorConvidadoId;
        this.paiId = paiId;
        this.status = status || 'pendente';
    }

    static create(inviteData) {
        return new Invite(
            inviteData.id,
            inviteData.partidaId,
            inviteData.jogadorConvidadoId,
            inviteData.paiId,
            inviteData.status
        );
    }

    accept() {
        this.status = 'aceito';
    }

    reject() {
        this.status = 'rejeitado';
    }
}