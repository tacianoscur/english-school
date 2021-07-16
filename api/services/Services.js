const database = require('../models');

class Services {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async getAllRegisters(where = {}) {
        return await database[this.modelName].findAll({ where: { ...where } });
    }

    async getOneRegister(where) {
        return await database[this.modelName].findOne({ where: { ...where } });
    }

    async createRegister(data) {
        return await database[this.modelName].create(data);
    }

    async updateRegister(data, where, transaction = {}) {
        return await database[this.modelName].update(data, {
            where: { ...where }
        }, transaction);
    }

    async updateRegisters(data, where, transaction = {}) {
        return await database[this.modelName].update(data, {
            where: { ...where }
        }, transaction);
    }

    async deleteRegister(where) {
        return await database[this.modelName].destroy({
            where: { ...where }
        });
    }

    async restoreRegister(where) {
        return await database[this.modelName].restore({
            where: { ...where }
        });
    }

    async getAndCountRegisters(where, aggregators) {
        return await database[this.modelName].findAndCountAll({
            where: { ...where },
            ...aggregators
        });
    }
}

module.exports = Services;