const { Op } = require('sequelize');
const TurmasServices = require('../services').TurmasServices;
const turmasServices = new TurmasServices();

class TurmaController {
    //Ler todas as turmas
    static async readAll(req, res) {
        const { initialDate, finalDate } = req.query;
        const where = {};

        initialDate || finalDate ? where.data_inicio = {} : null;
        initialDate ? where.data_inicio[Op.gte] = initialDate : null;
        finalDate ? where.data_inicio[Op.lte] = finalDate : null;
        
        try {
            const turmas = await turmasServices.getAllRegisters(where);

            return res.status(200).json(turmas);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Ler turma pelo ID
    static async readOne(req, res) {
        const id = req.params.id;
        try {
            const turma = await turmasServices.getOneRegister({ id: parseInt(id) });

            return res.status(200).json(turma);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Criar uma nova turma
    static async createOne(req, res) {
        const newTurma = req.body;
        try {
            const newTurmaCreated = await turmasServices.createRegister(newTurma);

            return res.status(201).json(newTurmaCreated);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Atualizar turma pelo ID
    static async updateOne(req, res) {
        const id = req.params.id;
        const updateInfoTurma = req.body;
        try {
            await turmasServices.updateRegister(updateInfoTurma, { id: parseInt(id) });
            const turmaUpdated = await turmasServices.getOneRegister({ id: parseInt(id) });

            return res.status(200).json(turmaUpdated);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Deleta turma pelo ID
    static async deleteOne(req, res) {
        const id = req.params.id;
        try {
            await turmasServices.deleteRegister({ id: parseInt(id) });

            return res.status(200).json({ message: `Turma '${id}' deletada com sucesso!` });
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Restaura turma pelo ID
    static async restoreOne(req, res) {
        const id = req.params.id;
        try {
            await turmasServices.restoreRegister({ id: parseInt(id) });
            const restoredTurma = await turmasServices.getOneRegister({ id: parseInt(id) });

            return res.status(200).json(restoredTurma);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TurmaController;