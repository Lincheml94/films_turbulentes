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
				<div className={styles.infoTexte}>
					<p>
						Créée à l’été 2023 à Guainville en région Centre Val de Loire, Les
						Films des Turbulentes défend un cinéma de l’exploration qui
						bouleverse autant qu’il bouscule. Nous accompagnons des cinéastes de
						la nouvelle garde, soucieux du monde qui les entoure et dont les
						récits résonnent avec leur vécu intime.
					</p>
				</div>
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
								<NavLink to="/about" onClick={closeMenu}>
									A propos
								</NavLink>
							</li>
							<li>
								<NavLink to="/films" onClick={closeMenu}>
									Films
								</NavLink>
							</li>
							<li>
								<NavLink to="/contact" onClick={closeMenu}>
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
