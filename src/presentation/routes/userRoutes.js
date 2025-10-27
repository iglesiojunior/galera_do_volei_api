import { Router } from 'express';
import { UserRepository } from '../../infrastructure/repositories/user-repository.js';
import { RegisterUserUseCase } from '../../application/commands/RegisterUserUseCase.js';
import { LoginUserUseCase } from '../../application/commands/LoginUserUseCase.js';
import { RegisterController } from '../controllers/RegisterController.js';
import { LoginController } from '../controllers/LoginController.js';
import { UserController } from '../controllers/UserController.js';
import { ListUsersQuery } from '../../application/queries/ListUsersQuery.js';
import { GetUserByIdQuery } from '../../application/queries/GetUserByIdQuery.js';

const userRouter = Router();
const userRepository = new UserRepository();

const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

const listUsersQuery = new ListUsersQuery(userRepository);
const getUserByIdQuery = new GetUserByIdQuery(userRepository);

const registerController = new RegisterController(registerUserUseCase);
const loginController = new LoginController(loginUserUseCase);
const userController = new UserController(listUsersQuery, getUserByIdQuery);

userRouter.post('/register', registerController.register.bind(registerController));
userRouter.post('/login', loginController.login.bind(loginController));

userRouter.get('/jogadores', userController.list.bind(userController));
userRouter.get('/jogadores/:id', userController.getById.bind(userController));

export { userRouter };