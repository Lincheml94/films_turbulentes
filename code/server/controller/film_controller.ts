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
	public insert = async (_req: Request, res: Response) => {
		const file = (
			_req.files as Express.Multer.File[]
		).shift() as Express.Multer.File;
		// instancier le service de fichiers
		const fileServices = new FileServices();
		// Ajouter l'extension du fichiers
		const fullname = await fileServices.rename(file);
		// console.log("DONNÉES ENVOYÉES À LA BDD:", {
		// 	..._req.body,
		// 	poster: "nom_du_fichier",
		// });

		const results = await new FilmRepository().insert({
			..._req.body,
			poster: fullname,
			image_1: fullname,
			image_2: fullname,
			image_3: fullname,
			image_4: fullname,
			image_5: fullname,
		});

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
		res.status(201).json({
			status: 201,
			message: "Created",
			data: results,
		});
	};

	public update = async (_req: Request, res: Response) => {
		const file = (
			_req.files as Express.Multer.File[]
		).shift() as Express.Multer.File;
		// instancier le service de fichiers
		const fileServices = new FileServices();

		let posterName: string | null = null;
		let image1Name: string | null = null;
		let image2Name: string | null = null;
		let image3Name: string | null = null;
		let image4Name: string | null = null;
		let image5Name: string | null = null;

		if (file) {
			// Renommer le fichier transféré et on recupere le nom complet avec extension
			const fullname = await fileServices.rename(file);

			// On assigne le nouveau nom à tous les champs (votre logique)
			posterName = fullname;
			image1Name = fullname;
			image2Name = fullname;
			image3Name = fullname;
			image4Name = fullname;
			image5Name = fullname;
		} else {
			// S'il n'y a pas de fichier, on ne peut pas récupérer les anciens noms sans SELECT.
			// On laisse donc les variables à null (ou vous pouvez mettre une chaîne vide "").
			// C'est la seule façon de faire sans appeler selectOne.
			posterName = null;
			image1Name = null;
			image2Name = null;
			image3Name = null;
			image4Name = null;
			image5Name = null;
		}

		const results = await new FilmRepository().update({
			..._req.body,
			poster: posterName,
			image_1: image1Name,
			image_2: image2Name,
			image_3: image3Name,
			image_4: image4Name,
			image_5: image5Name,
		});

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
			message: "Modified",
			data: results,
		});
	};

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
