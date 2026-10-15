"use client";
import { useState } from "react";
import { Link } from "react-router";
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
						Créée à l’été 2023 par Noémie Colin et Charlotte Le Moine, Les Films
						des Turbulentes défend un cinéma de l’exploration, qui bouleverse
						autant qu’il bouscule. Nous accompagnons des cinéastes soucieux du
						monde qui les entoure et dont les récits résonnent avec leur vécu
						intime. Nous avons à cœur de les accompagner dans la durée, en
						construisant des relations de travail fondées sur la confiance au
						fil de leurs projets.
						<br />
						<br />
						Formées à la CinéFabrique, nous avons appris à fabriquer des films
						collectivement et avec inventivité. Le tandem complémentaire que
						nous formons nourrit aujourd’hui notre ambition de produire des
						films audacieux, qui circulent entre les genres et les formes. Nous
						avons la conviction que c’est en déclinant des récits singuliers que
						chaque œuvre saura trouver son public.
						<br />
						<br />
						Nous partageons cette attention aux publics avec le{" "}
						<Link to="https://collectifturbulentes.com/" target="blank">
							Collectif Turbulentes !
						</Link>
						, avec lequel nous travaillons étroitement. Spécialisée dans la
						transmission artistique pluridisciplinaire, l’association agit
						auprès de personnes de tous âges et de tous horizons. Cette démarche
						alimente notre manière de penser les films et d’accompagner nos
						cinéastes au plus près de celles et ceux auxquels leurs œuvres
						s’adressent.
						<br />
						<br />
						Nous aimons envisager la production comme un travail collectif, où
						les regards et les pratiques se croisent et s’enrichissent. C’est
						pourquoi nous souhaitons également nous engager dans des
						coproductions, pour accompagner des projets à plusieurs et faire
						dialoguer nos sensibilités et nos savoir-faire.
						<br />
						<br />
						Les Films des Turbulentes a bénéficié de la Bourse Post-études
						Producteurs de CICLIC-Région Centre-Val de Loire en 2024. Elle est
						accompagnée depuis dans le cadre de l’Aide Programme d’Entreprise de
						la Région.
						<br />
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
								Après des études littéraires en spécialité cinéma à Lyon, Noémie
								entre à la CinéFabrique. Elle travaille ensuite comme directrice
								de production et régisseuse générale sur des films de fiction
								chez Haïku Films et Unité. En 2020, elle co-fonde le Collectif
								Turbulentes ! avec Marion Ricard et Jade Chenneveau. Passionnée
								de cinéma d’animation, elle intègre en 2022 le parcours
								production des Gobelins et se forme à la production d’animation.
								<br />
								<br />
								Noémie produit des films d’animation en techniques
								traditionnelles et mixtes, avec un goût prononcé pour le geste
								artisanal.
							</p>
						</div>
					</div>
					{/* CHARLOTTE */}
					<div className={styles.bioBox}>
						<div className={styles.titreArrow}>
							<p className={styles.boxTitle}>Charlotte Le Moine</p>
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
								Charlotte découvre le cinéma aux Rencontres Cinématographiques
								d’Hergla, en Tunisie, à l’aube des révolutions arabes. En 2015,
								elle rejoint l’équipe du Festival des Cinémas d’Afrique d’Apt.
								<br />
								<br />
								Après des études en gestion des affaires publiques à
								l’Université d’Aix-Marseille (IMPGT), elle entre à la
								CinéFabrique en 2016. Elle acquière ses premières expériences
								chez Gloria Films, puis comme directrice de production auprès de
								sociétés telles qu’Apaches Films et Yukunkun. De 2021 à 2023,
								elle rejoint Kometa Films comme productrice junior et commence à
								développer ses premiers courts-métrages. <br />
								<br />
								Charlotte s’intéresse autant à la fiction qu’au documentaire,
								avec un goût particulier pour les écritures qui sortent des
								sentiers battus.
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* PHOTO DES PROD */}
			<div className={styles.imgLeft}>
				<img
					src="/public/img/0010_10Ab.jpg"
					alt="Les productrices des Films des Turbulentes"
				/>
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
					<p>Conception et développement : Lina Chemlal</p>
				</div>
			</div>
		</div>
	);
};

export default APropos;
