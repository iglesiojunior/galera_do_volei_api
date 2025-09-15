import fastify from "fastify";
import { registroSchema, loginSchema, partidaSchema, conviteSchema } from "./schemas.js";


const dadosMock = [
    { 
        id: 1, 
        nome: 'Rogerio Silva',
        email: 'rogeriosilva@gmail.com',
        senha: 'bolodemaracuja',
        sexo: 'masculino',
        categoria: 'profissional'
    },
    {
        id: 2, 
        nome: 'Iglesio',
        email: 'iglesio@gmail.com',
        senha: '123456',
        sexo: 'masculino',
        categoria: 'amador'
    }
];

const partidasMock = [
    {
        id: 1,
        local: 'parque ecologico sucupira',
        data: '2024-10-15T14:00:00Z',
        categoria: 'amador',
        tipo: 'mista'
    }
];

const convitesMock = [
    { id: 1, partidaId: 1, jogadorConvidadoId: 2, paiId: 1, status: 'pendente' }
];


const app = fastify({ logger: true });

// Rota de registro de usuário
app.post('/register', { schema: registroSchema }, async (request, reply) => {
    const { email, nome, senha, sexo, categoria } = request.body;
    const userExists = dadosMock.find((user) => user.email === email);
    if (userExists) {
        return reply.code(409).send({ message: 'Usuário já registrado!' });
    } else {
        const novoId = dadosMock.length > 0 ? Math.max(...dadosMock.map(u => u.id)) + 1 : 1;
        const novoUsuario = { id: novoId, nome, email, senha, sexo, categoria };
        dadosMock.push(novoUsuario);
        return reply.code(201).send({ message: 'Usuário registrado com sucesso!', user: novoUsuario });
    }
});

// Rota de login de usuário
app.post('/login', { schema: loginSchema }, async (request, reply) => {
    const { email, senha } = request.body;
    const user = dadosMock.find((user) => user.email === email && user.senha === senha);
    if (user) {
        return { token: 'fake-jwt-token-for-user-' + user.id };
    } else {
        return reply.code(401).send({ message: 'Email ou senha inválidos!' });
    }
});

// Rota para listar jogadores com filtros
app.get('/jogadores', async (request, reply) => {
    const { sexo, categoria } = request.query;
    let jogadoresFiltrados = [...dadosMock];

    if (sexo) {
        jogadoresFiltrados = jogadoresFiltrados.filter(j => j.sexo === sexo);
    }
    if (categoria) {
        jogadoresFiltrados = jogadoresFiltrados.filter(j => j.categoria === categoria);
    }
    const jogadoresSemSenha = jogadoresFiltrados.map(({ senha, ...resto }) => resto);
    return { jogadores: jogadoresSemSenha };
});

// Rota para buscar um jogador por ID
app.get('/jogadores/:id', async (request, reply) => {
    const id = Number(request.params.id);
    const jogador = dadosMock.find((j) => j.id === id);
    if (jogador) {
        const { senha, ...resto } = jogador; // Remove a senha
        return resto;
    } else {
        return reply.code(404).send({ message: 'Jogador não encontrado' });
    }
});

// Rota de criação de partida
app.post('/partidas', { schema: partidaSchema }, async (request, reply) => {
    const { local, data, categoria, tipo } = request.body;
    const novoId = partidasMock.length > 0 ? Math.max(...partidasMock.map(p => p.id)) + 1 : 1;
    const novaPartida = { id: novoId, local, data, categoria, tipo };
    partidasMock.push(novaPartida);
    return reply.code(201).send({ message: 'Partida criada com sucesso!', partida: novaPartida });
});

// Rota para listar partidas com filtros
app.get('/partidas', async (request, reply) => {
    const { local, data, categoria, tipo } = request.query;
    let partidasFiltradas = [...partidasMock];
    if (categoria) {
        partidasFiltradas = partidasFiltradas.filter(p => p.categoria === categoria);
    }
    if (tipo) {
        partidasFiltradas = partidasFiltradas.filter(p => p.tipo === tipo);
    }
    if (local) {
        partidasFiltradas = partidasFiltradas.filter(p => p.local.toLowerCase().includes(local.toLowerCase()));
    }
    if (data) {
        partidasFiltradas = partidasFiltradas.filter(p => p.data.startsWith(data));
    }
    return { partidas: partidasFiltradas };
});

// Rota para detalhes de uma partida específica
app.get('/partidas/:id', async (request, reply) => {
    const id = Number(request.params.id);
    const partida = partidasMock.find((p) => p.id === id);
    if (partida) {
        return partida;
    } else {
        return reply.code(404).send({ message: 'Partida não encontrada!' });
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

