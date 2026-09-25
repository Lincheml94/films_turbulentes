"use client";
import { useState } from "react";
import { Link } from "react-router";
import type { Category } from "../../../models/category";
import type { Film } from "../../../models/film";
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
			<div className={styles.categoriesFixed}>
				<button
					type="button"
					className={`${styles.categoriesName} ${selectedCategoryId === null ? styles.active : ""}`}
					onClick={() => setSelectedCategoryId(null)}
				>
					<p>Tous les films</p>
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

			{/* ZONE GRILLE */}
			<div className={styles.posterPageFilms}>
				{filteredFilms.length > 0 ? (
					filteredFilms.map((film) => (
						<div className={styles.filmBox} key={film.id}>
							<Link to={`/films/${film.id}`} className={styles.linkWrapper}>
								<div className={styles.posterBox}>
									<img src={`/img/${film.poster}`} alt={film.title} />
								</div>
								<p className={styles.filmTitle}>{film.title}</p>
							</Link>
						</div>
					))
				) : (
					<p>Aucun film dans cette catégorie.</p>
				)}
			</div>
		</div>
	);
};

export default CatalogueFilmContentClient;
