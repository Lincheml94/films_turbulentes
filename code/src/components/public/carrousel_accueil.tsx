import styles from "../../assets/css/public/carrousel.module.css";

const CarrouselAccueil = () => {
	return (
		<div className={styles.mainCarrousel}>
			<div className={styles.legend}>
				<div className={styles.texte}>
					<p className={styles.legendTitle}>Les Saintes</p>
					<p className={styles.legendText}>2025</p>
					<p className={styles.legendText}>Un film de Melissandre Carrasco</p>
				</div>
				<div className={styles.fleches}>
					<img src="/img/icons/arrow_right.svg" alt="" />
					<img src="/img/icons/arrow_left.svg" alt="" />
				</div>
			</div>
			<div className={styles.poster}>
				<img src="/img/affiches/les_saintes.jpg" alt="Films Les Saintes" />
			</div>
		</div>
	);
};

export default CarrouselAccueil;
