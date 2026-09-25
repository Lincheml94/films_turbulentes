"use client";
import { useState } from "react";
import styles from "../../assets/css/public/film_detail.module.css";
import type { FilmContentDetailsProps } from "../../models/props/films/films_content_details_props";

const FilmContentDetailsClient = ({ data }: FilmContentDetailsProps) => {
	// BOITES DEROULANTES
	const [partIsVisible, setPartIsVisible] = useState<boolean>(false);
	const [cineastesIsVisible, setCineastesIsVisible] = useState<boolean>(false);
	const [festivalsIsVisible, setFestivalsIsVisible] = useState<boolean>(false);
	const [equipeIsVisible, setEquipeIsVisible] = useState<boolean>(false);
	const [imagesIsVisible, setImagesIsVisible] = useState<boolean>(false);

	const ShowPartenaires = () => {
		setPartIsVisible(!partIsVisible);
	};
	const ShowCineastes = () => {
		setCineastesIsVisible(!cineastesIsVisible);
	};
	const ShowFestivals = () => {
		setFestivalsIsVisible(!festivalsIsVisible);
	};
	const ShowEquipe = () => {
		setEquipeIsVisible(!equipeIsVisible);
	};
	const ShowImages = () => {
		setImagesIsVisible(!imagesIsVisible);
	};

	// FLECHES DOWN / UP
	const [arrowUp, setArrowUp] = useState<boolean>(false);
	const ArrowUp = () => {
		setArrowUp(!arrowUp);
	};

	return (
		<div className={styles.mainPageFilmDetail}>
			<div className={styles.colonnesInfoFilms}>
				<div className={styles.colonneDetail}>
					<div className={styles.directorYearDuration}>
						<p className={styles.filmTitle}>{data.title}</p>
						<p>Un film de {data.director_1}</p>
						<p>{data.type}</p>
						<p>
							{data.release_date} / {data.duration}'
						</p>
					</div>

					{/* BOITES INFOS */}
					{/* Partenaires et soutiens */}
					<div>
						<div className={styles.titreArrow}>
							<p className={styles.boxTitle}>Partenaires et soutiens</p>
							<button type="button" onClick={ShowPartenaires}>
								<img src="/img/icons/arrow_down.svg" alt="arrow" />
							</button>
						</div>
						<div
							className={`${styles.boxPartIsClose} ${partIsVisible ? styles.boxPartIsVisible : ""}`}
						>
							<p>{data.partenaires_soutiens}</p>
						</div>
					</div>
					{/* Cinéaste(s) */}
					<div>
						<div className={styles.titreArrow}>
							<p className={styles.boxTitle}>Cinéaste(s)</p>
							<button type="button" onClick={ShowCineastes}>
								<img src="/img/icons/arrow_down.svg" alt="arrow" />
							</button>
						</div>
						<div
							className={`${styles.boxCineIsClose} ${cineastesIsVisible ? styles.boxCineIsVisible : ""}`}
						>
							<img src={`/img/${data.director_1_image}`} alt={data.title} />
							<p>{data.director_1_bio}</p>
						</div>
					</div>
					{/* Festivals et Prix */}
					<div>
						<div className={styles.titreArrow}>
							<p className={styles.boxTitle}>Festivals et prix</p>
							<button type="button" onClick={ShowFestivals}>
								<img src="/img/icons/arrow_down.svg" alt="arrow" />
							</button>
						</div>
						<div
							className={`${styles.boxFestIsClose} ${festivalsIsVisible ? styles.boxFestIsVisible : ""}`}
						>
							<p>{data.prix_festivals}</p>
						</div>
					</div>
					{/* Equipe artistique et technique */}
					<div>
						<div className={styles.titreArrow}>
							<p className={styles.boxTitle}>Equipe artistique et technique</p>
							<button type="button" onClick={ShowEquipe}>
								<img src="/img/icons/arrow_down.svg" alt="arrow" />
							</button>
						</div>
						<div
							className={`${styles.boxEquipeIsClose} ${equipeIsVisible ? styles.boxEquipeIsVisible : ""}`}
						>
							<p>{data.fiche_technique}</p>
						</div>
					</div>
					{/* Images */}
					<div>
						<div className={styles.titreArrow}>
							<p className={styles.boxTitle}>Images</p>
							<button type="button" onClick={ShowImages}>
								<img src="/img/icons/arrow_down.svg" alt="arrow" />
							</button>
						</div>
						<div
							className={`${styles.boxImageIsClose} ${imagesIsVisible ? styles.boxImageIsVisible : ""}`}
						>
							<img src={`/img/${data.image_1}`} alt={data.title} />
							<img src={`/img/${data.image_2}`} alt={data.title} />
							<img src={`/img/${data.image_3}`} alt={data.title} />
							<img src={`/img/${data.image_4}`} alt={data.title} />
							<img src={`/img/${data.image_5}`} alt={data.title} />
						</div>
					</div>
				</div>
				{/* COLONNE DROITE : DESCRIPTION */}
				<div className={styles.colonneDetail}>
					<div className={styles.colonneDetailDescription}>
						<p>{data.description}</p>
					</div>
				</div>
			</div>

			<div className={styles.posterLeft}>
				<img src={`/img/${data.poster}`} alt={data.title} />
			</div>
		</div>
	);
};
export default FilmContentDetailsClient;
