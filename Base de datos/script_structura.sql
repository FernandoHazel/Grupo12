/* Creamos la bsae de datos */
DROP DATABASE IF EXISTS tecnosp_db;
 
/* Creamos la base de datos con formato utf-8 */
CREATE DATABASE tecnosp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tecnosp_db;

/******************** USUARIOS **********************/
/* Los roles de usuario */
DROP TABLE IF EXISTS users_roles;
CREATE TABLE users_roles (
	id SMALLINT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_role VARCHAR(50) NOT NULL
) ENGINE = InnoDB ;

/* Tabla de usuarios */
DROP TABLE IF EXISTS users;
CREATE TABLE users(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    user_role_id SMALLINT(2) UNSIGNED NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY(id),
	FOREIGN KEY (user_role_id)
		REFERENCES users_roles(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB ;

/* Informacion adicional de los usuarios*/
DROP TABLE IF EXISTS users_info;
CREATE TABLE users_info(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
	age SMALLINT(2) UNSIGNED,
    profile_img VARCHAR(500),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id),
    FOREIGN KEY(user_id)
		REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB ;


/* Carrito del usuario */
DROP TABLE IF EXISTS cart_user;
CREATE TABLE cart_user(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    createdAt  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    
    PRIMARY KEY(id),
    FOREIGN KEY(user_id)
		REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB ;

/******************** PRODUCTOS **********************/
DROP TABLE IF EXISTS categories;
/* categorias*/
CREATE TABLE categories(
	id SMALLINT(2) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB ;

/* productos */
DROP TABLE IF EXISTS products;
CREATE TABLE products(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	category_id SMALLINT(2) UNSIGNED NOT NULL,
    seller_id INT UNSIGNED NOT NULL,
    title VARCHAR(255),
    description TEXT,
    price DECIMAL(8, 2),
    stock INT UNSIGNED DEFAULT 1,
    img VARCHAR(500),
    discount SMALLINT(2),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active TINYINT(1) NOT NULL DEFAULT 1,
    sold_units INT UNSIGNED DEFAULT 0,
    
    PRIMARY KEY (id),
    FOREIGN KEY (category_id)
		REFERENCES categories(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
        
	FOREIGN KEY (seller_id)
		REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB ;

/* Carrito-productos*/
DROP TABLE IF EXISTS cart_product;
CREATE TABLE cart_product (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    cart_user_id INT UNSIGNED NOT NULL,
    date_added DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_quantity INT UNSIGNED NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (cart_user_id)
        REFERENCES cart_user(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB ;

/******************* Compras  *****************/
/* Tickets de compra  */
DROP TABLE IF EXISTS tickets;
CREATE TABLE tickets(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL, 
    purchase_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(8, 2),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
		REFERENCES users(id)
) ENGINE = InnoDB ;

/* Productos de cada ticket*/
DROP TABLE IF EXISTS purchases;
CREATE TABLE purchases(
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    ticket_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    individual_price DECIMAL(8, 2),
    product_quantity INT UNSIGNED NOT NULL DEFAULT 1,
    
    PRIMARY KEY(id),
    FOREIGN KEY(ticket_id)
		REFERENCES tickets(id),
	FOREIGN KEY(product_id)
		REFERENCES products(id)
) ENGINE = InnoDB ;
