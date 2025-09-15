export const registroSchema = {
    body: {
        type: 'object',
        properties: {
            nome: { type: 'string' },
            email: {type: 'string'},
            senha: {type: 'string'},
            sexo: {type: 'string', enum: ['masculino', 'feminino', 'outro']},
            categoria: {type: 'string', enum: ['iniciante', 'intermediario', 'avancado']}
        },
        required: ['nome', 'email', 'senha', 'sexo', 'categoria']
    }
}

export const loginSchema = {
    body: {
        type: 'object',
        properties: {
        email: {type: 'string'},
        senha: {type: 'string'}
            },
        required: ['email', 'senha']
        }
    };

export const partidaSchema = {
    body: {
        type: 'object',
        properties: {
            local: {type: 'string'},
            data: {type: 'string', format: 'date'},
            categoria: {type: 'string', enum: ['iniciante', 'intermediario', 'avancado']},
            tipo: {type: 'string', enum: ['misto', 'masculino', 'feminino']}
        },
        required: ['local', 'data', 'categoria', 'tipo']
    }
};

export const conviteSchema = {
    body: {
        type: 'object',
        properties: {
            partidaId: { type: 'number' },
            jogadorConvidadoId: { type: 'number' }
        },
        required: ['partidaId', 'jogadorConvidadoId']
    }
};