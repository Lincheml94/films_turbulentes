import type { Request, Response } from "express";
import CategoryRepository from "../repository/category_repository";

class CategoryController {
	public index = async (_req: Request, res: Response) => {
		const results = await new CategoryRepository().selectAll();

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
			message: "ok ",
			data: results,
		});
	};

	public selectOne = async (_req: Request, res: Response) => {
		const results = await new CategoryRepository().selectOne(_req.params);

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
			message: "ok ",
			data: results,
		});
	};
}

export default CategoryController;
