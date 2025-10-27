# Galera do Vôlei

API REST para gerenciamento de partidas de vôlei com arquitetura Clean/DDD.

## Estrutura do Projeto

```
src/
├── application/           # Camada de aplicação (Use Cases)
│   ├── commands/         # Casos de uso que modificam estado (write)
│   │   ├── CreateMatchUseCase.js
│   │   ├── CreateInviteUseCase.js
│   │   ├── AcceptInviteUseCase.js
│   │   ├── RejectInviteUseCase.js
│   │   ├── RegisterUserUseCase.js
│   │   └── LoginUserUseCase.js
│   └── queries/          # Casos de uso de leitura (read)
│       ├── ListUsersQuery.js
│       ├── GetUserByIdQuery.js
│       ├── ListMatchesQuery.js
│       ├── GetMatchByIdQuery.js
│       └── ListInvitesByPlayerQuery.js
│
├── domain/               # Camada de domínio
│   └── entities/         # Entidades de domínio
│       ├── user.js
│       ├── matche.js
│       └── invite.js
│
├── infrastructure/       # Camada de infraestrutura
│   ├── repositories/     # Implementação dos repositórios
│   │   ├── user-repository.js
│   │   ├── match-repository.js
│   │   └── invite-repository.js
│   ├── mocks/           # Dados mockados
│   │   └── users.json
│   └── validation/      # Schemas de validação
│       └── schemas.js
│
└── presentation/         # Camada de apresentação
    ├── controllers/     # Controllers HTTP
    │   ├── UserController.js
    │   ├── RegisterController.js
    │   ├── LoginController.js
    │   ├── MatchController.js
    │   └── InviteController.js
    └── routes/          # Rotas do Express
        ├── server.js
        ├── userRoutes.js
        ├── matchRoutes.js
        └── inviteRoutes.js
```

## Como Executar

```bash
npm install
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Rotas Disponíveis

### Usuários
- `POST /register` - Registrar novo usuário
- `POST /login` - Fazer login
- `GET /jogadores` - Listar jogadores (com filtros opcionais: sexo, categoria)
- `GET /jogadores/:id` - Buscar jogador por ID

### Partidas
- `POST /partidas` - Criar partida
- `GET /partidas` - Listar partidas (com filtros opcionais: local, data, categoria, tipo)
- `GET /partidas/:id` - Buscar partida por ID

### Convites
- `POST /convites` - Criar convite
- `GET /convites/recebidos` - Listar convites recebidos
- `POST /convites/:id/aceitar` - Aceitar convite
- `POST /convites/:id/rejeitar` - Rejeitar convite

## Arquitetura

O projeto segue os princípios de Clean Architecture e DDD:

- **Domain**: Contém as entidades e regras de negócio puras
- **Application**: Contém os casos de uso (Commands e Queries)
- **Infrastructure**: Implementações concretas (repositórios, mocks)
- **Presentation**: Interface HTTP (controllers e routes)

A dependência sempre flui das camadas externas para as internas, garantindo que o domínio seja independente de frameworks.
