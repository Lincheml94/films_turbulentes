DROP DATABASE IF EXISTS turbulentes_dev;
CREATE DATABASE turbulentes_dev;

CREATE TABLE turbulentes_dev.category(
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE turbulentes_dev.film(
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    poster VARCHAR(255) NOT NULL,
    director VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    release_date INT NULL,
    fiche_technique TEXT NULL,
    prix_festivals TEXT NULL,
    production_soutien TEXT NULL,
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


INSERT INTO turbulentes_dev.category (name) values ("au catalogue"), ("en production"), ("en développement");
INSERT INTO turbulentes_dev.film (title, poster, director, description, release_date, fiche_technique, prix_festivals, production_soutien, category_id, image_1, image_2, image_3, image_4, image_5) VALUES ("Bienvenue à Sainte-Croix", "https://example.com/poster1.jpg", "Noémie Colin", "ceci est un film d'animation", 2026, NULL, "Prix du public", NULL, 1, NULL, NULL, NULL, NULL, NULL), ("Bienvenue à Bagnolet", "https://example.com/poster2.jpg", "Lina Chemlal", "ceci est un court métrage", 2023, NULL, "Prix de la meilleure interprétation", NULL, 1, NULL, NULL, NULL, NULL, NULL), ("Bienvenue aux Lilas", "https://example.com/poster3.jpg", "Antoine Coullet", "ceci est un long métrage en développement", NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL), ("Bienvenue à Montreuil", "https://example.com/poster4.jpg", "Joséphine Chauchat, Marin Morel", "ceci est un documentaire", NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO turbulentes_dev.user (username, password, role) VALUES ("Noémie", "$2b$12$HqJ2b7v8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5", "admin"), ("Charlotte", "$2b$12$Hsdgjxdfg2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5", "admin");