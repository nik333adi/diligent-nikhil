# diligent-nikhil-excercise-1

## Architecture and Technologies Interaction

This project uses a combination of technologies that interact with each other as follows:

- **Node.js** and **Express.js**: These form the backbone of the application, providing the runtime environment and the web application framework respectively. Express.js is used to define the API endpoints of the application.

- **MySQL**: This is the database of the application. It stores the data that the Express.js application manipulates. The application interacts with the database using SQL queries.

- **Docker** and **Docker Compose**: These are used to containerize the application and its dependencies. Docker Compose is used to define the services that make up the application (the Node.js/Express.js application and the MySQL database) and run them together in an isolated environment.

- **Jest**: This is used for testing the application. It runs tests against the Express.js application to ensure that the API endpoints are working as expected.

- **Swagger**: This is used to document the API endpoints of the application. It provides a UI where you can view and interact with the API's documentation.

- **Nginx**: This is used as a reverse proxy to route requests to the Express.js application. It also serves static files and handles load balancing.

- **db-init**: This is a custom service that initializes the MySQL database. It creates the `product` table and loads it with dummy data. This service is defined in the Docker Compose file and uses a script to perform the database initialization. The script is run when the `db-init` service starts, ensuring that the database is correctly set up before the application starts interacting with it.

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

