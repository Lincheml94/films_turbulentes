import type { Request, Response } from "express";
import FilmRepository from "../repository/film_repository";

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
		const results = await new FilmRepository().insert(_req.body);

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
		const results = await new FilmRepository().update(_req.body);

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
