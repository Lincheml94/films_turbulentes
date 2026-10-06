import { NavLink } from "react-router";
import styles from "../../assets/css/admin/formulaire_crud_film.module.css";

const UnlogButton = () => {
	return (
		<button type="submit">
			<NavLink to={"/login"}>
				<p>Se déconnecter</p>
			</NavLink>
		</button>
	);
};
export default UnlogButton;
