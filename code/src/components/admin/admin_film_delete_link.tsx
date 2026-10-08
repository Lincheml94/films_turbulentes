"use client";
import { Link } from "react-router";
import styles from "../../assets/css/admin/formulaire_crud_film.module.css";
import BinIcon from "../icons/trash";

type AdminFilmDeleteLinkProps = {
	id: number;
	title: string;
};

const AdminFilmDeleteLink = ({ id, title }: AdminFilmDeleteLinkProps) => {
	return (
		<Link
			className={styles.button_crud}
			to={`/admin/film_delete/${id}`}
			onClick={(e) => {
				// si la cliente annule, on bloque la navigation : rien n'est supprimé
				if (
					!window.confirm(
						`Voulez-vous vraiment supprimer le film « ${title} » ? Cette action est définitive.`,
					)
				) {
					e.preventDefault();
				}
			}}
		>
			<button type="submit">
				<BinIcon />
			</button>
		</Link>
	);
};
export default AdminFilmDeleteLink;
