import argon2 from "argon2";
import type { Request, Response } from "express";
import type { User } from "../../models/user";
import SecurityRepository from "../repository/security_repository";

class SecurityController {
	// Enregistrement d'un.e utilisateur.ice

	public login = async (req: Request, res: Response) => {
		// vérifier si un email existe déjà

		let results = await new SecurityRepository().isUserNameExists(req.body);

		// si la requête renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE === "production" ? "error" : results.message,
			});
			return;
		}

		// Si l'email n'existe pas

		if (!results) {
			res.status(403).json({
				status: 403,
				message:
					process.env.NODE === "production"
						? "error"
						: "Forbidden - User do not exists",
			});
			return;
		}

		// récupérer l'utilisateur.ice par son email
		results = await new SecurityRepository().selectOneByUserName(req.body);

		// vérifier le mot de passe
		// digest : version hachée
		// results as User.password : version hachée
		// req.body.password : mdp saisi dans le formulaire (req.body)

		const passwordIsValide = await argon2.verify(
			(results as User).password,
			req.body.password,
		);

		// Si le mdp n'est pas valide
		if (!passwordIsValide) {
			res.status(401).json({
				status: 401,
				message:
					process.env.NODE === "production"
						? "error"
						: "Unauthorized - Invalid password",
			});
			return;
		}

		// renvoyer une réponse avec un code de statut HTTP et au format JSON
		// code 200 : requête traitée avec succès (voir p 5 du pdf 14)
		res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	};
}

export default SecurityController;
