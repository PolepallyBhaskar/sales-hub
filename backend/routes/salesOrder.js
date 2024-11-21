const express = require('express');
const router = express.Router();
const salesOrderController = require('../controllers/salesOrderController');

router.post('/', salesOrderController.create);
router.put('/:id', salesOrderController.update);
router.delete('/:id', salesOrderController.delete);
router.get('/', salesOrderController.getAll);
router.get('/search', salesOrderController.search);


module.exports = router;
