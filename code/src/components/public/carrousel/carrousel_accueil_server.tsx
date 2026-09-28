import { use } from "react";
import type { Film } from "../../../../models/film";
import FilmApiService from "../../../service/film_api_service";
import CarrouselAccueil from "./carrousel_accueil";

// Ce composant est un Server Component (par défaut)
const CarrouselAccueilServer = () => {
	// 1. Chargement des 3 derniers films en exploitation (Côté Serveur)
	// On utilise use() pour déballer la promesse directement dans le rendu
	const filmsResponse = use(new FilmApiService().findLatestExploitedFilms(3));

	// 2. Sécurisation des données
	// La méthode peut retourner une erreur ou un tableau. On vérifie que c'est bien un tableau.
	const films = Array.isArray(filmsResponse) ? (filmsResponse as Film[]) : [];

	// 3. Si aucun film, on n'affiche rien (ou vous pouvez afficher un placeholder)
	if (films.length === 0) {
		return null;
	}

	// 4. Transmission des données au composant Client via les props
	return <CarrouselAccueil films={films} />;
};

export default CarrouselAccueilServer;
