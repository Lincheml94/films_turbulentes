import express from "express";
import SecurityController from "../controller/security_controller";

class SecurityRouter {
	// routeur express
	private router = express.Router();

	// liste des routes
	public getRoutes = () => {
		// créer une route /api accessible en GET
		// req et res peuvent être n'importe quel mot, par contre Request et Reponse sont figés, d'ailleurs il faut choisir ceux qui correspondent à express
		// le prefixe des routes est dans le serveur
		this.router.post("/login", new SecurityController().login);

		// retourner le routeur
		return this.router;
	};
}

export default SecurityRouter;
