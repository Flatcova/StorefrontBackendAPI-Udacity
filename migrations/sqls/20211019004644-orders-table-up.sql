/* Replace with your SQL commands */

CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    user_id bigint REFERENCES users(id),
    order_status VARCHAR(100) DEFAULT 'active'
);

CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity integer
);

CREATE UNIQUE INDEX order_product_unique_idx ON order_product USING btree(order_id, product_id);