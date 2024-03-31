#!/bin/sh

set -e

host="product-api-db-1"
port="3306"
user="user"
password="pass"
database="productdb"

# Wait for the MySQL server to be ready
until mysql -h $host -P $port -u $user -p$password -e "SELECT 1;" &> /dev/null
do
  echo "Waiting for MySQL server..."
  mysql -h $host -P $port -u $user -p$password -e "SELECT 1;"
  sleep 1
done

#echo "Droppig table "

#mysql -h $host -P $port -u $user -p$password $database <<EOF
#DROP TABLE IF EXISTS products;
#EOF

echo "MySQL server is ready. Initializing database..."
mysql -h $host -P $port -u $user -p$password $database <<EOF
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    viewCount INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT false
);
EOF

echo "Created table 'products'."

mysql -h $host -P $port -u $user -p$password $database <<EOF
INSERT INTO products (name, price, description)
VALUES ('Product 1', 19.99, 'This is product 1'),
       ('Product 2', 29.99, 'This is product 2');
EOF

echo "Inserted dummy data into 'products' table."