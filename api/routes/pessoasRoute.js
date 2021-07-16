const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');
const MatriculaController = require('../controllers/MatriculaController');

const router = Router();

//Pessoas
router.get('/pessoas/active', (req, res) => {
    return PessoaController.readAllActive(req, res);
});

router.get('/pessoas', (req, res) => {
    return PessoaController.readAll(req, res);
});

router.get('/pessoas/:id', (req, res) => {
    return PessoaController.readOne(req, res);
});

router.post('/pessoas', (req, res) => {
    return PessoaController.createOne(req, res);
});

router.put('/pessoas/:id', (req, res) => {
    return PessoaController.updateOne(req, res);
});

router.delete('/pessoas/:id', (req, res) => {
    return PessoaController.deleteOne(req, res);
});

router.post('/pessoas/:id/restaura', (req, res) => {
    return PessoaController.restoreOne(req, res);
});

router.post('/pessoas/:id/cancela', (req, res) => {
    return PessoaController.inactivatePessoa(req, res);
});

//Matriculas
router.get('/pessoas/:id/matriculas', (req, res) => {
    return MatriculaController.readAllMatriculas(req, res);
});

router.get('/pessoas/matriculas/:turmaId/confirmadas', (req, res) => {
    return MatriculaController.readMatriculasByTurma(req, res);
});

router.get('/pessoas/matriculas/lotadas', (req, res) => {
    return MatriculaController.readFullTurmas(req, res);
});

router.get('/pessoas/:id/matriculas/:matriculaId', (req, res) => {
    return MatriculaController.readOneMatricula(req, res);
});

router.post('/pessoas/:id/matriculas', (req, res) => {
    return MatriculaController.createMatricula(req, res);
});

router.put('/pessoas/:id/matriculas/:matriculaId', (req, res) => {
    return MatriculaController.updateOneMatricula(req, res);
});

router.delete('/pessoas/:id/matriculas/:matriculaId', (req, res) => {
    return MatriculaController.deleteOneMatricula(req, res);
});

router.post('/pessoas/:id/matriculas/:matriculaId/restaura', (req, res) => {
    return MatriculaController.restoreOneMatricula(req, res);
});

module.exports = router;