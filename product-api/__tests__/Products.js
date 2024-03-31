const request = require('supertest');
const app = require('../app'); 

describe('Product API', () => {

  it('should retrieve a product by id', async () => {
    const res = await request(app)
      .get('/products/1')
      .expect('Content-Type', /json/)
      .expect(200);

    // Positive assertion
    expect(res.body).toHaveProperty('id', 1);

    // Negative scenario
    const res2 = await request(app)
      .get('/products/9999')
      .expect(404);
  });

  it('should add a new product', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        name: 'New Product',
        price: 99.99,
        description: 'This is a new product',
      })
      .expect('Content-Type', /json/)
      .expect(201);

    // Positive assertion
    expect(res.body).toHaveProperty('name', 'New Product');

    // Negative scenario
    const res2 = await request(app)
      .post('/products')
      .send({
        name: '', // Invalid name
        price: 99.99,
        description: 'This is a new product',
      })
      .expect(400);
  });
  it('should list top products', async () => {
    const res = await request(app)
      .get('/topProducts?limit=1')
      .expect('Content-Type', /json/)
      .expect(200);
  
    // Positive assertion
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(1); // Expecting only 1 top product
  
  });
  
  it('should delete a product', async () => {
    // Insert a product
    const newProduct = await request(app)
      .post('/products')
      .send({
        name: 'Product to delete',
        price: 99.99,
        description: 'This is a product to be deleted',
      })
      .expect(201);
  
    const res = await request(app)
      .delete(`/products/${newProduct.body.id}`)
      .expect(200);
  
    // Positive assertion
    expect(res.body).toHaveProperty('message', 'Product deleted successfully');
  
    // Negative scenario
    const res2 = await request(app)
      .delete(`/products/${newProduct.body.id}`)
      .expect(404);
  });
});