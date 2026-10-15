"use client";

import { useRef, useState } from "react";
import { NavLink } from "react-router";
import type { Film } from "../../../../models/film";
import styles from "../../../assets/css/public/carrousel.module.css";

interface CarrouselAccueilClientProps {
	initialFilms: Film[];
}

// Distance horizontale minimale (en px) pour considérer un geste comme un swipe
const SWIPE_THRESHOLD = 50;

const CarrouselAccueilClient = ({
	initialFilms,
}: CarrouselAccueilClientProps) => {
	// Initialisation de l'état à 0
	const [currentIndex, setCurrentIndex] = useState(0);
	// Position du doigt au début du geste (swipe)
	const touchStart = useRef<{ x: number; y: number } | null>(null);

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

	// Gestion du swipe (tactile)
	const handleTouchStart = (e: React.TouchEvent) => {
		const touch = e.touches[0];
		if (!touch) return;
		touchStart.current = { x: touch.clientX, y: touch.clientY };
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		const start = touchStart.current;
		const touch = e.changedTouches[0];
		touchStart.current = null;
		if (!start || !touch) return;

		const deltaX = touch.clientX - start.x;
		const deltaY = touch.clientY - start.y;

		// On ignore les gestes trop courts ou plutôt verticaux (scroll de la page)
		if (
			Math.abs(deltaX) < SWIPE_THRESHOLD ||
			Math.abs(deltaX) < Math.abs(deltaY)
		) {
			return;
		}

		if (deltaX < 0) {
			handleNext(); // swipe vers la gauche → film suivant
		} else {
			handlePrev(); // swipe vers la droite → film précédent
		}
	};

	// Gestion de l'année (Nombre ou String)
	const releaseYear =
		typeof film.release_date === "number"
			? film.release_date.toString()
			: String(film.release_date ?? 2025);

	return (
		<div
			className={styles.mainCarrousel}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<div className={styles.legend}>
				<NavLink to={`/films/${film.id}`}>
					{/* <NavLink to="/films" onClick={(e) => e.stopPropagation()}> */}
					<div className={styles.texte}>
						<p className={styles.legendTitle}>
							{film.title || "Titre inconnu"}
						</p>
						<p className={styles.legendText}>{releaseYear}</p>
						<div className={styles.legendCineaste}>
							<p className={styles.legendText}>
								Un film de {film.director_1 || "Inconnu"}
							</p>
							{film.director_2 && <p className={styles.legendText}>,&nbsp;</p>}
							{film.director_2 && (
								<p className={styles.legendText}>{film.director_2}</p>
							)}
							{film.director_3 && <p className={styles.legendText}>,&nbsp;</p>}
							{film.director_3 && (
								<p className={styles.legendText}>{film.director_3}</p>
							)}
						</div>
						{/* <p className={styles.legendText}>
							Un film de {film.director_1 || "Inconnu"}
						</p> */}
					</div>
				</NavLink>
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
