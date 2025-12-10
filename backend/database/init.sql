-- Scan_n_eat SQL Initialization Script
-- This script creates the databases and tables for the microservices.
-- Usage: Execute with psql using a superuser account (e.g. postgres).
-- Example: psql -U postgres -f init.sql

-- ==========================================
-- 1. Create Databases
-- ==========================================

DROP DATABASE IF EXISTS auth_db;
CREATE DATABASE auth_db;

DROP DATABASE IF EXISTS ingredient_db;
CREATE DATABASE ingredient_db;

DROP DATABASE IF EXISTS recipe_db;
CREATE DATABASE recipe_db;

DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;

DROP DATABASE IF EXISTS order_db;
CREATE DATABASE order_db;


-- ==========================================
-- 2. Define Schemas for Each Service
-- ==========================================

-- ------------------------------------------
-- Context: auth_db
-- Service: auth-service
-- ------------------------------------------
\c auth_db

-- Enable UUID extension if needed (Postgres 13+ includes gen_random_uuid() in pgcrypto or core)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE users IS 'Service: auth-service. Stores user credentials and roles.';


-- ------------------------------------------
-- Context: ingredient_db
-- Service: ingredient-service
-- ------------------------------------------
\c ingredient_db

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    nutritional_info JSONB
);

COMMENT ON TABLE ingredients IS 'Service: ingredient-service. central catalog of ingredients.';


-- ------------------------------------------
-- Context: recipe_db
-- Service: recipe-service
-- ------------------------------------------
\c recipe_db

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    instructions TEXT,
    prep_time VARCHAR(50), -- e.g. "30 minutes"
    servings INTEGER,
    image_url TEXT
);

COMMENT ON TABLE recipes IS 'Service: recipe-service. Stores recipe details.';

CREATE TABLE recipe_ingredients (
    recipe_id UUID NOT NULL,
    ingredient_id INTEGER NOT NULL, -- Logical reference to ingredient_db.ingredients(id)
    PRIMARY KEY (recipe_id, ingredient_id),
    CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

COMMENT ON TABLE recipe_ingredients IS 'Service: recipe-service. Join table for recipes and ingredients.';


-- ------------------------------------------
-- Context: inventory_db
-- Service: inventory-service
-- ------------------------------------------
\c inventory_db

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Logical reference to auth_db.users(user_id)
    ingredient_id INTEGER NOT NULL, -- Logical reference to ingredient_db.ingredients(id)
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    expiration_date DATE
);

COMMENT ON TABLE inventory_items IS 'Service: inventory-service. Tracks user inventory.';


-- ------------------------------------------
-- Context: order_db
-- Service: order-service
-- ------------------------------------------
\c order_db

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE order_status AS ENUM ('PENDING', 'COMPLETED');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Logical reference to auth_db.users(user_id)
    total_price DECIMAL(10, 2),
    status order_status DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE orders IS 'Service: order-service. Stores order headers.';

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID NOT NULL,
    ingredient_id INTEGER NOT NULL, -- Logical reference to ingredient_db.ingredients(id)
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2),
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

COMMENT ON TABLE order_items IS 'Service: order-service. Stores items within an order.';
