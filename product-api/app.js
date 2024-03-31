const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
//const YAML = require('yamljs');
const swaggerJSDoc = require('swagger-jsdoc'); // Add this line
const { getTopProducts, getProductById,addProduct,deleteProduct } = require('./controllers/productController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Route for showing most viewed products
app.get('/products/top', getTopProducts);

// Route for getting a single product
app.get('/products/:id', getProductById);

// Route for adding a new product
app.post('/products', addProduct);

// Route for soft deleting a product
app.delete('/products/:id', deleteProduct);

// Load Swagger documentation
//const swaggerDocument = YAML.load('./swagger.yaml');
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Generate Swagger documentation based on productController.js
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // specify the OpenAPI version
    info: {
      title: 'Product API',
      description: 'API documentation for product management',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./controllers/productController.js', './app.js'], // Add app.js to the list of APIs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
//app.listen(3000, () => {
//  console.log('Server is running on port 3000');
//});
// Export the app
module.exports = app;