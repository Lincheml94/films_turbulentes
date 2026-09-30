import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { Film } from "../../../models/film";
import type { AdminFilmFormContentProps } from "../../models/props/films/admin_film_form_content_props";
import FilmApiService from "../../service/film_api_service";

const AdminFilmFormContent = ({
	categories,
	dataToUpdate,
}: AdminFilmFormContentProps) => {
	const idId = useId();
	const titleId = useId();
	const posterId = useId();
	const director1Id = useId();
	const director1bioId = useId();
	const director1image = useId();
	const director2 = useId();
	const director2bio = useId();
	const director2image = useId();
	const director3 = useId();
	const director3bio = useId();
	const director3image = useId();
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

	const navigate = useNavigate();
	const [serverErrors, setServerErrors] = useState<Partial<Film>>();

	const [message, setMessage] = useState<string>("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Partial<Film>>();

	useEffect(() => {
		if (dataToUpdate) {
			// normaliser les données saisies : se base sur les données testées dans flashport pour que les données (pour les cases à cocher)
			const normalizeData = {
				...dataToUpdate,
				// category_id: (dataToUpdate.category_id as string).split(","),
			};
			reset(normalizeData);
		}
	}, [dataToUpdate, reset]);

	const submitForm = async (data: Partial<Film>) => {
		// normaliser les données saisies : se base sur les données testées dans flashport pour que les données
		const normalizeData = {
			...data,
			category_id: (data.category_id as unknown as string[]).join(),
			poster: (data.poster as string)[0],
			image_1: (data.image_1 as string)[0],
			image_2: (data.image_2 as string)[0],
			image_3: (data.image_3 as string)[0],
			image_4: (data.image_4 as string)[0],
			image_5: (data.image_5 as string)[0],
		};

		// validation de la saisie avec le validateur côté serveur
		// const validation = await validator(normalizeData);
		// if (validation instanceof Error) {
		// 	let errors = {};
		// 	(JSON.parse(validation.message) as ZodIssue[]).map((item) => {
		// 		errors = { ...errors, [item.path.shift() as string]: item.message };
		// 		return errors;
		// 	});
		// 	setServerErrors(errors);
		// 	return;
		// }

		const formData = new FormData();
		formData.set("id", normalizeData.id as unknown as string);
		formData.set("id", normalizeData.title as unknown as string);
		formData.set("id", normalizeData.poster as unknown as string);
		formData.set("id", normalizeData.director_1 as unknown as string);
		formData.set("id", normalizeData.director_1_bio as unknown as string);
		formData.set("id", normalizeData.director_1_image as unknown as string);
		formData.set("id", normalizeData.director_2 as unknown as string);
		formData.set("id", normalizeData.director_2_bio as unknown as string);
		formData.set("id", normalizeData.director_2_image as unknown as string);
		formData.set("id", normalizeData.director_3 as unknown as string);
		formData.set("id", normalizeData.director_3_bio as unknown as string);
		formData.set("id", normalizeData.director_3_image as unknown as string);
		formData.set("id", normalizeData.description as unknown as string);
		formData.set("id", normalizeData.type as unknown as string);
		formData.set("id", normalizeData.release_date as unknown as string);
		formData.set("id", normalizeData.duration as unknown as string);
		formData.set("id", normalizeData.fiche_technique as unknown as string);
		formData.set("id", normalizeData.prix_festivals as unknown as string);
		formData.set("id", normalizeData.partenaires_soutiens as unknown as string);
		formData.set("id", normalizeData.presse as unknown as string);
		formData.set("id", normalizeData.image_1 as unknown as string);
		formData.set("id", normalizeData.image_2 as unknown as string);
		formData.set("id", normalizeData.image_3 as unknown as string);
		formData.set("id", normalizeData.image_4 as unknown as string);
		formData.set("id", normalizeData.image_5 as unknown as string);

		const process = dataToUpdate
			? await new FilmApiService().update(formData)
			: await new FilmApiService().insert(formData);

		// Si la requête HTTP a réussi : l'utilisateur.ice a ajouté un livre et est redirigé vers une autre page
		// use navigate : hook qui permet de naviguer
		if ([200, 201].indexOf(process.status) !== -1) {
			// redirection
			navigate("/admin");
		} else if ([400].indexOf(process.status) !== -1) {
			// afficher un message
			setMessage(process.message as unknown as string);
		}
	};
};

export default AdminFilmFormContent;
