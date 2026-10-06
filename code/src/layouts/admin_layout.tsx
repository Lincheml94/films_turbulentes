import { NavLink, Outlet } from "react-router";
import styles from "../assets/css/admin/formulaire_crud_film.module.css";
// import Guard from "../components/admin/guard";
import UnlogButton from "../components/admin/unlog_button";

const AdminLayout = () => {
	return (
		<>
			{/* <Guard roles={["admin"]}> */}
			<div className={styles.adminHeader}>
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
			<Outlet />

			{/* </Guard> */}
		</>
	);
};

export default AdminLayout;
