"use client";
import { useState } from "react";
import styles from "../../assets/css/public/a_propos.module.css";

const APropos = () => {
	// BOITES DEROULANTES
	const [nonoIsVisible, setNonoIsVisible] = useState<boolean>(false);
	const [charlotteIsVisible, setCharlotteIsVisible] = useState<boolean>(false);
	const [mentionsLegalesIsVisible, setMentionsLegalesIsVisible] =
		useState<boolean>(false);

	const ShowNono = () => {
		setNonoIsVisible(!nonoIsVisible);
	};
	const ShowCharlotte = () => {
		setCharlotteIsVisible(!charlotteIsVisible);
	};
	const ShowMentionsLegales = () => {
		setMentionsLegalesIsVisible(!mentionsLegalesIsVisible);
	};

	return (
		<div className={styles.aProposContent}>
			<div className={styles.contentRight}>
				<div className={styles.textBio}>
					<p>
						Créée à l’été 2023 à Guainville en région Centre Val de Loire, Les
						Films des Turbulentes défend un cinéma de l’exploration qui
						bouleverse autant qu’il bouscule. Nous accompagnons des cinéastes de
						la nouvelle garde, soucieux du monde qui les entoure et dont les
						récits résonnent avec leur vécu intime. <br />
						<br />
						Noémie Colin-Manderscheid et Charlotte Le Moine se sont rencontrées
						en 2016 pendant leurs études à la CinéFabrique (Lyon, France). Le
						tandem complémentaire qu’elles constituent leur donne l’ambition de
						produire des films sans limite de genre ou de forme. Elles ont la
						conviction que c’est en déclinant des récits singuliers que chaque
						œuvre saura trouver son public.
					</p>
				</div>

				{/* BIO DES PROD */}

				<div className={styles.bioBoxes}>
					{/* NOEMIE */}
					<div className={styles.bioBox}>
						<div className={styles.titreArrow}>
							<p className={styles.boxTitle}>Noémie Colin</p>
							<button type="button" onClick={ShowNono}>
								<img
									src="/img/icons/arrow_down.svg"
									alt="arrow"
									className={nonoIsVisible ? styles.arrowUp : ""}
								/>
							</button>
						</div>
						<div
							className={`${styles.boxNonoIsClose} ${nonoIsVisible ? styles.boxNonoIsVisible : ""}`}
						>
							<p className={styles.bio}>
								Noémie Colin-Manderscheid et Charlotte Le Moine se sont
								rencontrées en 2016 pendant leurs études à la CinéFabrique
								(Lyon, France). Le tandem complémentaire qu’elles constituent
								leur donne l’ambition de produire des films sans limite de genre
								ou de forme. Elles ont la conviction que c’est en déclinant des
								récits singuliers que chaque œuvre saura trouver son public.
							</p>
						</div>
					</div>
					{/* CHARLOTTE */}
					<div className={styles.bioBox}>
						<div className={styles.titreArrow}>
							<p className={styles.boxTitle}>Charlotte Lemoine</p>
							<button type="button" onClick={ShowCharlotte}>
								<img
									src="/img/icons/arrow_down.svg"
									alt="arrow"
									className={charlotteIsVisible ? styles.arrowUp : ""}
								/>
							</button>
						</div>
						<div
							className={`${styles.boxCharlotteIsClose} ${charlotteIsVisible ? styles.boxCharlotteIsVisible : ""}`}
						>
							<p className={styles.bio}>
								Noémie Colin-Manderscheid et Charlotte Le Moine se sont
								rencontrées en 2016 pendant leurs études à la CinéFabrique
								(Lyon, France). Le tandem complémentaire qu’elles constituent
								leur donne l’ambition de produire des films sans limite de genre
								ou de forme. Elles ont la conviction que c’est en déclinant des
								récits singuliers que chaque œuvre saura trouver son public.
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* PHOTO DES PROD */}
			<div className={styles.imgLeft}>
				<img src="/public/img/photo_bio.jpeg" alt="" />
			</div>
			{/* MENTIONS LEGALES */}
			<div className={styles.boxMentionsLegales}>
				<div className={styles.titreArrow}>
					<p className={styles.boxTitle}>Mentions légales</p>
					<button type="button" onClick={ShowMentionsLegales}>
						<img
							src="/img/icons/arrow_up.svg"
							alt="arrow"
							className={mentionsLegalesIsVisible ? styles.arrowUp : ""}
						/>
					</button>
				</div>
				<div
					className={`${styles.boxMentionsLegalesIsClose} ${mentionsLegalesIsVisible ? styles.boxMentionsLegalesIsVisible : ""}`}
				>
					<p>
						© Tous les contenus textuels et visuels sont la propriété de Les
						Films des Turbulentes
					</p>
					<p>
						Forme juridique : [Association loi 1901 / SARL / Auto-entrepreneur]
					</p>
					<p>RNA : [numéro] · Siège social : [adresse complète]</p>
					<p>SIRET : [numéro à 14 chiffres]</p>
					<p>Direction de la publication : [Nom et Prénom]</p>
					<p>Contact : [adresse email]</p>
					<p>Hébergement : [nom + adresse de l'hébergeur]</p>
					<p>
						Conception et développement : [ton nom ou celui de ta structure]
					</p>
				</div>
			</div>
		</div>
	);
};

export default APropos;
