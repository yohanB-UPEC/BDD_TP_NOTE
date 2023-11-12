-- Insérer des données dans la table stocks
INSERT INTO stocks (id, name, location) VALUES
  (1, 'Stock A', 'Location A'),
  (2, 'Stock B', 'Location B'),
  (3, 'Stock C', 'Location C');

-- Insérer des données dans la table products
INSERT INTO products (id, name, price) VALUES
  (1, 'Product 1', 10.99),
  (2, 'Product 2', 20.49),
  (3, 'Product 3', 15.75);

-- Insérer des données dans la table stock_products
INSERT INTO stock_products (id_stock, id_product, quantity) VALUES
  (1, 1, 50),
  (1, 2, 30),
  (2, 1, 20),
  (2, 3, 40),
  (3, 2, 15),
  (3, 3, 25);

-- Insérer des données dans la table transactions
INSERT INTO transactions (id, id_product, id_stock, quantity, transaction_type) VALUES
  (1, 1, 1, 10, 'OUTGOING'),
  (2, 2, 1, 5, 'INCOMING'),
  (3, 3, 2, 8, 'OUTGOING'),
  (4, 1, 3, 15, 'INCOMING');
