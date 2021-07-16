const database = require('../models');
const Services = require('./Services');

class PessoasServices extends Services {
    constructor() {
        super('Pessoas');

        this.matriculas = new Services('Matriculas');
    }

    async getAllActiveRegisters(where = {}) {
        return await database[this.modelName].findAll({ where: { ...where } });
    }

    async getAllRegisters(where = {}) {
        return await database[this.modelName].scope('allPessoas').findAll({
            where: { ...where }
        });
    }

    async inactivatePessoaAndMatriculas(id) {
        return await database.sequelize.transaction(async (t) => {
            await super.updateRegister({ ativo: false }, { id: id }, { transaction: t });

            await this.matriculas.updateRegisters(
                { 
                    status: 'cancelado'
                }, {
                    estudante_id: id
                }, { transaction: t }
            );
        });
    }
}

module.exports = PessoasServices;