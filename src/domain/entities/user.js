export class User {
    constructor(id, nome, email, senha, sexo, categoria) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.sexo = sexo;
        this.categoria = categoria;
    }

    static create(userData) {
        return new User(
            userData.id,
            userData.nome,
            userData.email,
            userData.senha,
            userData.sexo,
            userData.categoria
        );
    }

    toJSON() {
        const { senha, ...userWithoutPassword } = this;
        return userWithoutPassword;
    }
}