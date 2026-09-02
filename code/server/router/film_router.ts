import express from "express";
import multer from "multer";
import FilmController from "../controller/film_controller";

class FilmRouter {
	// définir un routeur
	private router = express.Router();

	private multer = multer({ dest: `${process.env.PUBLIC_DIR}/img/` });
	// définir la liste des routes contenues dans le routeur
	public getRoutesList = () => {
		// création de la route d'accueil en GET en utilisant le préfixe /
		this.router.get("/", new FilmController().index);
		this.router.get("/:id", new FilmController().selectOne);
		this.router.post("/", this.multer.any(), new FilmController().insert);
		this.router.put("/:id", this.multer.any(), new FilmController().update);
		this.router.delete("/", new FilmController().delete);

		return this.router;
	};
}
export default FilmRouter;
