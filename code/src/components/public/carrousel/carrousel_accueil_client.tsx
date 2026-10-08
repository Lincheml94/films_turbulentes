"use client"; // <--- CRUCIAL : Doit être la toute première ligne

import { useState } from "react";
import type { Film } from "../../../../models/film";
import styles from "../../../assets/css/public/carrousel.module.css";

interface CarrouselAccueilClientProps {
	initialFilms: Film[];
}

const CarrouselAccueilClient = ({
	initialFilms,
}: CarrouselAccueilClientProps) => {
	// Initialisation de l'état à 0
	const [currentIndex, setCurrentIndex] = useState(0);

	// Sécurité : si pas de films
	if (!initialFilms || initialFilms.length === 0) {
		return (
			<div className={styles.mainCarrousel}>
				<p>Aucun film en exploitation.</p>
			</div>
		);
	}

	const film = initialFilms[currentIndex];
	const totalSlides = initialFilms.length;

	if (!film) {
		return null;
	}

	// Fonctions de navigation avec débogage
	const handleNext = () => {
		console.log("Clic Suivant - Index actuel :", currentIndex);
		setCurrentIndex((prev) => {
			const next = (prev + 1) % totalSlides;
			console.log("Nouvel index :", next);
			return next;
		});
	};

	const handlePrev = () => {
		console.log("Clic Précédent - Index actuel :", currentIndex);
		setCurrentIndex((prev) => {
			const next = (prev - 1 + totalSlides) % totalSlides;
			console.log("Nouvel index :", next);
			return next;
		});
	};

	// Gestion de l'année (Nombre ou String)
	const releaseYear =
		typeof film.release_date === "number"
			? film.release_date.toString()
			: String(film.release_date ?? 2025);

	return (
		<div className={styles.mainCarrousel}>
			<div className={styles.legend}>
				<div className={styles.texte}>
					<p className={styles.legendTitle}>{film.title || "Titre inconnu"}</p>
					<p className={styles.legendText}>{releaseYear}</p>
					<p className={styles.legendText}>
						Un film de {film.director_1 || "Inconnu"}
					</p>
				</div>
				<div className={styles.fleches}>
					{/* Bouton SUIVANT */}
					<button
						type="button"
						onClick={handleNext}
						className={styles.btnNext} // Ajout d'une classe au cas où tu voudrais styliser
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							padding: 0,
							zIndex: 10,
						}}
						aria-label="Film suivant"
					>
						<img
							src="/img/icons/arrow_right.svg"
							alt="Suivant"
							style={{ pointerEvents: "none" }}
						/>
					</button>

					{/* Bouton PRÉCÉDENT */}
					<button
						type="button"
						onClick={handlePrev}
						className={styles.btnPrev}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							padding: 0,
							zIndex: 10,
						}}
						aria-label="Film précédent"
					>
						<img
							src="/img/icons/arrow_left.svg"
							alt="Précédent"
							style={{ pointerEvents: "none" }}
						/>
					</button>
				</div>
			</div>
			<div className={styles.poster}>
				<img
					src={`/img/${film.poster}`}
					alt={`Affiche du film ${film.title}`}
				/>
			</div>
		</div>
	);
};

export default CarrouselAccueilClient;
