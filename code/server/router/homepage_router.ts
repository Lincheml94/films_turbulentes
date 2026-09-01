import express, { type Router } from "express";
import HomepageController from "../controller/homepage_controller";

class HomepageRouter {
	// définir un routeur
	private router: Router = express.Router();
	// définir la liste des routes contenues dans le routeur
	public getRoutesList = (): Router => {
		// création de la route d'accueil en GET en utilisant le préfixe /
		this.router.get("/", new HomepageController().index);

		return this.router;
	};
}
export default HomepageRouter;
