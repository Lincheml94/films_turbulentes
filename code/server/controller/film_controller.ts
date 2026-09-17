import type { Request, Response } from "express";
import type { Film } from "../../models/film";
import FilmRepository from "../repository/film_repository";
import FileServices from "../service/file_service";

class FilmController {
	public index = async (_req: Request, res: Response) => {
		const results = await new FilmRepository().selectAll();

		// si la rêquete renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});
			return;
		}
		// renvoyer une répone avec un code de status HTTP et au format JSON
		res.status(200).json({
			status: 200,
			message: "Ok",
			data: results,
		});
	};

	public selectOne = async (_req: Request, res: Response) => {
		const results = await new FilmRepository().selectOne(_req.params);

		// si la rêquete renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});
			return;
		}
		// renvoyer une répone avec un code de status HTTP et au format JSON
		res.status(200).json({
			status: 200,
			message: "Ok",
			data: results,
		});
	};
	public findLatestExploitedFilms = async (_req: Request, res: Response) => {
		
		const results = await new FilmRepository().findLatestExploitedFilms();

		// si la rêquete renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});
			return;
		}
		// renvoyer une répone avec un code de status HTTP et au format JSON
		res.status(200).json({
			status: 200,
			message: "Ok",
			data: results,
		});
	};

	public insert = async (_req: Request, res: Response) => {
		const files = _req.files as Express.Multer.File[];
		const fileServices = new FileServices();

		// Fonction helper pour trouver et renommer un fichier spécifique
		const processFile = async (fieldName: string): Promise<string | null> => {
			// Trouver le fichier qui correspond au nom du champ (ex: 'poster', 'director_1_image')
			const file = files?.find((f) => f.fieldname === fieldName);

			if (file) {
				return await fileServices.rename(file);
			}
			return null; // Si pas de fichier pour ce champ, on retourne null
		};

		// Traiter chaque image individuellement
		const poster = await processFile("poster");
		const director_1_image = await processFile("director_1_image");
		const director_2_image = await processFile("director_2_image");
		const director_3_image = await processFile("director_3_image");
		const image_1 = await processFile("image_1");
		const image_2 = await processFile("image_2");
		const image_3 = await processFile("image_3");
		const image_4 = await processFile("image_4");
		const image_5 = await processFile("image_5");

		// Si aucun fichier n'est trouvé du tout, poster sera null, etc.
		// Assurez-vous que votre BDD accepte NULL pour ces colonnes si aucun fichier n'est envoyé.

		const results = await new FilmRepository().insert({
			..._req.body,
			poster: poster,
			director_1_image: director_1_image,
			director_2_image: director_2_image,
			director_3_image: director_3_image,
			image_1: image_1,
			image_2: image_2,
			image_3: image_3,
			image_4: image_4,
			image_5: image_5,
		});

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});
			return;
		}

		res.status(201).json({
			status: 201,
			message: "Created",
			data: results,
		});
	};
	public update = async (_req: Request, res: Response) => {
		// 1. Récupérer l'ID du film (supposé être dans _req.body.id ou _req.params.id)
		// Adaptez selon comment vous passez l'ID dans votre route PUT
		const id = _req.body.id || _req.params.id;

		if (!id) {
			res
				.status(400)
				.json({ status: 400, message: "ID manquant pour la mise à jour" });
			return;
		}

		// 2. Récupérer le film actuel dans la BDD pour connaître les anciens noms de fichiers
		// On suppose que selectOne accepte un objet { id: number }
		const currentFilm = (await new FilmRepository().selectOne({
			id: Number(id),
		})) as Film;

		if (!currentFilm || currentFilm instanceof Error) {
			res.status(404).json({ status: 404, message: "Film non trouvé" });
			return;
		}

		const files = _req.files as Express.Multer.File[];
		const fileServices = new FileServices();

		// Fonction helper pour trouver et traiter un fichier spécifique
		// Si un nouveau fichier existe, on le renomme. Sinon, on garde l'ancien nom de la BDD.
		const processFile = async (
			fieldName: string,
			oldFileName: string | null,
		): Promise<string | null> => {
			const file = files?.find((f) => f.fieldname === fieldName);

			if (file) {
				// Nouveau fichier envoyé : on le renomme et on retourne le nouveau nom
				return await fileServices.rename(file);
			} else {
				// Pas de nouveau fichier : on garde l'ancien nom (même s'il est null)
				return oldFileName;
			}
		};

		// 3. Traiter chaque image individuellement
		const posterName = await processFile("poster", currentFilm.poster);
		const director_1_image = await processFile(
			"director_1_image",
			currentFilm.director_1_image,
		);
		const director_2_image = await processFile(
			"director_2_image",
			currentFilm.director_2_image,
		);
		const director_3_image = await processFile(
			"director_3_image",
			currentFilm.director_3_image,
		);
		const image_1 = await processFile("image_1", currentFilm.image_1);
		const image_2 = await processFile("image_2", currentFilm.image_2);
		const image_3 = await processFile("image_3", currentFilm.image_3);
		const image_4 = await processFile("image_4", currentFilm.image_4);
		const image_5 = await processFile("image_5", currentFilm.image_5);

		// 4. Appel au repository pour mise à jour
		const results = await new FilmRepository().update({
			id: Number(id), // Assurez-vous de passer l'ID pour le WHERE
			..._req.body,
			poster: posterName,
			director_1_image: director_1_image,
			director_2_image: director_2_image,
			director_3_image: director_3_image,
			image_1: image_1,
			image_2: image_2,
			image_3: image_3,
			image_4: image_4,
			image_5: image_5,
		});

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Modified",
			data: results,
		});
	};
	// public update = async (_req: Request, res: Response) => {
	// 	const file = (
	// 		_req.files as Express.Multer.File[]
	// 	).shift() as Express.Multer.File;
	// 	// instancier le service de fichiers
	// 	const fileServices = new FileServices();

	// 	let posterName: string | null = null;
	// 	let director1Name: string | null = null;
	// 	let director2Name: string | null = null;
	// 	let director3Name: string | null = null;
	// 	let image1Name: string | null = null;
	// 	let image2Name: string | null = null;
	// 	let image3Name: string | null = null;
	// 	let image4Name: string | null = null;
	// 	let image5Name: string | null = null;

	// 	if (file) {
	// 		// Renommer le fichier transféré et on recupere le nom complet avec extension
	// 		const fullname = await fileServices.rename(file);

	// 		// On assigne le nouveau nom à tous les champs (votre logique)
	// 		posterName = fullname;
	// 		director1Name = fullname;
	// 		director2Name = fullname;
	// 		director3Name = fullname;
	// 		image1Name = fullname;
	// 		image2Name = fullname;
	// 		image3Name = fullname;
	// 		image4Name = fullname;
	// 		image5Name = fullname;
	// 	} else {
	// 		// S'il n'y a pas de fichier, on ne peut pas récupérer les anciens noms sans SELECT.
	// 		// On laisse donc les variables à null (ou vous pouvez mettre une chaîne vide "").
	// 		// C'est la seule façon de faire sans appeler selectOne.
	// 		posterName = null;
	// 		director1Name = null;
	// 		director2Name = null;
	// 		director3Name = null;
	// 		image1Name = null;
	// 		image2Name = null;
	// 		image3Name = null;
	// 		image4Name = null;
	// 		image5Name = null;
	// 	}

	// 	const results = await new FilmRepository().update({
	// 		..._req.body,
	// 		poster: posterName,
	// 		director_1_image: director1Name,
	// 		director_2_image: director2Name,
	// 		director_3_image: director3Name,
	// 		image_1: image1Name,
	// 		image_2: image2Name,
	// 		image_3: image3Name,
	// 		image_4: image4Name,
	// 		image_5: image5Name,
	// 	});

	// 	// si la rêquete renvoie une erreur
	// 	if (results instanceof Error) {
	// 		res.status(400).json({
	// 			status: 400,
	// 			message:
	// 				process.env.NODE_ENV === "production" ? "Error" : results.message,
	// 		});
	// 		return;
	// 	}
	// 	// renvoyer une répone avec un code de status HTTP et au format JSON
	// 	res.status(200).json({
	// 		status: 200,
	// 		message: "Modified",
	// 		data: results,
	// 	});
	// };

	public delete = async (_req: Request, res: Response) => {
		const results = await new FilmRepository().delete(_req.body);
		// si la rêquete renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});
			return;
		}
		// renvoyer une répone avec un code de status HTTP et au format JSON
		res.status(200).json({
			status: 200,
			message: "Deleted",
			data: results,
		});
	};
}

export default FilmController;
