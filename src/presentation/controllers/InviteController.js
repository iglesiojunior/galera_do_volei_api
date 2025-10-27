export class InviteController {
    constructor(
        createInviteUseCase,
        acceptInviteUseCase,
        rejectInviteUseCase,
        listInvitesByPlayerQuery
    ) {
        this.createInviteUseCase = createInviteUseCase;
        this.acceptInviteUseCase = acceptInviteUseCase;
        this.rejectInviteUseCase = rejectInviteUseCase;
        this.listInvitesByPlayerQuery = listInvitesByPlayerQuery;
    }

    async create(req, res) {
        try {
            const { partidaId, jogadorConvidadoId } = req.body;
            const paiId = 1; // TODO: Obter do token JWT
            
            const invite = this.createInviteUseCase.execute({
                partidaId,
                jogadorConvidadoId,
                paiId
            });
            
            return res.status(201).json({ 
                message: 'Convite enviado!', 
                convite: invite 
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async listReceived(req, res) {
        try {
            const usuarioLogadoId = 2; // TODO: Obter do token JWT
            const invites = this.listInvitesByPlayerQuery.execute(usuarioLogadoId, 'pendente');
            return res.json({ convites: invites });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async accept(req, res) {
        try {
            const inviteId = Number(req.params.id);
            const invite = this.acceptInviteUseCase.execute(inviteId);
            return res.json({ message: 'Convite aceito com sucesso!' });
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    async reject(req, res) {
        try {
            const inviteId = Number(req.params.id);
            const invite = this.rejectInviteUseCase.execute(inviteId);
            return res.json({ message: 'Convite rejeitado com sucesso!' });
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}
