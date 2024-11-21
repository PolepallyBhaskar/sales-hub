const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/', productsController.create);
router.post('/external', productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);
router.get('/', productsController.getAll);

module.exports = router;
