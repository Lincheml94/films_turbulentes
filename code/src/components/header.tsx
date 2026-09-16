import styles from "../assets/css/public/header.module.css";

const Header = () => {
	return (
		<header>
			<img
				className={styles.logo}
				src="/img/logo/LFDT_ecusson_noir.png"
				alt="logo"
			/>
			<div className={styles.TitreNav}>
				<div className={styles.titre}>
					<h1>
						LES FILMS <br />
						DES TURBULENTES
					</h1>
				</div>
				<nav>
					<ul>
						<li>A propos</li>
						<li>Films</li>
						<li>Contact</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
