import type { User } from "../../models/user";
import type { ApiResponse } from "../models/api_response";

class SecurityApiService {
	// préfixe de l'API (utilisé pour les requêtes)
	private prefix = "/api";

	// Enregistrer un utilisateur
	// 1er param : route
	// 2e param : méthode

	public login = async (data: Partial<User>): Promise<ApiResponse<User[]>> => {
		// configurer la requête HTTP
		// import.meta.env permet d'importer une variable d'environnement dans vite/react
		const request = new Request(
			// route serveur
			`${import.meta.env.VITE_API_URL}${this.prefix}/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		);
		// exécuter la requête
		const response = await fetch(request);

		// convertir la réponse en JSON
		// sérialiser : convertir des données complexes(objets, array) en chaine de caractère
		// désérialiser : convertir une chaîne de caractère en données complexes (objets, array…)

		const results = await response.json();

		return results;
	};
}

export default SecurityApiService;
