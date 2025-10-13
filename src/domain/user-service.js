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

export function registerUser(user) {
    const { email, nome, senha, sexo, categoria } = user;
    const userExists = dadosMock.find((u) => u.email === email);
    if (userExists) {
        throw new Error("Usuário já registrado!");
    }
    const novoId = dadosMock.length > 0 ? Math.max(...dadosMock.map(u => u.id)) + 1 : 1;
    const novoUsuario = { id: novoId, nome, email, senha, sexo, categoria };
    dadosMock.push(novoUsuario);
    return novoUsuario;
}


export function loginUser(emailUser, senhaUser) {
    const user = dadosMock.find((u) => u.email === emailUser && u.senha === senhaUser);
    if (user) {
        return { token: 'fake-jwt-token-for-user-' + user.id };
    }
    return {};
}

export function listUsers(request, reply) {
    const id = Number(request.params.id);
    const jogador = dadosMock.find((j) => j.id === id);
    if (jogador) {
        const { senha, ...resto } = jogador; // Remove a senha
        return resto;
    }
    return null;
}

export function listAllUsers(request) {
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
}

export function createMatch(match) {
    // match is expected to be the request body { local, data, categoria, tipo }
    const { local, data, categoria, tipo } = match;
    const novoId = partidasMock.length > 0 ? Math.max(...partidasMock.map(p => p.id)) + 1 : 1;
    const novaPartida = { id: novoId, local, data, categoria, tipo };
    partidasMock.push(novaPartida);
    return novaPartida;
}

export function listMatches(request) {
    const { local, data, categoria, tipo } = request.query || {};
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
    return partidasFiltradas;
}

export function getMatchById(id) {
    const numericId = Number(id);
    return partidasMock.find((p) => p.id === numericId);
}