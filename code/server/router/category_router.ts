import express from "express";
import CategoryController from "../controller/category_controller";

class CategoryRouter {
	// définir un routeur
	private router = express.Router();
	// définir la liste des routes contenues dans le routeur
	public getRoutesList = () => {
		// création de la route d'accueil en GET en utilisant le préfixe /
		this.router.get("/", new CategoryController().index);
		this.router.get("/:id", new CategoryController().selectOne);

		return this.router;
	};
}
export default CategoryRouter;
