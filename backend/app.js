const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/salesOrder');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

app.listen(process.env.PORT, () => console.log('Server running on port 3000'));
