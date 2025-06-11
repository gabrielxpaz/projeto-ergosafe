const { Router }  = require('express')
const router = Router();
const fisioController = require('../controllers/fisioController');
const { userLoader, checkFisio, patientLoader } = require('../middlewares/dashMiddlewares');

router.get('/pacientes', userLoader, checkFisio, fisioController.pacientes);
router.get('/paciente/:id', userLoader, checkFisio, fisioController.paciente);
router.get('/criar-paciente', userLoader, checkFisio, fisioController.addPacienteScreen);
router.post('/criar-paciente', userLoader, checkFisio, fisioController.addPaciente);

module.exports = router;