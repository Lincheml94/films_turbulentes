"use client";
import { useState } from "react";
import styles from "../../../assets/css/public/film_detail.module.css";
import type { FilmContentDetailsProps } from "../../../models/props/films/films_content_details_props";

const FilmContentDetailsClient = ({ data }: FilmContentDetailsProps) => {
	// BOITES DEROULANTES
	const [partIsVisible, setPartIsVisible] = useState<boolean>(false);
	const [cineastesIsVisible, setCineastesIsVisible] = useState<boolean>(false);
	const [festivalsIsVisible, setFestivalsIsVisible] = useState<boolean>(false);
	const [equipeIsVisible, setEquipeIsVisible] = useState<boolean>(false);
	const [imagesIsVisible, setImagesIsVisible] = useState<boolean>(false);
	const [presseIsVisible, setPresseIsVisible] = useState<boolean>(false);

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
	const ShowPresse = () => {
		setPresseIsVisible(!presseIsVisible);
	};

	return (
		<div className={styles.mainPageFilmDetail}>
			<div className={styles.colonnesInfoFilms}>
				<div className={styles.colonneDetail}>
					<div className={styles.directorYearDuration}>
						<p className={styles.filmTitle}>{data.title}</p>
						<p>Un film de {data.director_1}</p>
						<p>{data.type}</p>
						<div className={styles.releaseInfo}>
							{/* 1. Affiche la date si elle existe */}
							{data.release_date && <p>{data.release_date}</p>}

							{/* 2. Affiche le séparateur UNIQUEMENT si les deux champs existent */}
							{data.release_date && data.duration && <p> / </p>}

							{/* 3. Affiche la durée si elle existe */}
							{data.duration && <p>{data.duration}'</p>}
						</div>
					</div>

					{/* BOITES INFOS */}
					{/* Partenaires et soutiens : données non obligatoires */}
					{data.partenaires_soutiens && (
						<div>
							<div className={styles.titreArrow}>
								<p className={styles.boxTitle}>Partenaires et soutiens</p>
								<button type="button" onClick={ShowPartenaires}>
									<img
										src="/img/icons/arrow_down.svg"
										alt="arrow"
										className={partIsVisible ? styles.arrowUp : ""}
									/>
								</button>
							</div>
							<div
								className={`${styles.boxPartIsClose} ${partIsVisible ? styles.boxPartIsVisible : ""}`}
							>
								<p>{data.partenaires_soutiens}</p>
							</div>
						</div>
					)}
					{/* Cinéaste(s) */}
					<div>
						<div className={styles.titreArrow}>
							<p className={styles.boxTitle}>Cinéaste(s)</p>
							<button type="button" onClick={ShowCineastes}>
								<img
									src="/img/icons/arrow_down.svg"
									alt="arrow"
									className={cineastesIsVisible ? styles.arrowUp : ""}
								/>
							</button>
						</div>
						<div
							className={`${styles.boxCineIsClose} ${cineastesIsVisible ? styles.boxCineIsVisible : ""}`}
						>
							<div>
								<p>{data.director_1}</p>
								<img
									src={`/img/${data.director_1_image}`}
									alt={data.director_1}
								/>
								<p>{data.director_1_bio}</p>
							</div>
							{data.director_2 && (
								<div>
									<p>{data.director_2}</p>
									<img src={`/img/${data.director_2_image}`} alt={data.title} />
									<p>{data.director_2_bio}</p>
								</div>
							)}
							{data.director_3 && (
								<div>
									<p>{data.director_3}</p>
									<img src={`/img/${data.director_3_image}`} alt={data.title} />
									<p>{data.director_3_bio}</p>
								</div>
							)}
						</div>
					</div>
					{/* Festivals et Prix */}
					{data.prix_festivals && (
						<div>
							<div className={styles.titreArrow}>
								<p className={styles.boxTitle}>Festivals et prix</p>
								<button type="button" onClick={ShowFestivals}>
									<img
										src="/img/icons/arrow_down.svg"
										alt="arrow"
										className={festivalsIsVisible ? styles.arrowUp : ""}
									/>
								</button>
							</div>
							<div
								className={`${styles.boxFestIsClose} ${festivalsIsVisible ? styles.boxFestIsVisible : ""}`}
							>
								<p>{data.prix_festivals}</p>
							</div>
						</div>
					)}
					{/* Equipe artistique et technique */}
					{data.fiche_technique && (
						<div>
							<div className={styles.titreArrow}>
								<p className={styles.boxTitle}>
									Equipe artistique et technique
								</p>
								<button type="button" onClick={ShowEquipe}>
									<img
										src="/img/icons/arrow_down.svg"
										alt="arrow"
										className={equipeIsVisible ? styles.arrowUp : ""}
									/>
								</button>
							</div>
							<div
								className={`${styles.boxEquipeIsClose} ${equipeIsVisible ? styles.boxEquipeIsVisible : ""}`}
							>
								<p>{data.fiche_technique}</p>
							</div>
						</div>
					)}
					{/* Presse */}
					{data.presse && (
						<div>
							<div className={styles.titreArrow}>
								<p className={styles.boxTitle}>Presse</p>
								<button type="button" onClick={ShowPresse}>
									<img
										src="/img/icons/arrow_down.svg"
										alt="arrow"
										className={presseIsVisible ? styles.arrowUp : ""}
									/>
								</button>
							</div>
							<div
								className={`${styles.boxPresseIsClose} ${presseIsVisible ? styles.boxPresseIsVisible : ""}`}
							>
								<p>{data.presse}</p>
							</div>
						</div>
					)}
					{/* Images */}
					{/* --- SECTION IMAGES --- */}
					{(() => {
						// 1. On rassemble les 5 champs
						const allImages = [
							data.image_1,
							data.image_2,
							data.image_3,
							data.image_4,
							data.image_5,
						];

						// 2. On filtre rigoureusement :
						// On garde l'image SEULEMENT si elle existe ET qu'elle n'est pas une chaîne vide.
						const validImages = allImages.filter((img) => {
							// Cette condition rejette null, undefined, et "" (chaîne vide)
							return img !== null && img !== undefined && img !== "";
						});

						// 3. Si aucune image valide, on ne renvoie RIEN du tout (pas de titre, pas de flèche)
						if (validImages.length === 0) {
							return null;
						}

						// 4. Affichage du bloc complet uniquement s'il y a des images
						return (
							<div>
								<div className={styles.titreArrow}>
									<p className={styles.boxTitle}>Images</p>
									<button type="button" onClick={ShowImages}>
										<img
											src="/img/icons/arrow_down.svg"
											alt="arrow"
											className={imagesIsVisible ? styles.arrowUp : ""}
										/>
									</button>
								</div>

								<div
									className={`${styles.boxImageIsClose} ${imagesIsVisible ? styles.boxImageIsVisible : ""}`}
								>
									{validImages.map((img, index) => (
										<a
											key={index}
											href={`/img/${img}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												key={index}
												src={`/img/${img}`}
												alt={`${data.title} - still ${index + 1}`}
											/>
										</a>
									))}
								</div>
							</div>
						);
					})()}
				</div>
				{/* COLONNE DROITE : DESCRIPTION */}
			</div>
			<div className={styles.leftElements}>
				{/* <div className={styles.colonneDetail}> */}
				<div className={styles.colonneDetailDescription}>
					<p>{data.description}</p>
				</div>
				{/* </div> */}
				<div className={styles.posterLeft}>
					<img src={`/img/${data.poster}`} alt={data.title} />
				</div>
			</div>
		</div>
	);
};
export default FilmContentDetailsClient;
