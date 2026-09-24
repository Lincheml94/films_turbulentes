import type { Film } from "../../models/film";
import type { ApiResponse } from "../models/api_response";

class FilmApiService {
	// préfixe de l'API (utilisé pour les requêtes)
	private prefix = "/api/Film";

	// sélection de tous les enregistrements
	public selectAll = async (): Promise<ApiResponse<Film[]>> => {
		// configurer la requête HTTP
		// import.meta.env permet d'importer une variable d'environnement dans vite/react
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
		);
		// exécuter la requête
		const response = await fetch(request);

		// convertir la réponse en JSON
		// sérialiser : convertir des données complexes(objets, array) en chaine de caractère
		// désérialiser : convertir une chaîne de caractère en données complexes (objets, array…)

		const results = await response.json();

		// retourner les résultats
		return results;
	};

	public selectOne = async (id: number): Promise<ApiResponse<Film>> => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}/${id}`,
		);
		const response = await fetch(request);

		const results = await response.json();

		return results;
	};

	public findLatestExploitedFilms = async (): Promise<ApiResponse<Film[]>> => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
		);
		const response = await fetch(request);

		const results = await response.json();

		return results;
	};

	// insersion d'un enregistrement
	/*
		si le formulaire contient un champ de fichier: utiliser formData en paramètres
		si le formulaire ne contient pas de champ de fichier : utiliser le type
	*/

	public insert = async (
		data: FormData,
		token: string,
	): Promise<ApiResponse<Film>> => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "post",
				/*
				Si le formulaire contient un champ de fichier :
					la propriété body renvoie un objet FormData
				Si le formulaire ne contient pas de champ de fichier
					la propriété body renvoie du JSON : JSON.stringfy(...)
					Ajouter l'en-tête Content-Type: application/json
				*/

				body: data,
				/*
					version sans fichiers :
					body:JSON.stringfy(data)
					headers: {
					"Content-Type": application/json
					},
				*/
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const response = await fetch(request);

		const results = await response.json();

		return results;
	};

	/*
		si le formulaire contient un champ de fichier: utiliser formData en paramètres
		si le formulaire ne contient pas de champ de fichier : utiliser le type
	*/

	public update = async (
		data: FormData,
		token: string,
	): Promise<ApiResponse<Film>> => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "put",
				/*
				Si le formulaire contient un champ de fichier :
					la propriété body renvoie un objet FormData
				Si le formulaire ne contient pas de champ de fichier
					la propriété body renvoie du JSON : JSON.stringfy(...)
					Ajouter l'en-tête Content-Type: application/json
				*/

				body: data,
				/*
					version sans fichiers :
					body:JSON.stringfy(data)
					headers: {
					"Content-Type": application/json
					},
				*/
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const response = await fetch(request);

		const results = await response.json();

		return results;
	};

	// Si il n'y a pas de formulaire, on utilise le type (data:Film)
	public delete = async (
		data: Film,
		token: string,
	): Promise<ApiResponse<Film>> => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "delete",
				/*
				Si le formulaire contient un champ de fichier :
					la propriété body renvoie un objet FormData
				Si le formulaire ne contient pas de champ de fichier
					la propriété body renvoie du JSON : JSON.stringfy(...)
					Ajouter l'en-tête Content-Type: application/json
				*/

				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
				/*
					version sans fichiers :
					body:JSON.stringfy(data)
					headers: {
					"Content-Type": application/json
					},
				*/
			},
		);
		const response = await fetch(request);

		const results = await response.json();

		return results;
	};
}

export default FilmApiService;
