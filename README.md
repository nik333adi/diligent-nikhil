# diligent-nikhil-excercise-1

## Database Schema

The `product` table in the database has the following schema:

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id          | INTEGER   | The unique identifier of the product. This is the primary key. |
| name        | STRING    | The name of the product. |
| price       | FLOAT     | The price of the product. |
| description | TEXT      | The description of the product. |
| createdAt   | DATETIME  | The date and time when the product was created. |
| updatedAt   | DATETIME  | The date and time when the product was last updated. |
| deletedAt   | DATETIME  | The date and time when the product was deleted. This is `NULL` if the product is not deleted. |


## deploy
To deploy the application, follow these steps:

1. Install dependencies: Run `npm install` in the root directory of the project.
2. Set environment variables: Create a `.env` file in the root directory and set the appropriate values for the keys as mentioned in the `Environment Variables` section.
3. Run the application: Use the command `docker-compose up` to start the application.

Please ensure that you have Docker installed on your machine before you attempt to deploy the application.

## Testing

To run the Jest tests, follow these steps:

1. Install dependencies: If you haven't done so already, run `npm install` in the root directory of the project.
2. Set environment variables: Ensure that your `.env` file is set up with the appropriate values as mentioned in the `Environment Variables` section.
3. Run the tests: Use the command `docker-compose -f docker-compose.test.yml up` to start the services and run the tests.

Please ensure that you have Docker and Docker Compose installed on your machine before you attempt to run the tests.

# Swagger UI

To view the Swagger UI for the API documentation, follow these steps:

1. Run `docker-compose up` in the root directory of the project.
2. Open a web browser and navigate to `http://localhost:3000/api-docs`.

Please ensure that the application is running and accessible at `localhost:3000` (or change the URL to match your server's configuration).

## env
create .env file and appropriate values for the below keys 
HOST=currency-converter5.p.rapidapi.com
API_KEY=
DB_CONN=mysql://user:pass@db:3306/productdb

