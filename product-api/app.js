const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');


const fetchExchangeRates = require('./exchangeRates');
const { currencySymbols } = require('./constants');
const Product = require('./models/Product');
// Initialize Express app
const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json());




// Route for getting a single product
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { currency } = req.query;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let price = parseFloat(product.price);
    let currencySymbol = currencySymbols['USD']; // Default to USD

    // If a currency is provided, convert the price to that currency
    if (currency) {
      const exchangeRates = await fetchExchangeRates('USD',currency);
      console.log(exchangeRates);
      const conversionRate = parseFloat(exchangeRates["rates"][currency].rate);
      if (!conversionRate) {
        return res.status(400).json({ error: `Unsupported currency: ${currency}` });
      }
      price *= conversionRate;
      currencySymbol = currencySymbols[currency] || currencySymbol;
    }

    res.json({ ...product.toJSON(), price: `${currencySymbol}${price.toFixed(2)}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for adding a new product
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Load Swagger documentation
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});