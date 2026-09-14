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
    director_1 VARCHAR(50) NOT NULL,
    director_1_bio TEXT NULL,
    director_1_image VARCHAR(255) NULL,
    director_2 VARCHAR(50) NULL,
    director_2_bio TEXT NULL,
    director_2_image VARCHAR(255) NULL,
    director_3 VARCHAR(50) NULL,
    director_3_bio TEXT NULL,
    director_3_image VARCHAR(255) NULL,
    type VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
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

INSERT INTO turbulentes_dev.user (username, password, role) VALUES ("Noémie", "$2b$12$HqJ2b7v8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5", "admin"), ("Charlotte", "$2b$12$Hsdgjxdfg2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5", "admin");
INSERT INTO turbulentes_dev.category (name) values ("au catalogue"), ("en production"), ("en développement");
INSERT INTO turbulentes_dev.film (title, poster, director_1, director_1_bio, director_1_image, director_2, director_2_bio, director_2_image, director_3, director_3_bio, director_3_image, type, description, release_date, duration, fiche_technique, prix_festivals, partenaires_soutiens, presse, category_id, image_1, image_2, image_3, image_4, image_5) 
VALUES 
("Bienvenue à Sainte-Croix", "https://example.com/poster1.jpg", "Noémie Colin", "Biography for Noémie Colin", "https://example.com/director1.jpg", NULL, NULL, NULL, NULL, NULL, NULL, "court métrage", "ceci est un film d'animation", 2026, 90, NULL, "Prix du public", NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL), 
("Bienvenue à Bagnolet", "https://example.com/poster2.jpg", "Lina Chemlal", "Biography for Lina Chemlal", "https://example.com/director2.jpg", NULL, NULL, NULL, NULL, NULL, NULL, "court métrage", "ceci est un court métrage", 2023, 30, NULL, "Prix de la meilleure interprétation", NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL), 
("Bienvenue aux Lilas", "https://example.com/poster3.jpg", "Antoine Coullet", "Biography for Antoine Coullet", "https://example.com/director3.jpg", NULL, NULL, NULL, NULL, NULL, NULL, "long métrage", "ceci est un long métrage en développement", NULL, 120, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL), 
("Bienvenue à Montreuil", "https://example.com/poster4.jpg", "Joséphine Chauchat", "Biography for Joséphine Chauchat", "https://example.com/director4.jpg", "Marin Morel", "Biography for Marin Morel", "https://example.com/director5.jpg", NULL, NULL, NULL, "documentaire", "ceci est un documentaire", NULL, 60, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL);

