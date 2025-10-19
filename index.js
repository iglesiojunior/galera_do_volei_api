import fastify from "fastify";
import { registroSchema, loginSchema, partidaSchema, conviteSchema } from "./schemas.js";
import { registerUser, loginUser, listUsers, listAllUsers, createMatch, listMatches, getMatchById } from "./src/domain/user.service.js";
import { RegisterUserUseCase } from "./src/application/use-cases/RegisterUserUseCase.js";
import { UserRepository } from "./src/infrastructure/repositories/user-repository.js";
import { RegisterController } from "./src/presentation/controllers/user-controller.js";
import { LoginController } from "./src/presentation/controllers/LoginController.js";
import { LoginUserUseCase } from "./src/application/use-cases/LoginUserUseCase.js";

const convitesMock = [
    { id: 1, partidaId: 1, jogadorConvidadoId: 2, paiId: 1, status: 'pendente' }
];

const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const RegisterController = new RegisterController(registerUserUseCase);
const loginUserUseCase = new LoginUserUseCase(userRepository);
const LoginController = new LoginController(loginUserUseCase);

const app = fastify({ logger: true });

// Rota de registro de usuário
app.post('/register', { schema: registroSchema }, RegisterController.register.bind(RegisterController));

// Rota de login de usuário
app.post('/login', {schema: loginSchema }, LoginController.login.bind(LoginController));

// Rota para listar jogadores com filtros
app.get('/jogadores', async (request, reply) => {
    try {
        const resultado  = listAllUsers(request);
        return resultado;
    }catch (error) {
        app.log.error(error);
        return reply.code(500).send({ message: 'Erro interno do servidor' });        
    }
});

// Rota para buscar um jogador por ID
app.get('/jogadores/:id', async (request, reply) => {
    try {
        const jogador = listUsers(request, reply);
        if (jogador) return jogador;
        return reply.code(404).send({ message: 'Jogador não encontrado' });
    } catch (error) {
        app.log.error(error);
        return reply.code(500).send({ message: 'Erro interno do servidor' });        
    }
});

// Rota de criação de partida
app.post('/partidas', { schema: partidaSchema }, async (request, reply) => {
    try {
        const novaPartida = createMatch(request.body);
        return reply.code(201).send({ message: 'Partida criada com sucesso!', partida: novaPartida });
    }catch (error) {
        app.log.error(error);
        return reply.code(500).send({ message: 'Erro interno do servidor' });        
    }
});

// Rota para listar partidas com filtros
app.get('/partidas', async (request, reply) => {
    try {
        const partidasFiltradas = listMatches(request);
        return { partidas: partidasFiltradas };
    } catch (error) {
        app.log.error(error);
        return reply.code(500).send({ message: 'Erro interno do servidor' });        
    }
});

// Rota para detalhes de uma partida específica
app.get('/partidas/:id', async (request, reply) => {
    try {
        const partida = getMatchById(request.params.id);
        if (partida) return partida;
        return reply.code(404).send({ message: 'Partida não encontrada!' });
    } catch (error) {
        app.log.error(error);
        return reply.code(500).send({ message: 'Erro interno do servidor' });
    }
});


// Rota para criar um convite
app.post('/convites', { schema: conviteSchema }, async (request, reply) => {
    const { partidaId, jogadorConvidadoId } = request.body;
    const paiId = 1; 

    const novoId = convitesMock.length > 0 ? Math.max(...convitesMock.map(c => c.id)) + 1 : 1;
    const novoConvite = { id: novoId, partidaId, jogadorConvidadoId, paiId, status: 'pendente' };
    convitesMock.push(novoConvite);
    return reply.code(201).send({ message: 'Convite enviado!', convite: novoConvite });
});

// Rota para listar convites recebidos
app.get('/convites/recebidos', async (request, reply) => {
    const usuarioLogadoId = 2; // FAKE
    const convites = convitesMock.filter(c => c.jogadorConvidadoId === usuarioLogadoId && c.status === 'pendente');
    return { convites };
});

// Rota para aceitar um convite
app.post('/convites/:id/aceitar', async (request, reply) => {
    const id = Number(request.params.id);
    const convite = convitesMock.find(c => c.id === id);
    if (convite) {
        convite.status = 'aceito';
        return { message: 'Convite aceito com sucesso!' };
    }
    return reply.code(404).send({ message: 'Convite não encontrado' });
});

// Rota para rejeitar um convite
app.post('/convites/:id/rejeitar', async (request, reply) => {
    const id = Number(request.params.id);
    const convite = convitesMock.find(c => c.id === id);
    if (convite) {
        convite.status = 'rejeitado';
        return { message: 'Convite rejeitado com sucesso!' };
    }
    return reply.code(404).send({ message: 'Convite não encontrado' });
});


const start = async () => {
    try {
        await app.listen({ port: 3000 });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();