import styles from "../assets/css/public/trait.module.css";
import Header from "../components/header";

const HomePage = () => {
	return (
		<>
			<Header variant="home" />
			{/* <div className={styles.trait}></div> */}
			<div className={styles.infoTrait}>
				<div className={styles.infoTexte}>
					<p>
						Créée à l’été 2023 à Guainville en région Centre Val de Loire, Les
						Films des Turbulentes défend un cinéma de l’exploration qui
						bouleverse autant qu’il bouscule. Nous accompagnons des cinéastes de
						la nouvelle garde, soucieux du monde qui les entoure et dont les
						récits résonnent avec leur vécu intime.
					</p>
				</div>
				<div className={styles.trait}></div>
			</div>
		</>
	);
};

export default HomePage;
