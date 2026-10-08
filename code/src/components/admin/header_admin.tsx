import { NavLink } from "react-router";
import styles from "../../assets/css/admin/formulaire_crud_film.module.css";
import type { HeaderAdminProps } from "../../models/props/header_admin";
import UnlogButton from "./unlog_button";

const HeaderAdmin = ({ variant }: HeaderAdminProps) => {
	const variantClass = variant === "film_form" ? styles["adminHeaderForm"] : "";

	// 2. Application de la classe sur la balise (ici j'ai mis un header, mais gardez votre structure)
	return (
		<div className={`${styles.adminHeader} ${variantClass}`}>
			<div className={styles.adminLogoTitle}>
				<NavLink to={"/admin"}>
					<img
						className={styles.logoInAdmin}
						src="/img/logo/LFDT_ecusson_noir.png"
						alt="logo"
					/>
				</NavLink>
				<h1>Films des Turbulentes - Espace d'administration</h1>
			</div>
			<div className={styles.logOutButton}>
				<UnlogButton />
			</div>
		</div>
	);
};

export default HeaderAdmin;
