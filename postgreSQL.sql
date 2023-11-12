drop table transactions;
drop table stock_products;
drop table stocks;
drop table products;


CREATE TABLE stocks
(
    id int PRIMARY KEY,
    name varchar(50) NOT NULL,
    location varchar(250) NOT NULL
);

CREATE TABLE products
(
    id int PRIMARY KEY,
    name varchar(50) NOT NULL,
    price float NOT NULL
);

CREATE TABLE stock_products
(
    id_stock int NOT NULL REFERENCES stocks(id),
    id_product int NOT NULL REFERENCES products(id),
    quantity int NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    PRIMARY KEY (id_stock, id_product)
);
ALTER TABLE stock_products ADD CONSTRAINT chk_quantity_nonnegative CHECK (quantity >= 0);

CREATE TABLE transactions
(
    id SERIAL PRIMARY KEY,
    id_product int NOT NULL REFERENCES products(id),
    id_stock int NOT NULL REFERENCES stocks(id),
    quantity int NOT NULL,
    transaction_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    transaction_type varchar(10) NOT NULL CHECK (transaction_type IN ('OUTGOING', 'INCOMING'))
);
