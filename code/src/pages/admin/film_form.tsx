import { use } from "react";
import type { Category } from "../../../models/category";
import type { Film } from "../../../models/film";
import AdminFilmFormContent from "../../components/admin/admin_film_form_content";
import type { AdminFilmParams } from "../../models/params/admin_film_params";
import CategoryApiService from "../../service/category_api_service";
import FilmApiService from "../../service/film_api_service";

const FilmForm = ({ params }: AdminFilmParams) => {
	// récupérer la variable d'URL
	// décomposition / déconstruction d'un objet
	const { id } = params;

	// récupérer les données à mettre à jour
	let dataToUpdate: Film | undefined;
	// console.log(dataToUpdate);

	// si un identifiant est présent dans l'URL
	if (id) {
		// la méthode then équivaut à await : then
		dataToUpdate = use(new FilmApiService().selectOne(id)).data as Film;
	}

	// récupérer les catégories

	const categories = use(new CategoryApiService().selectAll())
		.data as Category[];

	return (
		<AdminFilmFormContent
			dataToUpdate={dataToUpdate}
			categories={categories}
			// validator={new AdminBookFormValidator().validate}
		/>
	);
};

export default FilmForm;
