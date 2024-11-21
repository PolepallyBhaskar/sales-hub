const salesOrderService = require('../services/salesOrderService');

exports.create = async (req, res) => {
    try {
        const salesOrder = await salesOrderService.createOrder(req.body);
        res.status(201).json(salesOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const salesOrder = await salesOrderService.updateOrder(id, req.body);
        res.status(200).json(salesOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await salesOrderService.deleteOrder(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const salesOrders = await salesOrderService.getAllOrders();
        res.status(200).json(salesOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.search = async (req, res) => {
    try {
        const salesOrder = await salesOrderService.searchSalesOrders(req.body);
        res.status(201).json(salesOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
