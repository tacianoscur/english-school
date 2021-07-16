const database = require('../models');
const NiveisServices = require('../services').NiveisServices;
const niveisServices = new NiveisServices();

class NivelController {
    //Ler todaos os niveis
    static async readAll(req, res) {
        try {
            const niveis = await niveisServices.getAllRegisters();

            return res.status(200).json(niveis);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Ler nivel pelo ID
    static async readOne(req, res) {
        const id = req.params.id;
        try {
            const nivel = await niveisServices.getOneRegister({ id: parseInt(id) });

            return res.status(200).json(nivel);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Criar um novo nivel
    static async createOne(req, res) {
        const newNivel = req.body;
        try {
            const newNivelCreated = await niveisServices.createRegister(newNivel);

            return res.status(201).json(newNivelCreated);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Atualizar nivel pelo ID
    static async updateOne(req, res) {
        const id = req.params.id;
        const updateInfoNivel = req.body;
        try {
            await niveisServices.updateRegister(updateInfoNivel, { id: parseInt(id) });
            const nivelUpdated = await niveisServices.getOneRegister({ id: parseInt(id) });

            return res.status(200).json(nivelUpdated);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Deleta nivel pelo ID
    static async deleteOne(req, res) {
        const id = req.params.id;
        try {
            await niveisServices.deleteRegister({ id: parseInt(id) });

            return res.status(200).json({ message: `Nível '${id}' deletado com sucesso!` });
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Restaura nivel pelo ID
    static async restoreOne(req, res) {
        const id = req.params.id;
        try {
            await niveisServices.restoreRegister({ id: parseInt(id) });
            const restoredNivel = await niveisServices.getOneRegister({ id: parseInt(id) });

            return res.status(200).json(restoredNivel);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController;