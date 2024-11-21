const pool = require('../config/database');

exports.create = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        const result = await pool.query(
            'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity } = req.body;
        const result = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
            [name, description, price, quantity, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};