const dbHelper = require('../helpers/dbHelper');

const createProduct = async (data) => {
    const query = `
        INSERT INTO products (name, description, price, quantity) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`;
    const params = [data.name, data.description, data.price, data.quantity];
    return dbHelper.executeQuery(query, params);
};

const updateProduct = async (id, data) => {
    const query = `
        UPDATE products 
        SET name = $1, description = $2, price = $3, quantity = $4, updated_at = NOW() 
        WHERE id = $5 
        RETURNING *`;
    const params = [data.name, data.description, data.price, data.quantity, id];
    return dbHelper.executeQuery(query, params);
};

const deleteProduct = async (id) => {
    const query = `DELETE FROM products WHERE id = $1`;
    const params = [id];
    await dbHelper.executeQuery(query, params);
};

const getAllProducts = async () => {
    const query = `SELECT * FROM products`;
    return dbHelper.executeQuery(query);
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
};
