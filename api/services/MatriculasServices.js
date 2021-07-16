const database = require('../models');
const Services = require('./Services');

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas');

        this.pessoas = new Services('Pessoas');
    }

    async getOnePessoa(where) {
        return this.pessoas.getOneRegister(where);
    }
}

module.exports = MatriculasServices;