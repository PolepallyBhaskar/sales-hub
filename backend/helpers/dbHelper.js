const pool = require('../config/database');

const executeQuery = async (query, params) => {
    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    executeQuery,
};
