import * as jose from "jose";
import type { User } from "../../models/user";

class SecurityService {
	// stocker l'utilisateur
	private static user: User | null;

	// stocker le JWT token
	private static token: string | null;

	// deconnexion
	public logout = () => {
		// supprimer  l'utilisateur
		SecurityService.user = null;
		// supprimer le token JWT
		SecurityService.token = null;
	};

	// getter / setter (accesseur / mutateur)
	public getUser = (): User | null => {
		"use server";
		return SecurityService.user;
	};

	public setUser = (value: User | null) => {
		"use server";
		SecurityService.user = value;
	};
	// dans cette fonction on stock l'utilisateur
	public setToken = async (user: User | null) => {
		const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
		const alg = "HS256";

		if (user) {
			SecurityService.token = await new jose.SignJWT(user)
				.setProtectedHeader({ alg })
				.setExpirationTime("10h")
				.sign(secret);
		}
	};

	public getToken = (): string | null => SecurityService.token;
}

export default SecurityService;
