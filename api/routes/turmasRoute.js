const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router();

router.get('/turmas', (req, res) => {
    return TurmaController.readAll(req, res);
});

router.get('/turmas/:id', (req, res) => {
    return TurmaController.readOne(req, res);
});

router.post('/turmas', (req, res) => {
    return TurmaController.createOne(req, res);
});

router.put('/turmas/:id', (req, res) => {
    return TurmaController.updateOne(req, res);
});

router.delete('/turmas/:id', (req, res) => {
    return TurmaController.deleteOne(req, res);
});

router.post('/turmas/:id/restaura', (req, res) => {
    return TurmaController.restoreOne(req, res);
});

module.exports = router;