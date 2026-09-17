import { NavLink } from "react-router";
import styles from "../assets/css/public/header.module.css";
import type { HeaderProps } from "../models/props/header_props";

const Header = ({ variant }: HeaderProps) => {
	const headerClass =
		variant === "home"
			? `${styles.header} ${styles.headerHome}`
			: styles.header;
	return (
		<header className={headerClass}>
			<img
				className={styles.logo}
				src="/img/logo/LFDT_ecusson_noir.png"
				alt="logo"
			/>
			<div className={styles.TitreNav}>
				{/* <div className={styles.titre}> */}
				<h1>
					LES FILMS <br />
					DES TURBULENTES
				</h1>
				<nav className={styles.navlinks}>
					<ul>
						<li>
							<NavLink to="/about">A propos</NavLink>
						</li>
						<li>
							<NavLink to="/films">Films</NavLink>
						</li>
						<li>
							<NavLink to="/contact">Contact</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
