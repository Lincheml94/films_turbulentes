import { use } from "react";
import type { Film } from "../../../../models/film";
import FilmApiService from "../../../service/film_api_service";
import CarrouselAccueilClient from "./carrousel_accueil_client";

// Ce composant est un Server Component (par défaut)
const CarrouselAccueilServer = () => {
	// 1. Chargement des données (Côté Serveur)
	const filmsResponse = use(new FilmApiService().findLatestExploitedFilms());

	// 2. Extraction des données
	// CORRECTION : On vérifie si c'est un objet avec une propriété 'data' qui est un tableau.
	// Ton API renvoie { status: 200, message: 'Ok', data: [...] }
	const films =
		(filmsResponse as any).data && Array.isArray((filmsResponse as any).data)
			? ((filmsResponse as any).data as Film[])
			: [];

	// 3. Transmission des données au composant Client via les props
	return <CarrouselAccueilClient initialFilms={films} />;
};

export default CarrouselAccueilServer;
