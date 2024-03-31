const { Op } = require('sequelize');
const fetchExchangeRates = require('../exchangeRates');
const { currencySymbols } = require('../constants');
const Product = require('../models/Product');


/**
 * @swagger
 * /products/top:
 *   get:
 *     summary: Retrieve a list of top products
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of products to return
 *     responses:
 *       200:
 *         description: A list of top products
 */
exports.getTopProducts = async (req, res) => {
    try {
        const { limit = 5 } = req.query;
        const products = await Product.findAll({
            where: {
                viewCount: {
                    [Op.gte]: 1
                },
                is_deleted: false
            },
            order: [['viewCount', 'DESC']],
            limit: parseInt(limit)
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the product to retrieve
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *           enum: [USD, EUR, GBP,CAD]
 *         description: The currency in which to display the product price. Supported currencies are USD, EUR, GBP, CAD
 *     responses:
 *       200:
 *         description: A product object
 *       400:
 *         description: Unsupported currency
 *       404:
 *         description: The product was not found
 */
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { currency } = req.query;
        
        // Check if the provided currency is supported
        if (currency && !currencySymbols[currency]) {
            return res.status(400).json({ error: `Unsupported currency: ${currency}` });
        }
        const product = await Product.findOne({
            where: {
                id,
                is_deleted: false
            }
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Increase the view count by 1
        product.viewCount += 1;
        await product.save();

        let price = parseFloat(product.price);
        let currencySymbol = currencySymbols['USD']; // Default to USD

        // If a currency is provided, convert the price to that currency
        if (currency) {
            const exchangeRates = await fetchExchangeRates('USD', currency);
            console.log(exchangeRates);
            const conversionRate = parseFloat(exchangeRates['rates'][currency].rate);
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
};

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created product object
 *       400:
 *         description: Name and price are mandatory fields
 *       500:
 *         description: Server error
 */
exports.addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are mandatory fields' });
        }
        const product = await Product.create({
            name,
            price,
            description
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Soft delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the product to delete
 *     responses:
 *       200:
 *         description: Product soft deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.is_deleted = true;
        await product.save();
        res.json({ message: 'Product soft deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
