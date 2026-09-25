import { use } from "react";
import type { Film } from "../../models/film";
import FilmContentDetailsClient from "../components/films/film_content_details_client";
import Header from "../components/header";
import type { FilmsDetailsParams } from "../models/params/films_details_params";
import FilmApiService from "../service/film_api_service";

const PageFilmsDetails = ({ params }: FilmsDetailsParams) => {
	const { id } = params;
	// récupérer les données
	const result = use(new FilmApiService().selectOne(id));
	if (!result) {
		return <div>Film non trouvé.</div>;
	}
	return (
		<div>
			<Header />
			<FilmContentDetailsClient data={result.data as Film} />
		</div>
	);
};
export default PageFilmsDetails;
