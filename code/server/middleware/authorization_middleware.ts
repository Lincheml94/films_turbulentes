// import type { NextFunction, Request, Response } from "express";
// import * as jose from "jose";
// import type { JWTInvalid } from "jose/errors";
// import type { User } from "../../models/user";

// class AuthorizationMiddleware {
// 	// But de cette fonction : vérifier le JWT contenu dans l'en-tête HTTP authorization
// 	public authorize = (roles: string[]) => {
// 		// ATTENTION : request et response de EXPRESS
// 		return async (req: Request, res: Response, next: NextFunction) => {
// 			// console.log("authorization middleware");
// 			// récupération du JWT dans l'en-tête authorization
// 			const token = req.header("authorization")?.split("Bearer ")[1];
// 			// console.log(token);
// 			// vérification de la validité du token
// 			try {
// 				const secret = new TextEncoder().encode(process.env.VITE_JWT_SECRET);
// 				await jose.jwtVerify(token as string, secret);
// 			} catch (error) {
// 				//  Si le token est invalide, on renvoie une réponse
// 				res.status(403).json({
// 					status: 403,
// 					message:
// 						process.env.NODE === "production"
// 							? "error"
// 							: (error as JWTInvalid).code,
// 				});
// 				return;
// 			}
// 			// récupérer le payload contenant les données de l'utilisateur
// 			const payload = jose.decodeJwt(token as string) as User;
// 			// Si le rôle n'est pas autorisé
// 			if (roles.indexOf(payload.role) === -1) {
// 				res.status(401).json({
// 					status: 401,
// 					message:
// 						process.env.NODE === "production"
// 							? "error"
// 							: "Unauthorized - Role not authorized",
// 				});
// 				return;
// 			}
// 			// console.log(payload.role.name);

// 			// passer au middleware suivant
// 			next();
// 		};
// 	};
// }

// export default AuthorizationMiddleware;
