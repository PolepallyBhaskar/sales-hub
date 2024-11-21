const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
// Load environment variables from .env file
dotenv.config();

// Create a connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Error with PostgreSQL pool:', err.message);
    process.exit(-1);
});
const initializeTables = async () => {
    try {
        // Read SQL files
        const productsPath = path.join(__dirname, '../models/products.sql');
        const salesOrdersPath = path.join(__dirname, '../models/sales_orders.sql');

        const productsSchema = fs.readFileSync(productsPath, 'utf8');
        const salesOrdersSchema = fs.readFileSync(salesOrdersPath, 'utf8');

        // Execute SQL queries
        await pool.query(productsSchema);
        console.log('Products table created successfully');

        await pool.query(salesOrdersSchema);
        console.log('Sales Orders table created successfully');
        console.log('Tables initialized successfully.');
    } catch (err) {
        console.error('Error initializing tables:', err.message);
    }
};

initializeTables();
module.exports = pool;
