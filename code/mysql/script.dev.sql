DROP DATABASE IF EXISTS turbulentes_dev;
CREATE DATABASE turbulentes_dev;
-- USE turbulentes_dev;

CREATE TABLE turbulentes_dev.category(
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE turbulentes_dev.film(
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    poster VARCHAR(255) NOT NULL,
    director_1 VARCHAR(50) NOT NULL,
    director_1_bio TEXT NULL,
    director_1_image VARCHAR(255) NULL,
    director_2 VARCHAR(50) NULL,
    director_2_bio TEXT NULL,
    director_2_image VARCHAR(255) NULL,
    director_3 VARCHAR(50) NULL,
    director_3_bio TEXT NULL,
    director_3_image VARCHAR(255) NULL,
    type VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    release_date INT NULL,
    duration INT NULL,
    fiche_technique TEXT NULL,
    prix_festivals TEXT NULL,
    partenaires_soutiens TEXT NULL,
    presse TEXT NULL,
    category_id TINYINT UNSIGNED NOT NULL,
    image_1 VARCHAR(255) NULL,
    image_2 VARCHAR(255) NULL,
    image_3 VARCHAR(255) NULL,
    image_4 VARCHAR(255) NULL,
    image_5 VARCHAR(255) NULL,
    FOREIGN KEY (category_id) REFERENCES turbulentes_dev.category(id)
);

CREATE TABLE turbulentes_dev.user(
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin'
);

INSERT INTO turbulentes_dev.user (username, password, role) VALUES ("noemie", "$argon2i$v=19$m=16,t=2,p=1$MFBtT3dYa0RzWjVzcDFXYw$ujL0Ys7AWrr/cmSbjp3qKw", "admin"), ("charlotte", "$argon2i$v=19$m=16,t=2,p=1$MFBtT3dYa0RzWjVzcDFXYw$EbOoXc2fTswkkEMVdD1B7A", "admin");
INSERT INTO turbulentes_dev.category (name) values ("En exploitation"), ("En production"), ("En développement");
