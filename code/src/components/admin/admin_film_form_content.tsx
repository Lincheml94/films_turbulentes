"use client";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { ZodIssue } from "zod/v3";
import type { Film } from "../../../models/film";
import styles from "../../assets/css/admin/formulaire_crud_film.module.css";
import type { AdminFilmFormContentProps } from "../../models/props/films/admin_film_form_content_props";
import FilmApiService from "../../service/film_api_service";

const AdminFilmFormContent = ({
	categories,
	dataToUpdate,
	validator,
}: AdminFilmFormContentProps) => {
	// Identifiants pour les labels
	const idId = useId();
	const titleId = useId();
	const posterId = useId();
	const director1Id = useId();
	const director1bioId = useId();
	const director1imageId = useId();
	const director2Id = useId();
	const director2bioId = useId();
	const director2imageId = useId();
	const director3Id = useId();
	const director3bioId = useId();
	const director3imageId = useId();
	const descriptionId = useId();
	const typeId = useId();
	const releasedateId = useId();
	const durationId = useId();
	const fichetechniqueId = useId();
	const prixfestivalsId = useId();
	const partenairessoutiensId = useId();
	const presseId = useId();
	const image1Id = useId();
	const image2Id = useId();
	const image3Id = useId();
	const image4Id = useId();
	const image5Id = useId();
	const categoryId = useId();

	const navigate = useNavigate();
	const [serverErrors, setServerErrors] = useState<Partial<Film>>();
	const [message, setMessage] = useState<string>("");

	// État pour gérer les suppressions d'images
	const [removedImages, setRemovedImages] = useState<string[]>([]);

	// États pour les boîtes déroulantes (Accordéons)
	const [isDir2Visible, setIsDir2Visible] = useState<boolean>(false);
	const [isDir3Visible, setIsDir3Visible] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Partial<Film>>();

	useEffect(() => {
		if (dataToUpdate) {
			const normalizeData = {
				...dataToUpdate,
				category_id: dataToUpdate.category_id,
				release_date: dataToUpdate.release_date
					? String(dataToUpdate.release_date)
					: "",
			};
			setRemovedImages([]);
			reset(normalizeData as unknown as Partial<Film>);
		}
	}, [dataToUpdate, reset]);

	const handleRemoveImage = (fieldName: string) => {
		if (!removedImages.includes(fieldName)) {
			setRemovedImages([...removedImages, fieldName]);
		}
	};

	const handleRestoreImage = (fieldName: string) => {
		setRemovedImages(removedImages.filter((name) => name !== fieldName));
	};

	const toggleDir2 = () => setIsDir2Visible(!isDir2Visible);
	const toggleDir3 = () => setIsDir3Visible(!isDir3Visible);

	const submitForm = async (data: Partial<Film>) => {
		const normalizeData = {
			...data,
			// On s'assure que category_id est bien transmis (il est déjà number grâce au valueAsNumber du select)
			category_id: data.category_id,
			// Les dates et nombres sont déjà gérés par le formulaire, on les laisse tels quels
			// Les images gérées par la logique de suppression sont dans 'data', on les garde
		};

		// 2. VALIDATION CÔTÉ SERVEUR
		// Vérifiez que vous avez bien passé la prop 'validator' dans le composant parent
		if (validator) {
			const validation = await validator(normalizeData);

			// si la validation échoue (Zod renvoie une Error)
			if (validation instanceof Error) {
				// stocker les messages d'erreur
				let errors: any = {};

				// Récupérer les messages d'erreur depuis l'objet JSON de l'erreur
				// Note: validation.message contient la string JSON de l'erreur Zod
				(JSON.parse(validation.message) as ZodIssue[]).map((item) => {
					const fieldName = item.path.shift() as string;
					errors = { ...errors, [fieldName]: item.message };
					return errors;
				});

				// Définir l'état affichant les messages d'erreur côté serveur
				setServerErrors(errors);

				// Stopper l'exécution du script (on ne soumet pas le formulaire)
				return;
			}
		}
		const formData = new FormData();
		formData.set("id", data.id ? String(data.id) : "");
		formData.set("title", data.title as string);

		// Gestion Poster
		if (removedImages.includes("poster")) {
			formData.set("poster", "DELETE");
		} else if (data.poster) {
			formData.set("poster", data.poster as any);
		}

		// Réalisateurs
		formData.set("director_1", data.director_1 as string);
		formData.set("director_1_bio", data.director_1_bio as string);
		if (removedImages.includes("director_1_image")) {
			formData.set("director_1_image", "DELETE");
		} else if (data.director_1_image) {
			formData.set("director_1_image", data.director_1_image as any);
		}

		formData.set("director_2", data.director_2 as string);
		formData.set("director_2_bio", data.director_2_bio as string);
		if (removedImages.includes("director_2_image")) {
			formData.set("director_2_image", "DELETE");
		} else if (data.director_2_image) {
			formData.set("director_2_image", data.director_2_image as any);
		}

		formData.set("director_3", data.director_3 as string);
		formData.set("director_3_bio", data.director_3_bio as string);
		if (removedImages.includes("director_3_image")) {
			formData.set("director_3_image", "DELETE");
		} else if (data.director_3_image) {
			formData.set("director_3_image", data.director_3_image as any);
		}

		// Détails & Champs manquants
		formData.set("description", data.description as string);
		formData.set("type", data.type as string);
		formData.set(
			"release_date",
			data.release_date ? String(data.release_date) : "",
		);
		formData.set("duration", data.duration ? String(data.duration) : "");
		formData.set("fiche_technique", data.fiche_technique as string);
		formData.set("prix_festivals", data.prix_festivals as string);
		formData.set("partenaires_soutiens", data.partenaires_soutiens as string);
		formData.set("presse", data.presse as string);

		// Catégorie
		formData.set("category_id", String(data.category_id));

		// Images 1 à 5
		([1, 2, 3, 4, 5] as const).forEach((num) => {
			const fieldName = `image_${num}` as keyof Film;
			if (removedImages.includes(fieldName)) {
				formData.set(fieldName, "DELETE");
			} else if (data[fieldName]) {
				formData.set(fieldName, data[fieldName] as any);
			}
		});

		const process = dataToUpdate
			? await new FilmApiService().update(formData)
			: await new FilmApiService().insert(formData);

		if ([200, 201].indexOf(process.status) !== -1) {
			navigate("/admin");
		} else if ([400].indexOf(process.status) !== -1) {
			setMessage(process.message as unknown as string);
		}
	};

	// Composant réutilisable pour les images avec suppression
	const renderImageSlot = (
		fieldName: keyof Film,
		label: string,
		id: string,
		currentValue: string | null | undefined,
		registerOpts: any,
		isRequired = false,
	) => {
		const isRemoved = removedImages.includes(fieldName as string);
		// Vérifie si on a une valeur existante (string) ET qu'elle n'est pas marquée pour suppression
		// Ou si on vient de sélectionner un fichier (géré par react-hook-form, mais visuellement on gère surtout l'existant ici)
		const hasExistingImage =
			!isRemoved &&
			currentValue &&
			typeof currentValue === "string" &&
			currentValue.length > 0;

		return (
			<div className={styles["image-slot"]}>
				<p>
					<label htmlFor={id}>
						{label} {isRequired && <span className={styles.required}>*</span>}
					</label>
				</p>

				{hasExistingImage && (
					<div className={styles["preview-container"]}>
						<img
							src={
								currentValue.startsWith("http")
									? currentValue
									: `/img/${currentValue}`
							}
							alt={label}
							className={styles["preview-image"]}
						/>
						<button
							type="button"
							onClick={() => handleRemoveImage(fieldName as string)}
							className={styles["delete-btn"]}
							title="Supprimer cette image"
						>
							❌
						</button>
					</div>
				)}

				{isRemoved && (
					<div className={styles["removed-placeholder"]}>
						<p>Cette image sera supprimée.</p>
						<button
							type="button"
							onClick={() => handleRestoreImage(fieldName as string)}
							className={styles["restore-btn"]}
						>
							Annuler
						</button>
					</div>
				)}

				<input
					type="file"
					id={id}
					{...register(fieldName, registerOpts)}
					className={styles["file-input"]}
				/>
				<span className={styles.msg_erreur} role="alert">
					{(errors[fieldName] as any)?.message as string}
				</span>
			</div>
		);
	};

	return (
		<div className={styles["content-dashboard"]}>
			<div className={styles["formulaire_crud"]}>
				<h2>Gérer les films</h2>
				{message && <p role="alert">{message}</p>}

				<form
					className={styles.formulaire_crud}
					encType="multipart/form-data"
					onSubmit={handleSubmit(submitForm)}
				>
					{/* TITRE */}
					<p>
						<label htmlFor={titleId}>Titre</label>
						<input
							type="text"
							id={titleId}
							{...register("title", { required: "Le titre est obligatoire" })}
						/>
						<span className={styles.msg_erreur} role="alert">
							{errors.title?.message ?? serverErrors?.title}
						</span>
					</p>

					{/* POSTER */}
					{renderImageSlot(
						"poster",
						"Affiche (Poster)",
						posterId,
						dataToUpdate?.poster || ("" as any),
						!dataToUpdate ? { required: "L'affiche est obligatoire" } : {},
						!dataToUpdate,
					)}

					{/* CATEGORIE */}
					<p>
						<label htmlFor={categoryId}>Catégorie</label>
						<select
							id={categoryId}
							{...register("category_id", {
								required: "Une catégorie est obligatoire",
								valueAsNumber: true,
							})}
						>
							<option value="">Sélectionnez une catégorie</option>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
						<span className={styles.msg_erreur} role="alert">
							{errors.category_id?.message ?? serverErrors?.category_id}
						</span>
					</p>

					{/* DESCRIPTION */}
					<p>
						<label htmlFor={descriptionId}>Synopsis / Description</label>
						<textarea
							id={descriptionId}
							{...register("description", {
								required: "La description est obligatoire",
							})}
						/>
						<span className={styles.msg_erreur} role="alert">
							{errors.description?.message ?? serverErrors?.description}
						</span>
					</p>

					{/* REALISATEUR 1 (Toujours visible) */}
					<fieldset>
						<legend>Réalisateur Principal</legend>
						<p>
							<label htmlFor={director1Id}>Nom</label>
							<input
								type="text"
								id={director1Id}
								{...register("director_1", { required: "Obligatoire" })}
							/>
						</p>
						<p>
							<label htmlFor={director1bioId}>Biographie</label>
							<textarea id={director1bioId} {...register("director_1_bio")} />
						</p>
						{renderImageSlot(
							"director_1_image",
							"Photo Réalisateur 1",
							director1imageId,
							dataToUpdate?.director_1_image || ("" as any),
							{},
						)}
					</fieldset>

					{/* REALISATEUR 2 (Déroulant) */}
					<div className={styles["accordion-container"]}>
						<div className={styles["accordion-header"]} onClick={toggleDir2}>
							<h3>Ajouter un 2e réalisateur</h3>
							<button type="button" className={styles["accordion-btn"]}>
								<img
									src="/img/icons/arrow_down.svg"
									alt="flèche"
									className={isDir2Visible ? styles["arrow-up"] : ""}
								/>
							</button>
						</div>
						<div
							className={`${styles["accordion-content"]} ${isDir2Visible ? styles["accordion-open"] : ""}`}
						>
							<fieldset>
								<p>
									<label htmlFor={director2Id}>Nom</label>
									<input
										type="text"
										id={director2Id}
										{...register("director_2")}
									/>
								</p>
								<p>
									<label htmlFor={director2bioId}>Biographie</label>
									<textarea
										id={director2bioId}
										{...register("director_2_bio")}
									/>
								</p>
								{renderImageSlot(
									"director_2_image",
									"Photo Réalisateur 2",
									director2imageId,
									dataToUpdate?.director_2_image || ("" as any),
									{},
								)}
							</fieldset>
						</div>
					</div>

					{/* REALISATEUR 3 (Déroulant) */}
					<div className={styles["accordion-container"]}>
						<div className={styles["accordion-header"]} onClick={toggleDir3}>
							<h3>Ajouter un 3e réalisateur</h3>
							<button type="button" className={styles["accordion-btn"]}>
								<img
									src="/img/icons/arrow_down.svg"
									alt="flèche"
									className={isDir3Visible ? styles["arrow-up"] : ""}
								/>
							</button>
						</div>
						<div
							className={`${styles["accordion-content"]} ${isDir3Visible ? styles["accordion-open"] : ""}`}
						>
							<fieldset>
								<p>
									<label htmlFor={director3Id}>Nom</label>
									<input
										type="text"
										id={director3Id}
										{...register("director_3")}
									/>
								</p>
								<p>
									<label htmlFor={director3bioId}>Biographie</label>
									<textarea
										id={director3bioId}
										{...register("director_3_bio")}
									/>
								</p>
								{renderImageSlot(
									"director_3_image",
									"Photo Réalisateur 3",
									director3imageId,
									dataToUpdate?.director_3_image || ("" as any),
									{},
								)}
							</fieldset>
						</div>
					</div>

					{/* AUTRES CHAMPS TECHNIQUES */}
					<fieldset>
						<legend>Détails du film</legend>
						<p>
							<label htmlFor={typeId}>Type (Fiction, Docu, etc.)</label>
							<input type="text" id={typeId} {...register("type")} />
						</p>

						<p>
							<label htmlFor={releasedateId}>Année de sortie</label>
							<input
								type="date"
								id={releasedateId}
								{...register("release_date")}
							/>
						</p>

						<p>
							<label htmlFor={durationId}>Durée (minutes)</label>
							<input type="number" id={durationId} {...register("duration")} />
						</p>
					</fieldset>

					{/* FICHE TECHNIQUE */}
					<p>
						<label htmlFor={fichetechniqueId}>Fiche technique</label>
						<textarea
							id={fichetechniqueId}
							{...register("fiche_technique")}
							placeholder="Liste de l'équipe technique..."
						/>
					</p>

					{/* PRIX ET FESTIVALS */}
					<p>
						<label htmlFor={prixfestivalsId}>Prix et Festivals</label>
						<textarea
							id={prixfestivalsId}
							{...register("prix_festivals")}
							placeholder="Sélections, prix obtenus..."
						/>
					</p>

					{/* PARTENAIRES ET SOUTIENS */}
					<p>
						<label htmlFor={partenairessoutiensId}>
							Partenaires et soutiens
						</label>
						<textarea
							id={partenairessoutiensId}
							{...register("partenaires_soutiens")}
							placeholder="Remerciements, partenaires financiers..."
						/>
					</p>

					{/* PRESSE */}
					<p>
						<label htmlFor={presseId}>Revue de presse</label>
						<textarea
							id={presseId}
							{...register("presse")}
							placeholder="Citations de la presse..."
						/>
					</p>

					{/* IMAGES GALERIE */}
					<fieldset>
						<legend>Galerie d'images (5 max)</legend>
						{renderImageSlot(
							"image_1",
							"Image 1",
							image1Id,
							dataToUpdate?.image_1 || ("" as any),
							{},
						)}
						{renderImageSlot(
							"image_2",
							"Image 2",
							image2Id,
							dataToUpdate?.image_2 || ("" as any),
							{},
						)}
						{renderImageSlot(
							"image_3",
							"Image 3",
							image3Id,
							dataToUpdate?.image_3 || ("" as any),
							{},
						)}
						{renderImageSlot(
							"image_4",
							"Image 4",
							image4Id,
							dataToUpdate?.image_4 || ("" as any),
							{},
						)}
						{renderImageSlot(
							"image_5",
							"Image 5",
							image5Id,
							dataToUpdate?.image_5 || ("" as any),
							{},
						)}
					</fieldset>

					{/* ID HIDDEN */}
					<input type="hidden" id={idId} {...register("id")} />

					<button className={styles.button_add} type="submit">
						{dataToUpdate ? "Mettre à jour le film" : "Créer un film"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AdminFilmFormContent;
