import express, { type Express, type Router } from "express";
import CategoryRouter from "../router/category_router";
import FilmRouter from "../router/film_router";
import HomepageRouter from "../router/homepage_router";
import UserRouter from "../router/user_router";

class Server {
	// instancier une application Express
	private app: Express = express();
	// définir un routeur pour Express
	private router: Router = express.Router();
	constructor() {
		this.app.use(express.json());

		// lier l'application Express au routeur
		this.app.use(this.router);
		// définir la liste des routeurs
		this.routerList();
	}
	// liste des routeurs
	private routerList = (): void => {
		// création de la route d'accueil en GET
		this.router.use("/api", new HomepageRouter().getRoutesList());
		this.router.use("/api/film", new FilmRouter().getRoutesList());
		this.router.use("/api/category", new CategoryRouter().getRoutesList());
		this.router.use("/api/user", new UserRouter().getRoutesList());
	};
	// créer un serveur Node.js / Express
	public createServer = (): express.Express => {
		return this.app;
	};
}
export default Server;
