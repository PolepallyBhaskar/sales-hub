const dbHelper = require('../helpers/dbHelper');
const { pushOrderToThirdParty } = require('../services/thirdPartyService');

/**
 * Create a new sales order with a linked product.
 * @param {Object} data - Sales order details
 * @returns {Promise<Object>} - Created sales order
 */
const createOrder = async (data) => {
    const query = `
        INSERT INTO sales_orders (customer_name, email, mobile_number, status, order_date, product_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
    const params = [
        data.customer_name,
        data.email,
        data.mobile_number,
        data.status,
        data.order_date || new Date(), // Use provided or default date
        data.product_id,
    ];
    const result = await dbHelper.executeQuery(query, params);
    await pushOrderToThirdParty(result[0])
    return result[0]; // Return the first result

};

/**
 * Update an existing sales order.
 * @param {number} id - Sales order ID
 * @param {Object} data - Updated sales order details
 * @returns {Promise<Object>} - Updated sales order
 */
const updateOrder = async (id, data) => {
    const query = `
        UPDATE sales_orders
        SET customer_name = $1, email = $2, mobile_number = $3, status = $4, order_date = $5, product_id = $6, updated_at = NOW()
        WHERE id = $7
        RETURNING *`;
    const params = [
        data.customer_name,
        data.email,
        data.mobile_number,
        data.status,
        data.order_date || new Date(),
        data.product_id,
        id,
    ];
    const result = await dbHelper.executeQuery(query, params);
    return result[0]; // Return the first result
};

/**
 * Delete a sales order by ID.
 * @param {number} id - Sales order ID
 */
const deleteOrder = async (id) => {
    const query = `DELETE FROM sales_orders WHERE id = $1`;
    await dbHelper.executeQuery(query, [id]);
};

/**
 * Get all sales orders with their associated product details.
 * @returns {Promise<Array>} - List of sales orders with products
 */
const getAllOrders = async () => {
    const query = `
        SELECT so.*, p.name AS product_name, p.description AS product_description, p.price AS product_price
        FROM sales_orders so
        JOIN products p ON so.product_id = p.id`;
    return dbHelper.executeQuery(query);
};
const searchSalesOrders = async (filters) => {
    const {
        name,
        email,
        mobile_number,
        status,
        order_date,
    } = filters;

    // Build the base query
    let query = 'SELECT * FROM sales_orders WHERE 1 = 1'; // 1 = 1 to make dynamic WHERE clauses easier

    const params = [];
    let paramCount = 1;

    // Add conditions to the query based on filters provided
    if (name) {
        query += ` AND customer_name ILIKE $${paramCount}`;
        params.push(`%${name}%`);
        paramCount++;
    }
    if (email) {
        query += ` AND email ILIKE $${paramCount}`;
        params.push(`%${email}%`);
        paramCount++;
    }
    if (mobile_number) {
        query += ` AND mobile_number ILIKE $${paramCount}`;
        params.push(`%${mobile_number}%`);
        paramCount++;
    }
    if (status) {
        query += ` AND status ILIKE $${paramCount}`;
        params.push(`%${status}%`);
        paramCount++;
    }
    if (order_date) {
        query += ` AND order_date = $${paramCount}`;
        params.push(order_date);
        paramCount++;
    }

    // Execute the query and return the results
    const result = await dbHelper.executeQuery(query, params);
    return result;
};
module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    searchSalesOrders
};
