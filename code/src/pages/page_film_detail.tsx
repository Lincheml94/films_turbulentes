// import { use } from "react";
// import type { Film } from "../../models/film";
// import FilmContentDetails from "../components/films/film_content_details";
// import type { CatalogueFilmsDetailsParams } from "../models/params/catalogue_films_details_params";
// import FilmApiService from "../service/film_api_service";

// const PageFilmsDetails = ({ params }: CatalogueFilmsDetailsParams) => {
// 	// récupérer l'identifiant dans les paramètres
// 	// deconstruction d'un objet permet de créer des variables pour chaque propriété d'un objet
// 	const { id } = params;
// 	// récupérer les données
// 	const result = use(new FilmApiService().selectOne(id));

// 	return <FilmContentDetails data={result.data as Film} />;
// };
// export default PageFilmsDetails;
