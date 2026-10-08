import { use } from "react";
import { Link, NavLink } from "react-router";
import styles from "../../assets/css/admin/formulaire_crud_film.module.css";
import FilmApiService from "../../service/film_api_service";
import EditIcon from "../icons/edit";
import AdminFilmDeleteLink from "./admin_film_delete_link";
import UnlogButton from "./unlog_button";

const AdminFilmHomeFormContent = () => {
	const results = use(new FilmApiService().selectAll()).data;

	return (
		<div className={styles.filmCrudAccueil}>
			<div className={styles.buttonBox}>
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
							<AdminFilmDeleteLink id={item.id} title={item.title} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
export default AdminFilmHomeFormContent;
