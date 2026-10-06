import { use } from "react";
import { Link } from "react-router";
import styles from "../../assets/css/admin/formulaire_crud_film.module.css";
import FilmApiService from "../../service/film_api_service";
import EditIcon from "../icons/edit";
import BinIcon from "../icons/trash";

const AdminFilmHomeFormContent = () => {
	const results = use(new FilmApiService().selectAll()).data;

	return (
		<div className={styles.filmCrudAccueil}>
			<div>
				<Link to={"/admin/film_form"}>
					<button type="submit" className={styles.button_add}>
						Ajouter un film
					</button>
				</Link>
			</div>
			{/* Affichage des livres */}
			{results?.map((item) => {
				return (
					<div className={styles.filmCrud} key={item.id}>
						<div className={styles.filmImgTitle}>
							<div className={styles.imgBox}>
								<img
									src={`/img/${item.poster}`}
									alt={item.title}
									className={styles.img_form}
								/>
							</div>
							<p>{item.title}</p>
						</div>

						<div className={styles.button_crud} key={item.id}>
							<Link to={`/admin/film_form/${item.id}`}>
								<button type="submit">
									<EditIcon />
								</button>
							</Link>

							<Link to={`/admin/film_delete/${item.id}`}>
								<button type="submit">
									<BinIcon />
								</button>
							</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
};
export default AdminFilmHomeFormContent;
