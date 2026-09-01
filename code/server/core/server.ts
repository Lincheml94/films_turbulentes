import express, { type Express, type Router } from "express";
import HomepageRouter from "../router/homepage_router";

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
	};
	// créer un serveur Node.js / Express
	public createServer = (): express.Express => {
		return this.app;
	};
}
export default Server;
