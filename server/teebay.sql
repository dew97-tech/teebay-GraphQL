-- This command line are only used to create the Database Structure 
-- In CMD the following code creates DB called teebay and its fields are given below....

CREATE DATABASE teebay;

CREATE TABLE clients (
  client_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL
);

CREATE TABLE products (
  prod_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  categories TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  is_available BOOLEAN NOT NULL,
  client_id INTEGER REFERENCES clients (client_id)
);
