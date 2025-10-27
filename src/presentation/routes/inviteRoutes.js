import { Router } from 'express';
import { InviteRepository } from '../../infrastructure/repositories/invite-repository.js';
import { CreateInviteUseCase } from '../../application/commands/CreateInviteUseCase.js';
import { AcceptInviteUseCase } from '../../application/commands/AcceptInviteUseCase.js';
import { RejectInviteUseCase } from '../../application/commands/RejectInviteUseCase.js';
import { ListInvitesByPlayerQuery } from '../../application/queries/ListInvitesByPlayerQuery.js';
import { InviteController } from '../controllers/InviteController.js';

const inviteRouter = Router();
const inviteRepository = new InviteRepository();

const createInviteUseCase = new CreateInviteUseCase(inviteRepository);
const acceptInviteUseCase = new AcceptInviteUseCase(inviteRepository);
const rejectInviteUseCase = new RejectInviteUseCase(inviteRepository);

const listInvitesByPlayerQuery = new ListInvitesByPlayerQuery(inviteRepository);

const inviteController = new InviteController(
    createInviteUseCase,
    acceptInviteUseCase,
    rejectInviteUseCase,
    listInvitesByPlayerQuery
);

inviteRouter.post('/convites', inviteController.create.bind(inviteController));
inviteRouter.get('/convites/recebidos', inviteController.listReceived.bind(inviteController));
inviteRouter.post('/convites/:id/aceitar', inviteController.accept.bind(inviteController));
inviteRouter.post('/convites/:id/rejeitar', inviteController.reject.bind(inviteController));

export { inviteRouter };
