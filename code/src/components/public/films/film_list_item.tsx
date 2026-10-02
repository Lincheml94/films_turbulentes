import { use } from "react";
import FilmApiService from "../../../service/film_api_service";
import styles from "../../assets/css/public/catalogue_films.module.css";

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
