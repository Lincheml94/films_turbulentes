import { use } from "react";
import styles from "../../assets/css/public/catalogue_films.module.css";
// import type { FilmListItemProps } from "../../models/props/films/film_list_item_props";
import CategoryApiService from "../../service/category_api_service";
import FilmApiService from "../../service/film_api_service";

const FilmListItem = () => {
	const resultsFilms = use(new FilmApiService().selectAll()).data;
	return (
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
	);
};

export default FilmListItem;
