// models/Product.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONN);

const Product = sequelize.define('Product', {
  // Model attributes are defined here
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  viewCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;