import { use } from "react";
import styles from "../../assets/css/public/catalogue_films.module.css";
import CategoryApiService from "../../service/category_api_service";
import FilmApiService from "../../service/film_api_service";

const CatalogueFilmContent = () => {
	const resultsFilms = use(new FilmApiService().selectAll()).data;
	const resultsCategories = use(new CategoryApiService().selectAll()).data;

	return (
		<div className={styles.mainPageFilms}>
			<div className={styles.categories}>
				<div className={styles.categoriesFixed}>
					{resultsCategories?.map((item) => {
						return (
							<div className={styles.categoriesName} key={item.id}>
								<p>{item.name}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.posterPageFilms}>
				{resultsFilms?.map((item) => {
					return (
						<div className={styles.filmBox} key={item.id}>
							<div className={styles.posterBox}>
								<img src={`/img/${item.poster}`} alt={item.title} />
							</div>
							<p>{item.title}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CatalogueFilmContent;
