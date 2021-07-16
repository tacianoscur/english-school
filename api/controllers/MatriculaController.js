const Sequelize = require('sequelize')
const MatriculasServices = require('../services').MatriculasServices;
const matriculasServices = new MatriculasServices();

class MatriculaController {
    //Ler matrículas de uma pessoa pelo ID
    static async readAllMatriculas(req, res) {
        const { id } = req.params;
        try {
            const pessoa = await matriculasServices.getOnePessoa({ id: parseInt(id) });
            const matriculas = await pessoa.getAulasMatriculadas();

            return res.status(200).json(matriculas);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Ler matrículas por turma
    static async readMatriculasByTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const matriculasTurma = await matriculasServices.getAndCountRegisters(
                {
                    turma_id: parseInt(turmaId),
                    status: 'confirmado'
                }, 
                {
                    limit: 20,
                    order: [['estudante_id', 'ASC']]
                }
            );

            return res.status(200).json(matriculasTurma);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Ler turmas lotadas
    static async readFullTurmas(req, res) {
        const lotacaoTurma = 2;
        try {
            const fullTurmas = await matriculasServices.getAndCountRegisters(
                {
                    status: 'confirmado'
                }, 
                {
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                }
            );

            return res.status(200).json(fullTurmas.count);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Ler matrícula de uma pessoa pelos IDs
    static async readOneMatricula(req, res) {
        const { id, matriculaId } = req.params;
        try {
            const matricula = await matriculasServices.getOneRegister({
                id: parseInt(matriculaId),
                estudante_id: parseInt(id)
            });

            return res.status(200).json(matricula);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Criar uma matricula para uma pessoa pelo ID
    static async createMatricula(req, res) {
        const { id } = req.params;
        const newMatricula = { ...req.body, estudante_id: parseInt(id) };
        try {
            const newMatriculaCreated = await matriculasServices.createRegister(newMatricula);

            return res.status(201).json(newMatriculaCreated);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Atualizar uma matricula de pessoa pelo ID
    static async updateOneMatricula(req, res) {
        const { id, matriculaId } = req.params;
        const updateInfoMatricula = req.body;
        try {
            await matriculasServices.updateRegister(updateInfoMatricula, 
                {
                    id: parseInt(matriculaId),
                    estudante_id: parseInt(id)
                }
            );

            const updatedMatricula = await matriculasServices.getOneRegister(
                {
                    id: parseInt(matriculaId),
                    estudante_id: parseInt(id)
                }
            );

            return res.status(200).json(updatedMatricula);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Deletar a matriculas de uma pessoa pelo ID
    static async deleteOneMatricula(req, res) {
        const { id, matriculaId } = req.params;
        try {
            await matriculasServices.deleteRegister(
                {
                    id: parseInt(matriculaId),
                    estudante_id: parseInt(id)
                }
            );

            return res.status(200).json({ message: `Matricula '${matriculaId}' da pessoa '${id}' deletada com sucesso!` });
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Restaura matricula de uma pessoa pelos IDs
    static async restoreOneMatricula(req, res) {
        const { id, matriculaId } = req.params;
        try {
            await matriculasServices.restoreRegister(
                {
                    id: parseInt(matriculaId),
                    estudante_id: parseInt(id)
                }
            );

            const restoredMatricula = await matriculasServices.getOneRegister(
                {
                    id: parseInt(matriculaId),
                    estudante_id: parseInt(id)
                }
            );

            return res.status(200).json(restoredMatricula);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = MatriculaController;