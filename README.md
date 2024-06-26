# diligent-nikhil-excercise-1

## Architecture and Technologies Interaction

This project uses a combination of technologies that interact with each other as follows:

- **Node.js** and **Express.js**: These form the backbone of the application, providing the runtime environment and the web application framework respectively. Express.js is used to define the API endpoints of the application.

- **MySQL**: This is the database of the application. It stores the data that the Express.js application manipulates. The application interacts with the database using Sequelize framework. 

- **Docker** and **Docker Compose**: These are used to containerize the application and its dependencies. Docker Compose is used to define the services that make up the application (the Node.js/Express.js application and the MySQL database) and run them together in an isolated environment.

- **Jest**: This is used for testing the application. It runs tests against the Express.js application to ensure that the API endpoints are working as expected.

- **Swagger**: This is used to document the API endpoints of the application. It provides a UI where you can view and interact with the API's documentation.

- **Nginx**: This is used as a reverse proxy to route requests to the Express.js application. It also serves static files and handles load balancing.

- **Currency Converter**: This is a feature of the application that allows users to view product prices in different currencies. The application uses an external API (https://rapidapi.com/natkapral/api/currency-converter5/pricing) to fetch the latest currency exchange rates. The `API_KEY` environment variable is used to authenticate requests to the currency converter API. 

- **Caching Mechanism**: To optimize the currency conversion process and reduce the number of API calls, the application implements a in memory caching mechanism. When the application fetches exchange rates from the currency converter API, it stores them in a cache with the `timestamp`. When a request is made to convert a price to a different currency, the application first checks if the required exchange rate is available in the cache. If it is and the data is `less than 60 minutes old`, the application uses the cached rate for the conversion. If it's not, the application makes a request to the currency converter API to fetch the rate, stores it in the cache with the timestamp for future use, and then uses it for the conversion.

- **db-init**: This is a custom service that initializes the MySQL database. It creates the `product` table and loads it with dummy data. This service is defined in the Docker Compose file and uses a script to perform the database initialization. The script is run when the `db-init` service starts, ensuring that the database is correctly set up before the application starts interacting with it.


## Database Schema

The `product` table in the database has the following schema:

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id          | INTEGER   | The unique identifier of the product. This is the primary key. |
| name        | STRING    | The name of the product. |
| price       | FLOAT     | The price of the product. |
| description | TEXT      | The description of the product. |
| isDeleted   | BOOLEAN   | A flag indicating whether the product is deleted. This is `false` if the product is not deleted. |
| viewCount   | INTEGER   | The number of times the product has been viewed. |

## Deploy
To deploy the application, follow these steps after cloning:

1. `cd product-api` 
2. Install dependencies: Run `npm install` 
3. Set environment variables: Create a `.env` file in the root directory and set the appropriate values for the keys as mentioned in the `Environment Variables` section.
4. Run the application: Use the command `docker-compose up` to start the application.

Please ensure that you have Docker installed on your machine before you attempt to deploy the application.

## Testing

To run the Jest tests, follow these steps:

1. Install dependencies: run `npm install` in the root directory of the project.
2. Set environment variables: Ensure that your `.env` file is set up with the appropriate values as mentioned in the `Environment Variables` section.
3. Run the tests: Use the command `docker-compose -f docker-compose.test.yml up` to start the services and run the tests.

Please ensure that you have Docker and Docker Compose installed on your machine before you attempt to run the tests.

# Swagger UI

To view the Swagger UI for the API documentation, follow these steps:

1. Run `docker-compose up` in the root directory of the project.
2. Open a web browser and navigate to `http://localhost:3000/api-docs`.

Please ensure that the application is running and accessible at `localhost:3000` (or change the URL to match your server's configuration).


## Environment Variables

Create a `.env` file in the `product-api` directory. Add the following environment variables to  `.env` file and replace the `API_KEY` with the actual key.

```env
HOST=currency-converter5.p.rapidapi.com
API_KEY=<your-api-key>
DB_CONN=mysql://user:pass@db:3306/productdb