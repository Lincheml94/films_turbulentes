import type { Request, Response } from "express";
import UserRepository from "../repository/user_repository";

class UserController {
	public index = async (_req: Request, res: Response) => {
		const results = await new UserRepository().selectAll();

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
		const results = await new UserRepository().selectOne(_req.params);

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

	public update = async (_req: Request, res: Response) => {
		const results = await new UserRepository().update(_req.body);

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
}

export default UserController;
