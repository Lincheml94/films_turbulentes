"use client";
import { useState } from "react";
import { NavLink } from "react-router";
import styles from "../assets/css/public/header.module.css";
import type { HeaderProps } from "../models/props/header_props";

const Header = ({ variant }: HeaderProps) => {
	const [navMobileIsVisible, setNavMobileIsVisible] = useState<boolean>(false);

	// Gestionnaire d'ouverture/fermeture (toggle)
	const handleClic = () => {
		setNavMobileIsVisible(!navMobileIsVisible);
	};

	const closeMenu = () => {
		setNavMobileIsVisible(false);
	};

	const headerClass =
		variant === "home"
			? `${styles.header} ${styles.headerHome}`
			: variant === "film_detail"
				? `${styles.header} ${styles.headerFilm}`
				: styles.header;
	return (
		<header className={headerClass}>
			<div className={styles.logoTexte}>
				<NavLink to="/" onClick={closeMenu}>
					<img
						className={styles.logo}
						src="/img/logo/LFDT_ecusson_noir.png"
						alt="logo"
					/>
				</NavLink>
			</div>
			<div className={styles.trait}></div>

			<div className={styles.TitreNav}>
				{/* <div className={styles.titre}> */}
				<h1>
					LES FILMS <br />
					DES TURBULENTES
				</h1>
				<div className={styles.navbar}>
					<button
						className={styles.hamburger}
						type="button"
						onClick={handleClic}
						aria-expanded={navMobileIsVisible}
						aria-label="Menu de navigation"
					>
						<img
							className={styles.menuham}
							src="/img/icons/menu_hamburger_2_px.png"
							alt="button"
						/>
					</button>

					<nav
						className={`${styles.navlinks} ${
							navMobileIsVisible ? styles.navbarMobileVisible : ""
						}`}
					>
						<ul>
							<li>
								<NavLink
									to="/a_propos"
									onClick={closeMenu}
									className={({ isActive }) =>
										isActive ? styles.activeLink : ""
									}
								>
									A propos
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/films"
									onClick={closeMenu}
									className={({ isActive }) =>
										isActive ? styles.activeLink : ""
									}
								>
									Films
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/contact"
									onClick={closeMenu}
									className={({ isActive }) =>
										isActive ? styles.activeLink : ""
									}
								>
									Contact
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
