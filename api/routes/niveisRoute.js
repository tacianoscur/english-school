const { Router } = require('express');
const NivelController = require('../controllers/NivelController');

const router = Router();

router.get('/niveis', (req, res) => {
    return NivelController.readAll(req, res);
});

router.get('/niveis/:id', (req, res) => {
    return NivelController.readOne(req, res);
});

router.post('/niveis', (req, res) => {
    return NivelController.createOne(req, res);
});

router.put('/niveis/:id', (req, res) => {
    return NivelController.updateOne(req, res);
});

router.delete('/niveis/:id', (req, res) => {
    return NivelController.deleteOne(req, res);
});

router.post('/niveis/:id/restaura', (req, res) => {
    return NivelController.restoreOne(req, res);
});

module.exports = router;