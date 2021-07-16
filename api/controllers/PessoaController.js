const PessoasServices = require('../services').PessoasServices;
const pessoasServices = new PessoasServices();

class PessoaController {
    //Ler todas as pessoas
    static async readAll(req, res) {
        try {
            const pessoas = await pessoasServices.getAllRegisters();

            return res.status(200).json(pessoas);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Ler todas as pessoas ativas
    static async readAllActive(req, res) {
        try {
            const pessoasActive = await pessoasServices.getAllActiveRegisters();

            return res.status(200).json(pessoasActive);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Ler pessoa pelo ID
    static async readOne(req, res) {
        const id = req.params.id;
        try {
            const pessoa = await pessoasServices.getOneRegister({ id: parseInt(id) });

            return res.status(200).json(pessoa);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Criar uma nova pessoa
    static async createOne(req, res) {
        const newPessoa = req.body;
        try {
            const newPessoaCreated = await pessoasServices.createRegister(newPessoa);

            return res.status(201).json(newPessoaCreated);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Atualizar uma pessoa pelo ID
    static async updateOne(req, res) {
        const updateInfoPessoa = req.body;
        const id = req.params.id;
        try {
            await pessoasServices.updateRegister(updateInfoPessoa, { id: parseInt(id) });

            const updatedPessoa = await pessoasServices.getOneRegister({ id: parseInt(id) });

            return res.status(200).json(updatedPessoa);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Deletar pessoa pelo ID
    static async deleteOne(req, res) {
        const id = req.params.id;
        try {
            await pessoasServices.deleteRegister({ id: parseInt(id) });

            return res.status(200).json({ message: `Pessoa '${id}' deletada com sucesso!` });
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Restaura pessoa pelo ID
    static async restoreOne(req, res) {
        const id = req.params.id;
        try {
            await pessoasServices.restoreRegister({ id: parseInt(id) });

            const restoredPessoa = await pessoasServices.getOneRegister({ id: parseInt(id) });

            return res.status(200).json(restoredPessoa);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //Inativa uma pessoa e cancela suas matrículas
    static async inactivatePessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.inactivatePessoaAndMatriculas(parseInt(id));
    
            res.status(200).json({ message: `Matrículas referente ao estudante '${id}' foram canceladas!` });
        }
        catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;