"use client";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
// import { useLocation } from "react-router-dom";
import type { Category } from "../../../../models/category";
import type { Film } from "../../../../models/film";
import styles from "../../assets/css/public/catalogue_films.module.css";

// Interface pour les props reçues du serveur
interface CatalogueFilmContentClientProps {
	initialFilms: Film[];
	initialCategories: Category[];
}

// Ce composant est Client. Il n'est PAS async. Il n'utilise PAS use().
const CatalogueFilmContentClient = ({
	initialFilms,
	initialCategories,
}: CatalogueFilmContentClientProps) => {
	// Fonction pour que le contenu se réinitialise au refresh de la page

	useEffect(() => {
		// Si les films changent (nouvelle requête serveur), on reset le filtre
		setSelectedCategoryId(null);
	}, [initialFilms]);

	// 1. État pour le filtre
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null,
	);

	// 2. Logique de filtrage (sur les données reçues en props)
	const filteredFilms = initialFilms.filter((film) => {
		if (!selectedCategoryId) return true;
		return film.category_id === selectedCategoryId;
	});

	return (
		<div className={styles.mainPageFilms}>
			{/* ZONE FILTRES */}
			{/* <div className={styles.categories}> */}
			<div className={styles.categoriesFixed}>
				<button
					type="button"
					className={`${styles.categoriesName} ${selectedCategoryId === null ? styles.activeF : ""}`}
					onClick={() => setSelectedCategoryId(null)}
				>
					<p className={styles.tousFilms}>Tous les films</p>
				</button>

				{initialCategories.map((cat) => (
					<button
						type="button"
						key={cat.id}
						className={`${styles.categoriesName} ${selectedCategoryId === cat.id ? styles.active : ""}`}
						onClick={() => setSelectedCategoryId(cat.id)}
					>
						<p>{cat.name}</p>
					</button>
				))}
			</div>
			{/* </div> */}

			{/* ZONE GRILLE */}
			<div className={styles.posterPageFilms}>
				{filteredFilms.length > 0 ? (
					filteredFilms.map((film) => (
						<div key={film.id}>
							<Link to={`/films/${film.id}`} className={styles.filmBox}>
								<div className={styles.posterBox}>
									<img src={`/img/${film.poster}`} alt={film.title} />
								</div>
								<p className={styles.filmTitle}>{film.title}</p>
							</Link>
						</div>
					))
				) : (
					<p className={styles.msgVide}>Aucun film dans cette catégorie.</p>
				)}
			</div>
		</div>
	);
};

export default CatalogueFilmContentClient;
