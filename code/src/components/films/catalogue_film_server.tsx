import { use } from "react";
import type { Category } from "../../../models/category";
import type { Film } from "../../../models/film";
import CategoryApiService from "../../service/category_api_service";
import FilmApiService from "../../service/film_api_service";
import CatalogueFilmContentClient from "./catalogue_film_content_client";

// Ce composant est un Server Component (par défaut)
// Il peut être async et utiliser use()
const CatalogueFilmsServer = () => {
	// 1. Chargement des données (Côté Serveur)
	// On utilise use() pour "déballer" la promesse
	const filmsResponse = use(new FilmApiService().selectAll());
	const categoriesResponse = use(new CategoryApiService().selectAll());

	// 2. Extraction des données (on suppose que ton API renvoie { data: [...] })
	const films = filmsResponse.data as Film[];
	const categories = categoriesResponse.data as Category[];

	// 3. Transmission des données au composant Client via les props
	return (
		<CatalogueFilmContentClient
			initialFilms={films}
			initialCategories={categories}
		/>
	);
};

export default CatalogueFilmsServer;
