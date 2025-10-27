import { Router } from 'express';
import { MatchRepository } from '../../infrastructure/repositories/match-repository.js';
import { CreateMatchUseCase } from '../../application/commands/CreateMatchUseCase.js';
import { ListMatchesQuery } from '../../application/queries/ListMatchesQuery.js';
import { GetMatchByIdQuery } from '../../application/queries/GetMatchByIdQuery.js';
import { MatchController } from '../controllers/MatchController.js';

const matchRouter = Router();
const matchRepository = new MatchRepository();

const createMatchUseCase = new CreateMatchUseCase(matchRepository);

const listMatchesQuery = new ListMatchesQuery(matchRepository);
const getMatchByIdQuery = new GetMatchByIdQuery(matchRepository);

const matchController = new MatchController(
    createMatchUseCase,
    listMatchesQuery,
    getMatchByIdQuery
);

matchRouter.post('/partidas', matchController.create.bind(matchController));
matchRouter.get('/partidas', matchController.list.bind(matchController));
matchRouter.get('/partidas/:id', matchController.getById.bind(matchController));

export { matchRouter };
