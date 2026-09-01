import type { Request, Response } from "express";

class HomepageController {
	// middleware final lié à la route / en GET
	public index = (req: Request, res: Response): Response => {
		// renvoyer une réponse avec un code de status HTTP et au format JSON
		return res.status(200).json({
			status: 200,
			message: "Welcome to my API",
		});
	};
}

export default HomepageController;
